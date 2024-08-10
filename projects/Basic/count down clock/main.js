document.addEventListener('DOMContentLoaded', () => {
   // Select the "Start" button
   const startCountButton = document.querySelector('.startCount');
   let timeinterval;

   // Add an event listener to the "Start" button
   startCountButton.addEventListener('click', () => {
       clearInterval(timeinterval);
       // Get user input values for days, hours, and minutes
       const userInputDays = parseInt(document.querySelector('.userDays').value) || 0;
       const userInputHours = parseInt(document.querySelector('.userHours').value) || 0;
       const userInputMinutes = parseInt(document.querySelector('.userMinutes').value) || 0;

       // Calculate the deadline date based on the user inputs
       const deadline = new Date(Date.parse(new Date()) + userInputDays * 24 * 60 * 60 * 1000 + userInputHours * 60 * 60 * 1000 + userInputMinutes * 60 * 1000);
       
       // Initialize the clock with the calculated deadline
       initializeClock('.clock', deadline);


    //    document.querySelector('.userDays').disabled = true;
    //    document.querySelector('.userHours').disabled = true;
    //    document.querySelector('.userMinutes').disabled = true;

     
   });

   // Function to calculate the time remaining until the deadline
   function getTimeRemaining(endtime) {
       // Calculate the total milliseconds remaining
       const total = Date.parse(endtime) - Date.parse(new Date());
       // Calculate the remaining seconds, minutes, hours, and days
       const seconds = Math.floor((total / 1000) % 60);
       const minutes = Math.floor((total / 1000 / 60) % 60);
       const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
       const days = Math.floor(total / (1000 * 60 * 60 * 24));

       // Return an object with the remaining time components
       return { total, days, hours, minutes, seconds };
   }

   // Function to initialize the clock and update it every second
   function initializeClock(selector, endtime) {
       // Select the clock elements
       const clock = document.querySelector(selector);
       const daysSpan = clock.querySelector('.days');
       const hoursSpan = clock.querySelector('.hours');
       const minutesSpan = clock.querySelector('.min');
       const secondsSpan = clock.querySelector('.sec');

       // Function to update the clock display
       function updateClock() {
           // Get the remaining time
           const t = getTimeRemaining(endtime);

           // Update the clock display with the remaining time
           daysSpan.textContent = t.days;
           hoursSpan.textContent = ('0' + t.hours).slice(-2);
           minutesSpan.textContent = ('0' + t.minutes).slice(-2);
           secondsSpan.textContent = ('0' + t.seconds).slice(-2);

           // Stop the clock if the countdown is complete
           if (t.total <= 0) {
               clearInterval(timeinterval);
           }
       }

       // Update the clock display immediately
       updateClock();
       // Set an interval to update the clock display every second
        timeinterval = setInterval(updateClock, 1000);
   };

});