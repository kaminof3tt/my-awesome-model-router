/**
 * My Skills Plugin for OpenCode - Entry Point
 * 
 * This is the entry point for the modular version of the plugin.
 * See src/ directory for the modular implementation.
 * 
 * @module my-awesome-model-router
 */

// Load the modular implementation
const plugin = require('./src/index');

// Re-export everything from the modular implementation
module.exports = plugin;