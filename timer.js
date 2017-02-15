const timerText = document.querySelector('#timer-text');
const returnText = document.querySelector('#return-text');
const arrows = document.querySelectorAll('[data-arrow]');
const progressBar = document.querySelector('#progress');
const minutesElement = document.querySelector('#minutes');
const secondsElement = document.querySelector('#seconds');
const startResetBtns = document.querySelectorAll('.button');
const startBtn = startResetBtns[0];
const resetBtn = startResetBtns[1];
const presetTimes = document.querySelectorAll('.preset-time');
let myInterval, beginTime, endTime, secondsLeft, totalSeconds, firstCall = true, running = false, paused = false;

function runTimer(seconds) {
	clearInterval(myInterval);
	beginTime = Date.now();
	endTime = beginTime + seconds * 1000;
	displayTimeLeft(seconds);
	displayReturnTime(endTime);
	displayProgressBar(seconds);
	myInterval = setInterval(() => {
		secondsLeft = Math.round((endTime - Date.now()) / 1000);
		if (secondsLeft < 1) {
			clearInterval(myInterval);
		}
		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft(seconds) {
	let minutes = Math.floor(seconds / 60);
	let remainingSeconds = seconds % 60;
	let totalTimeRemainingInSeconds = minutes * 60 + remainingSeconds;
	let textSeconds = `${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
	minutesElement.innerHTML = minutes;
	secondsElement.innerHTML = textSeconds;
	document.title = `${minutes}:${textSeconds}`;
	displayProgressBar(totalTimeRemainingInSeconds);
}

function displayReturnTime(timestamp) {
	let endingTime = new Date(timestamp);
	let hours = endingTime.getHours();
	let minutes = endingTime.getMinutes();
	returnText.innerHTML = `Return at ${hours > 12 ? hours -= 12 : hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function displayProgressBar(seconds) {
	if (firstCall) {
		totalSeconds = seconds;
		firstCall = false;
	}
	let percentage = 100 - (seconds / totalSeconds * 100);
	progressBar.style.height = `${percentage}%`;
}

function changeTime() {
	let minutes = Number(minutesElement.innerHTML);
	let seconds = Number(secondsElement.innerHTML);
	if (this.dataset.arrow === 'increment') {
		seconds += 1;
		if (seconds > 59) {
			minutes += 1;
			seconds = 0;
		}
		let newSecondTotal = minutes * 60 + seconds;
		if (running) pauseToChangeTime();
		displayTimeLeft(newSecondTotal)
	}
	if (this.dataset.arrow === 'decrement') {
		if (seconds <= 0 && minutes <= 0) return;
		seconds -= 1;
		if (seconds < 0) {
			minutes -= 1;
			seconds = 59;
		}
		let newSecondTotal = minutes * 60 + seconds;
		if (running) pauseToChangeTime();
		displayTimeLeft(newSecondTotal);
	}
}

function resetTimer() {
	clearInterval(myInterval);
	displayTimeLeft(0);
	returnText.innerHTML = '';
	startBtn.textContent = 'Start';
	paused = false;
}

function addTime() {
	let timeInSeconds = Number(this.textContent) * 60;
	if (running) pauseToChangeTime();
	displayTimeLeft(timeInSeconds);
}

function pauseToChangeTime() {
	running = false;
	startBtn.textContent = 'Start';
	clearInterval(myInterval);
}

arrows.forEach(arrow => arrow.addEventListener('click', changeTime));

startBtn.addEventListener('click', () => {
	let seconds = Number(minutesElement.textContent) * 60 + Number(secondsElement.textContent);
	if (!seconds) return alert('Error! Please enter a valid time!')
	if (running) {
		pauseToChangeTime();
		paused = true;
		return clearInterval(myInterval);
	}
	running = true;
	startBtn.textContent = 'Pause';
	if (!paused) firstCall = true;
	paused = false;
	runTimer(seconds);
})

resetBtn.addEventListener('click', resetTimer);

presetTimes.forEach(selector => selector.addEventListener('click', addTime));
