document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.querySelector('#numb');
  const submitBtn = document.querySelector('#submitBtn');
  const feedback = document.querySelector('#feedback');
  const previousGuess = document.querySelector('#previousGuess');
  const guessesRemaining = document.querySelector('#guessesRemaining');
  let guessCount = 10;
  let randomNumb = Math.floor(Math.random() * 100) + 1;

  // Function to handle guess submission
  function handleGuess() {
      const userGuess = parseInt(inputField.value);

      if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
          showFeedback('Please enter a number between 1 and 100.', 'error');
          return;
      }

      // Check if the guess is correct
      if (userGuess === randomNumb) {
          showFeedback('Correct! You guessed the number!', 'success');
          endGame();
      } else {
          guessCount--;
          if (guessCount === 0) {
              showFeedback(`Game over! The correct number was ${randomNumb}.`, 'error');
              endGame();
          } else {
              updatePreviousGuesses(userGuess);
              updateGuessesRemaining();
              giveHint(userGuess);
          }
      }
      clearInput();
  }

  // Function to show feedback messages
  function showFeedback(message, type) {
      feedback.textContent = message;
      feedback.style.display = 'block';
      feedback.className = type === 'error' ? 'error' : 'success';
  }

  // Function to clear the input field
  function clearInput() {
      inputField.value = '';
  }

  // Function to update the previous guesses
  function updatePreviousGuesses(guess) {
      previousGuess.textContent += ` ${guess}`;
  }

  // Function to update the number of guesses remaining
  function updateGuessesRemaining() {
      guessesRemaining.textContent = `Guesses Remaining: ${guessCount}`;
  }

  // Function to give a hint if the guess was too high or too low
  function giveHint(guess) {
      if (guess > randomNumb) {
          showFeedback('Too high! Try again!', 'error');
      } else {
          showFeedback('Too low! Try again!', 'error');
      }
  }

  // Function to end the game
  function endGame() {
      inputField.disabled = true;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Game Over';
  }

  // Event listener for the submit button
  submitBtn.addEventListener('click', handleGuess);
});