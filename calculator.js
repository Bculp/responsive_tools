// mobile stopped working when changed event listeners so had to make output var instead of const
var output = document.querySelector('#output');
const buttons = document.querySelectorAll('.item');
let buttonsArray = Array.from(buttons);
let equation = '';
let validNums = ['0','1','2','3','4','5','6','7','8','9','.'];
let validOperators = ['(', ')', '%', '/','X','x','*','-','+','=','÷','×', 'C', 'Enter'];
let result = 0;
let currentBtnPressed = '';


function pressButton(...args) {
	console.log(this.textContent)

	this.classList ? this.classList.add('button-pressed') : '';

	let input = args[1] || this.textContent;
	console.log(input)
	if (input === '=' || input === 'Enter') {
		result = compute(equation)
		output.textContent = result;
		equation = result;
	} else if (input === 'C') {
		equation = '';
		output.textContent = '0';
	} else if (input === '%') {
		let numAsPercent = Number(equation / 100);
		equation = numAsPercent.toString();
		output.textContent = equation;
	} else {
		equation += input;
		// only show input in box - dont' allow it run outside the box
		// check the length of input and if it's greater only show from the end of input to length inwards
		// handle the case that input or output is longer than the allowed space in the text box
		// round for output but stop adding for input


		// not sure how to do!!
		output.textContent = equation;
	}
}

function compute(equation) {
	let invalidEndings = ['.', '%', '/', 'X', 'x','*', '-', '+'];
	// chop off last element if it's an operator or decimal
	if (invalidEndings.includes(equation[equation.length-1])) {
		equation = equation.slice(0, -1);
	}

	// button pressing effect doesn't work on mobile. Class is added, but don't see effect.

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
})


document.addEventListener('keydown', function(e) {
	let key = e.key.toString();
	if (key === '/') key = '÷';
	if (key === '*') key = '×';
	if (key === 'Backspace') key = 'C';

	if (validNums.includes(key) || validOperators.includes(key)) {

		// search for DOM element then add class to it & set variable to it for easy removal
		let DOMelement = buttonsArray.find(element => {
			return element.textContent == key || element.dataset.value == key})

		DOMelement.classList.add('button-pressed');
		currentBtnPressed = DOMelement;

		pressButton(null, key)
	}
})

document.addEventListener('keyup', function() {
		currentBtnPressed.classList.remove('button-pressed');
		currentBtnPressed = '';
})
