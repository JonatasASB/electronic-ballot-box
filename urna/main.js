//Seleção de elementos
let voteIndication = document.querySelector('.division-left--1 span');
let office = document.querySelector('.division-left--2 span');
let description = document.querySelector('.division-left--4 ');
let informative = document.querySelector('.division-2');
let photos = document.querySelector('.division-1--right');
let numbersOutput = document.querySelector('.division-left--3');

let currentStage = 0;
let numbersInput = '';
let voteWhite = false;

function startStage() {

    let numberHTML = '';
    numbersInput = '';
    voteWhite = false

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
    informative.style.display = 'none'
    photos.innerHTML = '';
    numbersOutput.innerHTML = numberHTML
}
startStage()
function updateInterface() {
    console.log(numbersInput)
    let step = etapas[currentStage];

    let candidate = step.candidatos.filter((item) => {
        if (item.numero === numbersInput) {
            return true
        } else {
            return false
        }
    });
    if (candidate.length > 0) {
        voteIndication.style.display = 'block';
        description.innerHTML = `Nome: ${candidate[0].nome}<br>
        Partido: ${candidate[0].partido}<br>
        Vice: ${candidate[0].vice}`;
        informative.style.display = 'flex'
        let photosHTML = '';
        for (let i in candidate[0].fotos) {
            console.log(candidate[0].fotos[i].small)
            if (candidate[0].fotos[i].small) {
                photosHTML += `<div class="division-right--img small">
                        <img src="urna/images/${candidate[0].fotos[i].url}" alt="">
                        <span>${candidate[0].fotos[i].legenda}</span>
                    </div>`
            } else {
                photosHTML += `<div class="division-right--img">
                            <img src="urna/images/${candidate[0].fotos[i].url}" alt="">
                            <span>${candidate[0].fotos[i].legenda}</span>
                        </div>`
            }
        }
        photos.innerHTML = photosHTML
    } else {
        description.innerHTML = `<span class="blink" style="font-size: 3em; text-align: center"; font-weight: bold>VOTO NULO</span>`;
        voteIndication.style.display = 'block'
        informative.style.display = 'flex'
    }
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
    if (numbersInput === '') {
        voteWhite = true;
        voteIndication.style.display = 'block';
        numbersOutput.innerHTML = '';
        description.innerHTML = `<span class="blink" style="font-size: 2em; position: absolute; font-weight: bold; margin-left: 50px">VOTO EM BRANCO</span>`;
        informative.style.display = 'flex'
    } else {
        alert('Aperte em corrigir para votar em branco')
    }
};

function toCorrect() {
    startStage()
};

function confirm() {
    let voteConfirmed = false
    let step = etapas[currentStage];
    if (voteWhite === true) {
        voteConfirmed = true
        console.log('VOTO EM BRANCO')
    } else if (numbersInput.length === step.numeros) {
        voteConfirmed = true
        console.log('VOTO NULO OU CANDIDATO:', numbersInput)
    }
    if (voteConfirmed) {

        if (etapas[currentStage] !== undefined) {
            currentStage++;
            startStage()
        } else {

        }

    }

};