# Ejercicios guiados

Prueba estos ejemplos y trata de responder a las preguntas. Si te atascas con
lo que hace una función, busca en Internet la función acompañada de "mdn".

**1. Valores booleanos en JavaScript.**

En JavaScript cualquier valor puede considerarse verdadero o falso según el
contexto. Por ejemplo, el `0` es considerado `false` y cualquier número distinto
de `0` es `true`:

```js
let v = 0; // después de esta prueba, cambia el valor de v por otro número.
!!v; // la doble negación al comienzo lo convierte en booleano.
```

Descubre qué valores son ciertos y cuales falsos para todos los tipos: números,
cadenas, objetos, funciones y undefined.

**2. Expresiones booleanas en JavaScript.**

En JavaScript, las expresiones booleanas son _vagas_, esto significa que en
cuanto el intérprete de JavaScript sabe lo que va a valer la expresión,
dejamos de evaluar. Por ejemplo, ¿qué crees que le pasará a la siguiente
expressión?

```js
let hero = { name: 'Link', weapon: null };
console.log('Hero weapon power is:', hero.weapon.power);
```

Pero, ¿y ahora?

```js
let hero = { name: 'Link', weapon: null };
if (hero.weapon && hero.weapon.power) {
  console.log('Hero weapon power is:', hero.weapon.power);
} else {
  console.log('The hero has no weapon.');
}
```

En caso de expresiones `&&` (_and_ o _y_), la evaluación termina tan pronto como
encontramos un término falso.

En caso de expresiones `||` (_or_ u _o_), la evaluación termina tan pronto como
encontramos un término verdadero.

**3. El resultado de las expresiones booleanas.**

Contra el sentido común, el resultado de una expresión booleana no es un
booleano sino el último término evaluado. Recuerda que la evaluación es _vaga_
y JavaScript deja de evaluar tan pronto como puede determinar el resultado de la
expresión. Con esto en cuenta, trata de predecir el resultado de las siguientes
expresiones:

```js
let v;
function noop() { return; };

1 && true && { name: 'Link' };
[] && null && "Spam!";
null || v || noop || true;
null || v || void "Eggs!" || 0;
```

**4. Parámetros por defecto.**

Puedes ver una aplicación real de lo anterior en esta función para rellenar
números. En JavaScript no hay parámetros por defecto, pero los parámetros
omitidos tienen el valor especial `undefined` que es falso.

```js
function pad(target, targetLength, fill) {
  let result = target.toString();
  let targetLength = targetLength || result.length + 1;
  let fill = fill || '0';
  while (result.length < targetLength) {
    result = fill + result;
  }
  return result;
}

// intenta predecir el resultado de las siguientes llamadas
pad(3);
pad(2, 5);
pad(2, 5, '*');
```

**Nota**: EcmaScript soporta ya parámetros por defecto por lo que no
es necesario aplicar esa técnica (aunque, por supuesto, sigue funcionando):

```js
function pad(target, targetLength = target.toString().length + 1, fill = '0') {
  let result = target.toString();
  while (result.length < targetLength) {
    result = fill + result;
  }
  return result;
}
```

**5. Buenas prácticas en el diseño de APIs.**

Se ha dicho muchas veces que el estado no se debería exponer pero siempre
se acaba enseñando este tipo de modelado para los puntos:

```js
var p = { x: 5, y: 5 };

function scale(point, factor) {
  point.x = point.x * factor;
  point.y = point.y * factor;
  return p;
}

scale(p, 10);
```

La implementación correcta sería:

```js
let p = {
  _x: 5,
  _y: 5,
  getX: function () {
    return this._x;
  },
  getY: function () {
    return this._y;
  },
  setX: function (v) {
    this._x = v;
  },
  setY: function (v) {
    this._y = v;
  }
};

function scale(point, factor) {
  point.setX(point.getX() * factor);
  point.setY(point.getY() * factor);
  return p;
}

scale(p, 10);
```

Pero reconócelo, escribir tanto es un rollo soberano.

