let d;
let molds = [];
let num = 4000;
let isRunning = false;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    background(100, 5);
    angleMode(DEGREES);

    loadPixels();
    d = pixelDensity();

    // Set up event listeners for controls
    document.getElementById('startBtn').addEventListener('click', startSimulation);
    document.getElementById('stopBtn').addEventListener('click', stopSimulation);
    document.getElementById('numMolds').addEventListener('change', updateNumMolds);
    document.getElementById('sensorAngle').addEventListener('change', updateSensorAngle);
    document.getElementById('sensorDistance').addEventListener('change', updateSensorDistance);

    // Initialize molds
    createMolds();
}

function draw() {
    if (isRunning) {
        background(0, 5);
        loadPixels();
        for (let i = 0; i < molds.length; i++) {
            molds[i].update();
            molds[i].display();
        }
        updatePixels();
    }
}

function createMolds() {
    molds = [];
    for (let i = 0; i < num; i++) {
        molds.push(new Mold(random(width), random(height)));
    }
}

function startSimulation() {
    isRunning = true;
}

function stopSimulation() {
    isRunning = false;
}

function updateNumMolds() {
    num = parseInt(this.value);
    createMolds();
}

function updateSensorAngle() {
    let angle = parseInt(this.value);
    molds.forEach(mold => mold.sensorAngle = angle);
}

function updateSensorDistance() {
    let distance = parseInt(this.value);
    molds.forEach(mold => mold.sensorDistance = distance);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}