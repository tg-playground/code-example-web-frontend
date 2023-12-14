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

export { add, sub };

export default reset;
