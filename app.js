let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let intervalId;
const display = document.getElementById('time-display');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(time) {
    let date = new Date(time);
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}.${milliseconds}`;
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function startPauseTimer() {
    if (isRunning) {
        clearInterval(intervalId);
        startPauseButton.textContent = 'Start';
        startPauseButton.classList.remove('active');
    } else {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 10);
        startPauseButton.textContent = 'Pause';
        startPauseButton.classList.add('active');
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(intervalId);
    isRunning = false;
    startPauseButton.textContent = 'Start';
    startPauseButton.classList.remove('active');
    elapsedTime = 0;
    display.textContent = '00:00:00.00';
    lapsList.innerHTML = '';
}

function logLap() {
    if (!isRunning) return;
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}

startPauseButton.addEventListener('click', startPauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', logLap);
