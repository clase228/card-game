import './css/main.css'
import { request } from './js/req'
import cardBack from '/static/images/back-card.png'

const wrapper = document.querySelector('.wrapper')
const lvlBtns = document.querySelectorAll('.difficulty-level-num')
const startBtn = document.querySelector('.difficulty-start')
const suits = ['heart', 'spades', 'diamond', 'clubs']
const runks = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
let difficulty = ''

startBtn.addEventListener('click', function () {
   let activeLvl = document.querySelector('.difficulty-level-num.active')
   if (activeLvl) {
      difficulty = activeLvl.dataset.lvl
      request({
         url: './static/pages/test.html',
         responseType: '',
         onSuccess: (data) => {
            wrapper.innerHTML = data

            let html = ''

            for (let i = 0; i < difficulty; i++) {
               html += `
               <div class="card-wrapper" data-use="NO" data-count="${i}">
                  <div class="card-back">
                     <img class="card-back-img" src="${cardBack}" alt="">
                  </div>
               </div>
                  `
            }
            document.querySelector('.card-icons').innerHTML = html

            let cardIcon
            function generationCard() {
               cardIcon = document.querySelectorAll(
                  '.card-wrapper[data-use="NO"]'
               )
               if (cardIcon.length !== 0) {
                  const randomCard = Math.floor(
                     Math.random() * (cardIcon.length - 1) + 1
                  )
                  const randomSuit = Math.floor(
                     Math.random() * (suits.length - 1) + 1
                  )
                  const randomRunk = Math.floor(
                     Math.random() * (runks.length - 1) + 1
                  )
                  for (let i = 0; i < 2; i++) {
                     cardIcon = document.querySelectorAll(
                        '.card-wrapper[data-use="NO"]'
                     )
                     cardIcon[randomCard - 1].setAttribute('data-use', 'yes')
                     cardIcon[randomCard - 1].setAttribute(
                        'data-suit',
                        suits[randomSuit - 1]
                     )
                     cardIcon[randomCard - 1].setAttribute(
                        'data-runk',
                        runks[randomRunk - 1]
                     )
                  }
                  generationCard()
               } else {
                  const cardWrappers =
                     document.querySelectorAll('.card-wrapper')
                  for (let i = 0; i < cardWrappers.length; i++) {
                     let html = `<div class="front" >
                     <div class="front-top">
                        <div class="front-top-runk">${cardWrappers[i].dataset.runk}</div>
                        <div class="front-top-suit"><img src="./static/images/${cardWrappers[i].dataset.suit}.png" alt=""></div>
                     </div>
                     <div class="front-center"><img src="./static/images/${cardWrappers[i].dataset.suit}.png" alt=""></div>
                     <div class="front-bot">
                        <div class="front-bot-suit"><img src="./static/images/${cardWrappers[i].dataset.suit}.png" alt=""></div>
                        <div class="front-bot-runk">${cardWrappers[i].dataset.runk}</div>
                     </div>
                  </div>`
                     let div = document.createElement('div')
                     div.classList.add('card-front')
                     cardWrappers[i].appendChild(div)
                     div.innerHTML = html
                     let cardFront = document.querySelectorAll('.card-front')
                     setTimeout(() => {
                        for (let i = 0; i < cardFront.length; i++) {
                           cardFront[i].style.display = 'none'
                        }
                     }, 5000)
                  }
               }
            }
            generationCard()
         },
      })
   } else {
      console.log('Ошибка!')
   }
})
for (let i = 0; i < lvlBtns.length; i++) {
   for (let el = 0; el < lvlBtns.length; el++) {
      lvlBtns[el].classList.remove('active')
   }
   lvlBtns[i].addEventListener('click', function () {
      lvlBtns[i].classList.add('active')
   })
}
let countOpenCard = 0
document.addEventListener('click', function (e) {
   const target = e.target
   if (target.classList.contains('card-back')) {
      target.parentElement.querySelector('.card-front').style.display = 'flex'
      target.parentElement.dataset.isOpen = 'yes'
      countOpenCard = countOpenCard + 1
      checkOpenCard()
   } else if (target.classList.contains('card-back-img')) {
      target.parentElement.parentElement.querySelector(
         '.card-front'
      ).style.display = 'flex'
      target.parentElement.parentElement.dataset.isOpen = 'yes'
      countOpenCard = countOpenCard + 1
      checkOpenCard()
   }
})
function checkOpenCard() {
   if (countOpenCard === 2) {
      let openCard = document.querySelectorAll(
         '.card-wrapper[data-is-open="yes"]'
      )
      if (
         openCard[0].dataset.suit === openCard[1].dataset.suit &&
         openCard[0].dataset.runk === openCard[1].dataset.runk
      ) {
         openCard[0].dataset.isOpen = 'complite'
         openCard[1].dataset.isOpen = 'complite'
         countOpenCard = 0
         if (
            document.querySelectorAll('.card-wrapper[data-is-open="complite"]')
               .length == difficulty
         ) {
            alert('Вы выиграли!')
         }
      } else {
         alert('Вы проиграли!')
      }
   }
}
