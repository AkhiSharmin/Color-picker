/**
 * Date: 27-02-2024
 * Author: Sharmin Akhi
 * Description: Color picker application with huge dom functionalities
 */

/**
 * Project Requirements:
 * - Change the background color by generating random hex color by clicking a button
 * - Also display the hex code to a disabled input field
 * - Add a button to copy the color code
 * - Add a toast message when copied
 * - User can type their own hex code too
 * - show rgb color too, but do not need to edit it
 * - user can also copy the rgb color code
 */

// Steps

// Globals
let div = null;

window.onload = () => {
    main();
};

function main() {
    const root = document.getElementById('root');
    const output = document.getElementById('output');
    const output2 = document.getElementById('output2');
    const changeBtn = document.getElementById('change-btn');
    const copyBtn = document.getElementById('copy-btn');
    const copyBtn2 = document.getElementById('copy-btn2');

    changeBtn.addEventListener('click', function () {
        const color = generateColorDecimal();
        const hex = generateHexColor(color);
        const rgb = generateRGBColor(color);
        root.style.backgroundColor = hex;
        output.value = hex.substring(1);
        output2.value = rgb;
    });

    copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(`#${output.value}`);
        if (div !== null) {
            div.remove();
            div = null;
        }
        if (isValidHex(output.value)) {
            generateToastMessage(`#${output.value} copied`);
        } else {
            alert('Invalid Color Code');
        }
    });

    copyBtn2.addEventListener('click', function () {
        navigator.clipboard.writeText(`#${output2.value}`);
        if (div !== null) {
            div.remove();
            div = null;
        }
        if (isValidHex(output.value)) {
            generateToastMessage(`#${output2.value} copied`);
        } else {
            alert('Invalid Color Code');
        }
    });

    output.addEventListener('keyup', function (e) {
        const color = e.target.value;
        if (color) {
            output.value = color.toUpperCase();
            if (isValidHex(color)) {
                root.style.backgroundColor = `#${color}`;
                output2.value = hexToRgb(color);
            }
        }
    });
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

    return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
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

console.log(hexToRgb('FFFFFF'));

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
 * @param {string} color : ;
 */
function isValidHex(color) {
    if (color.length !== 6) return false;
    return /^[0-9A-Fa-f]{6}$/i.test(color);
}


