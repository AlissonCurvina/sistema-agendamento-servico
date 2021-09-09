const statusCheckContent = document.querySelector('.status-check-text')
const checkInput = document.querySelector('.status-check-input')
const serviceInput = document.querySelector('#sname')
const descriptionInput = document.querySelector('#description')
const serviceDurationInput = document.querySelector('#duration')
const priceInput = document.querySelector('#price')
const createServiceButton = document.querySelector('#create-service-btn')
const form = document.querySelector('.create-user-form')
const body = document.body
const modal = document.querySelector('#exampleModal')
const createServiceModal = bootstrap.Modal.getOrCreateInstance(modal)

function bsAlert(message, type, element) {
  const alertEl = document.createElement('div')

  const alertPlaceholder = document.createElement('div')

  alertPlaceholder.classList.add('alert-placeholder')

  alertEl.innerHTML = 
  `
    <div 
      class="alert create-service-alert alert-${type} alert-dismissible"
      role="alert">${message}
      <button 
        type="button" 
        class="btn-close" 
        data-bs-dismiss="alert" 
        aria-label="Close">
      </button>
    </div>
  `
  alertPlaceholder.append(alertEl)

  element.insertAdjacentHTML('afterbegin', alertPlaceholder.outerHTML)
}

const changeStatus = event => {
  if(event.target.checked == true) {
    checkInput.value= true
    statusCheckContent.textContent = 'Ativado'
    return
  }
  checkInput.value= false
  statusCheckContent.textContent = 'Desativado'
  return
}

checkInput.addEventListener('change', changeStatus)

const validateInput = inputEl => {
  if(!inputEl.value) {
    inputEl.classList.add('is-invalid')
    return false
  } else {
    inputEl.classList.add('is-valid')
    return true

    if(inputEl.tagName == 'SELECT') {
      if(inputEl.value == 'default') {
        inputEl.classList.add('is-invalid')
        return false
      }
    }
  }
}

const clearInputs = inputEl => {
  if(inputEl.tagName == 'SELECT') {
    inputEl.value = 'default'
  } else {
    inputEl.value = ''
  }
}

const createService = async event => {
  
  event.preventDefault()
  
  let isFormValidated = false

  const formInputs = Array.from(form.querySelectorAll('.form-control'))

  const validatedInputs = formInputs.map( item => {
    item.classList.remove('is-invalid')

    return validateInput(item)
  })

  isFormValidated = validatedInputs.every( item => item )

  const serviceContent = serviceInput.value
  const descriptionContent = descriptionInput.value
  const serviceDurationContent = serviceDurationInput.value
  const priceContent = priceInput.value
  const checkContent = checkInput.checked

  if(isFormValidated) {

    const config = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        checkContent, 
        serviceContent, 
        descriptionContent, 
        serviceDurationContent, 
        priceContent
      })
    }

    const result = await fetch('/create-service', config)
    const data = await result.json()
    
    createServiceModal.hide()

    clearInputs(formInputs)

    bsAlert(data.message, 'success', body)

  }
}

createServiceButton.addEventListener('click', createService)