# El modelo de ejecución de JavaScript

JavaScript se caracteriza por presentar un **modelo de ejecución asíncrono**, donde
los resultados no se encuentran disposibles inmediatamente, sino que lo
estarán en un futuro.

## Ámbito y _hoisting_

**Nota:** Hay sustanciales cambios en EcmaScript 2015 en este punto. En concreto el uso
de `var` no tiene mucho sentido debiéndose usar `let` o `const` en su lugar. En esta
versión **no se usa var en ningún momento** y todas las explicaciones referentes a
ámbito y _hoisting_ aplican a let y a const. 

Como en muchos lenguajes, los nombres de las variables pueden reutilizarse y
guardar valores distintos, siempre y cuando se encuentren en **ámbitos
distintos**.

El ámbito o _scope_ de una variable es la porción de código donde puede ser
utilizada. Variables con el mismo nombre en ámbitos distintos son variables
distintas.

El ámbito en JavaScript es el **bloque donde se declara**, delimitado entre el
par de llaves `{` y `}`. El cuerpo de una función es un bloque por si mismo.

```js
function introduction() {
    // Esta es la variable text.
    let text = 'I\'m Ziltoid, the Omniscient.';
    greetings();
    console.log(text);
}

function greetings(list) {
    // Y esta es otra variable text DISTINTA.
    let text = 'Greetings humans!';
    console.log(text);
}

introduction();
```

En cualquier momento podemos crear un bloque usando un par de llaves:

```js
function greetings() {
    let text =' I\'m Ziltoid, the Omniscient.';
    {
        let text='Greetings humans";
        console.log(text);
    }
    console.log(text);
}
```

**Nota:** Ten presente que las llaves de un `if`, `else`, `while` o `for` crean un ámbito nuevo,
con lo que p. ej. las variables declaradas dentro de un if, no son visibles fuera de él.

En JavaScript, las funciones pueden definirse dentro de otras funciones y, de
esta forma, anidar ámbitos.

El anidamiento de funciones es útil cuando se quieren usar **funciones
auxiliares**, normalmente cortas.

```js
function getEven(list) {
    function isEven(n) {
        return n % 2 === 0;
    }
    return list.filter(isEven);
}

getEven([1, 2, 3, 4, 5, 6]);
```

El mismo nombre en una función anidada se puede referir a dos cosas:

1) **Si se usa con `let`**, se estará declarando **otra variable distinta**:

```js
function introduction() {
    // Esta es una variable text.
    let text = 'I\'m Ziltoid, the Omniscient.';

    function greetings() {
        // Y esta es OTRA variable text distinta.
        let text = 'Greetings humans!';
        console.log(text);
    }

    greetings();
    console.log(text);
}

introduction();
```

En el caso anterior, decimos que la variable `text` de la función anidada
`greetings` _oculta_ a la variable `text` de la función `introduction`.

Recuerda que para introducir una nueva variable hay que declararla con
`let` antes de usarla (o al mismo tiempo que se asigna).

2) Si se omite la palabra `let`, no se crea una nueva variable, sino que se
**reutiliza** la que ya existía. En este caso la función interna (_greetings_)
actúa como una _clausura_.

```js
function introduction() {
  // Esta es una variable text.
  let text = 'I\'m Ziltoid, the Omniscient.';

  function greetings() {
    // Esta es la MISMA variable text que la de afuera.
    text = 'Greetings humans!';
    console.log(text);
  }

  greetings();
  console.log(text);
}

introduction();
```

A diferencia de `var` una variable declarada con `let` no puede volver a declararse. El siguiente
código error:

```js
let a = 10;
let a = 20;     // Error: a ya ha sido declarada
```

(Por supuesto, tal y como se ha visto antes, solo es error si la redeclaración es en el mismo ámbito. Si es en ámbitos distintos
no hay redeclaración ya que son variables distintas).

### constantes

**Nota:** Esta sección no está en el original, puesto que es exclusiva de EcmaScript 2015

JavaScript permite la declaración de constantes mediante la palabra clave `const`. Debe tenerse presente que una constante no significa
un valor inmutable si no una variable que no puede ser reasignada:

