"use strict";

let book = {
    author: "Enrico",
    title: "ABC",
    pages: 360,
    "chapter pages": [90,50,60,140]
}

const persona = book.author;
book.title = "Advanced JS"; // modifica di una proprietà
book.editor = "PoliTO";
console.log(book);

