import {add, sub} from './modules/counter.js'
// or import {default as reset} './modules/counter.js'
import reset from './modules/counter.js'

function handleAdd() {
    let counter = document.getElementById('counter');
    counter.value = add(counter.value);
}

function handleSub() {
    let counter = document.getElementById('counter');
    counter.value = sub(counter.value);
}

function handleReset() {
    let counter = document.getElementById('counter');
    counter.value = reset(counter.value);
}

document.getElementById("addBtn").addEventListener("click", handleAdd);
document.getElementById("subBtn").addEventListener("click", handleSub);
document.getElementById("resetBtn").addEventListener("click", handleReset);
