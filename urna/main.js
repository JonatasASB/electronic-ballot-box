//Seleção de elementos
let voteIndication = document.querySelector('.division-left--1 span');
let office = document.querySelector('.division-left--2 span');
let description = document.querySelector('.division-left--4 ');
let informative = document.querySelector('.division-2');
let photos = document.querySelector('.division-1--right');
let numbersOutput = document.querySelector('.division-left--3');

let currentStage = 0;
let numbersInput = '';

function startStage() {

    let numberHTML = '';

    let step = etapas[currentStage];

    for (let i = 0; i < step.numeros; i++) {
        if (i === 0) {
            numberHTML += `<div class="numbers blink"></div>`
        } else {
            numberHTML += `<div class="numbers"></div>`
        }
    }

    voteIndication.style.display = 'none';
    office.innerHTML = step.titulo;
    description.innerHTML = '';
    informative.innerHTML = '';
    photos.innerHTML = '';
    numbersOutput.innerHTML = numberHTML
}
startStage()
function updateInterface() {
    alert('fim')
}
function clicking(number) {
    let numberElement = document.querySelector('.numbers.blink');
    if (numberElement !== null) {
        numberElement.innerHTML = number;
        numbersInput = `${numbersInput}${number}`;
        numberElement.classList.remove('blink')
        if (numberElement.nextElementSibling !== null) {
            numberElement.nextElementSibling.classList.add('blink');
        } else {
            updateInterface()
        }
    }

};
function white() {
    alert('BRANCO')
};

function toCorrect() {
    alert('CORRIGE')
};

function confirm() {
    alert('CONFIRMA')
};