```js
const pi = 3.14159;
pi = 3.1416;            // Error: no se puede asignar por segunda vez una constante
const m = {pi: 3.14159};
m.pi = 3.1416;          // Correcto (m no se ha reasignado en ningún momento.)
m = {pi: 3.1416};       // Error: no se puede asignar por segunda vez una constante
```

Así pues `const` no significa "valores inmutables" si no variables que solo pueden ser asignadas una vez. Es importante
tenerlo presente para evitar errores. Este hecho también implica que `const` tenga un uso mucho más amplio: de hecho
**cualquier variable que solo asignes una vez deberías declararla con const** para explicitar este hecho. Solo deberías usar
`let` si vas a asignar la variable más de una vez. En resúmen las normas serían:

- Usa `const` siempre que sea posible
- Usa `let` si y solo si debes asignar la variable más de una vez.
- No uses `var` nunca.

A nivel de visibilidad `const` sigue las mismas reglas que `let`.

### _Hoisting_

_Hoisting_ significa "elevación", y en el contexto de la programación nos
referimos a un mecanismo que emplean algunos lenguajes respecto a la declaración
de nombres.

En JavaScript antes de EcmaSctript 2015 daba igual en qué punto de la función se declara una variable.
JavaScript asumirá cualquier declaración como si ocurriese al comienzo de la función. Eso cambia en
EcmaScript 2015 y la introducción de `let`. Una variable declarada con `let` no existe hasta el momento de su
declración.

Así por lo tanto el siguiente código **falla por intentar acceder a una variable no definieda**:

```js
function f() {
    console.log(i);
    let i = 5;
}
f();
```

Por otra parte, las **declaraciones de funciones** sí que se alzan y se alzan enteras (_definición incluida_).

```js
function getEven(list) {
    return list.filter(isEven);

    function isEven(n) {
        return n % 2 === 0;
    }
}

getEven([1, 2, 3, 4, 5, 6]);
```

Esto permite una forma de ordenar el código que quizá sea más clara, situando
las funciones auxiliares a continuación de las funciones que las utilizan.

Así, viendo sólo la primera línea de la función, ya podemos conocer qué es lo
que realiza.

```js
    return list.filter(isEven);
```

Y, si aún tenemos dudas, podemos seguir leyendo e investigar qué hace la función
auxiliar.

```js
    function isEven(n) {
        return n % 2 === 0;
    }
```

Nótese que para que esta manera de escribir código sea clara, el nombre que
utilicemos en las funciones auxiliares tiene que ser adecuado, descriptivo, y
dar una pista sobre cuál es el valor de retorno.

Ahora bien, si declaras la función de forma anónima y la asignas a una variable,
entonces dicha declaración no es alzada. Recuerda: no hay _hoisting_ en las declaraciones
de variables (Y no, usar `var` no ayuda en nada, porque entonces la variable `isEven` existe
pero vale `undefined` en el momento en que se ejecuta el `list.filter`. No hay razón alguna
en EcmaScript 2015 para usar `var`.)

```js
function getEven(list) {
    return list.filter(isEven);

    const isEven = function(n) {
        return n % 2 === 0;
    }
}

getEven([1, 2, 3, 4, 5, 6]);
```

## _Closures_ (Clausuras)

Las funciones son datos y se crean cada vez que se encuentra una instrucción
`function`. De esta forma, podemos crear una función que devuelva funciones.

```js
function buildFunction() {
    return function () { return 42; };
}

let f = buildFunction();
let g = buildFunction();

typeof f === 'function';
typeof g === 'function';

f();
g(); // Las funciones hacen lo mismo...

f !== g; // ...pero NO son la misma función
```

Por sí solo, este no es un mecanismo muy potente, pero sabiendo que una función
anidada puede acceder a las variables de los ámbitos superiores, podemos hacer
algo así:

```js
function newDie(sides) {
  return function () {
    return Math.floor(Math.random() * sides) + 1;
  };
}
let d100 = newDie(100);
let d20 = newDie(20);

d100 !== d20; // distintas, creadas en dos llamadas distintas a newDie.

d100();
d20();
```

