"use strict";

const ciaoTimeout = (nome) => {
    console.log(`Ciao ${nome}`);
}

setTimeout(ciaoTimeout, 3000, "Pinuccio"); // chiamo ciaoTimeout dopo 3 secondi
// i primi 2 parametri sono riservati per nome funzione e tempo di attesa, da li in poi ci possono essere i parametri della funzione

const id = setInterval (() => {console.log("Ciao");}, 2000); // viene definito un id per questo evento che si ripete
// «id» is a handle that refers to the timer

setTimeout( () => {clearInterval(id)}, 5000); // dopo 5 secondi dall'inizio del programma interrompo l'interval periodico che si ripete