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

const book2 = Object.assign({}, book);
console.log(book2);

const book3 = {...book};
console.log(book3);

const {title, ...rest} = book;
console.log(title);
