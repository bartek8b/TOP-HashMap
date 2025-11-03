export class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.usedBuckets = 0;
    this.map = new Array(capacity);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.capacity;
  }

  extend(input) {
    this.capacity = this.capacity * 2;
    this.map = new Array(this.capacity);
    this.usedBuckets = 0;

    for (let bucket of input) {
      if (!bucket) continue;
      for (let slot of bucket) {
        this.set(slot[0], slot[1]);
      }
    }
    return this.map;
  }

  set(key, value) {
    const index = this.hash(key);

    // If there's no bucket / is undefined
    if (!this.map[index]) {
      this.map[index] = [[key, value]];
      this.usedBuckets++;
      if (this.usedBuckets >= this.capacity * this.loadFactor) {
        this.extend(this.map);
        console.log(`The map was extended to the capacity of ${this.capacity}`);
      }
      return [key, value];
    }

    // If there is bucket
    const bucket = this.map[index];
    for (let slot of bucket) {
      if (slot[0] === key) {
        slot[1] = value;
        return slot;
      }
    }

    // If there is no such key in the bucket
    bucket.push([key, value]);
    return [key, value];
  }

  clear() {
    this.map = new Array(this.capacity);
    this.usedBuckets = 0;
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.map[index];
    if (!bucket) return null;

    for (let slot of bucket) {
      if (slot[0] === key) return slot[1];
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.map[index];
    if (!bucket) return false;

    for (let slot of bucket) {
      if (slot[0] === key) return true;
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.map[index];
    if (!bucket) return false;

    for (let slot of bucket) {
      if (!slot) continue;
      if (slot[0] === key) {
        if (bucket.length === 1) {
          this.map[index] = undefined;
          this.usedBuckets--;
          return true;
        }
        slot[0] = bucket[bucket.length - 1][0];
        slot[1] = bucket[bucket.length - 1][1];
        bucket.pop();
        return true;
      }
    }
    return false;
  }

  length() {
    let mapLength = 0;

    for (let bucket of this.map) {
      if (!bucket) continue;
      mapLength += bucket.length;
    }

    return mapLength;
  }

  keys() {
    let mapKeys = [];

    for (let bucket of this.map) {
      if (!bucket) continue;
      for (let slot of bucket) {
        mapKeys.push(slot[0]);
      }
    }

    return mapKeys;
  }

  values() {
    let mapValues = [];

    for (let bucket of this.map) {
      if (!bucket) continue;
      for (let slot of bucket) {
        mapValues.push(slot[1]);
      }
    }

    return mapValues;
  }

  entries() {
    let mapEntries = [];
    for (let bucket of this.map) {
      if (!bucket) continue;
      for (let slot of bucket) {
        mapEntries.push([slot[0], slot[1]]);
      }
    }

    return mapEntries;
  }
}
