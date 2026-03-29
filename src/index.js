/**
 * My Skills Plugin for OpenCode - Modular Version
 * 
 * This plugin provides role-based model selection for different development tasks.
 * It includes skills for frontend, backend, architecture, testing, and QA roles.
 * 
 * @module my-awesome-model-router
 */

const path = require('path');
const ConfigLoader = require('./config/loader');
const SkillDiscovery = require('./skills/discovery');
const ModelRouter = require('./routing/model-router');
const { PluginAPI, HookTypes, builtInPlugins } = require('./plugin/api');

// Plugin metadata
const pluginInfo = {
  name: 'my-awesome-model-router',
  version: '1.0.0',
  description: 'Custom skills plugin with role-based model selection',
  author: 'Your Name'
};

// Module instances
let configLoader = null;
let skillDiscovery = null;
let modelRouter = null;
let pluginApi = null;

// Initialize module instances
function initModules() {
  if (!configLoader) {
    configLoader = new ConfigLoader(
      path.join(__dirname, '..', 'config.json')
    );
  }
  
  if (!skillDiscovery) {
    skillDiscovery = new SkillDiscovery(
      path.join(__dirname, '..', 'skills')
    );
  }
  
  if (!modelRouter) {
    modelRouter = new ModelRouter();
  }
  
  if (!pluginApi) {
    pluginApi = new PluginAPI();
    
    // Register built-in plugins
    pluginApi.registerPlugin('logging', builtInPlugins.LoggingPlugin, {
      logLevel: 'info'
    });
    
    pluginApi.registerPlugin('stats', builtInPlugins.StatsPlugin, {});
  }
}

// Enhanced config loader with plugin hooks
class EnhancedConfigLoader extends ConfigLoader {
  constructor(configPath, skillNames, pluginApi) {
    super(configPath, skillNames);
    this.pluginApi = pluginApi;
  }
  
  async loadAsync() {
    try {
      // Execute before hooks
      let hookData = {
        configPath: this.configPath,
        skillNames: this.skillNames,
        action: 'configLoad'
      };
      
      hookData = await this.pluginApi.triggerHook(HookTypes.BEFORE_CONFIG_LOAD, hookData);
      
      // Load config
      const config = await super.loadAsync();
      
      // Execute after hooks
      hookData = await this.pluginApi.triggerHook(HookTypes.AFTER_CONFIG_LOAD, {
        ...hookData,
        config,
        timestamp: Date.now()
      });
      
      return config;
    } catch (error) {
      console.error('[my-awesome-model-router] Enhanced config loader error:', error.message);
      return null;
    }
  }
}

// Enhanced skill discovery with plugin hooks
class EnhancedSkillDiscovery extends SkillDiscovery {
  constructor(skillsDir, pluginApi) {
    super(skillsDir);
    this.pluginApi = pluginApi;
  }
  
  async discoverAsync() {
    try {
      // Execute before hooks
      let hookData = {
        skillsDir: this.skillsDir,
        action: 'skillDiscovery'
      };
      
      hookData = await this.pluginApi.triggerHook(HookTypes.BEFORE_SKILL_DISCOVERY, hookData);
      
      // Discover skills
      const skills = await super.discoverAsync();
      
      // Execute after hooks
      hookData = await this.pluginApi.triggerHook(HookTypes.AFTER_SKILL_DISCOVERY, {
        ...hookData,
        skills,
        timestamp: Date.now()
      });
      
      return skills;
    } catch (error) {
      console.error('[my-awesome-model-router] Enhanced skill discovery error:', error.message);
      return [];
    }
  }
}

// Export plugin information
module.exports = {
  pluginInfo,
  
  // Plugin initialization
  init: async (options = {}) => {
    console.log('my-awesome-model-router initialized');
    
    // Initialize modules
    initModules();
    
    // Replace with enhanced versions
    configLoader = new EnhancedConfigLoader(
      path.join(__dirname, '..', 'config.json'),
      null,
      pluginApi
    );
    
    skillDiscovery = new EnhancedSkillDiscovery(
      path.join(__dirname, '..', 'skills'),
      pluginApi
    );
    
    try {
      // Start config file watcher
      configLoader.startWatcher();
      
      // Preload skills for better performance
      const skills = await skillDiscovery.getSkillsAsync();
      console.log(`[my-awesome-model-router] Discovered ${skills.length} skills`);
    } catch (err) {
      console.error('[my-awesome-model-router] Initialization error:', err.message);
    }
    
    return {
      name: pluginInfo.name,
      version: pluginInfo.version,
      plugins: pluginApi.getPlugins(),
      hooks: pluginApi.getHooks()
    };
  },
  
  // Get available skills
  getSkills: () => {
    initModules();
    return skillDiscovery.getSkillsSync();
  },
  
  // Async version of getSkills
  getSkillsAsync: async () => {
    initModules();
    return skillDiscovery.getSkillsAsync();
  },
  
  // Get model configuration
  getModelConfig: () => {
    initModules();
    return configLoader.loadSync();
  },
  
  // Async version of getModelConfig
  getModelConfigAsync: async () => {
    initModules();
    return configLoader.loadAsync();
  },
  
  // Get model with fallback chain support
  getModelWithFallback: (agentType, taskDescription) => {
    initModules();
    const config = configLoader.loadSync();
    return modelRouter.getModelWithFallback(config, agentType, taskDescription);
  },
  
  // Async version of getModelWithFallback
  getModelWithFallbackAsync: async (agentType, taskDescription) => {
    initModules();
    const config = await configLoader.loadAsync();
    return modelRouter.getModelWithFallback(config, agentType, taskDescription);
  },
  
  // Get routing debug information
  getRoutingDebugInfo: (agentType, taskDescription) => {
    initModules();
    const config = configLoader.loadSync();
    return modelRouter.getRoutingDebugInfo(config, agentType, taskDescription);
  },
  
  // Async version of getRoutingDebugInfo
  getRoutingDebugInfoAsync: async (agentType, taskDescription) => {
    initModules();
    const config = await configLoader.loadAsync();
    return modelRouter.getRoutingDebugInfo(config, agentType, taskDescription);
  },
  
  // Cleanup function
  cleanup: () => {
    if (configLoader) {
      configLoader.stopWatcher();
    }
    console.log('[my-awesome-model-router] Cleanup completed');
  },
  
  // Get statistics
  getStats: () => {
    initModules();
    return {
      config: configLoader.getStats(),
      skills: skillDiscovery.getStats(),
      plugins: pluginApi.getPlugins(),
      hooks: pluginApi.getHooks()
    };
  },
  
  // Module instances for advanced usage
  getModules: () => {
    initModules();
    return {
      configLoader,
      skillDiscovery,
      modelRouter,
      pluginApi
    };
  },
  
  // Plugin API methods
  registerPlugin: (name, plugin, options) => {
    initModules();
    return pluginApi.registerPlugin(name, plugin, options);
  },
  
  unregisterPlugin: (name) => {
    initModules();
    return pluginApi.unregisterPlugin(name);
  },
  
  triggerHook: async (hookType, data) => {
    initModules();
    return pluginApi.triggerHook(hookType, data);
  }
};