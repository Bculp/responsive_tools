const timerText = document.querySelector('#timer-text');
const returnText = document.querySelector('#return-text');
const arrows = document.querySelectorAll('[data-arrow]');
const progressBar = document.querySelector('#progress');
let myInterval, beginTime, endTime, secondsLeft, totalSeconds, firstCall = true, running = false, paused = false;

const minutesElement = document.querySelector('#minutes');
const secondsElement = document.querySelector('#seconds');
const startResetBtns = document.querySelectorAll('.button');
const startBtn = startResetBtns[0];
const resetBtn = startResetBtns[1];

function getTime() {
	let time = `${minutesElement.textContent}:${secondsElement.textContent}`;
	return time;
}

// buttons at top or side for set times and then a place to enter a time
// or just click on the timer to set time
/* 

***** SHMOOP WANTS THE CLOCK BIGGER AND TO GET RID OF THE FANCY INC/DEC BTNS
SINCE SHE CAN TYPE IN THE TIME
ALSO WANTS THE PROGRESS BAR TO BE BIGGER

*/

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
	// timerText.innerHTML = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
	// document.title = timerText.innerHTML;
	document.title = `${minutes}:${textSeconds}`;

	// ** ---- THIS WILL NEED MINUTES REMAINING AS WELL AS SECONDS!! ---- **** //
	displayProgressBar(totalTimeRemainingInSeconds);
	// remaining seconds as percentage of original seconds
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
	// let currentTime = timerText.innerHTML.split(':');
	let minutes = Number(minutesElement.innerHTML);
	let seconds = Number(secondsElement.innerHTML);
	if (this.dataset.arrow === 'increment') {
		seconds += 1;
		if (seconds > 59) {
			minutes += 1;
			seconds = 0;
		}
		let newSecondTotal = minutes * 60 + seconds;
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

arrows.forEach(arrow => arrow.addEventListener('click', changeTime));

startBtn.addEventListener('click', () => {
	let seconds = Number(minutesElement.textContent) * 60 + Number(secondsElement.textContent);
	if (!seconds) return alert('Error! Please enter a valid time!')
	if (running) {
		running = false;
		paused = true;
		startBtn.textContent = 'Start';
		return clearInterval(myInterval);
	} else {
		running = true;
		startBtn.textContent = 'Pause';
		if (!paused) firstCall = true;
		paused = false;
	}
	runTimer(seconds);
})

resetBtn.addEventListener('click', resetTimer);

// arrows don't work if time is counting down. they decrease/inc time but then
//  it goes back to whatever it was before clicking them