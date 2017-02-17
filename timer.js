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
const audio = document.querySelector('audio');
let mainInterval, beginTime, endTime, secondsLeft, totalSeconds, 
firstCall = true, running = false, paused = false, endTimeInterval;

audio.playbackRate = 1.2;

function runTimer(seconds) {
	clearInterval(mainInterval);
	beginTime = Date.now();
	endTime = beginTime + seconds * 1000;
	displayTimeLeft(seconds);
	displayReturnTime(endTime);
	displayProgressBar(seconds);
	mainInterval = setInterval(() => {
		secondsLeft = Math.round((endTime - Date.now()) / 1000);
		if (secondsLeft < 1) {
			clearInterval(mainInterval);
			displayTimeLeft(0);
			createInterval();
			endTimeInterval = setInterval(createInterval, 2000);
			returnText.textContent = "Time's Up!";
			returnText.classList.add('pop-up');
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
	clearInterval(mainInterval);
	displayTimeLeft(0);
	startBtn.textContent = 'Start';
	paused = false;
	returnText.classList.remove('pop-up');
	returnText.textContent = '';
	clearInterval(endTimeInterval);
}

function addTime() {
	let timeInSeconds = Number(this.textContent) * 60;
	if (running) pauseToChangeTime();
	totalSeconds = timeInSeconds;
	displayTimeLeft(timeInSeconds);
}

function pauseToChangeTime() {
	running = false;
	startBtn.textContent = 'Start';
	clearInterval(mainInterval);
}

function createInterval() {
	let audioInterval = setInterval(() => audio.play(), 80);
	setTimeout(() => clearInterval(audioInterval), 600);
}

startBtn.addEventListener('click', () => {
	let seconds = Number(minutesElement.textContent) * 60 + Number(secondsElement.textContent);
	if (!seconds) return alert('Please enter a valid time!')
	if (running) {
		pauseToChangeTime();
		paused = true;
		return clearInterval(mainInterval);
	}
	running = true;
	startBtn.textContent = 'Pause';
	if (!paused) firstCall = true;
	paused = false;
	runTimer(seconds);
})

resetBtn.addEventListener('click', resetTimer);
presetTimes.forEach(selector => selector.addEventListener('click', addTime));
arrows.forEach(arrow => arrow.addEventListener('click', changeTime));

