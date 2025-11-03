### The Odin Project > JavaScript Course > Project: HashMap

[Project requirements](https://www.theodinproject.com/lessons/javascript-hashmap)

---

#### Project description

A simple HashMap implementation in JavaScript with basic API (set, get, remove, clear, keys, values, entries, has, length) and automatic resizing.

#### How to run

1. Install dependencies:
    ```bash
    npm install
    ```
2. Run with Node.js:
    ```bash
    node main.js
    ```

#### Dependencies

- [nodemon](https://www.npmjs.com/package/nodemon) (for development, optional).

#### File structure

- `hashMap.js` — HashMap class implementation
- `main.js` — Demo/testing script
- `.gitignore` — Ignores `node_modules/`
- `package.json` and `package-lock.json` — npm configuration

#### Example usage

```js
import { HashMap } from './hashMap.js';

const map = new HashMap();
map.set('foo', 123);
console.log(map.get('foo')); // 123
```