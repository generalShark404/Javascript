let textbox = document.querySelector("#textbox");
let count_variable = document.querySelector("#countVar");
let countBtn = document.querySelector("#countBtn");

function wordCount(){
    countBtn.addEventListener('click', ()=>{
        let value = textbox.value;
        let length = value.trim().length;
        count_variable.innerHTML = `${length.toLocaleString("en")} words.`;
    })
}
wordCount()