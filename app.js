/**
 * Date: 27-02-2024
 * Author: Sharmin Akhi
 * Description: Color picker application with huge dom functionalities
 */


// Globals
let toastContainer = null;
const defaultColor = {
    red: 221,
    green: 222,
    blue: 238
}

window.onload = () => {
    main();
    updateColorCodeToDom(defaultColor);
};

function main() {

    //Dom Reference
    const generateRandomColorBtn = document.getElementById('generate-random-color');

    const colorModeHex = document.getElementById('input-hex');
    const colorSliderRed = document.getElementById('color-slider-red');
    const colorSliderGreen = document.getElementById('color-slider-green');
    const colorSliderBlue = document.getElementById('color-slider-blue');

    const copyToClipBoardBtn = document.getElementById('copy-to-clipboard')





    //Event Listener
    generateRandomColorBtn.addEventListener('click', handelGenerateRandomColorBtn);

    colorModeHex.addEventListener('keyup', handelColorModHex);

    colorSliderRed.addEventListener('change', handelColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue));
    colorSliderGreen.addEventListener('change', handelColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue));
    colorSliderBlue.addEventListener('change', handelColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue));

    copyToClipBoardBtn.addEventListener('click', copyToClipBoard);
}

// function 1 - generate three random decimal number for red, green and blue
// return as an object
function generateColorDecimal() {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);

    return {
        red,
        green,
        blue,
    };
}

// function 2 - generate hex color code
function generateHexColor({ red, green, blue }) {
    const getTwoCode = (value) => {
        const hex = value.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    };

    return `${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
        blue
    )}`.toUpperCase();
}

// function 3 - generate rgba color code
function generateRGBColor({ red, green, blue }) {
    return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * convert hex color to decimal colors object
 * @param {string} hex
 * @returns {object}
 */
function hexToDecimalColors(hex) {
    const red = parseInt(hex.slice(0, 2), 16);
    const green = parseInt(hex.slice(2, 4), 16);
    const blue = parseInt(hex.slice(4), 16);

    return {
        red,
        green,
        blue
    };
}

//event handler
function handelGenerateRandomColorBtn() {
    const color = generateColorDecimal();
    updateColorCodeToDom(color)
}


function handelColorModHex(e) {
    const hexColor = e.target.value;
    if (hexColor) {
        // colorModeHex.value = hexColor.toUpperCase();
        this.value = hexColor.toUpperCase();
        if (isValidHex(hexColor)) {
            const color = hexToDecimalColors(hexColor);
            updateColorCodeToDom(color)
        }
    }
}


function handelColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue) {


    return function () {
        const color = {
            red: parseInt(colorSliderRed.value),
            green: parseInt(colorSliderGreen.value),
            blue: parseInt(colorSliderBlue.value)
        };
        updateColorCodeToDom(color)
    }
}


function copyToClipBoard() {
    const colorModeRadios = document.getElementsByName('color-mode');
    const mode = getCheckValueFromRadio(colorModeRadios)

    if (mode === null) {
        throw new Error('Invalid Radio Input')
    }

    if (toastContainer !== null) {
        toastContainer.remove();
        toastContainer = null;
    }

    if (mode === 'hex') {
        const hexColor = document.getElementById('input-hex').value;
        if (hexColor && isValidHex(hexColor)) {
            navigator.clipboard.writeText(`#${hexColor}`);
            generateToastMessage(`#${hexColor}`)
        } else {
            alert('Invalid Hex Color')
        }
    } else {
        const rgbColor = document.getElementById('input-rgb').value;
        if (rgbColor) {
            navigator.clipboard.writeText(`${rgbColor}`);
            generateToastMessage(`${rgbColor}`)
        } else {
            alert('Invalid RGB Color')
        }

    }
}





//Dom Function
/**
 * Generate a dynamic DOM element to show toast message
 * @param {string} msg 
 */
function generateToastMessage(msg) {
    toastContainer = document.createElement('div');
    toastContainer.innerText = msg;
    toastContainer.className = 'toast-message toast-message-slide-in';

    toastContainer.addEventListener('click', function () {
        toastContainer.classList.remove('toast-message-slide-in');
        toastContainer.classList.add('toast-message-slide-out');

        toastContainer.addEventListener('animationend', function () {
            toastContainer.remove();
            toastContainer = null;
        });
    });

    document.body.appendChild(toastContainer);
}


/**
 * find the checked element from a list of radio button
 * @param {Array} nodes 
 * @returns{string / null}
 */
function getCheckValueFromRadio(nodes) {
    let checkedValue = null;
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].checked) {
            checkedValue = nodes[i].value;
            break;
        }
    }
    return checkedValue;
}









/**
 * update dom element with calculate color values
 * @param {object} color 
 */

function updateColorCodeToDom(color) {

    const hexColor = generateHexColor(color);
    const rgbColor = generateRGBColor(color);

    document.getElementById('color-display').style.backgroundColor = `#${hexColor}`;
    document.getElementById('input-hex').value = hexColor;
    document.getElementById('input-rgb').value = rgbColor;

    document.getElementById('color-slider-red').value = color.red;
    document.getElementById('color-slider-red-label').innerText = color.red;

    document.getElementById('color-slider-green').value = color.green;
    document.getElementById('color-slider-green-label').innerText = color.green;

    document.getElementById('color-slider-blue').value = color.blue;
    document.getElementById('color-slider-blue-label').innerText = color.blue;



}




/**
 * @param {string} color : ;
 */
function isValidHex(color) {
    if (color.length !== 6) return false;
    return /^[0-9A-Fa-f]{6}$/i.test(color);
}


