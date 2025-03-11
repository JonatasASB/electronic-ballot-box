//Seleção de elementos
let voteIndication = document.querySelector('.division-left--1 span');
let office = document.querySelector('.division-left--2 span');
let description = document.querySelector('.division-left--4 ');
let informative = document.querySelector('.division-2');
let photos = document.querySelector('.division-1--right');
let numbersOutput = document.querySelector('.division-left--3');
let audioOps = document.querySelector('.ops');
let audioFim = document.querySelector('.fim');
let audioInter = document.querySelector('.inter');
let animationEnd = document.querySelector('.animation-end');

let currentStage = 0;
let numbersInput = '';
let voteWhite = false;
let votes = [];
let voteConfirmed = false;

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
    animationEnd.innerHTML = '';
}
function updateInterface() {

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
    let step = etapas[currentStage];
    if (step !== undefined) {
        if (numbersInput === '') {
            voteWhite = true;
            voteIndication.style.display = 'block';
            numbersOutput.innerHTML = '';
            description.innerHTML = `<span class="blink" style="font-size: 2em; position: absolute; font-weight: bold; margin-left: 50px">VOTO EM BRANCO</span>`;
            informative.style.display = 'flex'
        } else {
            alert('Aperte em corrigir para votar em branco')
        }
    } else {
        alert('Voto já confirmado')
    }
};

function toCorrect() {
    if (currentStage < 2) {
        audioOps.play()
        startStage()
    }
};

function confirm() {
    let step = etapas[currentStage];
    if (voteWhite === true && step !== undefined) {
        voteConfirmed = true
        votes.push({
            titulo: step.titulo,
            voto: 'BRANCO'
        });
    } else if (numbersInput.length === step.numeros && step !== undefined) {
        voteConfirmed = true
        votes.push({
            titulo: step.titulo,
            voto: numbersInput
        });
    }
    if (voteConfirmed && numbersInput.length === step.numeros || voteConfirmed && voteWhite) {
        currentStage++;
        if (etapas[currentStage] !== undefined) {
            audioInter.play()
            startStage()
        } else {
            voteIndication.innerHTML = '';
            informative.innerHTML = ''
            office.innerHTML = '';
            description.innerHTML = '';
            photos.innerHTML = '';
            numbersOutput.innerHTML = '';
            animationEnd.innerHTML = `<div class="animation-fac">
                </div>
                <div class="recording">GRAVANDO</div>`
            setTimeout(() => {
                document.querySelector('.screen').innerHTML = `<div class = "screen blink" style = "justify-content: center; align-items:center; font-size: 100px; font-weight: bold; letter-spacing: 10px">FIM<div>`
                console.log(votes)
                audioFim.play()
            }, 5000);
        }
    }
    console.log(voteConfirmed)
    console.log(currentStage)
}
startStage()