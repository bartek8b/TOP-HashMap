class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
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

  set(key, value) {
    const index = this.hash(key);
    // If the bucket is empty
    if (!this.map[index]) {
      this.map[index] = [[key, value]];
      return [key, value];
    }
    // If the bucket is not empty
    const bucket = this.map[index];
    for (let elem of bucket) {
      if (elem[0] === key) {
        elem[1] = value;
        return elem;
      }
    }
    // If there is no such key in the bucket
    bucket.push([key, value]);
  }
}

const test = new HashMap();

test.set('apple', 'red');
console.log(test);