**Nota:** La solución propuesta arriba, **no esconde el estado privado** esconderlo implica usar clausuras. Además
la sintaxis reducida de EcmaScript 2015 para definir funciones hace el código más sencillo:

```js
let p = (function() {
  let _x = 5;
  let _y = 5;

  return {
    getX() {return _x;},
    setX(v) { _x = v;},
    getY() { return _y;},
    setY(v) {_y = v;},
  }
})();
```

En este caso `p._x` y `p._y` no son accesibles.

**6. Propiedades computadas al rescate.**

JavaScript permite definir un tipo especial de propiedades llamadas normalmente
_propiedades computadas_ de esta guisa:

```js
var p = {
  _x: 5,
  _y: 5,
  get x() {
    return this._x;
  },
  get y() {
    return this._y;
  },
  set x(v) {
    this._x = v;
  },
  set y(v) {
    this._y = v;
  }
};

function scale(point, factor) {
  point.x = point.x * factor;
  point.y = point.y * factor;
  return p;
}

scale(p, 10);
```

Escribirlo sigue siendo un muermo (menos mal que has estudiado como hacer
factorías de objetos) pero utilizarlo es mucho más claro. Así, si ahora decides
que sería mejor exponer el nombre de los ejes en mayúscula, puedes hacer:

```js
var p = {
  _x: 5,
  _y: 5,
  get X() {
    return this._x;
  },
  get Y() {
    return this._y;
  },
  set X(v) {
    this._x = v;
  },
  set Y(v) {
    this._y = v;
  }
};

function scale(point, factor) {
  point.X = point.X * factor;
  point.Y = point.Y * factor;
  return p;
}

scale(p, 10);
```

**Nota:** Por supuesto podríamos usar clausuras para, de nuevo, ocultar el estado privado (las propiedades
que empiezan por '_'):

```js
let p = (function() {
  let _x = 5;
  let _y = 5;

  return {
    get X() {return _x},
    get Y() {return _y},
    set X(v) { _x = v},
    set Y(v) {_y = v}
  }
})();
```

¿Se te ocurre la manera de hacer que una propiedad pueda ser de sólo lectura? Es
decir, que su valor no pueda cambiarse (asumiendo que el usuario no accederá a
las propiedades que comiencen por '_').

Si quisieras añadir una propiedad a un objeto ya existente tendrías que utilizar
[Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty):

```js
let point = {};
Object.defineProperty(point, '_x', { value: 5, writable: true });
Object.defineProperty(point, '_y', { value: 5, writable: true });
Object.defineProperty(point, 'x', {
  get  () {
    return this._x;
  },
  set (v) {
    this._x = v;
  }
});
Object.defineProperty(point, 'y', {
  get () {
    return this._y;
  },
  set (v) {
    this._y = v;
  }
});
point; // no se observan propiedades...
point.x; // ...pero aquí están.
point.y;
```

¿Te atreves a decir por qué cuando inspeccionamos el objeto no aparecen sus
propiedades? ¿Cómo podrías arreglarlo? ¿Cómo harías para que sólo se vieran
las propiedades que son parte de la API?

No te lances a usar `Object.defineProperty()` si no tienes **muy claro** qué
significan los términos **configurable**, **enumerable** y **writable**.

**7. Usando funciones como si fueran métodos.**

Hemos visto que cualquier función puede usarse como un método si se referencia
como una propiedad de un objeto y entonces se llama. Pero lo cierto es que
también puedes hacer que una función cualquiera, sin estar referenciada desde
una propiedad, pueda ser usada como el método de un objeto si indicamos
explícitamente cual es el objeto destinatario. Esto puede hacerse con
[`.apply()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
y con
[`.call()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).

```js
var ship = { name: 'Death Star' };

function fire(shot) {
  console.log(this.name + ' is firing: ' + shot.toUpperCase() + '!!!');
}

ship.fire; // ¿qué crees que será esto?
fire.apply(ship, ['pichium']);
fire.call(ship, 'pañum');
```

¿Cuál es la diferencia entre `.apply()` y `.call()`?

