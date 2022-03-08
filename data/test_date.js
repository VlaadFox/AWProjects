"use strict";

const dayjs = require('dayjs'); // con questo comando importo la libreria per poter usare le date

let now = dayjs();
console.log(now.format());

// voglio ricreare il libretto
let libretto = [];
let esame = {nome: "AW1", voto: 30, data: dayjs('2022-03-03').format()};
console.log(esame);

// funzione che crea un oggetto
function Exam(nome, voto, data) {
    this.nome = nome;
    this.voto = voto;
    this.data = data;
    this.str = function() {return `${this.nome} ${this.voto} ${this.data}`} // funzione che crea stringa che contiene l'oggetto intero
}

const esame2 = new Exam('WA1', 31, dayjs('2022-03-04').format());
console.log(esame2.str()); // richiamo la funzione interna
