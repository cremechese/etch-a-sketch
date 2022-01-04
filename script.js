const container = document.getElementById("container");
let rows = document.getElementsByClassName("row");
let pixels = document.getElementsByClassName("pixel");
let mouseDown = false;
let color = "red";
let colorToggle = false;

defaultGrid();

document.getElementById("randomize").addEventListener("click", function( event ) {
    if(colorToggle===false) {
        document.getElementById("currentToggle").innerHTML = "Random colors on";
        colorToggle = true;
    }
    else {
        document.getElementById("currentToggle").innerHTML = "Random colors off";
        colorToggle = false;
    }
    console.log(colorToggle);
});

function defaultGrid() {
    makeRows(16);
    makeColumns(16);
    initialize();
}

function makeRows(amount) {
    for (r = 0; r < amount; r++) {
        let row = document.createElement("div");
        row.style.height = Math.floor(800/amount) - 1 + "px";
        row.setAttribute('draggable', false);
        container.appendChild(row).className= "row";
    }
}

function makeColumns(amount) {
    for (r = 0; r < rows.length; r++) {
        for (c = 0; c < amount; c++) {
            let newCell = document.createElement("div");
            newCell.style.height = Math.floor(800/amount) - 1 + "px";
            newCell.style.width = Math.floor(800/amount) - 1 + "px";
            newCell.setAttribute('draggable', false);
            rows[r].appendChild(newCell).className = "pixel"
        }
    }
}

function randomizeColor() {
    color = "#"+Math.floor(Math.random()*16777215).toString(16);
}

container.addEventListener("mousedown", function() {
    mouseDown = true;
});

container.addEventListener("mouseup", function() {
    mouseDown = false;
});

function initialize() {
    for(i=0; i < pixels.length; i++) {
        pixels[i].addEventListener("mouseover", function(event) {
            if (mouseDown===true) {
                if(colorToggle===true) {
                    randomizeColor();
                }
                event.target.style.backgroundColor = color;
            }
        }, false);

        pixels[i].addEventListener("mousedown", function(event) {
            if(colorToggle===true) {
                randomizeColor();
            }
            event.target.style.backgroundColor = color;
        }, false);

        pixels[i].style.height = Math.floor(800/Math.sqrt(pixels.length)) - 1;
        pixels[i].style.width = Math.floor(800/Math.sqrt(pixels.length)) - 1;
    }

    document.getElementById("reset").addEventListener("click", function( event ) {
        for(i = 0; i < pixels.length; i++) {
            pixels[i].style.backgroundColor = "white";
        }
    });
}

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
slider.value = 16;
output.innerHTML = 16; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
} 

slider.addEventListener("click", function(event) {
    let currentRowAmount = rows.length;
    for (r = currentRowAmount-1; r > -1; r--) {
        rows[r].remove();
    }
    makeRows(this.value);
    makeColumns(this.value);
    initialize();
});