// mobile stopped working when changed event listeners so had to make output var instead of const
var output = document.querySelector('#output');
const buttons = document.querySelectorAll('.item');
const buttonsArray = Array.from(buttons);
const validOperators = ['(', ')', '%', '/','X','x','*','-','+','=','÷','×', 'C', 'Enter', 'Backspace'];
const validNums = ['0','1','2','3','4','5','6','7','8','9','.'];
let equation = '', result = 0, currentBtnPressed = '', display = '';
let callsToCheckDisplayLength = 0;

function pressButton(...args) {
	this.classList ? this.classList.add('button-pressed') : '';

	function checkDisplayLength(equation) {
		display = equation;
		if (display.length > 12) {
			if (callsToCheckDisplayLength < 12) callsToCheckDisplayLength++;
			return display.slice(callsToCheckDisplayLength);
		}
		return display;
	}

	function checkEnterDisplayLength(equation) {
		display = equation;
		while (display.length > 12) {
			display = display.slice(1);
		}
		return display;
	}

	let input = args[1] || this.textContent;
	if (input === '=' || input === 'Enter') {
		result = compute(equation)
		equation = result;
		display = checkEnterDisplayLength(equation)
		output.textContent = display;
	} else if (input === 'C') {
		equation = '';
		output.textContent = '0';
		callsToCheckDisplayLength = 0;
	} else if (input === 'Backspace') {
		equation = equation.slice(0,-1);
		output.textContent = equation;
	} else if (input === '%') {
		let numAsPercent = Number(equation / 100);
		equation = numAsPercent.toString();
		display = checkDisplayLength(equation);
		output.textContent = display;
	} else {
		equation += input;
		display = checkDisplayLength(equation)
		output.textContent = display;
	}
}

function compute(equation) {
	let invalidEndings = ['.', '%', '/', 'X', 'x','*', '-', '+'];
	// chop off last element if it's an operator or decimal
	if (invalidEndings.includes(equation[equation.length-1])) {
		equation = equation.slice(0, -1);
	}

	// Replace all instances of x and ÷ with * and / respectively. This can be done easily using regex and the 'g' tag which will replace all instances of the matched character/substring
	equation = equation.replace(/\u00D7/g, '*').replace(/\u00F7/g, '/');
	result = 0;
	return eval(equation);
}

buttonsArray.forEach(button => {
	button.addEventListener('mousedown', pressButton);
	button.addEventListener('mouseup', function() {
		if (this.classList.contains('button-pressed')) {
			this.classList.remove('button-pressed');
		}
	});
});

document.addEventListener('keydown', function(e) {
	let key = e.key.toString();
	if (key === '/') key = '÷';
	if (key === '*') key = '×';

	if (validNums.includes(key) || validOperators.includes(key)) {

		// search for DOM element then add class to it & set variable to it for easy removal
		let DOMelement = buttonsArray.find(element => {
			return element.textContent == key || element.dataset.value == key
		})

		DOMelement.classList.add('button-pressed');
		currentBtnPressed = DOMelement;
		pressButton(null, key);
	}
});

document.addEventListener('keyup', function() {
	if (!currentBtnPressed) return;
	currentBtnPressed.classList.remove('button-pressed');
	currentBtnPressed = '';
});
