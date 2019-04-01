console.log('Client side JS file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message1') // html paragraph in index
const msg2 = document.querySelector('#message2')    


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    msg1.textContent = 'loading...'
    msg2.textContent =''
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                msg1.textContent = data.error
            } else {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
        })
    })
})