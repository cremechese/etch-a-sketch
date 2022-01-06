const container = document.getElementById("container");
const colorPicker = document.getElementById("pen-color");
const radioButtons = document.getElementsByName("pen-style");
const checkBoxes = document.getElementsByName("gridlines");
const slider = document.getElementById("my-range");
const output = document.getElementById("demo");
const rows = document.getElementsByClassName("row");
const pixels = document.getElementsByClassName("pixel");

//one line function to convert rgba color values to hex values
const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

//default the grid-size slider to 16
slider.value = 16;
output.innerHTML = 16;

let mouseDown = false;

//set up the default grid on page load, 16x16
function defaultGrid() {
    makeRows(16);
    makeColumns(16);
    clickPixel();
    //checkRadioButtons();
    stylizeGrid();
}

//these functions construct the grid by first appending rows
//and then adding individual cells to each row
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

//if the user clicks or click-drags over the cell divs, change the divs color to
//the selected option based on radio buttons
function clickPixel() {
    for(i=0; i < pixels.length; i++) {
        if(!pixels[i].style.backgroundColor) {
            pixels[i].style.backgroundColor = "#FFFFFF";
        }
        pixels[i].addEventListener("mouseover", function(event) {
            if (mouseDown===true) {
                if(radioButtons[1].checked===true) {
                    event.target.style.backgroundColor = randomColor();
                } else if (radioButtons[2].checked===true) {
                    event.target.style.backgroundColor = LightenDarkenColor(rgba2hex(event.target.style.backgroundColor.toString()), 10);
                } else if (radioButtons[3].checked===true) {
                    event.target.style.backgroundColor = LightenDarkenColor(rgba2hex(event.target.style.backgroundColor.toString()), -10);
                } else if (radioButtons[4].checked===true) {
                    radioButtons[0].checked = true;
                    colorPicker.value = rgba2hex(event.target.style.backgroundColor);
            } else {
                    event.target.style.backgroundColor = colorPicker.value;
                }
            }
        }, false);

        pixels[i].addEventListener("mousedown", function(event) {
            if(radioButtons[1].checked===true) {
                event.target.style.backgroundColor = randomColor();
            } else if (radioButtons[2].checked===true) {
                event.target.style.backgroundColor = LightenDarkenColor(rgba2hex(event.target.style.backgroundColor.toString()), 16);
            } else if (radioButtons[3].checked===true) {
                event.target.style.backgroundColor = LightenDarkenColor(rgba2hex(event.target.style.backgroundColor.toString()), -16);
            } else if (radioButtons[4].checked===true) {
                radioButtons[0].checked = true;
                colorPicker.value = rgba2hex(event.target.style.backgroundColor);
            } else {
                event.target.style.backgroundColor = colorPicker.value;
            }
        }, false);

        pixels[i].style.height = Math.floor(800/Math.sqrt(pixels.length)) - 1;
        pixels[i].style.width = Math.floor(800/Math.sqrt(pixels.length)) - 1;
    }
}

//toggles gridlines
function stylizeGrid() { 
    for(i=0; i < pixels.length; i++) {
        if(checkBoxes[0].checked === true) {
            pixels[i].style.borderColor = "grey";
        } else {
            pixels[i].style.borderColor = "transparent";
        }
    }
}

//toggle functions to determine the current state of the mouse
//as far as i'm aware there is no better way to do this in javascript
document.body.addEventListener("mousedown", function() {
    mouseDown = true;
});

document.body.addEventListener("mouseup", function() {
    mouseDown = false;
});

//when the gridline checkbox is clicked, change style of gridlines
checkBoxes[0].addEventListener("change", function(event) { 
    stylizeGrid();
});

//when the reset button is clicked, reset the canvas 
//by setting every pixel to white
document.getElementById("reset").addEventListener("click", function( event ) {
    for(i = 0; i < pixels.length; i++) {
        pixels[i].style.backgroundColor = "#FFFFFF";
    }
});

//return a random color hexcode
function randomColor() {
    return "#"+Math.floor(Math.random()*16777215).toString(16);
}

//update the current slider value whenever its dragged to a new value
slider.oninput = function() {
  output.innerHTML = this.value;
} 


//when the slider is clicked, create a new grid of desired value
slider.addEventListener("click", function(event) {
    let currentRowAmount = rows.length;
    for (r = currentRowAmount - 1; r > -1; r--) {
        rows[r].remove(); //remove all rows currently onscreen
    }
    makeRows(this.value); //remake grid at size equal to slider val
    makeColumns(this.value);
    clickPixel(); //add pixel click events to new pixels
});

//take a hex color and adjust it by the specified amt
function LightenDarkenColor(col, amt) {
    function adjust(match){
        return ('0' + Math.min(255, Math.max(0, parseInt(match, 16) + amt)).toString(16)).substr(-2);
    }    

    return (
        '#' +
        col
          .replace(/^#/, '')
          .replace(/../g, adjust)
      );
}

defaultGrid();