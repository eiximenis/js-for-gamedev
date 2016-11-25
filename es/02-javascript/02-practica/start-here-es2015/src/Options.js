'use strict';

var EventEmitter = require('events').EventEmitter;

class Options  extends EventEmitter {
  constructor(group) {
    super();
    this._group = typeof group === 'object' ? group : {};
  }

  list() {
    return Object.keys(this._group);  
  }

  get(id) {
    return this._group[id];
  }

  select(id) {
    // Haz que se emita un evento cuando seleccionamos una opción.
  }
}


module.exports = Options;
