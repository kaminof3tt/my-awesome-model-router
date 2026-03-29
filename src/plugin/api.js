/**
 * Plugin API and event system for my-awesome-model-router
 * Provides extensibility hooks for third-party plugins
 */

const EventEmitter = require('events');

/**
 * Plugin hook types
 */
const HookTypes = {
  BEFORE_CONFIG_LOAD: 'beforeConfigLoad',
  AFTER_CONFIG_LOAD: 'afterConfigLoad',
  BEFORE_SKILL_DISCOVERY: 'beforeSkillDiscovery',
  AFTER_SKILL_DISCOVERY: 'afterSkillDiscovery',
  BEFORE_MODEL_ROUTING: 'beforeModelRouting',
  AFTER_MODEL_ROUTING: 'afterModelRouting',
  ON_CONFIG_CHANGE: 'onConfigChange',
  ON_SKILLS_CHANGE: 'onSkillsChange'
};

/**
 * Plugin API class
 */
class PluginAPI extends EventEmitter {
  constructor() {
    super();
    this.plugins = new Map();
    this.hooks = new Map();
    
    // Initialize hook registry
    for (const hookType of Object.values(HookTypes)) {
      this.hooks.set(hookType, []);
    }
    
    // Internal event emitter for hooks
    this.on('hook', (hookType, data) => {
      this.executeHooks(hookType, data);
    });
  }
  
  /**
   * Register a plugin
   * @param {string} name - Plugin name
   * @param {object} plugin - Plugin object
   * @param {object} options - Plugin options
   */
  registerPlugin(name, plugin, options = {}) {
    if (this.plugins.has(name)) {
      console.warn(`[my-awesome-model-router] Plugin "${name}" is already registered`);
      return false;
    }
    
    try {
      // Initialize plugin if it has an init method
      if (typeof plugin.init === 'function') {
        plugin.init(this, options);
      }
      
      // Register plugin hooks
      if (plugin.hooks) {
        for (const [hookType, handler] of Object.entries(plugin.hooks)) {
          this.registerHook(hookType, handler);
        }
      }
      
      this.plugins.set(name, {
        instance: plugin,
        options,
        registeredAt: Date.now()
      });
      
      console.log(`[my-awesome-model-router] Plugin "${name}" registered successfully`);
      return true;
    } catch (error) {
      console.error(`[my-awesome-model-router] Failed to register plugin "${name}":`, error.message);
      return false;
    }
  }
  
  /**
   * Unregister a plugin
   * @param {string} name - Plugin name
   */
  unregisterPlugin(name) {
    if (!this.plugins.has(name)) {
      return false;
    }
    
    const plugin = this.plugins.get(name);
    
    // Cleanup plugin if it has a cleanup method
    if (typeof plugin.instance.cleanup === 'function') {
      try {
        plugin.instance.cleanup();
      } catch (error) {
        console.error(`[my-awesome-model-router] Error during plugin "${name}" cleanup:`, error.message);
      }
    }
    
    this.plugins.delete(name);
    console.log(`[my-awesome-model-router] Plugin "${name}" unregistered`);
    return true;
  }
  
  /**
   * Register a hook handler
   * @param {string} hookType - Hook type
   * @param {Function} handler - Hook handler function
   * @param {number} priority - Hook priority (higher runs first)
   */
  registerHook(hookType, handler, priority = 0) {
    if (!this.hooks.has(hookType)) {
      console.warn(`[my-awesome-model-router] Unknown hook type: ${hookType}`);
      return false;
    }
    
    const hookEntry = {
      handler,
      priority,
      registeredAt: Date.now()
    };
    
    const hooks = this.hooks.get(hookType);
    hooks.push(hookEntry);
    
    // Sort by priority (descending)
    hooks.sort((a, b) => b.priority - a.priority);
    
    console.log(`[my-awesome-model-router] Hook "${hookType}" registered with priority ${priority}`);
    return true;
  }
  
  /**
   * Unregister a hook handler
   * @param {string} hookType - Hook type
   * @param {Function} handler - Hook handler function to remove
   */
  unregisterHook(hookType, handler) {
    if (!this.hooks.has(hookType)) {
      return false;
    }
    
    const hooks = this.hooks.get(hookType);
    const initialLength = hooks.length;
    const filteredHooks = hooks.filter(hook => hook.handler !== handler);
    
    if (filteredHooks.length === initialLength) {
      return false; // Handler not found
    }
    
    this.hooks.set(hookType, filteredHooks);
    return true;
  }
  
