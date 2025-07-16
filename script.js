const canvas = document.getElementById("chalkboard");
const ctx = canvas.getContext("2d");
const projectsPage = document.getElementById("projects");
const linksPage = document.getElementById("links");

let drawing = false;
let currentColor = "black";

const validTools = ["eraser", "black", "red", "blue", "green"];

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

function loadPage(p) {
    unloadPages()
    closeNav()
    if (p == "projects") {
        projectsPage.style.display = "block";
        projectsPage.style.height = "100%";
    } else if (p == "links") {
        linksPage.style.display = "block";
        linksPage.style.height = "100%";
    }
}

function unloadPages() {
    projectsPage.style.height = 0;
    projectsPage.style.display = "none";
    linksPage.style.height = 0;
    linksPage.style.display = "none";
}

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
    ctx.fillText("carterclifton.ca",centerX, centerY - 200);

    const img = new Image();
    img.src = "assets/whale.svg"
    const imgScaling = 0.15

    img.onload = function() {
        ctx.drawImage(img, centerX - img.width * imgScaling / 2, centerY - img.height * imgScaling / 2 + 60, img.width * imgScaling, img.height * imgScaling);
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