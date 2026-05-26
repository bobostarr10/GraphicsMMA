// CANVAS SETUP

const canvas = document.getElementById("solarCanvas");
const ctx = canvas.getContext("2d");

// Center of the canvas
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// ANIMATION VARIABLES

// Earth orbit angle
let earthAngle = 0;

// Moon orbit angle
let moonAngle = 0;

// Animation speed
let speed = 0.03;

// Pause control
let isPaused = false;

// DRAW STARS BACKGROUND

function drawStars() {
    for (let i = 0; i < 100; i++) {

        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;

        ctx.fillStyle = "white";

        // RASTERIZATION STAGE
        // Converting star coordinates
        // into visible pixels
        ctx.fillRect(x, y, 2, 2);
    }
}

// Create stars once
drawStars();

// DRAW SOLAR SYSTEM

function drawSolarSystem() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawStars();

    // DRAW SUN

    ctx.beginPath();

    // RASTERIZATION STAGE
    // Drawing the sun pixels
    // onto the canvas
    ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);

    ctx.fillStyle = "yellow";
    ctx.fill();

    // EARTH ORBIT PATH

    ctx.beginPath();
    ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);

    ctx.strokeStyle = "white";
    ctx.stroke();

    // GEOMETRY STAGE
    // Calculating Earth's position
    // using trigonometry

    let earthX = centerX + Math.cos(earthAngle) * 150;
    let earthY = centerY + Math.sin(earthAngle) * 150;

    // DRAW EARTH

    ctx.beginPath();

    // RASTERIZATION STAGE
    // Earth coordinates converted
    // into visible graphics
    ctx.arc(earthX, earthY, 20, 0, Math.PI * 2);

    ctx.fillStyle = "blue";
    ctx.fill();

    // MOON ORBIT PATH

    ctx.beginPath();
    ctx.arc(earthX, earthY, 50, 0, Math.PI * 2);

    ctx.strokeStyle = "gray";
    ctx.stroke();

    // GEOMETRY STAGE
    // Calculating Moon position
    // around the Earth

    let moonX = earthX + Math.cos(moonAngle) * 50;
    let moonY = earthY + Math.sin(moonAngle) * 50;

    // DRAW MOON

    ctx.beginPath();

    // RASTERIZATION STAGE
    // Rendering moon pixels
    ctx.arc(moonX, moonY, 8, 0, Math.PI * 2);

    ctx.fillStyle = "lightgray";
    ctx.fill();

    // UPDATE ANIMATION

    if (!isPaused) {

        // Geometry transformations
        earthAngle += speed;
        moonAngle += speed * 2;
    }

    // Repeat animation
    requestAnimationFrame(drawSolarSystem);
}

// Start animation
drawSolarSystem();

// BUTTON CONTROLS

const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {

    isPaused = !isPaused;

    if (isPaused) {
        toggleBtn.textContent = "Play";
    } else {
        toggleBtn.textContent = "Pause";
    }
});

// SPEED CONTROL

const speedControl = document.getElementById("speedControl");

speedControl.addEventListener("input", () => {

    speed = speedControl.value * 0.01;
});