**8. Propiedades dinámicas.**

La notación corchete para acceder a las propiedades de un objeto es
especialmente útil para acceder a propiedades de manera genérica. Por ejemplo,
imagina el siguiente código:

```js
let hero = {
  name: 'Link',
  hp: 10,
  stamina: 10,
  weapon: { name: 'sword', effect: { hp: -2 } }
};
let enemy = {
  name: 'Ganondorf',
  hp: 20,
  stamina: 5,
  weapon: { name: 'wand', effect: { hp: -1, stamina: -5 } }
};

function attack(character, target) {
  if (character.stamina > 0) {
    console.log(character.name + ' uses ' + character.weapon.name + '!');
    applyEffect(character.weapon.effect, target);
    character.stamina--;
  } else {
    console.log(character.name + ' is too tired to attack!');
  }
}

function applyEffect(effect, target) {
  // Obtiene los nombres de las propiedades del objeto. Búscalo en la MDN.
  let propertyNames = Object.keys(effect);
  for (var i = 0; i < propertyNames.length; i++) {
    var name = propertyNames[i];
    target[name] += effect[name];
  }
}

attack(hero, enemy);
attack(enemy, hero);
attack(hero, enemy);
attack(enemy, hero);
attack(hero, enemy);
```

¿Podrías modificar el efecto del arma del héroe para incapacitar al enemigo pero
no matarlo ni dañarlo? Intenta hacerlo sin reescribir el ejemplo entero, es
decir, continuando desde el término del ejemplo.

**Nota:** El ejemplo anterior se podría reescribir usando el bucle  `for..of`:

```js
function applyEffect(effect, target) {
  // Obtiene los nombres de las propiedades del objeto. Búscalo en la MDN.
  let propertyNames = Object.keys(effect);
  for (let name of propertyNames) {
    target[name] += effect[name];
  }
}
```

**9. Objetos como algo más que objetos.**

Los objetos de JavaScript no solo sirven para modelar los objetos de la
programación orientada a objetos sino que permiten realizar clasificaciones por
nombre. Un histograma, es decir un conteo de un conjunto con repeticiones, es
un ejemplo clásico de la utilidad de un objeto JavaScript:

```js
function wordHistogram(text) {
  let wordList = text.split(' ');
  let histogram = {};
  for (let word of wordList) {
   if (!histogram.hasOwnProperty(word)) {
      histogram[word] = 0;
    }
    histogram[word]++;
  }
  return histogram;
}
```

Prueba a usar la función por ti mismo.

Lo que JavaScript llama objetos se conoce en otros lenguajes de programación
como mapas o diccionarios y a los nombres de las propiedades se los llama
_claves_.

¿Puedes pensar en al menos una aplicacion más?

**Nota:** EcmaScript 2015 tiene el objeto `Map` pensado para ser usado en estos casos.
La ventaja de `Map` respecto un objeto tradicional es que en un objeto tradicional
las claves deben ser cadenas (los nombres de las propiedades). Usando un objeto `Map` las
claves pueden ser de cualquier tipo (incluído claves que sean objetos).

**10. Funciones como parámetros.**

