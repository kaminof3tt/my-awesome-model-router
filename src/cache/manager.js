/**
 * Cache manager module for my-awesome-model-router
 * Provides centralized cache management and statistics
 */

/**
 * Cache entry class
 */
class CacheEntry {
  constructor(value, ttl = 0) {
    this.value = value;
    this.timestamp = Date.now();
    this.ttl = ttl; // 0 means no TTL
  }
  
  /**
   * Check if cache entry is expired
   * @returns {boolean} True if expired
   */
  isExpired() {
    if (this.ttl <= 0) {
      return false; // No TTL, never expires
    }
    return (Date.now() - this.timestamp) > this.ttl;
  }
  
  /**
   * Get remaining TTL in milliseconds
   * @returns {number} Remaining TTL, 0 if expired, -1 if no TTL
   */
  getRemainingTTL() {
    if (this.ttl <= 0) {
      return -1; // No TTL
    }
    const remaining = (this.timestamp + this.ttl) - Date.now();
    return remaining > 0 ? remaining : 0;
  }
}

/**
 * Cache manager class
 */
class CacheManager {
  constructor() {
    this.caches = new Map();
    this.stats = {
      hits: 0,
      misses: 0,
      evictions: 0,
      totalSize: 0
    };
  }
  
  /**
   * Set cache value
   * @param {string} cacheName - Cache name
   * @param {string} key - Cache key
   * @param {any} value - Value to cache
   * @param {number} ttl - Time to live in milliseconds (0 for no TTL)
   */
  set(cacheName, key, value, ttl = 0) {
    if (!this.caches.has(cacheName)) {
      this.caches.set(cacheName, new Map());
    }
    
    const cache = this.caches.get(cacheName);
    const oldEntry = cache.get(key);
    
    if (oldEntry) {
      this.stats.totalSize -= this.getSize(oldEntry.value);
    }
    
    cache.set(key, new CacheEntry(value, ttl));
    this.stats.totalSize += this.getSize(value);
  }
  
  /**
   * Get cache value
   * @param {string} cacheName - Cache name
   * @param {string} key - Cache key
   * @returns {any} Cached value or undefined if not found or expired
   */
  get(cacheName, key) {
    if (!this.caches.has(cacheName)) {
      this.stats.misses++;
      return undefined;
    }
    
    const cache = this.caches.get(cacheName);
    const entry = cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      return undefined;
    }
    
    if (entry.isExpired()) {
      cache.delete(key);
      this.stats.evictions++;
      this.stats.totalSize -= this.getSize(entry.value);
      this.stats.misses++;
      return undefined;
    }
    
    this.stats.hits++;
    return entry.value;
  }
  
  /**
   * Check if cache has key
   * @param {string} cacheName - Cache name
   * @param {string} key - Cache key
   * @returns {boolean} True if key exists and is not expired
   */
  has(cacheName, key) {
    if (!this.caches.has(cacheName)) {
      return false;
    }
    
    const cache = this.caches.get(cacheName);
    const entry = cache.get(key);
    
    if (!entry) {
      return false;
    }
    
    if (entry.isExpired()) {
      cache.delete(key);
      this.stats.evictions++;
      this.stats.totalSize -= this.getSize(entry.value);
      return false;
    }
    
    return true;
  }
  
  /**
   * Delete cache entry
   * @param {string} cacheName - Cache name
   * @param {string} key - Cache key
   * @returns {boolean} True if entry was deleted
   */
  delete(cacheName, key) {
    if (!this.caches.has(cacheName)) {
      return false;
    }
    
    const cache = this.caches.get(cacheName);
    const entry = cache.get(key);
    
    if (entry) {
      cache.delete(key);
      this.stats.totalSize -= this.getSize(entry.value);
      return true;
    }
    
    return false;
  }
  
  /**
   * Clear entire cache or specific cache
   * @param {string} cacheName - Cache name (optional)
   */
  clear(cacheName = null) {
    if (cacheName) {
      const cache = this.caches.get(cacheName);
      if (cache) {
        let sizeCleared = 0;
        for (const entry of cache.values()) {
          sizeCleared += this.getSize(entry.value);
        }
        cache.clear();
        this.stats.totalSize -= sizeCleared;
      }
    } else {
      this.caches.clear();
      this.stats.totalSize = 0;
    }
  }
  
  /**
   * Cleanup expired entries
   * @returns {number} Number of entries cleaned up
   */
  cleanup() {
    let cleaned = 0;
    
    for (const [cacheName, cache] of this.caches) {
      const entriesToDelete = [];
      
      for (const [key, entry] of cache) {
        if (entry.isExpired()) {
          entriesToDelete.push({ key, entry });
        }
      }
      
      for (const { key, entry } of entriesToDelete) {
        cache.delete(key);
        this.stats.totalSize -= this.getSize(entry.value);
        this.stats.evictions++;
        cleaned++;
      }
    }
    
    return cleaned;
  }
  
  /**
   * Get cache statistics
   * @param {string} cacheName - Cache name (optional)
   * @returns {object} Cache statistics
   */
  getStats(cacheName = null) {
    const stats = { ...this.stats };
    
    if (cacheName) {
      const cache = this.caches.get(cacheName);
      if (cache) {
        stats.cacheSize = cache.size;
        stats.cacheEntries = Array.from(cache.entries()).map(([key, entry]) => ({
          key,
          age: Date.now() - entry.timestamp,
          ttl: entry.ttl,
          remainingTTL: entry.getRemainingTTL(),
          expired: entry.isExpired()
        }));
      }
    } else {
      stats.caches = {};
      for (const [name, cache] of this.caches) {
        stats.caches[name] = {
          size: cache.size,
          entries: Array.from(cache.keys())
        };
      }
    }
    
    stats.hitRate = stats.hits + stats.misses > 0 
      ? stats.hits / (stats.hits + stats.misses) 
      : 0;
    
    return stats;
  }
  
  /**
   * Get size of value in bytes (approximate)
   * @param {any} value - Value to measure
   * @returns {number} Approximate size in bytes
   */
  getSize(value) {
    if (value === null || value === undefined) {
      return 0;
    }
    
    if (typeof value === 'string') {
      return Buffer.byteLength(value, 'utf8');
    }
    
    if (typeof value === 'number' || typeof value === 'boolean') {
      return 8;
    }
    
    if (Array.isArray(value)) {
      return value.reduce((sum, item) => sum + this.getSize(item), 0);
    }
    
    if (typeof value === 'object') {
      return JSON.stringify(value).length;
    }
    
    return 0;
  }
  
  /**
   * Register a cache with default TTL
   * @param {string} cacheName - Cache name
   * @param {number} defaultTTL - Default TTL in milliseconds
   */
  registerCache(cacheName, defaultTTL = 0) {
    if (!this.caches.has(cacheName)) {
      this.caches.set(cacheName, new Map());
    }
  }
  
  /**
   * Get all cache names
   * @returns {string[]} Array of cache names
   */
  getCacheNames() {
    return Array.from(this.caches.keys());
  }
}

module.exports = CacheManager;