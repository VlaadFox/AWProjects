"use strict";

let a = [1,4,9,16];

console.log("a: " + a);
console.log("a.join: " + a.join(',')); // il .join() mette concatena tutti gli elementi dell'array, se passo un carattere tra apici userà quel carattere per separare le stringhe

let b_stringa = a.join(',');
console.log("b_stringa: " + b_stringa);

let b = ['a','b','c'];
let c = a.concat(b);
console.log("c: " + c);

let d = ['*', ...b, '*'];
console.log("d: " + d);
d.push('+');
console.log('d con push del +: ' + d);

const e = [...d]; // è il modo più semplice di copiare un array
console.log("e copiato da d: " + e);
// e anche se è const posso modificare un qualche valore di un suo indice
// e[0] = 2;

for (const val of e) {
    console.log(val);
} // se provo ad usare un indice nel modo classico del c funziona ma è più macchinoso
// pur usando un val di tipo const posso comunque ciclare perchè essendo un ciclo for con l'of il compilatore ricrea val ad ogni giro
// se uso const i nel modo classico non funziona invece