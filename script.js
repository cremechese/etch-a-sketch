const container = document.getElementById("container");
let rows = document.getElementsByClassName("row");
let pixels = document.getElementsByClassName("pixel");

defaultGrid();

function defaultGrid() {
    makeRows(16);
    makeColumns(16);
}

function makeRows(amount) {
    for (r = 0; r < amount; r++) {
        container.appendChild(document.createElement("div")).className= "row";
    }
}

function makeColumns(amount) {
    for (r = 0; r < rows.length; r++) {
        for (c = 0; c < amount; c++) {
            rows[r].appendChild(document.createElement("div")).className = "pixel"
        }
    }
}

for(i=0; i < pixels.length; i++) {
pixels[i].addEventListener("click", function( event ) {
    event.target.style.backgroundColor = "purple";
  }, false);
}