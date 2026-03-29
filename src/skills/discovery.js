/**
 * Skill discovery module for my-awesome-model-router
 * Handles skill file discovery, parsing, and caching
 */

const fs = require('fs');
const path = require('path');

/**
 * Parse YAML frontmatter from SKILL.md content
 * @param {string} content - Full file content
 * @returns {object} Parsed frontmatter key-value pairs
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const lines = match[1].split(/\r?\n/);
  const result = {};
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      if (key) {
        result[key] = value;
      }
    }
  }
  return result;
}

/**
 * Skill discovery class
 */
class SkillDiscovery {
  constructor(skillsDir) {
    this.skillsDir = skillsDir;
    
    // Cache state
    this.discoveredSkills = null;
    this.cachedSkillNames = null;
    this.cachedSkillsTime = 0;
    
    // TTL constants
    this.SKILLS_CACHE_TTL = 10 * 60 * 1000; // 10 minutes
  }
  
  /**
   * Discover skills synchronously
   * @returns {string[]} Array of discovered skill names
   */
  discoverSync() {
    const skills = [];
    const skillsDir = this.skillsDir;

    try {
      const subdirs = fs.readdirSync(skillsDir);
      
      for (const subdir of subdirs) {
        // 安全验证：只允许字母、数字、连字符、下划线
        if (!/^[\w-]+$/.test(subdir)) {
          console.warn(`[my-awesome-model-router] Skipping invalid directory name: ${subdir}`);
          continue;
        }
        
        const skillPath = path.join(skillsDir, subdir, 'SKILL.md');
        
        if (fs.existsSync(skillPath)) {
          try {
            const content = fs.readFileSync(skillPath, 'utf8');
            const frontmatter = parseFrontmatter(content);
            
            if (!frontmatter.name) {
              console.warn(`[my-awesome-model-router] Warning: SKILL.md in ${subdir} is missing "name" field`);
            }
            if (!frontmatter.description) {
              console.warn(`[my-awesome-model-router] Warning: Skill "${frontmatter.name}" is missing "description" field`);
            } else if (!frontmatter.description.startsWith('Use when')) {
              console.warn(`[my-awesome-model-router] Warning: Skill "${frontmatter.name}" description should start with "Use when"`);
            }
            
            if (frontmatter.name) {
              skills.push(frontmatter.name);
            }
          } catch (err) {
            console.warn(`[my-awesome-model-router] Warning: Failed to read ${skillPath}:`, err.message);
          }
        }
      }
    } catch (err) {
      console.error('[my-awesome-model-router] Failed to discover skills:', err.message);
    }
    
    return skills;
  }
  
  /**
   * Discover skills asynchronously
   * @returns {Promise<string[]>} Promise that resolves to array of discovered skill names
   */
  async discoverAsync() {
    const skills = [];
    const skillsDir = this.skillsDir;

    try {
      const subdirs = await fs.promises.readdir(skillsDir);
      
      // 并行读取所有技能文件以提高性能
      const skillPromises = subdirs
        .filter(subdir => /^[\w-]+$/.test(subdir)) // 安全过滤
        .map(async subdir => {
          const skillPath = path.join(skillsDir, subdir, 'SKILL.md');
          
          try {
            const stats = await fs.promises.stat(skillPath);
            if (!stats.isFile()) {
              return null;
            }
            
            const content = await fs.promises.readFile(skillPath, 'utf8');
            const frontmatter = parseFrontmatter(content);
            
            if (!frontmatter.name) {
              console.warn(`[my-awesome-model-router] Warning: SKILL.md in ${subdir} is missing "name" field`);
              return null;
            }
            if (!frontmatter.description) {
              console.warn(`[my-awesome-model-router] Warning: Skill "${frontmatter.name}" is missing "description" field`);
            } else if (!frontmatter.description.startsWith('Use when')) {
              console.warn(`[my-awesome-model-router] Warning: Skill "${frontmatter.name}" description should start with "Use when"`);
            }
            
            return frontmatter.name;
          } catch (err) {
            console.warn(`[my-awesome-model-router] Warning: Failed to read ${skillPath}:`, err.message);
            return null;
          }
        });
      
      const skillResults = await Promise.all(skillPromises);
      skills.push(...skillResults.filter(Boolean));
      
    } catch (err) {
      console.error('[my-awesome-model-router] Failed to discover skills:', err.message);
    }
    
    return skills;
  }
  
  /**
   * Get skills synchronously with caching
   * @returns {string[]} Array of skill names
   */
  getSkillsSync() {
    const now = Date.now();
    if (this.discoveredSkills === null || (now - this.cachedSkillsTime) > this.SKILLS_CACHE_TTL) {
      this.discoveredSkills = this.discoverSync();
      this.cachedSkillNames = this.discoveredSkills;
      this.cachedSkillsTime = now;
    }
    return this.discoveredSkills;
  }
  
  /**
   * Get skills asynchronously with caching
   * @returns {Promise<string[]>} Promise resolving to array of skill names
   */
  async getSkillsAsync() {
    const now = Date.now();
    if (this.discoveredSkills === null || (now - this.cachedSkillsTime) > this.SKILLS_CACHE_TTL) {
      try {
        this.discoveredSkills = await this.discoverAsync();
        this.cachedSkillNames = this.discoveredSkills;
        this.cachedSkillsTime = now;
      } catch (err) {
        console.error('[my-awesome-model-router] Async skill discovery failed, falling back to sync:', err.message);
        this.discoveredSkills = this.discoverSync();
        this.cachedSkillNames = this.discoveredSkills;
        this.cachedSkillsTime = now;
      }
    }
    return this.discoveredSkills;
  }
  
  /**
   * Clear skills cache
   */
  clearCache() {
    this.discoveredSkills = null;
    this.cachedSkillNames = null;
    this.cachedSkillsTime = 0;
  }
  
  /**
   * Get cache statistics
   * @returns {object} Cache statistics
   */
  getStats() {
    const now = Date.now();
    return {
      cached: this.discoveredSkills !== null,
      skillCount: this.discoveredSkills ? this.discoveredSkills.length : 0,
      age: this.cachedSkillsTime ? now - this.cachedSkillsTime : null,
      ttl: this.cachedSkillsTime ? (this.cachedSkillsTime + this.SKILLS_CACHE_TTL) - now : null
    };
  }
}

module.exports = SkillDiscovery;