  /**
   * Execute hooks for a specific hook type
   * @param {string} hookType - Hook type
   * @param {object} data - Hook data
   * @returns {Promise<object>} Modified data after all hooks
   */
  async executeHooks(hookType, data) {
    if (!this.hooks.has(hookType)) {
      return data;
    }
    
    const hooks = this.hooks.get(hookType);
    let result = { ...data };
    
    for (const hook of hooks) {
      try {
        // Execute hook with context
        const hookResult = await Promise.resolve(
          hook.handler.call(this, result, { hookType, hook })
        );
        
        // Update result if hook returns something
        if (hookResult !== undefined) {
          result = { ...result, ...hookResult };
        }
      } catch (error) {
        console.error(`[my-awesome-model-router] Error in hook "${hookType}":`, error.message);
        // Continue with other hooks even if one fails
      }
    }
    
    return result;
  }
  
  /**
   * Trigger a hook
   * @param {string} hookType - Hook type
   * @param {object} data - Hook data
   * @returns {Promise<object>} Modified data after hooks
   */
  async triggerHook(hookType, data = {}) {
    return this.executeHooks(hookType, data);
  }
  
  /**
   * Get registered plugins
   * @returns {object} Map of registered plugins
   */
  getPlugins() {
    const plugins = {};
    for (const [name, info] of this.plugins) {
      plugins[name] = {
        name,
        options: info.options,
        registeredAt: info.registeredAt
      };
    }
    return plugins;
  }
  
  /**
   * Get registered hooks
   * @returns {object} Map of registered hooks
   */
  getHooks() {
    const hooks = {};
    for (const [hookType, hookList] of this.hooks) {
      hooks[hookType] = hookList.map(hook => ({
        priority: hook.priority,
        registeredAt: hook.registeredAt
      }));
    }
    return hooks;
  }
  
  /**
   * Clear all plugins and hooks
   */
  clear() {
    // Unregister all plugins
    for (const name of this.plugins.keys()) {
      this.unregisterPlugin(name);
    }
    
    // Clear all hooks
    for (const hookType of this.hooks.keys()) {
      this.hooks.set(hookType, []);
    }
    
    console.log('[my-awesome-model-router] Plugin API cleared');
  }
}

/**
 * Built-in plugins
 */

// Example plugin: Logging plugin
const LoggingPlugin = {
  name: 'logging',
  description: 'Adds logging for all hook events',
  
  init(api, options) {
    this.options = options;
    this.logLevel = options.logLevel || 'info';
    
    // Register hooks for logging
    for (const hookType of Object.values(HookTypes)) {
      api.registerHook(hookType, this.logHook.bind(this), -100); // Low priority
    }
  },
  
  logHook(data, context) {
    if (this.logLevel === 'debug') {
      console.log(`[my-awesome-model-router:${context.hookType}]`, data);
    }
    return data; // Pass through unchanged
  },
  
  cleanup() {
    console.log('[my-awesome-model-router] Logging plugin cleaned up');
  }
};

// Example plugin: Stats plugin
const StatsPlugin = {
  name: 'stats',
  description: 'Collects routing statistics',
  
  init(api, options) {
    this.stats = {
      routingDecisions: 0,
      configLoads: 0,
      skillDiscoveries: 0,
      startTime: Date.now()
    };
    
    // Register hooks for stats collection
    api.registerHook(HookTypes.AFTER_MODEL_ROUTING, this.recordRouting.bind(this));
    api.registerHook(HookTypes.AFTER_CONFIG_LOAD, this.recordConfigLoad.bind(this));
    api.registerHook(HookTypes.AFTER_SKILL_DISCOVERY, this.recordSkillDiscovery.bind(this));
  },
  
  recordRouting(data) {
    this.stats.routingDecisions++;
    return data;
  },
  
  recordConfigLoad(data) {
    this.stats.configLoads++;
    return data;
  },
  
  recordSkillDiscovery(data) {
    this.stats.skillDiscoveries++;
    return data;
  },
  
  getStats() {
    return {
      ...this.stats,
      uptime: Date.now() - this.stats.startTime
    };
  },
  
  cleanup() {
    console.log('[my-awesome-model-router] Stats plugin cleaned up');
  }
};

module.exports = {
  PluginAPI,
  HookTypes,
  builtInPlugins: {
    LoggingPlugin,
    StatsPlugin
  }
};