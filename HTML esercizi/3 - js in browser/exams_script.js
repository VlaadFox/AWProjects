"use strict";

let div = document.getElementById('scoretable');
let table = div.firstChild;
// questo è un modo di recuperare la tabella a partire dal div che la contiene
// non uso queste variabili ma faccio come sotto

window.addEventListener('load', event => {
    const rows = document.querySelectorAll('table tr'); // mi recupero tutte le righe della tabella a partire da niente

    for (const row of rows) {
        row.addEventListener('click', event => { // evento, funzione di callback
            console.log(event.target, row); // mostro in console l'elemento che ha generato l'evento, mostra proprio la cella della tabella che ho cliccato, non tutta la riga
            // posso anche stampare la riga completa (row) grazie alla closure dentro il for, è la riga che sto considerando in quel preciso momento del ciclo

            const voto = row.children[1].innerText;
            const p = document.createElement('p');
            p.innerText = voto;
            document.getElementById('comment').appendChild(p);
            // con questo se clicco su una riga mi appare poi sotto navigation nella pagina il voto relativo a quella riga
            // faccio l'append di <p> dentro il <div> già esistente nella pagina html con id "comment"
        });

        // implementiamo la cancellazione di una riga
        if (row.firstElementChild.tagName.toLowerCase != 'th') { // parto a fare le operazioni sui pulsanti dopo la prima riga di intestazione della tabella, altrimenti mi da errore
            row.querySelector('.btn').addEventListener('click', event => {
                while (row.firstChild) { // controllo che non sia un riferimento null, cioè finchè ne ho di child
                    row.removeChild(row.firstChild); 
                const parent = row.parentNode;
                row.parent.removeChild(row);
                }
            }) // per ogni riga che ciclo grazie al for vado a recuperare il bottone, uso la classe btn perchè sono tutti definiti con la classe di bootstrap
            // delete children js dom
        }
        

    }


}) // faccio tutte le operazioni solamente nel momento in cui la pagina ha finito di caricarsi
// è una cosa che solitamente si fa questo annidamento
// questo però non lo useremo mai quando passeremo a react

// tr ha dentro di se i td

