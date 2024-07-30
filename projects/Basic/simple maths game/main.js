document.addEventListener('DOMContentLoaded', () => {
   const firstNumb = document.querySelector("#firstNum");
   const secondNumb = document.querySelector("#secondNum");
   const answer = document.querySelector("#ans");
   const checkBtn = document.querySelector("#check");
   const correct = document.querySelector("#correct");
   const wrong = document.querySelector("#wrong");
 
   let num1 = Math.floor(Math.random() * 100);
   let num2 = Math.floor(Math.random() * 100);
 
   // Display random numbers
   function displayNumb(num1, num2) {
     firstNumb.textContent = num1;
     secondNumb.textContent = num2;
     return num1 + num2;
   }
 
   // Validate user input
   checkBtn.addEventListener("click", () => {
     const userAnswer = parseInt(answer.value, 10);
     const correctAnswer = displayNumb(num1, num2);
 
     if (userAnswer === correctAnswer) {
       correct.style.display = "block";
       wrong.style.display = "none";
     } else {
       wrong.style.display = "block";
       correct.style.display = "none";
     }
 
     answer.value = "";
 
     setTimeout(() => {
       correct.style.display = "none";
       wrong.style.display = "none";
       // Reload for new numbers
       location.reload();
     }, 2000);
   });
 
   // Initialize with random numbers
   displayNumb(num1, num2);
 });