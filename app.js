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
};



const defaultPresetColors = [
    '#ffcdd2',
    '#f8bbd0',
    '#e1bee7',
    '#ff8a80',
    '#ff80ab',
    '#ea80fc',
    '#b39ddb',
    '#9fa8da',
    '#90caf9',
    '#b388ff',
    '#8c9eff',
    '#82b1ff',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#80d8ff',
    '#84ffff',
    '#a7ffeb',
    '#c8e6c9',
    '#dcedc8',
    '#f0f4c3',
    '#b9f6ca',
    '#ccff90',
    '#ffcc80',
];
let customColors = new Array(24);
const copySound = new Audio('/src_project-10_copy-sound.wav')

window.onload = () => {
    main();
    updateColorCodeToDom(defaultColor);
    //display preset color
    displayColorBoxes(
        document.getElementById('preset-colors'), defaultPresetColors
    );
    const customColorsString = localStorage.getItem('custom-colors');
    if (customColorsString) {
        customColors = JSON.parse(customColorsString);
        displayColorBoxes(document.getElementById('custom-colors'), customColors);
    }
};

function main() {

    //Dom Reference
    const generateRandomColorBtn = document.getElementById('generate-random-color');

    const colorModeHex = document.getElementById('input-hex');
    const colorSliderRed = document.getElementById('color-slider-red');
    const colorSliderGreen = document.getElementById('color-slider-green');
    const colorSliderBlue = document.getElementById('color-slider-blue');

    const copyToClipBoardBtn = document.getElementById('copy-to-clipboard')

    const presetColorParent = document.getElementById('preset-colors');

    const saveToCustomBtn = document.getElementById('save-to-custom');
    const customColorParent = document.getElementById('custom-colors');




    //Event Listener
    generateRandomColorBtn.addEventListener('click', handelGenerateRandomColorBtn);

    colorModeHex.addEventListener('keyup', handelColorModHex);

    colorSliderRed.addEventListener('change', handelColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue));
    colorSliderGreen.addEventListener('change', handelColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue));
    colorSliderBlue.addEventListener('change', handelColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue));


    saveToCustomBtn.addEventListener('click', handelSavetoCustomBtn(customColorParent, colorModeHex))


    copyToClipBoardBtn.addEventListener('click', copyToClipBoard);

    presetColorParent.addEventListener('click', handelPresetColorsParent);
}


function handelPresetColorsParent(event) {
    const child = event.target;
    if (child.className === 'color-box') {
        navigator.clipboard.writeText(child.getAttribute('data-color'))
        const dataColor = child.getAttribute('data-color');
        if (toastContainer !== null) {
            toastContainer.remove();
            toastContainer = null;
        }
        generateToastMessage(dataColor)
        copySound.volume = 0.5;
        copySound.play()
    }
}


function handelSavetoCustomBtn(customColorParent, inputHex) {

    return function () {
        const color = `#${inputHex.value}`;
        if (customColors.includes(color)) {
            alert(`Awww Already Saved in your Preset List 🫠`);
            return;
        }
        customColors.unshift(color);
        if (customColors.length > 24) {
            customColors = customColors.slice(0, 24);
        }
        localStorage.setItem('custom-colors', JSON.stringify(customColors));

        removeChildren(customColorParent);
        displayColorBoxes(customColorParent, customColors);
    };
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
 * create a div element with class name color-box
 * @param {string} color 
 * @returns {object}
 */

function generateColorBox(color) {
    const div = document.createElement('div')
    div.className = 'color-box';
    div.style.backgroundColor = color;
    div.setAttribute('data-color', color);

    return div;
}

/**
 * this function will colors and append new color boxes to its parent
 * @param {object} parent 
 * @param {array} colors 
 */

function displayColorBoxes(parent, colors) {
    colors.forEach((color => {
        if (isValidHex(color.slice(1))) {
            const colorBox = generateColorBox(color);
            parent.appendChild(colorBox)
        }
    }))
}

/**
 * remove all children from parent
 * @param {object} parent 
 */

function removeChildren(parent) {
    let child = parent.lastElementChild;
    while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
}


/**
 * @param {string} color : ;
 */
function isValidHex(color) {
    if (color.length !== 6) return false;
    return /^[0-9A-Fa-f]{6}$/i.test(color);
}


