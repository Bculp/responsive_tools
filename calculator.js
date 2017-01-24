const output = document.querySelector('#output');
const buttons = document.querySelectorAll('.item');
let stack = '';
let validNums = ['0','1','2','3','4','5','6','7','8','9','.'];
let validOperators = ['(', ')', '%', '/','X','x','*','-','+','='];
let result = 0;

function pressButton(...args) {

	let input = args[1] || this.textContent;
	console.log(input)
	if (input === '=' || input === 'Enter') {
		result = compute(stack)
		output.textContent = result;
		stack = result;
	} else if (input === 'Clear') {
		stack = '';
		output.textContent = '0';
	} else if (input === '%') {
		let numAsPercent = Number(stack / 100);
		stack = numAsPercent.toString();
		output.textContent = stack;
	} else {
		stack += input;
		output.textContent = stack;
	}
}

function compute(stack) {
	// should shop off last element if it's an operator or decimal
	// Replace all instances of x and ÷ with * and / respectively. This can be done easily using regex and the 'g' tag which will replace all instances of the matched character/substring
			// equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
	result = 0;
	return eval(stack);
}

buttons.forEach(button => {
	button.addEventListener('click', pressButton);
})

document.addEventListener('keypress', (e) => {
	if (validNums.includes(e.key) || validOperators.includes(e.key) || e.key === 'Enter') {
		pressButton(null, e.key)
	}
})
