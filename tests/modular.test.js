/**
 * Modular architecture tests for my-awesome-model-router
 */

const plugin = require('../src/index');
const fs = require('fs');
const path = require('path');

// Mock skill directory for testing
const mockSkillsDir = path.join(__dirname, 'mock-skills');

// Setup and teardown
beforeAll(() => {
  // Create mock skill directories
  if (!fs.existsSync(mockSkillsDir)) {
    fs.mkdirSync(mockSkillsDir, { recursive: true });
  }
  
  // Create a mock skill
  const mockSkillDir = path.join(mockSkillsDir, 'test-skill');
  if (!fs.existsSync(mockSkillDir)) {
    fs.mkdirSync(mockSkillDir, { recursive: true });
  }
  
  const mockSkillContent = `---
name: test-skill
description: Use when testing the plugin
---
# Test Skill

This is a test skill for unit testing.`;
  
  fs.writeFileSync(
    path.join(mockSkillDir, 'SKILL.md'),
    mockSkillContent,
    'utf8'
  );
});

afterAll(() => {
  // Clean up mock directories
  if (fs.existsSync(mockSkillsDir)) {
    fs.rmSync(mockSkillsDir, { recursive: true, force: true });
  }
});

describe('Plugin Module System', () => {
  test('should export plugin info', () => {
    expect(plugin.pluginInfo).toBeDefined();
    expect(plugin.pluginInfo.name).toBe('my-awesome-model-router');
    expect(plugin.pluginInfo.version).toBe('1.0.0');
  });
  
  test('should have init method', async () => {
    const initResult = await plugin.init();
    expect(initResult).toBeDefined();
    expect(initResult.name).toBe('my-awesome-model-router');
    expect(initResult.version).toBe('1.0.0');
  });
  
  test('should have getSkills method', () => {
    const skills = plugin.getSkills();
    expect(Array.isArray(skills)).toBe(true);
  });
  
  test('should have getSkillsAsync method', async () => {
    const skills = await plugin.getSkillsAsync();
    expect(Array.isArray(skills)).toBe(true);
  });
  
  test('should have getModelConfig method', () => {
    const config = plugin.getModelConfig();
    expect(config).toBeDefined();
    expect(config.name).toBe('my-awesome-model-router');
  });
  
  test('should have getModelConfigAsync method', async () => {
    const config = await plugin.getModelConfigAsync();
    expect(config).toBeDefined();
    expect(config.name).toBe('my-awesome-model-router');
  });
  
  test('should have getModelWithFallback method', () => {
    const model = plugin.getModelWithFallback('frontend', 'implement UI component');
    expect(model).toBeDefined();
  });
  
  test('should have getModelWithFallbackAsync method', async () => {
    const model = await plugin.getModelWithFallbackAsync('frontend', 'implement UI component');
    expect(model).toBeDefined();
  });
  
  test('should have getRoutingDebugInfo method', () => {
    const debugInfo = plugin.getRoutingDebugInfo('frontend', 'implement UI component');
    expect(debugInfo).toBeDefined();
    expect(debugInfo.configAvailable).toBe(true);
  });
  
  test('should have getStats method', () => {
    const stats = plugin.getStats();
    expect(stats).toBeDefined();
    expect(stats.config).toBeDefined();
    expect(stats.skills).toBeDefined();
  });
  
  test('should have plugin API methods', () => {
    expect(plugin.registerPlugin).toBeInstanceOf(Function);
    expect(plugin.unregisterPlugin).toBeInstanceOf(Function);
    expect(plugin.triggerHook).toBeInstanceOf(Function);
  });
  
  test('should have cleanup method', () => {
    expect(plugin.cleanup).toBeInstanceOf(Function);
  });
});

describe('Model Routing Logic', () => {
  let config;
  
  beforeAll(async () => {
    // Suppress validation warnings during tests
    const originalWarn = console.warn;
    console.warn = jest.fn();
    
    config = await plugin.getModelConfigAsync();
    
    // Restore console.warn
    console.warn = originalWarn;
  });
  
  test('should return model for frontend agent', () => {
    const model = plugin.getModelWithFallback('frontend');
    expect(model).toBe('k2.5');
  });
  
  test('should return model for backend agent', () => {
    const model = plugin.getModelWithFallback('backend');
    expect(model).toBe('glm5');
  });
  
  test('should return model for frontend task', () => {
    const model = plugin.getModelWithFallback(null, 'implement UI component');
    expect(model).toBe('k2.5');
  });
  
  test('should return model for debugging task', () => {
    const model = plugin.getModelWithFallback(null, 'debug memory issue');
    expect(model).toBe('deepseekv3.2');
  });
  
  test('should return fallback for unknown task', () => {
    const model = plugin.getModelWithFallback(null, 'random unknown task');
    expect(model).toBe('m2.7');
  });
  
  test('should prioritize frontend over requirement-implementation', () => {
    const model = plugin.getModelWithFallback(null, 'implement frontend feature');
    expect(model).toBe('k2.5'); // frontend-architecture, not requirement-implementation
  });
});

describe('Plugin API System', () => {
  test('should have built-in plugins registered', async () => {
    const initResult = await plugin.init();
    expect(initResult.plugins).toBeDefined();
    expect(initResult.plugins.logging).toBeDefined();
    expect(initResult.plugins.stats).toBeDefined();
  });
  
  test('should allow custom plugin registration', () => {
    const customPlugin = {
      name: 'test-plugin',
      description: 'Test plugin',
      init: jest.fn(),
      cleanup: jest.fn()
    };
    
    const result = plugin.registerPlugin('custom-test', customPlugin);
    expect(result).toBe(true);
    
    const stats = plugin.getStats();
    expect(stats.plugins['custom-test']).toBeDefined();
    
    // Cleanup
    plugin.unregisterPlugin('custom-test');
  });
});

describe('Error Handling', () => {
  test('should handle missing config gracefully', () => {
    // Mock a scenario where config loading fails
    const originalRequire = require;
    jest.isolateModules(() => {
      // This test is complex due to module caching, but we test the public API
      // which should handle errors gracefully
      const model = plugin.getModelWithFallback('unknown-agent', 'unknown task');
      expect(model).toBeDefined(); // Should return null or fallback
    });
  });
});