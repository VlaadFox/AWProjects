"use strict";

const dayjs = require('dayjs');
let now = dayjs();

const sqlite = require('sqlite3'); // richiamo la libreria
const db = new sqlite.Database('films.db', (err) => { if (err) throw err; }); // creo riferimento al database, se non esiste si crea

function Film(id, title, boolFavourite, date, rating) {
    this.id = id;
    this.title = title;
    this.boolFavourite = boolFavourite;
    this.date = date;
    this.rating = rating;
}

function FilmLibrary() {
    this.list = [];

    this.addNewFilm = (filmToBeAdded) => {
        this.list.push(filmToBeAdded);
    }

    this.sortByDate = () => {
        const sortedList = this.list.slice().sort((a, b) => a.date - b.date);
        return sortedList;
        // con il .slice mi copio il contenuto della lista di film in sortedList
        // nel .sort vado a confrontare a e b in base alle loro date, a e b sarebbero l'oggetto film
        // faccio la differenza perchè restituisce implicitamente un valore true o false (positivo o negativo) ed in base a quello il sort si adegua
    }

    this.deleteFilm = (pId) => {
        return this.list.filter(film => film.id != pId)
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
            if (film.rating != undefined)
                onlyRatedList.push(film);
        }
        onlyRatedList.sort((a, b) => b.rating - a.rating);
        return onlyRatedList;
        // ho usato una lista di supporto per salvarci dentro tutti i film che avessero un rating definito
        // una volta finita di popolare la lista di supporto la ordino in ordine decrescente (in base al rating) invertendo a e b nel controllo sort (dove faccio la differenza)
    }

    this.getDBFilms = function () {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM films', (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }

    this.getFavoriteFilms = function () {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM films WHERE films.favorite = 1', (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }

    this.getWatchedTodaysFilms = function() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM films WHERE films.watchdate = ?', [now.format('YYYY-MM-DD')], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }

    this.getEarlierFilms = function() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM films WHERE films.watchdate < ?', [now.format('YYYY-MM-DD')], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }

    this.getGreaterEqualRatingFilms = function() {
        const rating = 4;
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM films WHERE films.rating >= ?', [rating], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }

    this.getTitleFilms = function() {
        const title = 'Pulp Fiction';

        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM films WHERE films.title = ?', [title], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }

    this.insertNewFilm = function(pid, ptitle, pfavorite, pwatchdate, prating) {
        this.id = pid;
        this.title = ptitle;
        this.favorite = pfavorite;
        this.watchdate = pwatchdate;
        this.rating = prating;

        return new Promise((resolve, reject) => {
            db.run('INSERT INTO films(id, title, favorite, watchdate, rating) VALUES (?,?,?,?,?)', [this.id, this.title, this.favorite, this.watchdate, this.rating], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve('Film correctly stored!');
            });
        });
    }

    this.deleteByID = function(id) {
        this.id = id;

        return new Promise((resolve, reject) => {
            db.run('DELETE FROM films WHERE films.id = ?', [id], (err) => {
                if (err)
                    reject(err);
                else
                    resolve('Film correctly deleted!');
            });
        });
    }

    this.deleteAllWatchdates = function() {
        return new Promise((resolve, reject) => {
            db.run('UPDATE films SET watchdate = NULL', (err) => {
                if (err)
                    reject(err);
                else
                    resolve('All watchdates have been deleted!');
            });
        });
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

/*console.log('----- FUNZIONE SORTBYDATE -----');
console.log(films.sortByDate());
console.log('----- FUNZIONE DELETEFILM -----');
console.log(films.deleteFilm(2));
console.log('----- FUNZIONE RESETWATCHEDFILMS -----');
console.log(films.resetWatchedFilms());
console.log('----- FUNZIONE GETRATED -----');
console.log(films.getRated());*/

async function main() {
    const filmLibrary = new FilmLibrary();

    try {
        const filmsList = await filmLibrary.getDBFilms();
        console.log('----- FUNZIONE GETDBFILMS -----');
        for (const film of filmsList)
            console.log(film);
    } catch (error) {
        console.log(error);
    }

    try {
        const filmsList = await filmLibrary.getFavoriteFilms();
        console.log('----- FUNZIONE GETFAVORITEFILMS -----');
        for (const film of filmsList)
            console.log(film);
    } catch (error) {
        console.log(error);
    }

    try {
        const filmsList = await filmLibrary.getWatchedTodaysFilms();
        console.log('----- FUNZIONE GETWATCHEDTODAYSFILMS -----');
        for (const film of filmsList)
            console.log(film);
    } catch (error) {
        console.log(error);
    }

    try {
        const filmsList = await filmLibrary.getEarlierFilms();
        console.log('----- FUNZIONE GETEARLIERFILMS -----');
        for (const film of filmsList)
            console.log(film);
    } catch (error) {
        console.log(error);
    }

    try {
        const filmsList = await filmLibrary.getGreaterEqualRatingFilms();
        console.log('----- FUNZIONE GETGREATEREQUALRATINGFILMS -----');
        for (const film of filmsList)
            console.log(film);
    } catch (error) {
        console.log(error);
    }

    try {
        const filmsList = await filmLibrary.getTitleFilms();
        console.log('----- FUNZIONE GETTITLEFILMS -----');
        for (const film of filmsList)
            console.log(film);
    } catch (error) {
        console.log(error);
    }

    try {
        console.log('----- FUNZIONE INSERTNEWFILM -----');
        const returnInsert = await filmLibrary.insertNewFilm(15, 'Interstellar', 1, '2021-09-01', 5);
        console.log(returnInsert);
        const filmsList = await filmLibrary.getDBFilms();
        
        for (const film of filmsList)
            console.log(film);
    } catch (error) {
        console.log(error);
    }

    try {
        console.log('----- FUNZIONE DELETEBYID -----');
        const returnDelete = await filmLibrary.deleteByID(7);
        console.log(returnDelete);
        const filmsList = await filmLibrary.getDBFilms();
        
        for (const film of filmsList)
            console.log(film);
    } catch (error) {
        console.log(error);
    }

    try {
        console.log('----- FUNZIONE DELETEALLWATCHDATES -----');
        const returnDelete = await filmLibrary.deleteAllWatchdates();
        console.log(returnDelete);
        const filmsList = await filmLibrary.getDBFilms();
        
        for (const film of filmsList)
            console.log(film);
    } catch (error) {
        console.log(error);
    }

}

main().then((x) => { db.close(); })