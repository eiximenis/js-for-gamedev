'use strict';

class TurnList {
  reset (charactersById) {
    this._charactersById = charactersById;

    this._turnIndex = -1;
    this.turnNumber = 0;
    this.activeCharacterId = null;
    this.list = this._sortByInitiative();
  }

  _sortByInitiative() {
    // Utiliza la función Array.sort(). ¡No te implementes tu propia
    // función de ordenación!
  }

  next() {
    // Haz que calcule el siguiente turno y devuelva el resultado
    // según la especificación. Recuerda que debe saltar los personajes
    // muertos.
  }


}

module.exports = TurnList;
