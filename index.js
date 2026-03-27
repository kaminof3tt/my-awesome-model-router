/**
 * My Skills Plugin for OpenCode
 * 
 * This plugin provides role-based model selection for different development tasks.
 * It includes skills for frontend, backend, architecture, testing, and QA roles.
 * 
 * @module my-awesome-model-router
 */

// Plugin metadata
const pluginInfo = {
  name: 'my-awesome-model-router',
  version: '1.0.0',
  description: 'Custom skills plugin with role-based model selection',
  author: 'Your Name'
};

/**
 * 检查 superpowers 插件是否已加载
 * @param {object} opencode - OpenCode API 对象
 * @returns {boolean} 是否已加载
 */
const checkSuperpowersLoaded = (opencode) => {
  // 方式 1: 检查 opencode 是否提供插件查询 API
  if (opencode && typeof opencode.isPluginLoaded === 'function') {
    return opencode.isPluginLoaded('superpowers');
  }
  
  // 方式 2: 检查 opencode.plugins 列表
  if (opencode && opencode.plugins && Array.isArray(opencode.plugins)) {
    return opencode.plugins.some(p => 
      p.name === 'superpowers' || p.name === 'opencode-superpowers'
    );
  }
  
  // 方式 3: 检查全局对象上是否有 superpowers 相关标识
  if (typeof global !== 'undefined' && global.__opencode_plugins__) {
    return 'superpowers' in global.__opencode_plugins__;
  }
  
  // 无法确定状态，返回 false 并给出警告
  return false;
};

/**
 * 尝试获取 superpowers 插件实例
 * @param {object} opencode - OpenCode API 对象
 * @returns {object|null} 插件实例或 null
 */
const getSuperpowersPlugin = (opencode) => {
  if (opencode && typeof opencode.getPlugin === 'function') {
    return opencode.getPlugin('superpowers');
  }
  return null;
};

// Export plugin information
module.exports = {
  pluginInfo,
  
  // Plugin initialization
  init: (opencode) => {
    // 检查 superpowers 插件依赖
    const superpowersLoaded = checkSuperpowersLoaded(opencode);
    
    if (!superpowersLoaded) {
      console.warn(
        '[my-awesome-model-router] 警告: superpowers 插件未加载。' +
        '本插件的部分功能可能无法正常工作。' +
        '请确保在 opencode.json 中先配置 superpowers 插件。'
      );
      
      // 尝试获取 superpowers 插件（如果 API 支持）
      const superpowers = getSuperpowersPlugin(opencode);
      if (superpowers) {
        console.log('[my-awesome-model-router] 已找到 superpowers 插件实例');
      }
    } else {
      console.log('[my-awesome-model-router] superpowers 插件已加载，依赖检查通过');
    }
    
    console.log('my-awesome-model-router initialized');
    return {
      name: pluginInfo.name,
      version: pluginInfo.version,
      dependencies: {
        superpowers: superpowersLoaded ? 'loaded' : 'missing'
      }
    };
  },
  
  // Get available skills
  getSkills: () => {
    return [
      'frontend-developer',
      'architect',
      'backend-developer',
      'tester',
      'qa-engineer',
      'debugger',
      'documenter',
      'refactoring-specialist',
      'database-specialist',
    ];
  },
  
  // Get model configuration
  getModelConfig: () => {
    try {
      const config = require('./my-awesome-model-router-config.json');
      return config;
    } catch (error) {
      console.error('Error loading model config:', error);
      return null;
    }
  }
};