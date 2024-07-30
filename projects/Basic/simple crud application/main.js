document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const input = document.querySelector('#inp');
    const msg = document.querySelector('.msg');
    const posts = document.querySelector('.posts');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formValidation();
    });
  
    const formValidation = () => {
      if (input.value.trim() === '') {
        msg.innerHTML = 'Post cannot be blank';
      } else {
        msg.innerHTML = '';
        acceptData();
      }
      setTimeout(() => {
        msg.innerHTML = '';
      }, 2000);
    };
  
    let data = {};
  
    const acceptData = () => {
      data['text'] = input.value;
      createPost();
      console.log(data);
    };
  
    const createPost = () => {
      posts.innerHTML += `
        <div>
          <p>${data.text}</p>
          <span class="options">
            <i onclick="editPost(this)" class="fas fa-edit"></i>
            <i onclick="deletePost(this)" class="fas fa-trash-alt"></i>
          </span>
        </div>
      `;
      input.value = "";
    };
  
    window.deletePost = (e) => {
      e.parentElement.parentElement.remove();
    };
  
    window.editPost = (e) => {
      input.value = e.parentElement.previousElementSibling.innerHTML;
      e.parentElement.parentElement.remove();
    };
  });
  