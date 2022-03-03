"use strict";

const {a,b,...others} = {a:1, b:2, c:3, d:4}; // others si prende i rimanenti valori che rimangono nell'array

console.log(a); // -> 1
console.log(b); // -> 2
console.log(others); // -> {c: 3, d:4}

