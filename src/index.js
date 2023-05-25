import warnings from './warnings'

const body = document.getElementsByTagName('body')
const label = document.querySelector('.label')
const form = document.querySelector('.content__form')
const inputs = document.querySelectorAll('.content__form--input')

// состояние контента в попапчиках

let labelText = warnings.warn

// показываем body после полной загрузки страницы

window.addEventListener('load', (e) => (body[0].style.opacity = 1))

// сабмит формы

form.addEventListener('submit', (evt) => {
    evt.preventDefault()

    showLabel(labelText)
})

// делаем из псевдомассива массив и перебираем, находим наши елементы из DOM и вызываем фун-цию валидации при каждом расфокусе

Array.from(inputs).forEach((items) => {
    const input = items.children[0]
    const span = items.children[1]

    input.addEventListener('change', (e) => {
        validation(input, items, span)
    })
})

// проверяем длинну набраного текста и на латыницу

function validation(input, item, span) {
    let inputValue = input.value.length
    if (inputValue === 0) {
        item.classList.remove('error')
        item.value = ''
        labelText = warnings.warn
        // btn.disabled = false
    } else if (inputValue < 2 || inputValue > 10) {
        item.classList.add('error')
        span.innerHTML = `В поле ${input.name} от 2 до 10 символов`
        labelText = warnings.error
        // btn.disabled = true
    } else {
        item.classList.remove('error')
        labelText = warnings.success
        // btn.disabled = false
    }

    if (input.value.match(/[А-яЁё]/)) {
        item.classList.add('error')
        span.innerHTML = `Только латиница`
        labelText = warnings.error
    }
}

// фун-ция отвечающая за попапы с предупреждениями

function showLabel(value) {
    label.innerHTML = value
    label.classList.add('active')
    removeClass(label, 'active')

    if (value === warnings.error) {
        label.classList.add('error')
        removeClass(label, 'error')
    } else if (value === warnings.warn) {
        label.classList.add('warn')
        removeClass(label, 'warn')
    } else {
        label.classList.add('success')
        removeClass(label, 'success')
    }
}

// удаляем класы через какое-то время

function removeClass(item, className) {
    setTimeout(() => {
        item.classList.remove(className)
    }, 2000)
}