En JavaScript, las funciones **retienen el acceso a las variables en ámbitos
superiores**. Una función que se refiere a alguna de las variables en ámbitos
superiores se denomina **_closure_** o clausura.

Esto **no afecta al valor de `this`**, que seguirá siendo el destinatario del
mensaje.

### Métodos, _closures_ y `this`

Considera el siguiente ejemplo:

```js
let diceUtils = {
    history: [], // lleva el histórico de tiradas.

    newDie: function (sides) {
        return function die() {
            let result = Math.floor(Math.random() * sides) + 1;
            this.history.push([new Date(), sides, result]);
            return result;
        }
    }
}
```

La intención es poder crear dados y llevar un registro de todas las tiradas que
se hagan con estos dados.

Sin embargo, esto no funciona:

```js
var d10 = diceUtils.newDie(10);
d10(); // ¡error!
```

Y es así porque **`this` siempre es el destinatario del mensaje** y `d10` se
está llamando como si fuera una función y no un método.

Recuerda que podemos hacer que cualquier función tomara un valor forzoso como
`this` con `.apply()`; por lo que esto sí funciona, pero no es muy conveniente:

```js
d10.apply(diceUtils);
d10.apply(diceUtils);
diceUtils.history;
```

Lo que tenemos que hacer es que la función `die` dentro de `newDie` se refiera
al `this` del ámbito superior, no al suyo.

Puedes lograr esto de dos maneras. La primera es un mero juego de variables,
guardando el `this` en una variable auxiliar (en este caso, `self`):

```js
let diceUtils = {
    history: [], // Lleva el histórico de dados.

    newDie: function (sides) {
        let self = this; // self es ahora el destinatario de newDie.

        return function die() {
            var result = Math.floor(Math.random() * sides) + 1;
            // Usando self nos referimos al destinatario de newDie.
            self.history.push([new Date(), sides, result]);
            return result;
        }
    }
}
```

Esto sí funciona y es mucho más conveniente:

```js
let d10 = diceUtils.newDie(10);
let d6 = diceUtils.newDie(6);
d10();
d6();
d10();
diceUtils.history;
```

La segunda forma es usando el **método [`bind`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind)** de las funciones.

El método `bind` de una función devuelve otra función cuyo `this` será el
primer parámetro de `bind`. De este modo:

```js
let diceUtils = {
    history: [], // Lleva el histórico de dados.

    newDie: function (sides) {
        return die.bind(this); // una nueva función que llamará a die con su
                               // destinatario establecido al primer parámetro.

        function die() {
            let result = Math.floor(Math.random() * sides) + 1;
            this.history.push([new Date(), sides, result]);
            return result;
        }
    }
}
```

Las dos formas son ampliamente utilizadas, pero la segunda se ve escrita
muchas veces de este modo:

```js
let diceUtils = {
    history: [], // Lleva el histórico de dados.

    newDie: function (sides) {
        return function die() {
            let result = Math.floor(Math.random() * sides) + 1;
            this.history.push([new Date(), sides, result]);
            return result;
        }.bind(this); // el bind sigue a la expresión de función.
    }
}
```

### Funciones arrow (fat arrow, lambda expressions)

**Nota:** Esta sección no está en el original dado que es propia de EcmaScript 2015

Lo que has visto en la sección anterior (el comportamiento de `this` dentro de una clausura) se conoce 
comúnmente con el nombre de "el problema de la pérdida de this". Las dos soluciones mostradas anteriormente
funcionan correctamente, pero en EcmaScript 2015 hay un tercera solución mucho mejor: el operador _fat arrow_.

Dicho operador **es una sintaxis alternativa a la declaración de funciones**. Veamos primero su uso y luego analizamos
porque es una solución a la pérdida de this. Hemos visto que podemos declarar una función anónima y asignarla a una variable
de forma muy sencilla:

```js
const random = function() { return 42;}
```

EcmaScript 2015 nos da una sintaxis alternativa equivalente pero mucho más compacta:

```
const random = () => 42;
```

