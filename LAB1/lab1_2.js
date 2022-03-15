"use strict";

const dayjs = require('dayjs');

function Film (id, title, boolFavourite, date, rating) {
    this.id = id;
    this.title = title;
    this.boolFavourite = boolFavourite;
    this.date = date;
    this.rating = rating;
}

function FilmLibrary () {
    this.list = [];

    this.addNewFilm =  (filmToBeAdded) => {
        this.list.push(filmToBeAdded);
    }
    
    this.sortByDate = () => {
        const sortedList = this.list.slice().sort( (a, b) => a.date - b.date ); 
        return sortedList;
        // con il .slice mi copio il contenuto della lista di film in sortedList
        // nel .sort vado a confrontare a e b in base alle loro date, a e b sarebbero l'oggetto film
        // faccio la differenza perchè restituisce implicitamente un valore true o false (positivo o negativo) ed in base a quello il sort si adegua
    }

    this.deleteFilm = (pId) => {
        return this.list.filter( film => film.id != pId) 
        // il filtro "lascia passare" tutti i film con id diverso da quello passato come parametro
        // in questo caso non era richiesto mettere in una lista nuova quindi tengo il nuovo contenuto dentro la stessa list
    }

    this.resetWatchedFilms = () => {
        for (const film of this.list)
            film.date = undefined;
        return this.list;
    }

    this.getRated = () => {
        let onlyRatedList = [];
        for (const film of this.list) {
            if(film.rating != undefined)
                onlyRatedList.push(film);
        }
        onlyRatedList.sort( (a, b) => b.rating - a.rating);
        return onlyRatedList;
        // ho usato una lista di supporto per salvarci dentro tutti i film che avessero un rating definito
        // una volta finita di popolare la lista di supporto la ordino in ordine decrescente (in base al rating) invertendo a e b nel controllo sort (dove faccio la differenza)
    }
}

const film1 = new Film(1, 'Interstellar', true, dayjs('March 10, 2022'), 5);
const film2 = new Film(2, 'Matrix', false, dayjs('March 8, 2022,'), 2);
const film3 = new Film(3, 'Shrek', false, dayjs('March 21, 2021,'), 4);
const film4 = new Film(4, 'Pulp Fiction', false, undefined, undefined);

const films = new FilmLibrary();
films.addNewFilm(film1);
films.addNewFilm(film2);
films.addNewFilm(film3);
films.addNewFilm(film4);

console.log('----- FUNZIONE SORTBYDATE -----');
console.log(films.sortByDate());
console.log('----- FUNZIONE DELETEFILM -----');
console.log(films.deleteFilm(2));
console.log('----- FUNZIONE RESETWATCHEDFILMS -----');
console.log(films.resetWatchedFilms());
console.log('----- FUNZIONE GETRATED -----');
console.log(films.getRated());