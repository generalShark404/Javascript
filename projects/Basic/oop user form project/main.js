class CourseApp {
   constructor() {
       this.courses = [];
       this.init();
   }

   init() {
       document.querySelector('form').addEventListener('submit', (e) => this.handleFormSubmit(e));
   }

   handleFormSubmit(e) {
       e.preventDefault();

       const customerName = document.querySelector('#customerName').value.trim();
       const courseName = document.querySelector('#courseName').value.trim();
       const authorName = document.querySelector('#authorName').value.trim();
       const courseImg = document.querySelector('#imgPath').value.trim();
       const errorMssg = document.querySelector('#error');

       errorMssg.style.display = 'none';
       errorMssg.innerHTML = '';

       if (customerName && courseName && authorName) {
           this.addCourse(customerName, courseName, authorName, courseImg);
           this.clearFields();
       } else {
           errorMssg.style.display = 'block';
           if (!customerName) {
               errorMssg.innerHTML += `<br><i>Book Name cannot be empty!</i>`;
           }
           if (!courseName) {
               errorMssg.innerHTML += `<br><i>Course cannot be empty!</i>`;
           }
           if (!authorName) {
               errorMssg.innerHTML += `<br><i>Author name cannot be empty!</i>`;
           }
       }
   }

   addCourse(customerName, courseName, authorName, courseImg) {
       const coursesContainer = document.querySelector('.courses');
       const noImg = courseImg ? courseImg : 'img/no-course-cover.png';
       const courseHTML = `
           <div class="course">
               <div class="img">
                   <img src="${noImg}" alt="Course Cover">
               </div>
               <div id="details">
                   <span><h2 class='inline name'>Name:&nbsp;&nbsp;</h2><i>${customerName}</i></span><br> 
                   <span><h2 class='inline Course'>Course:</h2><i>${courseName}</i></span><br>
                   <span><h2 class='inline author'>Author:</h2><i>${authorName}</i></span>
               </div>
           </div>
       `;
       coursesContainer.innerHTML += courseHTML;
   }

   clearFields() {
       document.querySelector('#customerName').value = '';
       document.querySelector('#courseName').value = '';
       document.querySelector('#authorName').value = '';
       document.querySelector('#imgPath').value = '';
   }
}

document.addEventListener('DOMContentLoaded', () => new CourseApp());