Visto así parecen ganaas de complicar el código, pero veamos un uso donde el operador _fat arrow_ mejora realmente el código. En JavaScript
es habitual pasar funciones como parámetros de otras funciones. Sin ir más lejos el código mostrado anteriormente:

```js
function getEven(list) {
    return list.filter(isEven);

    const isEven = function(n) {
        return n % 2 === 0;
    }
}
```

Este código es correcto, pero no es muy realista. No tiene mucho sentido declarar una función con nombre (`isEven`) que solo se usa una vez. Lo
habitual es pasar una función anónima como segundo parámetro de list.filter:

```js
function getEven(list) {
    return list.filter(function(n) {
        return n % 2 === 0;
    });
}
```

Acostúmbrate a este tipo de código porque es constante en el desarrollo en JavaScript. Ahora bien, es un código un poco tedioso (_verbose_). No solo
hay que escribir mucho si no que el código cuesta más de leer. Hasta EcmaScript 2015 poco se podía hacer. Pero
ahora tenemos al operador _fat arrow_ de nuestro lado. Compara:

```js
function getEven(list) {
    return list.filter(n => n % 2 === 0);
}
```

La diferencia en la claridad es abismal. Quizá te cueste acostumbrarte a la sintaxis del _fat arrow_ pero cuando lo hagas
te preguntarás por qué ha tardado tanto tiempo en incorporarse al lenguaje.

A continuación se muestran declaraciones de funciones del modo tradicional y usando el _fat arrow_ para que veas
las diferencias:

```js
const f1a = function() { return 42;}
const f1b = () => 42;
const f2a = function(min, max) { return max-min};
const f2b = (min, max) => max-min;
const f3a = function(min) { return min + 42};
const f3b = min => min + 42;        // Con un solo parámetro el parentesis es opcional
const f4a = function(iters) {
    let accum = 0;
    for (let idx=0; idx<iters; idx++) { accum += idx;}
    return accum
}
const f4b = iters => {
    let accum = 0;
    for (let idx=0; idx<iters; idx++) { accum += idx;}
    return accum
}
```

Si la función **consta solo de un return _expresion_** entonces el operador _fat arrow_ simplifica mucho la sintaxis. Si la
función tiene más de una sentencia, entonces la ganancia es menor. De todos modos, hay muchas funciones que lo único que hacen
es devolver un determinado valor.

Pero el operador _fat arrow_ viene con un regalo adicional: **una función declarada con _fat arrow_ preserva el valor de this**. Es 
decir, ya no tenemos el problema de la pérdida de this:

```js
let diceUtils = {
    history: [], // Lleva el histórico de dados.

    newDie: function (sides) {
        return () => {
            let result = Math.floor(Math.random() * sides) + 1;
            this.history.push([new Date(), sides, result]);
            return result;
        }
    }
}
```

Observa como la función anónima no debe usar ni `apply`, ni `bind` ni debemos declarar la variable `self`: el uso
de _fat arrow_ nos garantiza que dentro de la función anónima el valor de this será el mismo que el valor de la función
que la contenga (en este caso, la función newDie).

### Estado privado 

**Nota**: Esta sección no está en el original. Se añade para completitud.

Anteriormente dijimos que no hay manera en JavaScript de tener campos privados en un objeto. Bien,
aprovechando las clausuras es posible tener un estado privado **real**:

```js
const enemy = (function() {
    const _position = {x: 10, y: 10};
    return {
        position() {
            return {x: _position.x, y: _position.y}
        }
    }
})();

let pos = enemy.position().x;       // 10
let pos = enemy._position.x;        // Error (enemy._position es undefined)
```

Este código crea una _clausura_ (la función _position()_). La función 
_position_ está definda dentro de otra función y por lo tanto puede acceder a las variables
definidas dentro de esta otra función. Dicha otra función es una función anónima. Se dice que una
función es anónima cuando no tiene un nombre. Con las funciones anónimas solo puede hacerse dos
cosas: o invocarlas y guardarse el resultado (es decir declarar e invocar la función todo en uno)
o bien asignarla a una variable:

