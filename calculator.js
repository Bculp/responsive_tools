// mobile stopped working when changed event listeners so had to make output var instead of const
var output = document.querySelector('#output');
const buttons = document.querySelectorAll('.item');
let equation = '';
let validNums = ['0','1','2','3','4','5','6','7','8','9','.'];
let validOperators = ['(', ')', '%', '/','X','x','*','-','+','='];
let result = 0;

function pressButton(...args) {

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
		output.textContent = equation;
	}
}

function compute(equation) {
	// should shop off last element if it's an operator or decimal
	// handle the case that input or output is longer than the allowed space in the text box
	// round for output but stop adding for input
	// button pressing effect doesn't work on mobile. Class is added, but don't see effect.

	// Replace all instances of x and ÷ with * and / respectively. This can be done easily using regex and the 'g' tag which will replace all instances of the matched character/substring
	equation = equation.replace(/\u00D7/g, '*').replace(/\u00F7/g, '/');
	result = 0;
	return eval(equation);
}

buttons.forEach(button => {
	button.addEventListener('mousedown', pressButton);
	button.addEventListener('mouseup', function() {
		if (this.classList.contains('button-pressed')) {
			this.classList.remove('button-pressed');
		}
	});
})

document.addEventListener('keydown', function(e) {
	if (validNums.includes(e.key) || validOperators.includes(e.key) || e.key === 'Enter') {
		console.log('e is: ', e.key)
		console.log(buttons[4])
		// buttons[4].classList.add('button-pressed');
		// console.log('this is:', this)
		pressButton(null, e.key)
	}
})

document.addEventListener('keyup', function() {
	// if (this.classList.contains('button-pressed')) {
	// 	this.classList.remove('button-pressed');
	// }
		// buttons[4].classList.remove('button-pressed');
			console.log('key event')


})
