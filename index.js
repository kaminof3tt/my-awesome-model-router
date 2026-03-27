/**
 * My Skills Plugin for OpenCode
 * 
 * This plugin provides role-based model selection for different development tasks.
 * It includes skills for frontend, backend, architecture, testing, and QA roles.
 * 
 * @module my-skills-plugin
 */

// Plugin metadata
const pluginInfo = {
  name: 'my-skills-plugin',
  version: '1.0.0',
  description: 'Custom skills plugin with role-based model selection',
  author: 'Your Name'
};

// Export plugin information
module.exports = {
  pluginInfo,
  
  // Plugin initialization
  init: (opencode) => {
    console.log('My Skills Plugin initialized');
    return {
      name: pluginInfo.name,
      version: pluginInfo.version
    };
  },
  
  // Get available skills
  getSkills: () => {
    return [
      'frontend-developer',
      'architect',
      'backend-developer',
      'tester',
      'qa-engineer'
    ];
  },
  
  // Get model configuration
  getModelConfig: () => {
    try {
      const config = require('./my-skills-config.json');
      return config;
    } catch (error) {
      console.error('Error loading model config:', error);
      return null;
    }
  }
};