Las listas de JavaScript tiene algunos métodos que aceptan funciones como
parámetros, por ejemplo
[`.forEach()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/forEach).
De hecho es común encontrar `.forEach()` cuando se tiene la certeza de que se
van a recorrer **todos** los elementos de una lista.

```js
function wordHistogram(text) {
  let wordList = text.split(' ');
  let histogram = {};
  wordList.forEach(function (word) {
    if (!histogram.hasOwnProperty(word)) {
      histogram[word] = 0;
    }
    histogram[word]++;
  });
  return histogram;
}

let poem = 'Todo pasa y todo queda, ' +
           'pero lo nuestro es pasar, ' +
           'pasar haciendo caminos, ' +
           'caminos sobre la mar';

wordHistogram(poem);
```

**Nota:** Usar `.forEach()` está bien... pero no te engañes: ¡un bucle `for..of` es mejor!

El resultado no es correcto porque al separar las palabras por los espacios
estás dejando caracteres que no forman palabras como parte de ellas. Puedes
arreglarlo si en vez de partir el texto por los espacios usas una
[expresión regular](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
para partir el texto por los límites de las palabras:

```js
function wordHistogram(text) {
  let wordList = text.split(/\b/); // Eso entre / / es una expresión regular.
  let histogram = {};
  wordList.forEach(function (word) {
    if (!histogram.hasOwnProperty(word)) {
      histogram[word] = 0;
    }
    histogram[word]++;
  });
  return histogram;
}

let poem = 'Todo pasa y todo queda, ' +
           'pero lo nuestro es pasar, ' +
           'pasar haciendo caminos, ' +
           'caminos sobre la mar';

wordHistogram(poem);
```

Pero ahora tendrás cosas que no son palabras (como espacios y comas). Puedes
filtrar una lista con
[`.filter()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/filter):

```js
const isEven = (n) =>  n % 2 === 0;
[1, 2, 3, 4, 5, 6].filter(isEven);
```

Y así quitar lo que no sean palabras:

```js
const isWord = (candidate) => return /\w+/.test(candidate);

function wordHistogram(text) {
  let wordList = text.split(/\b/);
  wordList = wordList.filter(isWord);
  let histogram = {};

  for (let word of wordList) {
    if (!histogram.hasOwnProperty(word)) {
      histogram[word] = 0;
    }
    histogram[word]++;
  }
  return histogram;
}

let poem = 'Todo pasa y todo queda, ' +
           'pero lo nuestro es pasar, ' +
           'pasar haciendo caminos, ' +
           'caminos sobre la mar';

wordHistogram(poem);
```

También deberías normalizar las palabras (pasarlas a minúsculas por ejemplo)
para no encontrarnos con entradas distintas en el histograma para la misma
palabra. Para transformar una lista en otra lista con el mismo número de
elementos usamos
[`.map()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/map).

```js
function isWord(candidate) {
  return /\w+/.test(candidate);
}

function toLowerCase(word) {
  return word.toLowerCase();
}

function wordHistogram(text) {
  var wordList = text.split(/\b/);
  wordList = wordList.filter(isWord);
  wordList = wordList.map(toLowerCase);
  var histogram = {};

  wordList.forEach(function (word) {
    if (!histogram.hasOwnProperty(word)) {
      histogram[word] = 0;
    }
    histogram[word]++;
  });
  return histogram;
}

var poem = 'Todo pasa y todo queda, ' +
           'pero lo nuestro es pasar, ' +
           'pasar haciendo caminos, ' +
           'caminos sobre la mar';

wordHistogram(poem);
```

Una última función te permite transformar una lista en un sólo valor. Esto es
precisamente el histograma, una clasificación de todos los valores de la lista.
Esta transformación se consigue mediante
[`.reduce()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/reduce):

```js
function isWord(candidate) {
  return /\w+/.test(candidate);
}

function toLowerCase(word) {
  return word.toLowerCase();
}

function buildHistogram(inProgressHistogram, word) {
  if (!inProgressHistogram.hasOwnProperty(word)) {
    inProgressHistogram[word] = 0;
  }
  inProgressHistogram[word]++;
  return inProgressHistogram;
}

function wordHistogram(text) {
  var emptyHistogram = {};
  return text.split(/\b/)
             .filter(isWord)
             .map(toLowerCase)
             .reduce(buildHistogram, emptyHistogram);
}

var poem = 'Todo pasa y todo queda, ' +
           'pero lo nuestro es pasar, ' +
           'pasar haciendo caminos, ' +
           'caminos sobre la mar';

wordHistogram(poem);
```

**11. Número variables de parámetros**

Fíjate en esto:

```js
console.log('I\'m', 'Ziltoid');
console.log('I\'m', 'Ziltoid,', 'the', 'Omniscient');
Math.max(1);
Math.max(1, 2);
Math.max(1, 2, 3);
```

