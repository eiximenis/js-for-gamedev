'use strict';
var dice = require('./dice');

class Character {
  
  constructor (name, features = {}) {
    this.name = name;
    // Extrae del parámetro features cada característica y alamacénala en
    // una propiedad.
    this._mp = features.mp || 0;
    this.maxMp = features.maxMp || this._mp;    
  }

  isDead()  {
    // Rellena el cuerpo de esta función
  }

  applyEffect(effect, isAlly) {
    // Implementa las reglas de aplicación de efecto para modificar las
    // características del personaje. Recuerda devolver true o false según
    // si el efecto se ha aplicado o no.
  }

  get mp() {
    return this._mp;
  }

  set mp(newValue)  {
    this._mp = Math.max(0, Math.min(newValue, this.maxMp)); 
  }

  get hp() {

  }

  set hp(newValue) {
    // Puedes usar la mísma ténica que antes para mantener el valor de hp en el
    // rango correcto.
  }

  // Puedes hacer algo similar a lo anterior para mantener la defensa entre 0 y
  // 100.
  
}

Character.prototype._immuneToEffect = ['name', 'weapon'];


module.exports = Character;
