let wrapper = document.querySelector('.wrapper') 
let lvlBtns = document.querySelectorAll('.difficulty_level_num') 
let startBtn = document.querySelector('.difficulty_start') 
let difficulty;


startBtn.addEventListener('click', function () {
   let activeLvl =document.querySelector('.difficulty_level_num.active')
   if (activeLvl) {
      difficulty = activeLvl.dataset.lvl
      request({
         url:'test.html',
         responseType:'',
         onSuccess:(data)=>{
            wrapper.innerHTML = data
            document.querySelector('.difficultyLvl').innerHTML = difficulty

         },
         onError:(data)=>{
            console.log(data);
         }

      })
   }else{
      console.log('Ошибка!');
   }
   
   
}) 
for (let i = 0; i < lvlBtns.length; i++) {
   function hide() {
      for (let el = 0; el < lvlBtns.length; el++) {
         lvlBtns[el].classList.remove('active')
      }
   }
   lvlBtns[i].addEventListener('click', function () {
      hide()
      lvlBtns[i].classList.add('active')
   })
   
}
