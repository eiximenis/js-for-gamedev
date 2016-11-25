'use strict';

class Item {
  constructor(name, effect) {
    this.name = name;
    this.effect = effect;
  }
}

class Weapon {
  constructor(name, damage, extraEffect = new Effect({}))
  {

  }
  // Haz que Weapon sea subtipo de Item. Recuerda usar el 'extends'
  // y super para llamar al constructor base
}


class Scroll extends Item {
  constructor(name, cost, effect) { 
    super(name, effect);
    this.cost = cost;
  }

  canBeUsed (mp) {
    // El pergamino puede usarse si los puntos de maná son superiores o iguales
    // al coste del hechizo.
  }
}

class Effect {
  construtor(variations)   {
    // Copia las propiedades que se encuentran en variations como propiedades de
    // este objeto.
  }
} 



module.exports = {
  Item,
  Weapon,
  Scroll,
  Effect
};
