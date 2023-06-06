import warnings from './warnings'
import cn from './classNames'

const body = document.getElementsByTagName('body')
const modal = document.querySelector('.js-modal')
const form = document.querySelector('.js-form')
const inputs = document.querySelectorAll('.js-input')
const span = document.querySelectorAll('.js-span')

// состояние контента в попапчиках

let modalText = `${warnings.warn} поля`

// показываем body после полной загрузки страницы

window.addEventListener('load', () => (body[0].style.opacity = 1))

// сабмит формы

form.addEventListener('submit', (evt) => {
    evt.preventDefault()
    ;[...inputs].forEach((e, i) => {
        if (e.value === '') {
            console.log(i)
            console.log(`${warnings.warn} поле ${e.name}`)
            // return `${warnings.warn} поле ${e.name}`
        }
    })

    // showModal(modalText)
})

// делаем из псевдомассива массив и перебираем, находим наши елементы из DOM и вызываем фун-цию валидации при каждом расфокусе

Array.from(inputs).forEach((input, i, arr) => {
    input.addEventListener('change', handleInput)

    if (input.value === '') modalText = `${warnings.warn} поля`

    function handleInput() {
        validation(input, span[i])

        // текст для попала с ошибкой или без

        modalText = arr.every((a) => !a.className.includes('error'))
            ? warnings.success
            : warnings.error

        // текст для попапа если одно из полей пустое

        // if (input.value === '') {
        //     console.log(inputs[i].name)
        // }

        // if (arr.some((a) => a.value === '')) {
        //     const emptyInputName = arr.filter((a) => a.value === '')[0]?.name
        //     modalText = `${warnings.warn} поле ${emptyInputName}`
        // }

        // switch (input.name) {
        //     case input['name'] === '':
        //         alert(input.name)
        //         break
        //     case input['email'] === '':
        //         alert(input.name)
        //         break
        //     case input['domain'] === '':
        //         alert(input.name)
        //         break
        //     default:
        //         break
        // }

        // текст для попала если оба поля пустых
    }
})

// проверяем длинну набраного текста и на латыницу

function validation(input, span) {
    const inputValueLength = input.value.length

    if (inputValueLength === 0) {
        input.classList.remove(cn.inputError)
        modalText = warnings.warn
    } else if (inputValueLength < 2 || inputValueLength > 10) {
        input.classList.add(cn.inputError)
        span.innerText = `В поле ${input.name} от 2 до 10 символов`
    } else {
        input.classList.remove(cn.inputError)
    }

    if (input.value.match(/[А-яЁё]/)) {
        input.classList.add(cn.inputError)
        span.innerText = `Только латиница`
    }
}

// фун-ция отвечающая за попапы с предупреждениями

function showModal(value) {
    modal.innerHTML = value
    modal.classList.add(cn.modalActive)
    removeClass(modal, cn.modalActive)

    if (value === warnings.error) {
        modal.classList.add(cn.modalError)
        removeClass(modal, cn.modalError)
    }
    if (value === warnings.warn) {
        modal.classList.add(cn.modalWarn)
        removeClass(modal, cn.modalWarn)
    }
    if (value === warnings.success) {
        inputs.forEach((input) => (input.value = ''))
        modalText = `${warnings.warn} поля`
        modal.classList.add(cn.modalSuccess)
        removeClass(modal, cn.modalSuccess)
    }
}

// удаляем класы через какое-то время

function removeClass(item, className) {
    setTimeout(() => {
        item.classList.remove(className)
    }, 2000)
}
