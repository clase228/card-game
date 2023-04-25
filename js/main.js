let wrapper = document.querySelector('.wrapper')
let lvlBtns = document.querySelectorAll('.difficulty-level-num')
let startBtn = document.querySelector('.difficulty-start')
let difficulty

startBtn.addEventListener('click', function () {
   let activeLvl = document.querySelector('.difficulty-level-num.active')
   if (activeLvl) {
      difficulty = activeLvl.dataset.lvl
      request({
         url: 'test.html',
         responseType: '',
         onSuccess: (data) => {
            wrapper.innerHTML = data
            let html = ''
            for (let i = 0; i < 36; i++) {
               html += `
               <div class="card-icon" data-count="${i}">
                  <img src="img/back-card.png" alt="">
               </div>
               `
            }
            document.querySelector('.card-icons').innerHTML = html
         },
         onError: (data) => {
            console.log(data)
         },
      })
   } else {
      console.log('Ошибка!')
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
