/**
 * Config loader module for my-awesome-model-router
 * Handles config loading, validation, and hot-reload
 */

const fs = require('fs');
const path = require('path');

/**
 * Config loader class
 */
class ConfigLoader {
  constructor(configPath, skillNames) {
    this.configPath = configPath;
    this.skillNames = skillNames || [];
    
    // Cache state
    this.cachedConfig = null;
    this.cachedMtime = null;
    this.cachedConfigTime = 0;
    
    // File watcher
    this.configWatcher = null;
    this.isWatching = false;
    
    // TTL constants
    this.CONFIG_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  }
  
  /**
   * Start config file watcher for hot-reload
   */
  startWatcher() {
    if (this.isWatching) {
      return;
    }
    
    try {
      this.configWatcher = fs.watch(this.configPath, { persistent: false }, (eventType, filename) => {
        if (eventType === 'change' && filename === 'config.json') {
          console.log('[my-awesome-model-router] Config file changed, invalidating cache');
          this.cachedConfig = null;
          this.cachedMtime = null;
          this.cachedConfigTime = 0;
        }
      });
      
      this.configWatcher.on('error', (err) => {
        console.error('[my-awesome-model-router] Config watcher error:', err.message);
        this.isWatching = false;
      });
      
      this.isWatching = true;
      console.log('[my-awesome-model-router] Config watcher started');
    } catch (err) {
      console.error('[my-awesome-model-router] Failed to start config watcher:', err.message);
    }
  }
  
  /**
   * Stop config file watcher
   */
  stopWatcher() {
    if (this.configWatcher) {
      this.configWatcher.close();
      this.configWatcher = null;
      this.isWatching = false;
      console.log('[my-awesome-model-router] Config watcher stopped');
    }
  }
  
  /**
   * Validate configuration
   * @param {object} config - Configuration object to validate
   * @returns {string[]} Array of validation warnings
   */
  validateConfig(config) {
    const warnings = [];
    
    // Check required fields
    const requiredFields = ['version', 'name', 'modelProviders', 'agents'];
    for (const field of requiredFields) {
      if (!config[field]) {
        warnings.push(`${field} is missing`);
      }
    }
    
    // Check modelProviders exists and is non-empty object
    if (!config.modelProviders || typeof config.modelProviders !== 'object' || Object.keys(config.modelProviders).length === 0) {
      warnings.push('modelProviders is missing, empty, or not an object');
    }
    
    // Check agents exists
    if (!config.agents || typeof config.agents !== 'object') {
      warnings.push('agents is missing or not an object');
    } else {
      // Check each agent has model field
      for (const [agentName, agent] of Object.entries(config.agents)) {
        if (!agent.model) {
          warnings.push(`Agent "${agentName}" is missing model field`);
        } else if (config.modelProviders && !config.modelProviders[agent.model]) {
          warnings.push(`Agent "${agentName}" references unknown model "${agent.model}"`);
        }
        
        // Check agent's skills array items exist as skill names
        if (agent.skills && Array.isArray(agent.skills)) {
          for (const skill of agent.skills) {
            if (this.skillNames && !this.skillNames.includes(skill)) {
              warnings.push(`Agent "${agentName}" references unknown skill "${skill}"`);
            }
          }
        }
      }
    }
    
    // Check categories exist if categoryKeywords exist
    if (config.categoryKeywords && !config.categories) {
      warnings.push('categoryKeywords defined but categories missing');
    }
    
    // Check fallbackChains references valid model providers
    if (config.fallbackChains && config.modelProviders) {
      for (const [chainName, chain] of Object.entries(config.fallbackChains)) {
        if (Array.isArray(chain)) {
          for (const modelName of chain) {
            if (!config.modelProviders[modelName]) {
              warnings.push(`Fallback chain "${chainName}" references unknown model "${modelName}"`);
            }
          }
        }
      }
    }
    
    // Log all warnings
    for (const warning of warnings) {
      console.warn(`[my-awesome-model-router] Config validation: ${warning}`);
    }
    
    return warnings;
  }
  
  /**
   * Load configuration synchronously
   * @returns {object|null} Configuration object or null on error
   */
  loadSync() {
    try {
      // Start watcher if not active
      if (!this.isWatching) {
        this.startWatcher();
      }
      
      const now = Date.now();
      
      // If config is not cached or TTL expired, reload it
      if (this.cachedConfig === null || (now - this.cachedConfigTime) > this.CONFIG_CACHE_TTL) {
        const fileContent = fs.readFileSync(this.configPath, 'utf8');
        this.cachedConfig = JSON.parse(fileContent);
        
        // Get current mtime for fallback
        const stats = fs.statSync(this.configPath);
        this.cachedMtime = stats.mtime.getTime();
        this.cachedConfigTime = now;
        
        // Validate config
        this.validateConfig(this.cachedConfig);
      }
      
      return this.cachedConfig;
    } catch (error) {
      console.error('[my-awesome-model-router] Error loading model config:', error.message);
      return this.cachedConfig || null;
    }
  }
  
  /**
   * Load configuration asynchronously
   * @returns {Promise<object|null>} Promise resolving to config object or null
   */
  async loadAsync() {
    try {
      // Start watcher if not active
      if (!this.isWatching) {
        this.startWatcher();
      }
      
      const now = Date.now();
      
      // If config is not cached or TTL expired, reload it
      if (this.cachedConfig === null || (now - this.cachedConfigTime) > this.CONFIG_CACHE_TTL) {
        const fileContent = await fs.promises.readFile(this.configPath, 'utf8');
        this.cachedConfig = JSON.parse(fileContent);
        
        // Get current mtime for fallback
        const stats = await fs.promises.stat(this.configPath);
        this.cachedMtime = stats.mtime.getTime();
        this.cachedConfigTime = now;
        
        // Validate config
        this.validateConfig(this.cachedConfig);
      }
      
      return this.cachedConfig;
    } catch (error) {
      console.error('[my-awesome-model-router] Error loading model config:', error.message);
      return this.cachedConfig || null;
    }
  }
  
  /**
   * Clear config cache
   */
  clearCache() {
    this.cachedConfig = null;
    this.cachedMtime = null;
    this.cachedConfigTime = 0;
  }
  
  /**
   * Get cache statistics
   * @returns {object} Cache statistics
   */
  getStats() {
    const now = Date.now();
    return {
      cached: this.cachedConfig !== null,
      age: this.cachedConfigTime ? now - this.cachedConfigTime : null,
      ttl: this.cachedConfigTime ? (this.cachedConfigTime + this.CONFIG_CACHE_TTL) - now : null,
      watching: this.isWatching
    };
  }
}

module.exports = ConfigLoader;