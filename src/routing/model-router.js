/**
 * Model routing module for my-awesome-model-router
 * Handles model selection based on agent type and task description
 */

/**
 * Model router class
 */
class ModelRouter {
  constructor() {
    // 定义明确的优先级顺序（从高到低）
    this.priorityCategories = [
      'frontend-architecture',    // 最高优先级
      'debugging',
      'bug-fix',
      'documentation',
      'refactoring',
      'database',
      'requirement-implementation', // 最低优先级
      'low-difficulty'
    ];
  }
  
  /**
   * Get model for agent type using fallback chain
   * @param {object} config - Configuration object
   * @param {string} agentType - Agent type
   * @returns {string|null} Model name or null if not found
   */
  getModelForAgent(config, agentType) {
    if (!agentType || !config.fallbackChains || !config.fallbackChains[agentType]) {
      return null;
    }
    
    const chain = config.fallbackChains[agentType];
    if (!chain || !Array.isArray(chain)) {
      return null;
    }
    
    // 遍历验证每个模型的可用性
    for (const modelName of chain) {
      if (config.modelProviders && config.modelProviders[modelName]) {
        return modelName;
      }
    }
    
    return null;
  }
  
  /**
   * Get model for task description using category keywords
   * @param {object} config - Configuration object
   * @param {string} taskDescription - Task description
   * @returns {string|null} Model name or null if not found
   */
  getModelForTask(config, taskDescription) {
    if (!taskDescription || !config.categories || !config.categoryKeywords) {
      return null;
    }
    
    const descLower = taskDescription.toLowerCase();
    const categoryKeywords = config.categoryKeywords;
    
    // 按优先级顺序匹配
    for (const categoryName of this.priorityCategories) {
      const keywords = categoryKeywords[categoryName];
      if (keywords && keywords.some(kw => descLower.includes(kw)) && config.categories[categoryName]) {
        return config.categories[categoryName].model;
      }
    }
    
    // Fallback category for unmatched task
    if (config.categories.fallback) {
      return config.categories.fallback.model;
    }
    
    return null;
  }
  
  /**
   * Get model using default fallback chain
   * @param {object} config - Configuration object
   * @returns {string|null} Model name or null if not found
   */
  getModelWithDefaultChain(config) {
    if (!config.fallbackChains || !config.fallbackChains.default) {
      return null;
    }
    
    const defaultChain = config.fallbackChains.default;
    if (!Array.isArray(defaultChain) || defaultChain.length === 0) {
      return null;
    }
    
    // 与其他链保持一致：遍历验证每个模型的可用性
    for (const modelName of defaultChain) {
      if (config.modelProviders && config.modelProviders[modelName]) {
        return modelName;
      }
    }
    
    return null;
  }
  
  /**
   * Get final fallback model (last resort)
   * @param {object} config - Configuration object
   * @returns {string|null} Model name or null if not found
   */
  getFinalFallbackModel(config) {
    if (!config.modelProviders) {
      return null;
    }
    
    const modelNames = Object.keys(config.modelProviders);
    return modelNames.length > 0 ? modelNames[0] : null;
  }
  
  /**
   * Get model with fallback chain support
   * @param {object} config - Configuration object
   * @param {string} agentType - Agent type (optional)
   * @param {string} taskDescription - Task description (optional)
   * @returns {string|null} Model name or null if not found
   */
  getModelWithFallback(config, agentType, taskDescription) {
    if (!config) {
      return null;
    }
    
    // 1. Try agent-specific fallback chain
    if (agentType) {
      const agentModel = this.getModelForAgent(config, agentType);
      if (agentModel) {
        return agentModel;
      }
    }
    
    // 2. Try task description category matching
    if (taskDescription) {
      const taskModel = this.getModelForTask(config, taskDescription);
      if (taskModel) {
        return taskModel;
      }
    }
    
    // 3. Try default fallback chain
    const defaultModel = this.getModelWithDefaultChain(config);
    if (defaultModel) {
      return defaultModel;
    }
    
    // 4. Final fallback
    return this.getFinalFallbackModel(config);
  }
  
  /**
   * Get all available routing options for debugging
   * @param {object} config - Configuration object
   * @param {string} agentType - Agent type (optional)
   * @param {string} taskDescription - Task description (optional)
   * @returns {object} Routing decision tree
   */
  getRoutingDebugInfo(config, agentType, taskDescription) {
    const debugInfo = {
      configAvailable: !!config,
      agentType,
      taskDescription,
      steps: []
    };
    
    if (!config) {
      return debugInfo;
    }
    
    // Step 1: Agent-specific chain
    if (agentType) {
      const agentModel = this.getModelForAgent(config, agentType);
      debugInfo.steps.push({
        step: 'agent-fallback-chain',
        agentType,
        result: agentModel,
        success: !!agentModel
      });
      if (agentModel) {
        debugInfo.selectedModel = agentModel;
        return debugInfo;
      }
    }
    
    // Step 2: Task category matching
    if (taskDescription) {
      const taskModel = this.getModelForTask(config, taskDescription);
      debugInfo.steps.push({
        step: 'task-category-matching',
        taskDescription,
        priorityCategories: this.priorityCategories,
        result: taskModel,
        success: !!taskModel
      });
      if (taskModel) {
        debugInfo.selectedModel = taskModel;
        return debugInfo;
      }
    }
    
    // Step 3: Default chain
    const defaultModel = this.getModelWithDefaultChain(config);
    debugInfo.steps.push({
      step: 'default-fallback-chain',
      result: defaultModel,
      success: !!defaultModel
    });
    if (defaultModel) {
      debugInfo.selectedModel = defaultModel;
      return debugInfo;
    }
    
    // Step 4: Final fallback
    const finalModel = this.getFinalFallbackModel(config);
    debugInfo.steps.push({
      step: 'final-fallback',
      result: finalModel,
      success: !!finalModel
    });
    debugInfo.selectedModel = finalModel;
    
    return debugInfo;
  }
}

module.exports = ModelRouter;