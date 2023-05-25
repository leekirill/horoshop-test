import warnings from './warnings'

const label = document.querySelector('.label')
const form = document.querySelector('.content__form')
const inputs = document.querySelectorAll('.content__form--input')

let labelText = warnings.warn

form.addEventListener('submit', (evt) => {
    evt.preventDefault()

    showLabel(labelText)
})

Array.from(inputs).forEach((items) => {
    const input = items.children[0]
    const span = items.children[1]

    input.addEventListener('change', (e) => {
        validation(input, items, span)
    })
})

// const validation = (e) => (e.target.value = input.replace(/[A-Za-z]/g, ''))
// ;<input type="text" onChange={validation} />

function validation(input, item, span) {
    let inputValue = input.value.length
    if (inputValue === 0) {
        item.classList.remove('error')
        item.value = ''
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

function removeClass(item, className) {
    setTimeout(() => {
        item.classList.remove(className)
    }, 2000)
}
