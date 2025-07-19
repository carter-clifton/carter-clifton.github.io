const canvas = document.getElementById("chalkboard");
const ctx = canvas.getContext("2d");

let drawing = false;
let currentColor = "black";

let validTools = ["eraser", "black", "red", "blue", "green"]

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    closeNav();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    loadBaseImage();
}

function selectTool(t) {
    if (validTools.includes(t)) {
        currentColor = t;
    }
    closeNav();
}

function openNav() {
    document.getElementById("sidePanel").style.width = "250px";
}

function closeNav() {
    document.getElementById("sidePanel").style.width = "0";
}

function loadBaseImage() {
    ctx.font = "75px Helvetica";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Error",centerX, centerY - 200);
    ctx.font = "50px Helvetica"
    ctx.fillText("Page Not Found",centerX, centerY + 30);

    const img = new Image();
    img.src = "assets/error404.svg"
    const imgScaling = 1.8

    img.onload = function() {
        ctx.drawImage(img, centerX - img.width * imgScaling / 2, centerY - img.height * imgScaling / 2 - 80, img.width * imgScaling, img.height * imgScaling);
    };
}

canvas.addEventListener("mousedown", (e) => {

    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);

});

canvas.addEventListener("mouseup", () => {

    drawing = false;
    ctx.beginPath();

});

canvas.addEventListener("mousemove", (e) => {

    if (!drawing) return;
    
    if (currentColor === "eraser") {
        ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    } else {
        ctx.strokeStyle = currentColor;
    }
    ctx.lineWidth = document.getElementById("markerWidth").value * 5

    ctx.lineCap = "round";
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.moveTo(e.offsetX, e.offsetY);

});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

