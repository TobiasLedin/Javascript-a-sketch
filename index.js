
/*--- Constants and variables ---*/
const canvas = document.getElementById('canvas-sketch');
const container = document.getElementById('main-container');
var wheelX = document.getElementById('wheel-x');
var wheelY = document.getElementById('wheel-y');
let initX = canvas.width * 0.5;
let initY = canvas.height * 0.5;
let x = initX;
let y = initY;
let Xdeg = 0;
let Ydeg = 0;
let outputXdeg = 0;
let outputYdeg = 0;
let outputdeg = 10;
let toErase;
let toFade;
const gaNorm = 1;
let ga;
let ctx;

/*--- Check for browser support ---*/
if (canvas.getContext('2d')) {
    ctx = canvas.getContext('2d');
}
else {
    window.alert('Your browser does not support canvas');
}

/*--- Sketch draw function with support for arrow keys and Numpad ---*/
function sketch(option) {

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgb(33, 20, 18)";
    ctx.beginPath();
    ctx.moveTo(x, y);

    switch (option.key) {

        case 'ArrowUp':
            if (y > ctx.lineWidth) {
                y -= ctx.lineWidth;
                Ydeg -= outputdeg;
                rotateY();
            }
            break;
        case 'ArrowDown':
            if (y < (canvas.height - ctx.lineWidth)) {
                y += ctx.lineWidth;
                Ydeg += outputdeg;
                rotateY();
            }
            break;
        case 'ArrowLeft':
            if (x > ctx.lineWidth) {
                x -= ctx.lineWidth;
                Xdeg -= outputdeg;
                rotateX();
            }
            break;

        case 'ArrowRight':
            if (x < (canvas.width - ctx.lineWidth)) {
                x += ctx.lineWidth;
                Xdeg += outputdeg;
                rotateX();
            }
            break;
        case '1':
            if (x > ctx.lineWidth && y < (canvas.height - ctx.lineWidth)) {
                x -= ctx.lineWidth;
                y += ctx.lineWidth;
                Xdeg -= outputdeg;
                Ydeg += outputdeg;
                rotateX();
                rotateY();
            }
            break;
        case '2':
            if (y < (canvas.height - ctx.lineWidth)) {
                y += ctx.lineWidth;
                Ydeg += outputdeg;
                rotateY();
            }
            break;
        case '3':
            if (x < (canvas.width - ctx.lineWidth) && y < (canvas.height - ctx.lineWidth)) {
                x += ctx.lineWidth;
                y += ctx.lineWidth;
                Xdeg += outputdeg;
                Ydeg += outputdeg;
                rotateX();
                rotateY();
            }
            break;
        case '4':
            if (x > ctx.lineWidth) {
                x -= ctx.lineWidth;
                Xdeg -= outputdeg;
                rotateX();
            }
            break;
        case '6':
            if (x < (canvas.width - ctx.lineWidth)) {
                x += ctx.lineWidth;
                Xdeg += outputdeg;
                rotateX();
            }
            break;
        case '7':
            if (x > ctx.lineWidth && y > ctx.lineWidth) {
                x -= ctx.lineWidth;
                y -= ctx.lineWidth;
                Xdeg -= outputdeg;
                Ydeg -= outputdeg;
                rotateX();
                rotateY();
            }
            break;
        case '8':
            if (y > ctx.lineWidth) {
                y -= ctx.lineWidth;
                Ydeg -= outputdeg;
                rotateY();
            }
            break;
        case '9':
            if (x < (canvas.width - ctx.lineWidth) && y > ctx.lineWidth) {
                x += ctx.lineWidth;
                y -= ctx.lineWidth;
                Xdeg += outputdeg;
                Ydeg -= outputdeg;
                rotateX();
                rotateY();
            }
            break;
        default:
            break;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}

/*--- Left wheel rotation animation ---*/
function rotateX() {
    outputXdeg = Xdeg % 360;
    wheelX.style.transform = "rotate(" + outputXdeg +"deg)";
}

/*--- Right wheel rotation animation ---*/
function rotateY() {
    outputYdeg =  Ydeg % 360;
    wheelY.style.transform = "rotate(" + outputYdeg +"deg)";
}

/*--- Fade out/erase (timer function) ---*/
function eraseTimer() {
    container.classList.add("shake");
    ctx.globalAlpha = 0;
    toErase = setTimeout(erase, 2300);
    toFade = setInterval(fade, 90);
}

/*--- Fade out/erase (fade strokes function) ---*/
function fade() {
    ctx.globalAlpha += 0.025;
    ctx.fillStyle = "rgb(207, 180, 145)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/*--- Fade out/erase (erase/reset values function) ---*/
function erase() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearInterval(toFade);
    ctx.globalAlpha = gaNorm;
    container.classList.remove("shake");
}

/*--- Begin sketching on page load ---*/
window.addEventListener('load', sketch);
/*--- Keyboard input listener used by sketch function ---*/
window.addEventListener('keydown', sketch);
/*--- "Shake" button listener to initiate Fade out/erase functions ---*/
document.getElementById("erasebtn").addEventListener("click", eraseTimer);

