const scales = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "A#",
    "C#",
    "D#",
    "F#",
    "G#",
    "Ab",
    "Bb",
    "Db",
    "Eb",
    "Gb"
]
console.log(scales);

let currMaxRand = scales.length;
let timer = null;

const setCompletedSpeech = new SpeechSynthesisUtterance("Set completed");
const scaleText = document.querySelector('h1');
const bpmInput = document.querySelector("input");
const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");


function getRandom(max) {
    return Math.floor(Math.random() * (max+1));
}

function getRandomScale() {
    if(currMaxRand === 0) {
        return -1
    }
    let randomIndex = getRandom(currMaxRand -1);
    let randomItems = scales[randomIndex];

    console.log("randomIndex", randomIndex);
    [ scales[currMaxRand -1], scales[randomIndex] ] = [ scales[randomIndex], scales[currMaxRand -1] ];
    console.log(scales);
    
    currMaxRand--;
    return randomItems; 
}



function getAudioText(key, scaleType = "Major") {
    let mid = " "
    if(key[1] === "#") {
        mid=" Sharp ";
    } else if(key[1] === "b") {
        mid=" Flat ";
    }
    return `${key[0]}${mid}${scaleType}`
}

function start() {
    const BPM = Number(bpmInput.value);
    if(isNaN(BPM)) {
        return;
    }
    const ms = (16/(BPM/60))*1000;
    timer = setInterval(() => {
        let key = getRandomScale();
        if(key === -1) {
            speechSynthesis.speak(new SpeechSynthesisUtterance("Set completed"));
            reset();
            return;
        }

        let scaleType = "Major";
        scaleText.innerHTML = key + " " + scaleType;

        const scaleAudio = new SpeechSynthesisUtterance(getAudioText(key, scaleType));
        speechSynthesis.speak(scaleAudio);

    }, ms);
    startBtn.disabled = true;
    resetBtn.disabled = false;
}

function reset() {
    clearInterval(timer);
    resetBtn.disabled = true;
    startBtn.disabled = false;
    scaleText.innerHTML = "C major";
    currMaxRand = scales.length;
}

startBtn.addEventListener('click', start);
resetBtn.addEventListener('click', reset);