Como puedes ver, la función acepta un número cualquiera de variables. Podemos
hacer lo mismo gracias a la variable implícita `arguments`.

```
function f() {
  console.log('Número de argumentos pasados:', arguments.length);
  console.log('Argumentos:', arguments);
}
f();
f(1);
f('a', {});
f(function () {}, [], undefined);
```

Busca la información sobre `arguments` en la
[MDN](http://lmgtfy.com/?q=mdn+arguments). ¡Te hará falta!

**Nota:** Cualquier sección que hable de "número variable de argumentos" en el contexto de
EcmaScript 2015 debe forzosamente hablar **de los parámetros rest**. Podemos declarar una
función que acepte uno o más parámetros tradicionales y un "parámetro rest" que contiene un array
"con el resto de parámetros":

```js
const add = function(a, b, ...r) {
  let value = a+b;
  foreach (let v of r) {value = value + r}
  return value;
}
```

La función `value` suma los dos primeros parámetros y luego si hay más los suma también.
El parámetro `r` es el "parámetro rest" (nota los tres puntos delante) y contiene un array con
todos los parámetros a partir del tercero.

```js
add(1,2); // a=1, b=2, r=[]
add(1);   // a=1, b=undefined, r=[]
add(1,2,3);   // a=1, b=2, r=[3]
add(1,2,3,4,5,6);   // a=1, b=2, r=[3,4,5,6]
```

El uso de parámetros rest en lugar de arguments tiene varias ventajas: el parámetro rest contiene
solo los argumentos "adicionales" (en lugar de todos) permitiendo una mayor claridad de código
y además el valor es un "array de verdad" no un objeto como `arguments`.

**12. Decoradores**

Aparte de devolverse como parámetros, las funciones pueden ser devueltas desde
otras functiones. Considera el siguiente ejemplo:

```js
function newLog(label) {
  return function(value) {
    console.log(label + ':', value);
  }
}
```

Esta función crea funciones que llamarán a `console.log()` pero con una
etiqueta delante. Podríamos crear métodos `log` por clase, cada uno con
un prefijo y así distinguir unos logs de otros.

Sin embargo, advierte el siguiente comportamiento:

```js
var log1 = newLog('Default');
var log2 = newLog('Ziltoid');

var p = { x: 1, y: 10 };
log1(p);
log2(p);
log1('Greetings', 'humans!');
```

¿Cual es el problema? ¿Por qué no funciona el último ejemplo?

Para hacer que funcione, tendrías que llamar a `console.log()` con un número
de parámetros que no sabemos a priori. Puedes usar `arguments`, no obstante:

```js
function newLog(label) {
  return function() {
    // ¿Por qué tenemos que hacer esto?
    var args = Array.prototype.slice.call(arguments);
    args.splice(0, 0, label + ':');
    console.log.apply(console, args);
  }
}

var log1 = newLog('Default');
var log2 = newLog('Ziltoid');

var p = { x: 1, y: 10 };
log1(p);
log2(p);
log1('Greetings', 'humans!');
```

¿Podrías decir qué hace cada línea en la función `newLog`?

**Nota:** Observa que usando parámetros rest el código se simplifica. ¡EcmaScript 2015 está
para ayudarte!

```js
function newLog(label) {
  return function(...args) {
    args.splice(0, 0, label + ':');
    console.log.apply(console, args);
  }
}
```

**¡Y aún hay más!** Hay una característica potentísima de EcmaScript 2015 que nos va a permitir
evitar ese `apply`. Este `apply` es necesario porque `args` es un array. Pero observa que si pudiesemos convertir
los N valores del array a N parámetros podríamos llamar a la función `console.log` directamente.

Pues precisamente EcmaScript 2015 tiene un operador que hace esto: el _operador spread_:

```js
function newLog(label) {
  return function(...args) {
    args.splice(0, 0, label + ':');
    console.log (...args);
  }
}
```

Vale, no te pierdas con tantos `...`. El primer uso es un parámetro rest. Ya hemos visto que eso
hace que `args` sea un array con el resto de parámetros de la función. Obviamente si una función
solo tiene un parámetro rest, entonces este parámetro será un array con todos los parámetros pasados
a la función.

Ahora vayamos al `console.log`. En este caso `...args` no es un parámetro rest, ya que no estamos definiendo
una función. En este caso se trata de aplicar el _operador spread_ al array `args`. El _operador spread_ es una
de las características más potentes de EcmaScript 2015 y lo que hace es que una expresión (en este caso un array)
sea extendida en aquellas situaciones donde se esperan múltiples argumentos. Esa explicación es un poco teórica,
pero aplicada a nuestro caso significa que el array `args` se convierte a una lista de argumentos. ¡Parece
magia negra!

De hecho todas esas llamadas a `console.log` son equivalentes. Pero no negarás que (obviando la que tiene
los parámetros fijados que está solo para referencia), la que usa el _operador spread_ es la más elegante de todas. No
es necesario usar `apply` (el uso de `call` no tiene sentido en este contexto, pero se muestra por completitud).

```js
const a= ['a','b','c'];
console.log('a', 'b', 'c');
console.log(...a);
console.log.apply(console, a);
console.log.call(console, ...a);
```

**13. Asincronía y closures**

Carga el siguiente código:

```js
function scheduleTasks(count) {
  for(var i = 1; i <= count; i++) {
    setTimeout(function () {
      console.log('Executing task', i);
    }, i * 1000);
  }
}
```

Y trata de predecir qué pasará al ejecutar el siguiente código:

```js
scheduleTasks(5);
```

¿Hace lo que esperabas? Si no es así, ¿por qué? ¿cómo lo arreglarías? Pista:
necesitas la función [`.bind()`](
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind).

**Nota:** ECMAScript 2015 te permite obtener mismo comportamiento que usando `bind` pero sin necesidad de usarla. En efecto
el uso de `let` modifica el como una variable es capturada por una clausura. Cambia el `var` por `let` y observa los cambios.

**14. Eventos y métodos**

Habrá veces en las que tendrás que llamar a un método de un objeto cuando ocurra
algo. Por ejemplo, supón que el método avanzar de un supuesto objeto debe
llamarse en un intervalo de tiempo. Pongamos cada segundo:

```js
var obj = {
  x: 10,
  y: 2,
  advance () {
    this.y += 2;
    console.log('Ahora Y vale', this.y);
  }
};

var id = setInterval(obj.advance, 1 * 1000);
```

Este ejemplo falla porque en la última línea **no estamos llamando** a la
función sino sólo pasándola como parámetro. La función `setInterval` no
tiene idea del destinatario del mensaje y por tando no puede llamar a la función
como si fuera un método.

Podemos arreglarlo con `bind` pero antes para el intervalo con:

```js
clearInterval(id);
```

Puedes solucionar el problema con:

```js
var id = setInterval(obj.advance.bind(obj), 1 * 1000);
```

**15. La función bind()**

A estas alturas ya deberías saber cómo funciona `bind` o qué hace. Si aun no
lo tienes claro, búscalo en la MDN.

La tarea es la siguiente: crea una función `bind` que simule el comportamiento
del método de las funciones `.bind()`. Como se pide una función y no un método,
el primer parámetro será la función. Así pues, en vez de usarse así:

```js
function die(sides) {
  var result = Math.floor(Math.random() * sides) + 1;
  this.history.push(result);
  return result;
}
var obj = { history: [] };
var d20 = die.bind(obj, 20);
d20();
```

La usarás de esta otra forma:

```js
function die(sides) {
  var result = Math.floor(Math.random() * sides) + 1;
  this.history.push(result);
  return result;
}
var obj = { history: [] };
var d20 = bind(die, obj, 20); // fíjate en que ahora die es el primer parámetro
d20();
```

Ahora que ya entiendes `bind` entenderás mejor como funciona la preservación del valor de `this` a través
del operador flecha.

Básicamente puedes asumir que:

```js
(x,y) => x+y
```

Es equivalente a:

```js
function (x,y) { return x+y}.bind(this);
```