```js
const func = function() {return 42;}  // Asigna la función anónima a la variable func
const i42 = (function() { return 42;})();  // Crea la función anónima Y la invoca. El resultado (42) se guarda en i42.
```

El valor de la variable _enemy_ es el valor de invocar la función anónima. Dicho resultado es un objeto que contiene la interfaz
pública (la función _position()_). Debido a que las funciones que conforman la interfaz pública son clausuras, pueden acceder
a las variables de la función anónima (que son inacessibles desde fuera).

En este ejemplo la interfaz pública tiene la forma de funciones (_position()_ en lugar de _position_). Más adelanta veremos como
podemos mantener un estado privado a la vez que mantenemos la ilusión de propiedades.

## Módulos

Esta sección presenta la característica **módulos**, que es específica de Node.

**Nota:** EcmaScript 2015 define un sistema de módulos extremadamente potente y flexible. Lamentablemente no está
implementado en ningún motor, por lo que esta sección es la misma que el original y describe el sistema de módulos
_CommonJS_ (de Node).

Una de las principales desventajas de JavaScript ([hasta la próxima versión](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/import))
es que no hay forma de organizar el código en módulos.

Los módulos sirven para aislar funcionalidad relacionada: tipos, funciones,
constantes, configuración…

Node _sí tiene módulos_ y, afortunadamente, existen **herramientas que simulan
módulos** como los de Node en el navegador.

En Node, los ficheros JavaScript acabados en `.js` son módulos. Node nos permite
exponer o **exportar funcionalidad** de un módulo, poniéndola dentro del objeto
`module.exports`:

```js
// En diceUtils.js
"use strict"; // pone el módulo en modo estricto.

var history = [];

function newDie(sides) {
    return function die() {
        var result = Math.floor(Math.random() * sides) + 1;
        history.push([new Date(), sides, result]);
        return result;
    };
}

// ¡Lo que se exporta realmente es el objeto module.exports!
module.exports.newDie = newDie;
module.exports.history = history;
```

Realmente, lo que se exporta es **siempre `module.exports`**, que en principio
es un objeto vacío:

```js
typeof module.exports;
module.exports;
```

Ahora podemos ahora **importar ese módulo** desde otro:

```js
// En cthulhuRpg.js
"use strict";

var diceUtils = require('./diceUtils');
var d100 = diceUtils.newDie(100);

var howard = {
    sanity: 45,
    sanityCheck: function () {
        if (d100() <= this.sanity) {
            console.log('Horrible, pero lo superaré. Estuvo cerca.');
        } else {
            console.log(
                '¡Ph\'nglui mglw\'nafh Cthulhu R\'lyeh wgah\'nagl fhtagn!');
        }
    }
};
howard.sanityCheck();
```

