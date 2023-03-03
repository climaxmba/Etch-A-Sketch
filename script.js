const container = document.getElementById('container');

let dim = 16;
for (let i = 1; i <= dim * dim; i++) {
    container.innerHTML += '<div class="grid-items"></div>';
}

container.style.cssText = `grid-template-columns: repeat(${dim}, auto)`;
let grids = container.childNodes;

for (let i = 0; i < grids.length; i++) {
    grids[i].addEventListener('mouseover', () => grids[i].style.backgroundColor = 'black');
}

// Set up user input popup for grid dimension. #4

// Extra