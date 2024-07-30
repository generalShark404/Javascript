// Selectors for input field and buttons
const values = document.querySelector('.value');
const buttons = document.querySelectorAll('button');

// Variable to store the current input and the result
let currentInput = '';

// Iterate through each button and add a click event listener
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const buttonText = e.target.innerText;

    if (buttonText === 'C') {
      // Clear all inputs and reset display
      values.value = '';
      currentInput = '';
    } else if (buttonText === 'CE') {
      // Remove the last character from the input and update the display
      currentInput = currentInput.slice(0, -1);
      values.value = currentInput;
    } else if (buttonText === '=') {
      // Evaluate the expression and display the result
      try {
        values.value = eval(currentInput) || '';
        currentInput = values.value;
      } catch (error) {
        values.value = 'Error';
        currentInput = '';
      }
    } else {
      // Append the clicked button text to the current input
      currentInput += buttonText;
      values.value = currentInput;
    }
  });
});