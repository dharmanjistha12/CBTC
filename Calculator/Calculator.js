let screen = document.getElementById('screen');
buttons = document.querySelectorAll('button');
let screenValue = '';
let arr = Array.from(buttons);
arr.forEach(button => {
	button.addEventListener('click', (e) => {
		buttonText = e.target.innerText;
		console.log(buttonText);
		if (buttonText == 'x') {
			buttonText = '*';
			screenValue += buttonText;
			screen.value = screenValue;
		}
		else if (buttonText == '÷') {
			buttonText = '/';
			screenValue += buttonText;
			screen.value = screenValue;
		}
		else if (buttonText == '=') {
			screenValue = eval(screenValue);
			screen.value = screenValue;
		}
		else if (buttonText == 'C') {
			screenValue = '';
			screen.value = screenValue;
		}
		else if (buttonText == '⌫') {
			screenValue = screenValue.slice(0, (screenValue.length - 1));
			screen.value = screenValue;
		}
		else {
			screenValue += buttonText;
			screen.value = screenValue;
		}
	})
});