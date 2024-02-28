/**
 * Date: 27-02-2024
 * Author: Sharmin Akhi
 * Description: Color picker application with huge dom functionalities
 */


// Globals
let div = null;

window.onload = () => {
    main();
};

function main() {
    const generateRandomColorBtn = document.getElementById('generate-random-color');

    const colorModeHex = document.getElementById('input-hex')



    generateRandomColorBtn.addEventListener('click', handelGenerateRandomColorBtn);



    colorModeHex.addEventListener('keyup', handelColorModHex);


    //     copyBtn.addEventListener('click', function () {
    //         navigator.clipboard.writeText(`#${output.value}`);
    //         if (div !== null) {
    //             div.remove();
    //             div = null;
    //         }
    //         if (isValidHex(output.value)) {
    //             generateToastMessage(`#${output.value} copied`);
    //         } else {
    //             alert('Invalid Color Code');
    //         }
    //     });

    //     copyBtn2.addEventListener('click', function () {
    //         navigator.clipboard.writeText(`#${output2.value}`);
    //         if (div !== null) {
    //             div.remove();
    //             div = null;
    //         }
    //         if (isValidHex(output.value)) {
    //             generateToastMessage(`#${output2.value} copied`);
    //         } else {
    //             alert('Invalid Color Code');
    //         }
    //     });


    // 
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



//Dom Function

function generateToastMessage(msg) {
    div = document.createElement('div');
    div.innerText = msg;
    div.className = 'toast-message toast-message-slide-in';

    div.addEventListener('click', function () {
        div.classList.remove('toast-message-slide-in');
        div.classList.add('toast-message-slide-out');

        div.addEventListener('animationend', function () {
            div.remove();
            div = null;
        });
    });

    document.body.appendChild(div);
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


