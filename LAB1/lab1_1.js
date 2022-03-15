"use strict";

const dayjs = require('dayjs');

function Film (id, title, boolFavourite, date, rating) {
    this.id = id;
    this.title = title;
    this.boolFavourite = boolFavourite;
    this.date = date;
    this.rating = rating;
}

function FilmList () {
    this.list = [];

    this.addNewFilm =  (filmToBeAdded) => {
        this.list.push(filmToBeAdded);
    }    
}

const film1 = new Film(1, 'Interstellar', true, dayjs('2022-03-04').format(), 5);
const film2 = new Film(2, 'Matrix', false, dayjs('2022-03-01').format(), 4);
const film3 = new Film(3, 'Shrek', false, dayjs('2021-02-19').format(), 3);

const films = new FilmList();
films.addNewFilm(film1);
films.addNewFilm(film2);
films.addNewFilm(film3);

console.log(films);