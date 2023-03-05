const container = document.getElementById('container');
const eraser = document.getElementById('eraser-btn');
let color = 'black';
let dim = 16;
let erase = false;

fillGrid();

container.style.gridTemplateColumns = `repeat(${dim}, auto)`;
let grids = container.childNodes;
document.querySelector('button').onclick = promptDim;
document.querySelector('select').onchange = () => color = document.querySelector('select').value;
eraser.onclick = function() {
    if (!erase) {
        eraser.textContent = 'On';
    } else {
        eraser.textContent ='Off';
    }
    erase = !erase;
}
document.getElementById('clear-btn').onclick = function() {
    for (let elem of grids) {
        elem.style.backgroundColor = 'unset';
    }
}

function promptDim() {
    let temp = dim;
    dim = 0;
    do {
        dim = Number(prompt('Enter a number from 8 to 80 to change dimension', `${temp}`));
        if (!dim) {
            dim = temp;
            return;
        }
    } while ((dim < 8) || (dim > 80))
    setDim();
}

function setDim() {
    for (let i = 0; i < grids.length; i++) {
        grids[i].style.backgroundColor = 'unset';
    }
    clearGrids();
    fillGrid();
    container.style.gridTemplateColumns = `repeat(${dim}, auto)`;
    document.querySelector('p').textContent = `Grids: ${dim} by ${dim}`;
}

function fillGrid() {
    for (let i = 1; i <= dim * dim; i++) {
        const div = document.createElement('div');
        container.appendChild(div);
        div.onmouseover = function() {
            if (erase) {
                div.style.backgroundColor = 'unset';
            } else {
                if (color != 'random') {
                    div.style.backgroundColor = color;
                } else {
                    if ((div.style.backgroundColor == 'unset') || (div.style.backgroundColor == '')) {
                        div.style.backgroundColor = getRandomColor();
                    } else {
                        let hsl = rgbToHsl(div.style.backgroundColor).slice(4, -2).split(',');
                        div.style.backgroundColor = `hsl(${hsl[0]}, ${hsl[1]}, ${Number(hsl[2]) - 10}%)`;
                    }
                }
            }
        }
    }
}

function rand(val) {
    return Math.floor(Math.random() * val);
}

function getRandomColor() {
    var h = rand(360);
    var s = rand(100);
    var l = rand(100);
    return "hsl(" + h + "," + s + "%," + l + "%)";
}

function clearGrids() {
    container.innerHTML = '';
}

// Modified from https://stackoverflow.com/a/58426404
function rgbToHsl(rgb) {
    let temp = rgb.slice(4, -1).split(', ');
    let r = temp[0];
    let g = temp[1];
    let b = temp[2];

    r /= 255;
    g /= 255;
    b /= 255;

    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsl(" + h + "," + s + "%," + l + "%)";
}
// Extra