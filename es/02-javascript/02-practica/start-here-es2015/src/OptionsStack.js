'use strict';
const Options = require('./Options');

class OptionsStack {
  constructor() {
    this._stack = [];
  }

  get current() {
    return this._stack[this._stack.length - 1];
  }

  set current(v) {
    if (!(v instanceof Options)) {
      v = new Options(v);
    }
    return this._stack.push(v);
  }

  select(id) {
    // Redirige el comando al último de la pila.
  }

  list() {
    // Redirige el comando al último de la pila.
  }

  get(id) {
    return this.current.get(id);
  }

  cancel() {
    this._stack.pop();
  }

  clear() {
    this._stack = [];
  }
}

module.exports = OptionsStack;
