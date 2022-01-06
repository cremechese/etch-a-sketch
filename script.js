const container = document.getElementById("container");
let rows = document.getElementsByClassName("row");
let pixels = document.getElementsByClassName("pixel");
let mouseDown = false;
let colorPicker = document.getElementById("pen-color");
let color = colorPicker.value;
let colorToggle = false;
let lightToggle = false;
let darkToggle = false;
let gridToggle = false;
let dropperToggle = false;
let radioButtons = document.getElementsByName("pen-style");
let checkBoxes = document.getElementsByName("gridlines");
const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`


defaultGrid();

function checkRadioButtons() {
    if (radioButtons[1].checked === true) {
        colorToggle = true;
        lightToggle = false;
        darkToggle = false;
        dropperToggle = false;
    } else if (radioButtons[2].checked === true) {
        colorToggle = false;
        lightToggle = true;
        darkToggle = false;
        dropperToggle = false;
    } else if (radioButtons[3].checked === true) {
        colorToggle = false;
        lightToggle = false;
        darkToggle = true;
        dropperToggle = false;
    } else if (radioButtons[4].checked === true) {
        colorToggle = false;
        lightToggle = false;
        darkToggle = false;
        dropperToggle = true;
    } else {
        color = colorPicker.value;
        colorToggle = false;
        lightToggle = false;
        darkToggle = false;
        dropperToggle = false;
    }

    if (checkBoxes[0].checked === true) {
        gridToggle = true;
    } else {
        gridToggle = false;
    }
}

function stylizeGrid() {
    for(i=0; i < pixels.length; i++) {
        if(gridToggle === true) {
            pixels[i].style.borderColor = "grey";
        } else {
            pixels[i].style.borderColor = "transparent";
        }
    }
}

checkBoxes[0].addEventListener("change", function(event) {
    checkRadioButtons();
    stylizeGrid();
});

for (i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener("change", function(event) {
        if (radioButtons[1].checked === true) {
            colorToggle = true;
            lightToggle = false;
            darkToggle = false;
            dropperToggle = false;
        } else if (radioButtons[2].checked === true) {
            colorToggle = false;
            lightToggle = true;
            darkToggle = false;
            dropperToggle = false;
        } else if (radioButtons[3].checked === true) {
            colorToggle = false;
            lightToggle = false;
            darkToggle = true;
            dropperToggle = false;
        } else if (radioButtons[4].checked === true) {
            colorToggle = false;
            lightToggle = false;
            darkToggle = false;
            dropperToggle = true;
        } else {
            color = colorPicker.value;
            colorToggle = false;
            lightToggle = false;
            darkToggle = false;
            dropperToggle = false;
        }
    });
}

checkBoxes[0].addEventListener("change", function(event) {
    if (checkBoxes[0].checked === true) {
        
    }
});

document.getElementById("reset").addEventListener("click", function( event ) {
    for(i = 0; i < pixels.length; i++) {
        pixels[i].style.backgroundColor = "#FFFFFF";
    }
});

function defaultGrid() {
    makeRows(16);
    makeColumns(16);
    initialize();
    checkRadioButtons();
    stylizeGrid();
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

document.body.addEventListener("mousedown", function() {
    mouseDown = true;
});

document.body.addEventListener("mouseup", function() {
    mouseDown = false;
});

function initialize() {
    for(i=0; i < pixels.length; i++) {
        if(!pixels[i].style.backgroundColor) {
            pixels[i].style.backgroundColor = "#FFFFFF";
        }
        pixels[i].addEventListener("mouseover", function(event) {
            if (mouseDown===true) {
                if(colorToggle===true) {
                    randomizeColor();
                    event.target.style.backgroundColor = color;
                } else if (lightToggle===true) {
                    event.target.style.backgroundColor = LightenDarkenColor(rgba2hex(event.target.style.backgroundColor.toString()), 10);
                } else if (darkToggle===true) {
                    event.target.style.backgroundColor = LightenDarkenColor(rgba2hex(event.target.style.backgroundColor.toString()), -10);
                } else if (dropperToggle===true) {
                    color = event.target.style.backgroundColor;
                    dropperToggle=false;
                    radioButtons[0].checked = true;
                    colorPicker.value = rgba2hex(color);
            } else {
                    event.target.style.backgroundColor = color;
                }
            }
        }, false);

        pixels[i].addEventListener("mousedown", function(event) {
            if(colorToggle===true) {
                randomizeColor();
                event.target.style.backgroundColor = color;
            } else if (lightToggle===true) {
                event.target.style.backgroundColor = LightenDarkenColor(rgba2hex(event.target.style.backgroundColor.toString()), 10);
            } else if (darkToggle===true) {
                event.target.style.backgroundColor = LightenDarkenColor(rgba2hex(event.target.style.backgroundColor.toString()), -10);
            } else if (dropperToggle===true) {
                color = event.target.style.backgroundColor;
                dropperToggle=false;
                radioButtons[0].checked = true;
                colorPicker.value = rgba2hex(color);
            } else {
                event.target.style.backgroundColor = color;
            }
        }, false);

        pixels[i].style.height = Math.floor(800/Math.sqrt(pixels.length)) - 1;
        pixels[i].style.width = Math.floor(800/Math.sqrt(pixels.length)) - 1;
    }
}

let slider = document.getElementById("my-range");
let output = document.getElementById("demo");
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


colorPicker.addEventListener("change", function(event){
    color = event.target.value;
    tempColor = color;
});

function LightenDarkenColor(col, amt) {
    return (
        '#' +
        col
          .replace(/^#/, '')
          .replace(/../g, (col) =>
            ('0' + Math.min(255, Math.max(0, parseInt(col, 16) + amt)).toString(16)).substr(-2)
          )
      );
  
}