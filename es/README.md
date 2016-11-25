# Un preámbulo importante

Esta es la en EcmaScript 2015 versión del libro 'JavaScript para el desarrollo de videojuegos' que 
[puedes leer aquí](https://mozdevs.github.io/js-for-gamedev/es/).

**Todo el credito es para sus autores originales**. El libro original está escrito en EcmaScript 5, y
personalmente creo que no está de más una versión en EcmaScript 2015 del mismo.

**Nota:**. Todo el código ha sido probado en las últimas versiones de los navegades _evergreen_ (Chrome y
Firefox) así con Node 6.4.0. En estos entornos todo el código se puede ejecutar tal cual sin necesitar
de ningún transpilador (como [Babel](https://babeljs.io/)). **El soporte para EcmaScript 2015 está 
muy avanzado en los últimos navegadores y en las últimas versiones de Node** y cada vez hay menos motivos
para no usar esta versión del lenguaje que incorpora sustanciales novedades.

También quiero recalcar que **solo se mencionan los aspectos de EcmaScript 2015 que funcionan hoy en día
en los entornos mencionados**. Hay aspectos del lenguaje todavía no soportados (en especial el sistema
de módulos) que no están implementados en ningún navegador (ni en Node) a día de hoy. Cualquier aspecto 
de EcmaScript 2015 no soportado, no se menciona. Esta versión no pretende ser un curso completo de EcmaScript 2015,
si no solo la adaptación del libro original. En aquellos casos en que un aspecto de EcmaScript 2015 no sea soportado
se seguirá usando su equivalente EcmaScript 5.

**Esta versión no quiere sustituír al original si no complementarlo**. En general se ha adaptado todo el código a EcmaScript 2015
y, salvo excepciones, **no se muestra el código original EcmaScript 5**. También hay secciones del original que se
han suprimido, no porque no sean interesantes, si no porque están fuera de contexto en EcmaScript 2015. Como digo,
la intención es complementar al original. De hecho es muy buena idea leer ambos al mismo texto y así poder comparar
el código (y la teoría) de EcmaScript 5 y la versión 2015.

Por último, recalco lo dicho anteriormente: **todo el mérito del libro es para sus autores originales** que han tenido
a bien compartir dicho material. Por supuesto todas las partes teóricas del libro se han dejado tal cual. Solo se ha migrado
el código y las explicaciones sobre JavaScript para usar la versión 2015.

# JavaScript para el desarrollo de videojuegos

Esta es una guía de introducción a **JavaScript**, y está orientada al
desarrollo de **videojuegos HTML5**.

Esta basada en unos materiales que desarrollamos en una colaboración con la
Universidad Complutense de Madrid para la asignatura de _Programación de
videojuegos con lenguajes interpretados_. Puedes acceder a los materiales
originales de la asignatura a través de
[este repositorio en Github](https://github.com/clnznr/pvli2017).

El código fuente de esta guía también está
[publicado en Github](https://github.com/mozdevs/js-for-gamedev/). Si encuentras
una errata o quieres sugerir algún cambio, por favor háznoslo saber
[abriendo un ticket](https://github.com/mozdevs/js-for-gamedev/issues).

## Videojuegos en la Web

La llegada de **HTML5** y sus tecnologías asociadas expandió enormemente las
capacidades de la Web como **plataforma de videojuegos**. Hasta entonces, la
mayoría de juegos web requerían un plugin externo –como Flash o Unity Player–,
pero hoy ya no es necesario y los juegos HTML5 se ejecutan en el navegador de
forma transparente.

La Web nos ofrece **API** de gráficos 2D y 3D (esta última, basada en el estándar
OpenGL ES), de reproducción y sintetización de audio, de acceso a múltiples
métodos de entrada (_gamepads_, eventos de _touch_, giroscopios…), etc. En
definitiva, todo lo que necesitamos para desarrollar videojuegos.

Existen multitud de **motores y herramientas** para crear videojuegos HTML5.
Algunos de los motores más populares, como Unity, Unreal o Game Maker, ya
incluyen un exportador HTML5. También existen motores o frameworks específicos
para la web, en los que podemos desarrollar con JavaScript, como Phaser o
PlayCanvas.

El objetivo de esta guía es proporcionar una base de conocimientos JavaScript
para que puedas desarrollar videojuegos web utilizando librerías o motores web
existentes.

## ¿A quién está dirigida esta guía?

- A cualquiera con interés en el desarrollo de videojuegos y que ya tenga unos
**conocimientos mínimos de programación** (cualquier lenguaje sirve, como Lua,
C o Python): variables, bucles, funciones, condiciones, etc.

- A programadores de videojuegos que quieran desarrollar videojuegos web con
JavaScript.

- A desarrolladores web que quieran aprender los fundamentos de la programación
orientada a objetos con JavaScript.

---

**Importante**:

Se recomienda leer todos los artículos de una unidad, así como hacer los ejercicios guiados _antes_ de realizar la práctica propuesta.
