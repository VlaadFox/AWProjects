"use strict";

const myScores = [18, 25, 30, 28, 29, 19];

// Duplico l'array eliminando i due voti più brutti
const modifiedScores = [...myScores];// modo più semplice è con l'operatore spread, quello usato più spesso
/* modifiedScores.sort(); */
// sort è metodo che ordina gli elementi "in place" cioè nello stesso array, non ne fa uno nuovo
// un problema è che di default effettua una conversione in stringa di ciò che ordina
// devo quindi usare dei parametri per bloccare questa conversione
// posso dargli una funzione per fare il confronto, o definendola direttamente dentro come arrow function oppure chiamando una funzione definita in modo classico
// funzione che prende due parametri, quelli da confrontare
modifiedScores.sort( (a,b) => (a-b) ); // a e b sono i due valori da confrontare messi nella prima tonda dell'arrow function
// l'arrow function deve restituire un valore
// non c'è bisogno di mettere il return perchè è implicito nella differenza (valori negativi falsy, valori positivi true)
console.log(myScores);
console.log(modifiedScores);
// mo levo i voti più bassi, dopo il sort sono i primi 2 all'inizio dell'array quindi uso il metodo shift()
modifiedScores.shift();
modifiedScores.shift();
console.log(modifiedScores);
// faccio media
let average = 0;
for (const val of modifiedScores)
    average += val;
average = average / modifiedScores.length;
console.log(average);
// aggiungo due voti alla fine dell'array
modifiedScores.push(29);
modifiedScores.push(31);
console.log(modifiedScores);