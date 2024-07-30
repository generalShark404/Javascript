const generateQbtn = document.getElementById('btn');
const quote = document.getElementById('quote');
const narrator = document.getElementById('narrator');
const welcomeMsg = document.querySelector('.welcomeMsg');
const networkError = document.querySelector('.networkError');

const api_url = 'https://type.fit/api/quotes';
fetch(api_url)
    .then(response => response.json())
    .then(data => {
      generateQbtn.addEventListener('click',()=>{
        welcomeMsg.classList.add('d-none');

        let random = Math.floor(Math.random()*data.length)
        let Quote=data[random]
        quote.textContent=Quote.text
        narrator.textContent=Quote.author.split(',')[0]
      });
    })
    .catch((error) =>{ 
      error == 'TypeError: NetworkError when attempting to fetch resource.' ? networkError.classList.remove('d-none') : networkError.classList.add('d-none');
    });

    console.log(api_url)


let name = 'alamin haidar, aliyu';
let str1 = name.split(',')[0]
// let str = str1.splice(0, ',');
console.log(str1)