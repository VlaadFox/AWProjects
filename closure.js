"use strict";

function saluti(name) {
    const myname = name;

    const hello = function () {
        return "Hello " + myname;
    }

    return hello; // ritorno la funzione stessa
}

const helloTom = saluti("Tom");
const helloJerry = saluti("Jerry");

console.log(helloTom());
console.log(helloJerry());