Para importar un módulo desde otro hay que pasar a [`require`](https://nodejs.org/api/modules.html#modules_module_require_id)
la **ruta relativa** hasta el fichero del módulo que queremos importar.

Si en lugar de una ruta, pasamos un nombre, accederemos a la **funcionalidad
que viene por defecto** con Node (los módulos que forman parte de la librería
estándar, como `path` o `fs`) o la que instalemos de terceras partes (por
ejemplo, módulos instalados con el gestor de paquetes npm). Usaremos esta forma
en un par de ocasiones más adelante.

## Diferencias entre ámbitos en Node y en el navegador

Se ha dicho que el ámbito en JavaScript es equivalente a la función, pero
sabemos que podemos abrir una consola o un fichero y empezar a declarar
variables sin necesidad de escribir una función.

Esto es así porque estamos usando el **ámbito global**. El ámbito global está
disponible tanto en el navegador como en Node.

```js
// Esta es una variable text en el ámbito GLOBAL.
var text = 'I\'m Ziltoid, the Omniscient.';

// Esta es una función en el ámbito GLOBAL.
function greetings(list) {
    // Esta es OTRA variable text en el ámbito de la función.
    var text = 'Greetings humans!';
    console.log(text);
}

greetings();
console.log(text);
```

Sin embargo, existe una peculiaridad en Node. El ámbito global es realmente
_local al fichero_. Esto quiere decir que:

```js
// En a.js, text es visible únicamente dentro del FICHERO.
"use strict";
var text = 'I\'m Ziltoid, the Omniscient.';

// En b.js, text es visible únicamente dentro del FICHERO.
"use strict";
var text = 'Greetings humans!';

// En una consola iniciada en el mismo directorio que a y b
require('./a');
require('./b');
text;
```

## Programación asíncrona y eventos

Prueba el siguiente ejemplo (copia, pega y espera 5 segundos):

```js
var fiveSeconds = 5 * 1000; // en milisegundos.

// Esto ocurre ahora.
console.log('T: ', new Date());

setTimeout(function () {
    // Esto ocurre pasados 5 segundos.
    console.log('T + 5 segundos: ', new Date());
}, fiveSeconds);

// Esto ocurre inmediatamente después
console.log('T + delta: ', new Date());
```

Como puedes comprobar, el mensaje se completa pasados 5 segundos porque lo que
hace [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout)
es llamar a la función tan pronto como pasen el número de milisegundos
indicados.

Decimos que una función es un **_callback_** si se llama en algún momento
futuro –es decir, **asíncronamente**– para informar de algún resultado.

En el ejemplo de `setTimeout`, el resultado es que ha pasado la cantidad de
tiempo especificada.

### Eventos

En esta sección veremos el **módulo `readline`**, que es específico de Node.

La programación asíncrona en JavaScript y otros lenguajes se usa para **modelar
eventos**, principalmente esperas por entrada y salida. En otras palabras:
hitos que ocurren pero que no sabemos _cuándo_ ocurren.

La entrada y salida –a partir de ahora IO (del inglés _input / output_)– no
sólo supone lectura de ficheros o peticiones a la red, también incluye esperar
una acción del usuario.

Como ejemplo, vamos a implementar una consola de diálogo por líneas. Usaremos el
módulo [`readline`](https://nodejs.org/api/readline.html), que es parte de la
librería estándar que viene con Node:

```js
// En conversational.js
"use strict";

var readline = require('readline');

var cmd = readline.createInterface({
    input: process.stdin,  // así referenciamos la consola como entrada.
    output: process.stdout, // y así, como salida.
    prompt: '(╯°□°）╯ ' // lo que aparece para esperar la entrada del usuario.
});
```

Lanza ese programa con Node y verás que no hace nada, **pero tampoco termina**.
Esto es típico de los programas asíncronos: el programa queda esperando a que
pase algo. Pulsa `ctrl+c` para terminar el programa.

Ahora prueba:

```js
// Añade al final de conversational.js
console.log('Escribe algo y pulsa enter');
cmd.prompt(); // pide que el usuario escriba algo.

cmd.on('line', function (input) {
    console.log('Has dicho "' + input  + '"');
    cmd.prompt(); // pide que el usuario escriba algo.
});
```

Lo que has conseguido es **escuchar el evento `line`** que se produce
[cada vez que en la entrada se recibe un caracter de cambio de línea](https://nodejs.org/api/readline.html#readline_event_line).

Hablando de eventos, la función que se ejecuta asíncronamente recibe el nombre de
**_listener_**, pero tampoco es raro que se la llame _callback_.

Se habla de "**registrar un _listener_** para un evento", "subscribirse a un
evento" o "escuchar un evento" a utilizar el mecanismo que permite asociar la
ejecución de una función con dicho evento.

Con todo, aún no se puede salir del programa anterior. Necesitamos algunos
cambios más:

```js
// Añade a conversational.js
cmd.on('line', function (input) {
    if (input === 'salir') {
        cmd.close();
    }
});

cmd.on('close', function () {
    console.log('¡Nos vemos!');
    process.exit(0); // sale de node.
});
```

Hemos añadido un segundo _listener_ al evento `line` y **ambos se ejecutarán**.
El primero gestiona el funcionamiento por defecto (que es repetir lo que el
usuario ha introducido) y el segundo trata específicamente el comando `salir`.

Si la línea es exactamente `salir`, cerraremos la interfaz de línea de
comandos. Esto produce un evento `close` y, cuando lo recibamos, utilizaremos el
_listener_ de ese evento para terminar el programa.

El método `on` es un segundo nombre para [`addListener`](https://nodejs.org/api/events.html#events_emitter_addlistener_eventname_listener).

Igual que podemos añadir un _listener_, también podemos eliminarlo con
[`removeListener`](https://nodejs.org/api/events.html#events_emitter_removelistener_eventname_listener),
y quitarlos todos con
[`removeAllListeners`](https://nodejs.org/api/events.html#events_emitter_removealllisteners_eventname).

Podemos escuchar un evento **sólo una vez** con
[`once`](https://nodejs.org/api/events.html#events_emitter_once_eventname_listener).

### Emisores de eventos

Ahora veremos la clase `EventEmitter`, que también es específica de Node.

Los eventos no son un mecanismo estándar de JavaScript. Son una forma
conveniente de modelar determinados tipos de problema, pero un objeto JavaScript,
por sí solo, **no tiene API para emitir eventos**.

En Node contamos con diversas alternativas con el fin de que los objetos emitan
eventos:

- Implementar nuestra propia API de eventos.

- Hacer que nuestros objetos **usen** una instancia de `EventEmitter`.

- Hacer que nuestros objetos **sean instancias** de `EventEmitter`.

La primera supondría crear nuestro propio método `on` y los mecanismos para
emitir eventos. La segunda y la tercera usan la clase
[`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter),
que ya implementa esta API.

Este es un ejemplo de la opción 3 –el cual aprovechamos para repasar la
herencia:

```js
const events = require('events');
const EventEmitter = events.EventEmitter;

function Ship() {
    EventEmitter.apply(this);
    this._ammunition = 'laser charges';
}

Ship.prototype = Object.create(EventEmitter.prototype);
Ship.prototype.constructor = Nave;

let ship = new Ship();
ship.on; // ¡existe!
```

Debido a la correspondencia entre clases y funciones (recuerda, las clases terminan siendo
realmente funciones) el siguiente código funciona correctamente:

```js
const events = require('events');
const EventEmitter = events.EventEmitter;

class Ship extends EventEmitter {
    constructor() {
        super();
        this._ammunition = 'laser charges';
    }
}

let ship = new Ship();
ship.on; // ¡existe!
```


Ahora que la nave puede emitir eventos, vamos a hacer que dispare y que emita un
evento.

```js
Ship.prototype.shoot = function () {
    console.log('PICHIUM!');
    this.emit('shoot', this._ammunition); // parte de la API de EventEmitter.
};

ship.on('shoot', function (ammunition) {
    console.log('CENTRO DE MANDO. La nave ha disparado:', ammunition);
});

ship.shoot();
```

Si usamos clases recuerda que los métodos se suelen declarar junto con la clase
(aunque añadirlos a `Ship.prototype` funciona igualmente. Esa es la gracia de como
están implementadas las clases):

```js
class Ship extends EventEmitter {
    constructor() {
        super();
        this._ammunition = 'laser charges';
    }

    shoot() {
        console.log('PICHIUM!');
        this.emit('shoot', this._ammunition); // parte de la API de EventEmitter.
    }
}

let ship = new Ship();
ship.on('shoot', function (ammunition) {
    console.log('CENTRO DE MANDO. La nave ha disparado:', ammunition);
});

ship.shoot();
```

**Emitir un evento** consiste en llamar al método
[`emit`](https://nodejs.org/api/events.html#events_emitter_emit_eventname_arg1_arg2),
que hará que se ejecuten los _listeners_ que escuchan tal evento.

Los eventos son increiblemente útiles para modelar interfaces de usuario de
forma genérica.

Para ello, los modelos deben **publicar** qué les ocurre: cómo cambian, qué
hacen… Todo **a base de eventos**. Las interfaces de usuario se
**suscribirán** a estos eventos y proporcionarán la información visual adecuada.

Este modelo permite además que varias interfaces de usuario funcionen al mismo
tiempo, todas escuchando los mismos eventos. Sin embargo, también permite
dividir la interfaz en otras más especializadas, cada una escuchando un
determinado conjunto de eventos.
