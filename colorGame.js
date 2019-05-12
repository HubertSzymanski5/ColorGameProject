// generate colors
var numSquares = 6;
var colors = [];

// get squares
var squaresList = document.querySelectorAll(".square");

// get header
var h1 = document.querySelector("h1");

// get message
var messageDisplay = document.querySelector("#message");

// get buttons
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

// pick color
var colorDisplay = document.querySelector("#colorDisplay");
var pickedColor;

init();

// --- FUNCTIONS --- //

function init() {
    // mode buttons event listeners
    setupModeButtons();

    // squares listeners and stuff
    setupSquares();

    // reset button listener
    resetButton.addEventListener("click", reset);

    // reset when everything is ready
    reset();
}

function changeColors(color) {
    // loop through all squares
    for (var i = 0; i < colors.length; i++) {
        // change each color to match given color
        squaresList[i].style.backgroundColor = color;
    }
}


function pickColor() {
    var randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function generateRandomColors(num) {
    // make an array
    var arr = [];

    // add num random colors to array
    for (var i = 0; i < num; i++) {
        // get random color and push into array
        arr.push(randomColor());
    }

    // return that array
    return arr;
}

function randomColor() {
    // pick a R from 0 to 255
    var r = Math.floor(Math.random() * 256);
    // pick a G from 0 to 255
    var g = Math.floor(Math.random() * 256);
    // pick a B from 0 to 255
    var b = Math.floor(Math.random() * 256);

    // combine that shit into one color
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function reset() {
    // generate all new colors
    colors = generateRandomColors(numSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    // change colorDisplay to match pickedColor
    colorDisplay.textContent = pickedColor;
    // change colors of squares
    for (var i = 0; i < squaresList.length; i++) {
        if (colors[i]) {
            squaresList[i].style.display = "block";
            squaresList[i].style.backgroundColor = colors[i];
        } else {
            squaresList[i].style.display = "none";
        }
    }
    // change text of resetButton
    resetButton.textContent = "New Colors";
    // reset background
    h1.style.backgroundColor = document.body.style.backgroundColor;
    // reset message display
    messageDisplay.textContent = "";
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            // set right button
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            // figure out how many squares to show
            if (this.textContent === "Easy") {
                numSquares = 3;
            } else {
                numSquares = 6;
            }

            // pick new colors
            // pick new pickedColor
            // update page to reflect changes
            reset();
        });
    }
}

function setupSquares() {
    // give squares the right color and add listeners
    for (var i = 0; i < squaresList.length; i++) {

        // add click listeners to squares
        squaresList[i].addEventListener("click", function () {
            // grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            // compare color to pickedColor ?? but why, while I can store right index
            if (clickedColor === pickedColor) {
                // print message
                messageDisplay.textContent = "Correct!";
                // change all square colors
                changeColors(clickedColor);
                // change h1 color
                h1.style.backgroundColor = pickedColor;
                // change resetButton text
                resetButton.textContent = "Play Again";
            } else {
                // fade out
                this.style.backgroundColor = document.body.style.backgroundColor;
                // print message
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}