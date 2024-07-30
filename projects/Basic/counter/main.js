document.addEventListener('DOMContentLoaded', () => {
  let countNum = document.getElementById('cNum');
  let addNum = document.getElementById('add');
  let lowerNum = document.getElementById('lower');
  let resetNum = document.getElementById('reset');
  
  function counter(){
    let num = 0;
    
    countNum.innerText = 0;
    
  
    addNum.addEventListener('click',() => {
       countNum.innerText = ++num
    });
  
    lowerNum.addEventListener('click', () => {
      num <= 0 ? countNum.innerText = 0 : countNum.innerText = --num;
    });
  
    resetNum.addEventListener('click',() => {
        num = 0
        countNum.innerText = num
    })
  };

  counter();

});  
