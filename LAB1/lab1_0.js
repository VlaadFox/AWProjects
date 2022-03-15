"use strict";

const listString = ["Polito", "Spring", "Cat", "A","It"];


function fun() {
    for (const iterator of listString) {
        if (iterator.length < 2) {
            console.log('');
        }
        else if (iterator.length >= 2 && iterator.length <= 3) {
            let str3_1 = iterator.substring(0, 2);
            let str3_2 = iterator.substring(iterator.length-2, iterator.length);
            let str3 = str3_1.concat(str3_2);
            console.log(str3);
        }
        else {
            let str3_1 = iterator.substring(0, 2);
            let str3_2 = iterator.substring(iterator.length-2, iterator.length);
            let str3 = str3_1.concat(str3_2);
            console.log(str3);
        }
    }
}

fun();