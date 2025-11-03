class HashMap {
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
      for (let item of bucket) {
        this.set(item[0], item[1]);
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
    for (let elem of bucket) {
      if (elem[0] === key) {
        elem[1] = value;
        return elem;
      }
    }

    // If there is no such key in the bucket
    bucket.push([key, value]);
    return [key, value];
  }
}

const test = new HashMap();

test.set('apple', 'red');
console.log(test);
