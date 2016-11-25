'use strict';

class CharactersView {
  constructor() {
    this._views = {};
  }

  all() {
    return Object.keys(this._views).reduce((copy, id) => {
      copy[id] = this._views[id];
      return copy;
    },{});    
  }

  allFrom() {
    return Object.keys(this._views).reduce((copy, id) => {
      if (this._views[id].party === party) {
        copy[id] = this._views[id];
      }
      return copy;
    }, {});    
  }

  get(id) {
    return this._views[id] || null;
  }

  set(characters) {
    this._views = Object.keys(characters).reduce((views, id)  => {
      views[id] = this._getViewFor(characters[id]);
      return views;
    }, {});    
  }

  _getViewFor(character) {
    var view = {};
    // Usa la lista de características visibles y Object.defineProperty() para
    // devolver un objeto de JavaScript con las características visibles pero
    // no modificables.
    Object.defineProperty(view, 'cada feature', {
      get: function () {
        // ¿Cómo sería este getter para reflejar la propiedad del personaje?
      },
      set: function (value) {
        // ¿Y este setter para ignorar cualquier acción?
      },
      enumerable: true
    });
    // Acuérdate de devolver el objeto.
    }
}

CharactersView.prototype._visibleFeatures = [
  'name',
  'party',
  'initiative',
  'defense',
  'hp',
  'mp',
  'maxHp',
  'maxMp'
];

module.exports = CharactersView;
