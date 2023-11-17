let timerInterval;
let isTimerRunning = false;
let restMode = false;
let minutes = 0;
let seconds = 0;

document.getElementById("start-button").addEventListener("mouseover", mouseOverButton);
document.getElementById("start-button").addEventListener("mouseleave", mouseOffButton);
document.getElementById("start-button").addEventListener("click", toggleTimer);

function toggleTimer() {
    if (isTimerRunning) {
        pauseTimer();
    } else if (isTimerRunning == false && document.getElementById("start-button").innerText == "Descanso") {
        startRest();
        startTimer();
    } else if (restMode && document.getElementById("start-button").innerText == "Iniciar") {
        stopRest();
        startTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
    isTimerRunning = true;
    changeStButtonText("Pausar");
}

function pauseTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    changeStButtonText("Continuar");
}

function updateTimer() {
    seconds++;

    if (seconds == 60) {
        seconds = 0;
        minutes++;

        if (minutes == 5 && restMode) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            changeStButtonText("Iniciar");
            document.getElementById("alarm-sound").play();
        }

        if (minutes == 25) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            changeStButtonText("Descanso");
            document.getElementById("alarm-sound").play();
        }
    }

    const formattedTime = formatTime(minutes, seconds);
    document.getElementById("timer-clock").innerText = formattedTime;
}

function startRest() {
    minutes = 0;
    seconds = 0;
    restMode = true;
    document.body.style.backgroundColor = "rgb(72, 209, 204)";
    document.body.style.transition = "all 1s"
}

function stopRest() {
    minutes = 0;
    seconds = 0;
    restMode = false;
    document.body.style.backgroundColor = "";
}

function formatTime(minutes, seconds) {
    return (padZero(minutes) + ':' + padZero(seconds));
}

function padZero(value) {
    return value < 10 ? '0' + value : value;
}

function changeStButtonText(text) {
    document.getElementById("start-button").innerText = text;
}

function mouseOverButton() {
    if (restMode) {
        document.getElementById("start-button").style.backgroundColor = "white";
        document.getElementById("start-button").style.color = "rgb(72, 209, 204)";
    } else {
        document.getElementById("start-button").style.backgroundColor = "white";
        document.getElementById("start-button").style.color = "rgb(244, 105, 90)";
    }
}

function mouseOffButton() {
    document.getElementById("start-button").style.backgroundColor = "";
    document.getElementById("start-button").style.color = "";
}