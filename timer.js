const timerText = document.querySelector('#timer-text');
const returnText = document.querySelector('#return-text');

// buttons at top or side for set times and then a place to enter a time
// or just click on the timer to set time

/* 
let first = Date.now();
let second = Date.now();

(second - first) / 1000  ->>> will give time elapsed in seconds

have a certain amoutn of time in seconds and want to display that and count down to 0
can show seconds - time elapsed and update every second

*/

let firstTime = Date.now();
let secondTime = Date.now();
let secondsElapsed = 0;
let lessThanZero = false;
let timeRemaining = 0;

function runTimer(seconds) {
	console.log('calling fn')
	if (lessThanZero) return clearInterval(myInterval);
	
	// if (firstCall) firstTime = Date.now();
	// add flag for running first time to set firstTime in the initial call to this fn?

	secondTime = Date.now();
	secondsElapsed = Math.round((secondTime - firstTime) / 1000);
	secondsRemaining = seconds - secondsElapsed;
	if (secondsRemaining < 0) return lessThanZero = true;
	// return secondsRemaining;
	console.log(secondsRemaining);
	// minutes = 0;
	let secondsText = secondsRemaining;
	secondsText = secondsText < 10 ? '0' + secondsText : secondsText;
	// minutes = minutes > 9 ? minutes : 
	timerText.textContent = '00:' + secondsText;
}

let seconds = 5;

let myInterval = setInterval(() => {
	runTimer(seconds);
}, 1000);
