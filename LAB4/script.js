"use strict";

const btnAll = document.getElementById('filter-all');
const btnFavorites = document.getElementById('filter-favorites');
const btnBestRated = document.getElementById('filter-best');
const btnLastMonth = document.getElementById('filter-seen-last-month');
const btnUnseen = document.getElementById('filter-unseen');

const films = new FilmLibrary();
const events = new eventListeners();
let boolFirstLoad = true;
let mainHTML = null;


function main() {
    mainHTML = document.getElementById('main');

    const film1 = new Film(1, 'Interstellar', true, dayjs('March 10, 2022'), 5);
    const film2 = new Film(2, 'Matrix', false, dayjs('March 8, 2022,'), 2);
    const film3 = new Film(3, 'Shrek', false, dayjs('March 21, 2021,'), 1);
    const film4 = new Film(4, 'Pulp Fiction', false, dayjs('September 01, 2021,'), 5);

    films.addNewFilm(film1);
    films.addNewFilm(film2);
    films.addNewFilm(film3);
    films.addNewFilm(film4);


    if (boolFirstLoad)
        firstPopulateHTML(films.list);
}


function eventListeners() {
    this.populateList = [];


    btnAll.addEventListener('click', event => {
        // ricarico l'ul
        const elementToReload = document.getElementById('list-films-ul');
        elementToReload.remove();

        this.populateList = films.getFilmsFromList();
        populateHTML(this.populateList);

        // metto l'evidenziazione di "attivo" sul componente che premo e lo tolgo per sicurezza da tutti gli altri
        document.getElementById('filter-all').className += ' active';
        document.getElementById("filter-favorites").className = document.getElementById("filter-all").className.replace( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("filter-best").className = document.getElementById("filter-best").className.replace( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("filter-seen-last-month").className = document.getElementById("filter-seen-last-month").className.replace( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("filter-unseen").className = document.getElementById("filter-unseen").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    })

    btnFavorites.addEventListener('click', event => {
        // ricarico l'ul
        const elementToReload = document.getElementById('list-films-ul');
        elementToReload.remove();

        this.populateList = films.getFavorite();
        populateHTML(this.populateList);

        // metto l'evidenziazione di "attivo" sul componente che premo e lo tolgo per sicurezza da tutti gli altri
        document.getElementById('filter-favorites').className += ' active';
        document.getElementById("filter-all").className = document.getElementById("filter-all").className.replace( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("filter-best").className = document.getElementById("filter-best").className.replace( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("filter-seen-last-month").className = document.getElementById("filter-seen-last-month").className.replace( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("filter-unseen").className = document.getElementById("filter-unseen").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    })

    btnBestRated.addEventListener('click', event => {
        // ricarico l'ul
        const elementToReload = document.getElementById('list-films-ul');
        elementToReload.remove();

        this.populateList = films.getBestRated();
        populateHTML(this.populateList);

        // metto l'evidenziazione di "attivo" sul componente che premo e lo tolgo per sicurezza da tutti gli altri
        document.getElementById('filter-best').className += ' active';
        document.getElementById("filter-all").className = document.getElementById("filter-all").className.replace( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("filter-favorites").className = document.getElementById("filter-best").className.replace( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("filter-seen-last-month").className = document.getElementById("filter-seen-last-month").className.replace( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("filter-unseen").className = document.getElementById("filter-unseen").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    })

    btnLastMonth.addEventListener('click', event => {
        // ricarico l'ul
        const elementToReload = document.getElementById('list-films-ul');
        elementToReload.remove();

        this.populateList = films.getSeenLastMonth();
        populateHTML(this.populateList);

        // metto l'evidenziazione di "attivo" sul componente che premo e lo tolgo per sicurezza da tutti gli altri
        document.getElementById('filter-seen-last-month').className += ' active';
        document.getElementById("filter-all").className = document.getElementById("filter-all").className.replace( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("filter-favorites").className = document.getElementById("filter-best").className.replace( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("filter-best").className = document.getElementById("filter-seen-last-month").className.replace( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("filter-unseen").className = document.getElementById("filter-unseen").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    })

}



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

    this.getFilmsFromList = function () {
        return this.list;
    }

    this.getFavorite = function () {
        const listFavorite = this.list.filter(film => film.boolFavourite == true);
        return listFavorite;
    }

    this.getBestRated = function () {
        const listBestRated = this.list.filter(film => film.rating == 5);
        return listBestRated;
    }

    this.getSeenLastMonth = function () {
        const listSeenLastMonth = this.list.filter(film => (dayjs().subtract(1, 'month') < film.date) && (film.date < dayjs()) );
        return listSeenLastMonth;
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

}

function populateHTML(listPopulate) {
    const elementReloaded = document.createElement(`ul`);
    elementReloaded.className = 'list-group list-group-flush';
    elementReloaded.id = 'list-films-ul';
    mainHTML.appendChild(elementReloaded);

    for (const film of listPopulate) {
        let boolChecked = 'unchecked';
        let htmlValutazione = '';
        let suppRating = film.rating;

        if (film.boolFavourite)
            boolChecked = 'checked';

        for (let index = 0; index < 5; index++) {
            if (suppRating > 0)
                htmlValutazione += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>';
            else
                htmlValutazione += '<svg class="empty-star" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/></svg>';
            suppRating--;
        }


        const nuovaRigaFilm = document.createElement(`li`);
        nuovaRigaFilm.className = 'list-group-item';
        nuovaRigaFilm.id = `${film.title}`;
        nuovaRigaFilm.innerHTML =
            `
            <div class="d-flex w-100 justify-content-between">
            <p class="favorite text-start col-md-5 col-3">${film.title}</p>
            <span class="custom-control custom-checkbox col-md-1 col-3">
              <input type="checkbox" class="custom-control-input" id="check-f1" ${boolChecked}>
              <label class="custom-control-label" for="check-f1">Favorite</label>
            </span>
            <small class="watch-date col-md-3 col-3">${film.date.format('MMMM D, YYYY')}</small>
            <span class="rating text-end col-md-3 col-3">
            ${htmlValutazione}
            </span>
          </div>`

        elementReloaded.appendChild(nuovaRigaFilm);
    }
}

function firstPopulateHTML(listPopulate) {

    for (const film of listPopulate) {
        let boolChecked = 'unchecked';
        let htmlValutazione = '';
        let suppRating = film.rating;

        if (film.boolFavourite)
            boolChecked = 'checked';

        for (let index = 0; index < 5; index++) {
            if (suppRating > 0)
                htmlValutazione += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>';
            else
                htmlValutazione += '<svg class="empty-star" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/></svg>';
            suppRating--;
        }


        const nuovaRigaFilm = document.createElement(`li`);
        nuovaRigaFilm.className = 'list-group-item';
        nuovaRigaFilm.id = `${film.title}`;
        nuovaRigaFilm.innerHTML =
            `
            <div class="d-flex w-100 justify-content-between">
            <p class="favorite text-start col-md-5 col-3">${film.title}</p>
            <span class="custom-control custom-checkbox col-md-1 col-3">
              <input type="checkbox" class="custom-control-input" id="check-f1" ${boolChecked}>
              <label class="custom-control-label" for="check-f1">Favorite</label>
            </span>
            <small class="watch-date col-md-3 col-3">${film.date.format('MMMM D, YYYY')}</small>
            <span class="rating text-end col-md-3 col-3">
            ${htmlValutazione}
            </span>
          </div>`

        const ulToAppend = document.getElementById('list-films-ul');
        ulToAppend.appendChild(nuovaRigaFilm);

        boolFirstLoad = false;

    }
}

main();