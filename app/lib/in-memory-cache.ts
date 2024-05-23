class InMemoryCache<T> {
  private cache;
  private maxEntries;
  private ttl;
  constructor(maxEntries: number, ttl: number) {
    this.cache = new Map();
    this.maxEntries = maxEntries;
    this.ttl = ttl; // in milliseconds
  }

  _isExpired(entry: any) {
    return Date.now() - entry.timestamp > this.ttl;
  }

  _evictIfNecessary() {
    if (this.cache.size > this.maxEntries) {
      // Evict the oldest entry (first entry in the Map)
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }

  set(key: string, value: T[]) {
    this._evictIfNecessary();
    this.cache.set(key, { value, timestamp: Date.now() });
  }

  get(key: string) {
    const entry = this.cache.get(key);
    if (entry) {
      if (this._isExpired(entry)) {
        this.cache.delete(key);
        return null;
      }
      return entry.value;
    }
    return null;
  }

  clear() {
    this.cache.clear();
  }
}

export { InMemoryCache };
