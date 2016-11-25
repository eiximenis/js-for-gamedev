'use strict';

const EventEmitter = require('events').EventEmitter;
const CharactersView = require('./CharactersView');
const OptionsStack = require('./OptionsStack');
const TurnList = require('./TurnList');
const Effect = require('./items').Effect;

const utils = require('./utils');
const listToMap = utils.listToMap;
const mapValues = utils.mapValues;

class Battle extends EventEmitter {
  constructor() {
    super();
    this._grimoires = {};
    this._charactersById = {};
    this._turns = new TurnList();

    this.options = new OptionsStack();
    this.characters = new CharactersView();
  }

  get turnList() {
    return this._turns ? _this.turns.list : null;
  }

  setup (parties) {
    this._grimoires = this._extractGrimoiresByParty(parties);
    this._charactersById = this._extractCharactersById(parties);
    this._states = this._resetStates(this._charactersById);
    this._turns.reset(this._charactersById);

    this.characters.set(this._charactersById);
    this.options.clear();
  }

  start() {
    this._inProgressAction = null;
    this._stopped = false;
    this.emit('start', this._getCharIdsByParty());
    this._nextTurn();
  }

  stop() {
    this._stopped = true;
  }

  get _activeCharacter() {
    return this._charactersById[this._turns.activeCharacterId];
  }

  _extractGrimoiresByParty(parties) {
    var grimoires = {};
    var partyIds = Object.keys(parties);
    partyIds.forEach(function (partyId) {
      var partyGrimoire = parties[partyId].grimoire || [];
      grimoires[partyId] = listToMap(partyGrimoire, scroll => scroll.name);
    });
    return grimoires;
  }

  _extractCharactersById(parties) {
    var idCounters = {};
    var characters = [];
    var partyIds = Object.keys(parties);
    partyIds.forEach(function (partyId) {
      var members = parties[partyId].members;
      assignParty(members, partyId);
      characters = characters.concat(members);
    });
    return listToMap(characters, useUniqueName);

    function assignParty(characters, party) {
      // Cambia la party de todos los personajes a la pasada como parámetro.
    }

    function useUniqueName(character) {
      // Genera nombres únicos de acuerdo a las reglas
      // de generación de identificadores que encontrarás en
      // la descripción de la práctica o en la especificación.
    }
  }

  _resetStates(charactersById) {
    return Object.keys(charactersById).reduce(function (map, charId) {
      map[charId] = {};
      return map;
    }, {});
  }

  _getCharIdsByParty() {
    var charIdsByParty = {};
    var charactersById = this._charactersById;
    let keys =Object.keys(charactersById); 
    for (charId of keys)  {
      var party = charactersById[charId].party;
      if (!charIdsByParty[party]) {
        charIdsByParty[party] = [];
      }
      charIdsByParty[party].push(charId);
    };
    return charIdsByParty;
  }

  _nextTurn() {
    if (this._stopped) { return; }
    setTimeout( () => {
      var endOfBattle = this._checkEndOfBattle();
      if (endOfBattle) {
        this.emit('end', endOfBattle);
      } else {
        var turn = this._turns.next();
        this._showActions();
        this.emit('turn', turn);
      }
    }, 0);
  }

  _checkEndOfBattle() {
    var allCharacters = mapValues(this._charactersById);
    var aliveCharacters = allCharacters.filter(isAlive);
    var commonParty = getCommonParty(aliveCharacters);
    return commonParty ? { winner: commonParty } : null;

    function isAlive(character) {
      // Devuelve true si el personaje está vivo.
    }

    function getCommonParty(characters) {
      // Devuelve la party que todos los personajes tienen en común o null en caso
      // de que no haya común.
    }
  }

  _showActions() {
    this.options.current = {
      'attack': true,
      'defend': true,
      'cast': true
    };
    this.options.current.on('chose', this._onAction.bind(this));
  }

  _onAction(action) {
    this._action = {
      action,
      activeCharacterId: this._turns.activeCharacterId
    };
    // Debe llamar al método para la acción correspondiente:
    // defend -> _defend; attack -> _attack; cast -> _cast
  }

  _defend() {
    var activeCharacterId = this._action.activeCharacterId;
    var newDefense = this._improveDefense(activeCharacterId);
    this._action.targetId = this._action.activeCharacterId;
    this._action.newDefense = newDefense;
    this._executeAction();
  }

  _improveDefense (targetId) {
    var states = this._states[targetId];
    // Implementa la mejora de la defensa del personaje.    
  }

  _restoreDefense(targetId) {
    // Restaura la defensa del personaje a cómo estaba antes de mejorarla.
    // Puedes utilizar el atributo this._states[targetId] para llevar tracking
    // de las defensas originales.    
  }

  _attack() {
    this._showTargets(targetId => {
      // Implementa lo que pasa cuando se ha seleccionado el objetivo.
      this._executeAction();
      this._restoreDefense(targetId);
    });
  }

  _cast() {
    this._showScrolls((scrollId, scroll) => {
      // Implementa lo que pasa cuando se ha seleccionado el hechizo.
    });
  }

  _executeAction() {
    var action = this._action;
    var effect = this._action.effect || new Effect({});
    var activeCharacter = this._charactersById[action.activeCharacterId];
    var targetCharacter = this._charactersById[action.targetId];
    var areAllies = activeCharacter.party === targetCharacter.party;

    var wasSuccessful = targetCharacter.applyEffect(effect, areAllies);
    this._action.success = wasSuccessful;

    this._informAction();
    this._nextTurn();
  }

  _informAction() {
    this.emit('info', this._action);
  }

  _showTargets(onSelection) {
    // Toma ejemplo de la función ._showActions() para mostrar los identificadores
    // de los objetivos.
    this.options.current.on('chose', onSelection);
  }

  _showScrolls(onSelection) {
    // Toma ejemplo de la función anterior para mostrar los hechizos. Estudia
    // bien qué parámetros se envían a los listener del evento chose.
    this.options.current.on('chose', onSelection);
  }

}

module.exports = Battle;
