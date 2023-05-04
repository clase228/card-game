/* eslint-disable @typescript-eslint/no-var-requires */
test('приложение запущено и есть контейнер wrapper', () => {
   // загружаем index.html в jsdom
   const fs = require('fs')
   const path = require('path')
   const html = fs.readFileSync(
      path.resolve(__dirname, '../index.html'),
      'utf8'
   )
   document.documentElement.innerHTML = html
   console.log(html)
   // проверяем наличие контейнера wrapper
   const wrapper = document.querySelector('.wrapper')
   expect(wrapper).toBeDefined()

   //проверяем наличие кнопок
   const buttons = document.querySelectorAll('.difficulty-level-num')
   expect(buttons.length).toBe(3)
})
