import warnings from './warnings'

const body = document.getElementsByTagName('body')
const label = document.querySelector('.js-modal')
const form = document.querySelector('.js-form')
const inputs = document.querySelectorAll('.js-input')
const span = document.querySelectorAll('.js-span')

// состояние контента в попапчиках

let modalText = warnings.warn

// показываем body после полной загрузки страницы

window.addEventListener('load', (e) => (body[0].style.opacity = 1))

// сабмит формы

form.addEventListener('submit', (evt) => {
    evt.preventDefault()

    showModal(modalText)
})

// делаем из псевдомассива массив и перебираем, находим наши елементы из DOM и вызываем фун-цию валидации при каждом расфокусе
;[...inputs].forEach((input, i, arr) => {
    input.addEventListener('change', handleInput)

    function handleInput(evt) {
        let input = evt.target

        validation(input, span[i])

        // текст для попала с ошибкой или без

        switch (arr.every((a) => !a.className.includes('error'))) {
            case true: {
                modalText = warnings.success
                break
            }
            case false: {
                modalText = warnings.error
                break
            }
            default: {
                break
            }
        }

        // текст для попала если поле пустое

        if (arr.every((a) => a.value === '')) {
            modalText = warnings.warn
        }

        if (arr.some((a) => a.value === '')) {
            const emptyInputName = arr.filter((a) => a.value === '')[0]?.name
            modalText = `${warnings.warn} в поле ${emptyInputName}`
        }
    }
})

// проверяем длинну набраного текста и на латыницу

function validation(input, span) {
    let inputValue = input.value.length

    if (inputValue === 0) {
        input.classList.remove('error')
        modalText = warnings.warn
    } else if (inputValue < 2 || inputValue > 10) {
        input.classList.add('error')
        span.innerText = `В поле ${input.name} от 2 до 10 символов`
    } else {
        input.classList.remove('error')
    }

    if (input.value.match(/[А-яЁё]/)) {
        input.classList.add('error')
        span.innerText = `Только латиница`
    }
}

// фун-ция отвечающая за попапы с предупреждениями

function showModal(value) {
    if (value === warnings.success) {
        ;[...inputs].forEach((input) => (input.value = ''))
        modalText = warnings.warn
    }
    label.innerHTML = value
    label.classList.add('active')
    removeClass(label, 'active')

    if (value === warnings.error) {
        label.classList.add('error')
        removeClass(label, 'error')
    }
    if (value === warnings.warn) {
        label.classList.add('warn')
        removeClass(label, 'warn')
    }
    if (value === warnings.success) {
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
