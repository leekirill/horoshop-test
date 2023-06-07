import warnings from './warnings'
import cn from './classNames'

const body = document.getElementsByTagName('body')
const modal = document.querySelector('.js-modal')
const form = document.querySelector('.js-form')
const inputs = document.querySelectorAll('.js-input')
const span = document.querySelectorAll('.js-span')

// состояние контента в попапчиках

let modalText = ''

// показываем body после полной загрузки страницы

window.addEventListener('load', () => (body[0].style.opacity = 1))

// сабмит формы

form.addEventListener('submit', (evt) => {
    evt.preventDefault()

    inputs.forEach((input, i) => {
        if (input.value === '') {
            input.classList.add(cn.inputError)
            span[i].innerText = `Заполните поле ${input.name}`
        }
    })

    modalText = [...inputs].every((a) => !a.className.includes('error'))
        ? warnings.success
        : warnings.error

    showModal(modalText)
})

// делаем из псевдомассива массив и перебираем, находим наши елементы из DOM и вызываем фун-цию валидации при каждом расфокусе

Array.from(inputs).forEach((input, i, arr) => {
    input.addEventListener('change', handleInput)

    function handleInput() {
        const inputValueLength = input.value.length

        if (inputValueLength === 0) {
            input.classList.remove(cn.inputError)
            modalText = warnings.warn
        } else if (inputValueLength < 2 || inputValueLength > 10) {
            input.classList.add(cn.inputError)
            span[i].innerText = `В поле ${input.name} от 2 до 10 символов`
        } else {
            input.classList.remove(cn.inputError)
        }

        if (input.value.match(/[А-яЁё]/)) {
            input.classList.add(cn.inputError)
            span[i].innerText = `Только латиница`
        }
    }
})

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
