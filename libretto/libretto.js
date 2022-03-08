"use strict";

const dayjs = require('dayjs'); // con questo comando importo la libreria per poter usare le date

let now = dayjs();
console.log(now.format());

// voglio ricreare il libretto
let libretto = [];
let esame = { nome: "AW1", voto: 30, data: dayjs('2022-03-03').format() };
console.log(esame);

// funzione che crea un oggetto
// costruttore che inizializza le varie proprietà
function Exam(nome, voto, code, CFU, lode, data) {
    this.nome = nome;
    this.voto = voto;
    this.code = code;
    this.CFU = CFU;
    this.lode = lode;
    this.data = data;
    this.str = function () { return `${this.nome} ${this.voto} ${this.data}` } // funzione che crea stringa che contiene l'oggetto intero
}// qua è come se ci fosse implicito il return dell'oggetto

// oggetto in cui vado a tenere un array di esami
function ExamList() {
    this.list = [];

    this.add = (exam) => { this.list.push(exam) } // funzione di aggiunta, uso arrow function

    this.average = () => { // definisco una funzione dell'oggetto ExamList
        let average = 0;
        for (const val of this.list)
            average += val.voto; // val sarebbe "Exam" che è presente in this.list
        average = average / this.list.length;
        return average;
    } // arrow function in cui calcolo la media

    this.find = (code) => {
        for (const exam of this.list) {
            if (exam.code === code)
                return exam; // se trovo l'esame in base al codice passato faccio il return di tutti i dati dell'esame
            return undefined; // nel caso di nessun risultato trovato
        }
    }

    this.filter = (callback) => { // uguale al find ma funziona tramite una callback, cioè definisco regola di ricerca quando chiamo la funzione
        for (const e of this.list) {
            if (callback(e))
                return e; // se trovo l'esame in base al codice passato faccio il return di tutti i dati dell'esame
            return undefined; // nel caso di nessun risultato trovato
        } // è una funzione più generica rispetto al find()
    }

    // non ho scritto il filterFunctional

    this.increaseVote = () => {
        return this.list.map(
            x => {
                const new_x = Object.assign({}, x, { voto: x.voto + 1 })
                return new_x;
            }); // ad ogni elemento dell'array aumento di 1, x è l'esame
    }
}

const wa1 = new Exam('WA1', 31, '01abc', 6, true, dayjs('2022-03-04').format());
const sistemi = new Exam('Sistemi', 31, '02def', 8, true, dayjs('2022-03-04').format());
console.log(wa1.str()); // richiamo la funzione interna

const exams = new ExamList();
exams.add(wa1);
exams.add(sistemi);

console.log(exams.average()); // faccio la somma dei voti degli esami presenti nella lista 

const e = exams.find('01abc'); // cerco l'esame di WA1 tramite il suo codice
console.log(e);
console.log(e.str()); // metodo dentro l'oggetto Exam che mi mostra a schermo informazioni più ristrette

const e2 = exams.filter(e => (e.code == '01abc')); // faccio la stessa cosa del metodo find, però decido nel momento della chiamata qual è la regola da seguire per fare la ricerca, questa è una callback
console.log(e2);

const list2 = exams.increaseVote();
console.log(list2);