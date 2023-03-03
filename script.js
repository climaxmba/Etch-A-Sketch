const container = document.getElementById('container');

let dim = 16;

for (let i = 1; i <= dim * dim; i++) {
    const div = document.createElement('div');
    container.appendChild(div);
    div.addEventListener('mouseover', () => div.style.backgroundColor = "black");
}

container.style.gridTemplateColumns = `repeat(${dim}, auto)`;
let grids = container.childNodes;
document.querySelector('button').onclick = promptDim;

function promptDim() {
    let temp = dim;
    dim = 0;
    do {
        dim = Number(prompt('Enter a number from 4 to 100 to change dimension', `${temp}`));
        if (!dim) {
            dim = temp;
            return;
        }
    } while ((dim < 4) || (dim > 100))
    setDim();
}

function setDim() {
    for (let i = 0; i < grids.length; i++) {
        grids[i].style.backgroundColor = 'unset';
    }
    container.innerHTML = '';
    for (let i = 1; i <= dim * dim; i++) {
        const div = document.createElement('div');
        container.appendChild(div);
        div.addEventListener('mouseover', () => div.style.backgroundColor = "black");
    }
    container.style.gridTemplateColumns = `repeat(${dim}, auto)`;
}

// Extra