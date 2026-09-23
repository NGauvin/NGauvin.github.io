//helper function to get random numbers
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//car body colors
const carColors = [
    '#41a8a2',
    '#91d247',
    '#625f9d',
    '#2a0a5e',
    '#80d8f7',
    '#9c58ac',
    '#e77c68'
];

//creates a car and adds it to the road
const createCar = (container, color, xPos, yPos) => {
    const carElement = document.createElement('div');
    carElement.classList.add('car');
    carElement.style.left = `${xPos}%`;
    carElement.style.top = `${yPos}px`;

    const body = document.createElement('div');
    body.classList.add('car-body');
    body.style.backgroundColor = color;

    const roof = document.createElement('div');
    roof.classList.add('car-roof');
    roof.style.backgroundColor = color;

    const window = document.createElement('div');
    window.classList.add('car-window');

    const wheelLeft = document.createElement('div');
    wheelLeft.classList.add('car-wheel-left');

    const wheelRight = document.createElement('div');
    wheelRight.classList.add('car-wheel-right');

    carElement.appendChild(roof);
    carElement.appendChild(window);
    carElement.appendChild(body);
    carElement.appendChild(wheelLeft);
    carElement.appendChild(wheelRight);

    container.appendChild(carElement);
};

//generates random cars on page load
const generateCars = () => {
    const road = document.getElementById('road');
    const numberOfCars = getRandomNumber(6, 10);

    const laneYPositions = [
        { min: 10, max: 45 },
        { min: 110, max: 145 }
    ];

    for (let i = 0; i < numberOfCars; i++) {
        const color = carColors[getRandomNumber(0, carColors.length - 1)];
        const xPos = getRandomNumber(2, 88);
        const selectedLane = laneYPositions[getRandomNumber(0, 1)];
        const yPos = getRandomNumber(selectedLane.min, selectedLane.max);

        createCar(road, color, xPos, yPos);
    }
};

//load cars when window loads
window.onload = () => {
    generateCars();
};