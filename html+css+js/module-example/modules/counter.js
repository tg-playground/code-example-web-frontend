const name = 'Jack';

function add(counter) {
    counter++;
    return counter;
}

function sub(counter) {
    counter--;
    return counter;
}

function reset(counter) {
    return 0;
}

export { name, add, sub, reset };

export default reset;
