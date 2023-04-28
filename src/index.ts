import './css/main.css'
import { request } from './js/req'
import cardBack from './images/back-card.png'
import win from './images/win.png'
import lose from './images/lose.png'

const wrapper = document.querySelector('.wrapper') as HTMLElement
const modal = document.querySelector('.modal') as HTMLElement

const suits = ['heart', 'spades', 'diamond', 'clubs']
const runks = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
let difficulty: number = 0
let timerMin = 0
let timerSec = 0
let timer = setInterval(() => {}, 1000)

let countOpenCard = 0
document.addEventListener('click', (e: MouseEvent) => {
   const target = e.target as HTMLElement
   if (target instanceof HTMLElement && target.parentElement) {
      if (target.classList.contains('card-back')) {
         ;(
            target.parentElement.querySelector('.card-front') as HTMLElement
         ).style.display = 'flex'
         target.parentElement.dataset.isOpen = 'yes'
         countOpenCard = countOpenCard + 1
         checkOpenCard()
      } else if (target.classList.contains('card-back-img')) {
         ;(
            (target.parentElement.parentElement as HTMLElement).querySelector(
               '.card-front'
            ) as HTMLElement
         ).style.display = 'flex'
         ;(target.parentElement.parentElement as HTMLElement).dataset.isOpen =
            'yes'

         countOpenCard = countOpenCard + 1
         checkOpenCard()
      }
   }
   if (target.classList.contains('restart-game')) {
      request({
         url: './static/pages/start.html',
         responseType: '',
         onSuccess: (data: string) => {
            wrapper.innerHTML = data
            modal.style.display = 'none'
         },
      })
   }
   if (target.classList.contains('difficulty-level-num')) {
      const lvlBtns = document.querySelectorAll('.difficulty-level-num')

      for (let el = 0; el < lvlBtns.length; el++) {
         lvlBtns[el].classList.remove('active')
      }
      target.classList.add('active')
   }
   if (target.classList.contains('difficulty-start')) {
      const activeLvl = document.querySelector(
         '.difficulty-level-num.active'
      ) as HTMLElement
      if (activeLvl) {
         difficulty = Number(activeLvl.dataset.lvl)
         request({
            url: './static/pages/game.html',
            responseType: '',
            onSuccess: (data: string) => {
               wrapper.innerHTML = data
               let timerMinElement = document.querySelector(
                  '.timerMin'
               ) as HTMLElement
               let timerSecElement = document.querySelector(
                  '.timerSec'
               ) as HTMLElement

               timer = setInterval(() => {
                  if (timerSec != 59) {
                     timerSec += 1
                     timerSecElement.innerHTML =
                        String(timerSec).length == 1
                           ? '0' + String(timerSec)
                           : String(timerSec)
                  } else {
                     timerSec = 0
                     timerMin += 1
                     timerSecElement.innerHTML =
                        String(timerSec).length == 1
                           ? '0' + String(timerSec)
                           : String(timerSec)
                     timerMinElement.innerHTML =
                        String(timerMin).length == 1
                           ? '0' + String(timerMin)
                           : String(timerMin)
                  }
               }, 1000)
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
               const cardIcons = document.querySelector(
                  '.card-icons'
               ) as HTMLElement
               cardIcons.innerHTML = html
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
                           <div class="front-top-runk">${
                              (cardWrappers[i] as HTMLElement).dataset.runk
                           }</div>
                           <div class="front-top-suit"><img src="./static/images/${
                              (cardWrappers[i] as HTMLElement).dataset.suit
                           }.png" alt=""></div>
                        </div>
                        <div class="front-center"><img src="./static/images/${
                           (cardWrappers[i] as HTMLElement).dataset.suit
                        }.png" alt=""></div>
                        <div class="front-bot">
                           <div class="front-bot-suit"><img src="./static/images/${
                              (cardWrappers[i] as HTMLElement).dataset.suit
                           }.png" alt=""></div>
                           <div class="front-bot-runk">${
                              (cardWrappers[i] as HTMLElement).dataset.runk
                           }</div>
                        </div>
                     </div>`
                        let div = document.createElement('div')
                        div.classList.add('card-front')
                        ;(cardWrappers[i] as HTMLElement).appendChild(div)
                        div.innerHTML = html
                        let cardFront = document.querySelectorAll('.card-front')
                        setTimeout(() => {
                           for (let i = 0; i < cardFront.length; i++) {
                              ;(cardFront[i] as HTMLElement).style.display =
                                 'none'
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
   }
})

function checkOpenCard() {
   if (countOpenCard === 2) {
      let openCard = document.querySelectorAll(
         '.card-wrapper[data-is-open="yes"]'
      )
      if (
         (openCard[0] as HTMLElement).dataset.suit ===
            (openCard[1] as HTMLElement).dataset.suit &&
         (openCard[0] as HTMLElement).dataset.runk ===
            (openCard[1] as HTMLElement).dataset.runk
      ) {
         ;(openCard[0] as HTMLElement).dataset.isOpen = 'complite'
         ;(openCard[1] as HTMLElement).dataset.isOpen = 'complite'
         countOpenCard = 0
         if (
            document.querySelectorAll('.card-wrapper[data-is-open="complite"]')
               .length == difficulty
         ) {
            openModalResult('win')
         }
      } else {
         countOpenCard = 0
         openModalResult('lose')
      }
   }
}
function openModalResult(result: string) {
   const modalImg = document.querySelector('.modal-img') as HTMLElement
   const modalResult = document.querySelector('.modal-result') as HTMLElement
   const modalTimeMin = document.querySelector('.modal-time-min') as HTMLElement
   const modalTimesec = document.querySelector('.modal-time-sec') as HTMLElement
   const modalTime = document.querySelector('.modal-time')
   modal.style.display = 'block'

   if (result === 'win') {
      modalResult.textContent = 'Вы победили!'
      ;(modalImg.children[0] as HTMLImageElement).src = win
   } else {
      modalResult.textContent = 'Вы проиграли!'
      ;(modalImg.children[0] as HTMLImageElement).src = lose
   }
   modalTimeMin.innerHTML =
      String(timerMin).length == 1 ? '0' + String(timerMin) : String(timerMin)
   modalTimesec.innerHTML =
      String(timerSec).length == 1 ? '0' + String(timerSec) : String(timerSec)
   timerMin = 0
   timerSec = 0
   clearInterval(timer)
}
