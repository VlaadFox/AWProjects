"use strict";

let paragraph = document.createElement('p'); // qua esiste nella memoria del browser, non è ancora collegato al DOM
let date = dayjs().format('DD-MM-YYYY // hh:mm:ss'); // prende l'ora del browser, così l'ora è fissa

setInterval( () => {paragraph.innerText = dayjs().format('DD-MM-YYYY // hh:mm:ss')}, 1000) // ogni secondo viene ricalcolato il valore del tempo grazie alla funzione setInterval che richiama la funzione di callback che ho definito una volta ogni 1000 ms

paragraph.innerText = date;

//document.getElementById('ora').innerText = "qui ci sta l'ora";

document.getElementById('ora').prepend(paragraph); // uso il prepend per provareranche altri metodi oltre ad append
// sovrascrivo ogni secondo il contenuto del tag <p>