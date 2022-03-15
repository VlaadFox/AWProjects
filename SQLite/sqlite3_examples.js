"use strict";

const sqlite = require('sqlite3'); // richiamo la libreria
const db = new sqlite.Database('exams.sqlite', (err) => {if (err) throw err; }); // creo il DB, avrà formato .sqlite
// le tabelle le carica poi manualmente

let result = [];
let sqlQuery = "SELECT * FROM course LEFT JOIN score ON course.code = score.coursecode";

db.all(sqlQuery, (err, rows) => {
    if (err) throw err;
    for (let row of rows) {
        console.log(row);
        //console.log(row.code, row.name);
        result.push(row);
    }
});

console.log('********************');
for (let row of result) {
    console.log(row.code, row.name);
}
console.log('*** END of list ***');

// scrivendo il codice nella callback aspetto il tempo minimo affinchè questo sia eseguito e riempia l'array result, poi finito di far ciò chiamo l'ultimo pezzo del programma (?)


