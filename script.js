const newBoard = document.querySelector('.clear');
newBoard.addEventListener('click', clearGrid);
const rainbowButton = document.querySelector('.rainbow');
const blackButton = document.querySelector('.black');

drawGrid();

function drawGrid(gridDimension=16) {
    const sketchContainer = document.querySelector('#sketch-container');
    const area = Math.pow(gridDimension, 2);
    const cellDimension = 500/gridDimension;
    for (let i = 1; i <= area; i++) {
        const box = document.createElement('div');
        box.classList.add("cell");
        box.style.width = `${cellDimension-2}px`; 
        box.style.height = `${cellDimension-2}px`;
        box.style.border = "solid grey 1px";
        box.style.margin = "0px";
        box.style.padding = "0px";
        sketchContainer.appendChild(box);
    }
    paintGrid();
}

function paintGrid() {
    const cells = document.querySelectorAll('.cell');
    let mouseDown = false;
    let rainbowColor = false;
    rainbowButton.onmousedown = () => (rainbowColor = true)
    blackButton.onmousedown = () => (rainbowColor = false)


    cells.forEach((cell) => {
        cell.addEventListener('mousedown', function() {
            if (rainbowColor == true) {
                cell.style.backgroundColor = randomRGB()
            } else {
                cell.style.backgroundColor = "black";
            }
        });

        cell.addEventListener('mouseover', function() {
            cell.onmousedown = () => (mouseDown = true);
            cell.onmouseup = () => (mouseDown = false);
            if (mouseDown == true) {
                if (rainbowColor == true) {
                    cell.style.backgroundColor = randomRGB()
                } else {
                    cell.style.backgroundColor = "black";
                }
            }
        });
    });
}

function clearGrid() {
    const sketchContainer = document.querySelector('#sketch-container');
    clearSketchContainer(sketchContainer);
    let gridSize = prompt("Enter grid dimensions");
    while (isNaN(parseInt(gridSize)) || parseInt(gridSize) > 100 || parseInt(gridSize) < 4) {
        gridSize = prompt("Enter a number between 4 and 100 or press cancel to reset:");
        console.log(gridSize);
        if (gridSize === null) {
            gridSize = 16;
        }
        console.log("error")
    }
    drawGrid(parseInt(gridSize));
}

function clearSketchContainer(sketchContainer) {
    while (sketchContainer.firstChild) {
        sketchContainer.removeChild(sketchContainer.firstChild);
    }
}

function randomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    console.log("rgb(" + r + "," + g + "," + b + ")")
    return "rgb(" + r + "," + g + "," + b + ")";
  }
