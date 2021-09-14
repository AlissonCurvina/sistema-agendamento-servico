//Form inputs
const form = document.querySelector('.create-user-form')
const statusCheckContent = document.querySelector('.status-check-text')
const checkInput = document.querySelector('.status-check-input')
const serviceInput = document.querySelector('#sname')
const descriptionInput = document.querySelector('#description')
const serviceDurationInput = document.querySelector('#duration')
const priceInput = document.querySelector('#price')

const newServiceButton = document.querySelector('.new-service-btn')
const createServiceButton = document.querySelector('#create-service-btn')

const body = document.body

//Crud buttons
const deleteButtonList = Array.from(document.querySelectorAll('.delete-btn'))
const editButtonList = Array.from(document.querySelectorAll('.edit-btn'))

//Modal
const modal = document.querySelector('#exampleModal')
const modalInstance = bootstrap.Modal.getOrCreateInstance(modal)
const openModalButton = document.querySelector('[data-bs-toggle="modal"]')

//Criar alerta do bootstrap
const bsAlert = (message, type, element) => {
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

const validateInput = inputEl => {
  if(!inputEl.value) {
    inputEl.classList.add('is-invalid')
    return false
  } else {
    inputEl.classList.add('is-valid')

    if(inputEl.tagName == 'SELECT') {
      if(inputEl.value == 'default') {
        inputEl.classList.add('is-invalid')
        return false
      }
    }
    return true
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
    
    modalInstance.hide()

    clearInputs(formInputs)
    bsAlert(data.message, 'success', body)

    setTimeout( () => {
      location.href="/services"
    },1000)
  }
}

const modalContentList = modalName => {
  if(modalName == 'new-service') {
    const modalContent = {
      serviceName: 'Oie',
      description: '',
      duration: 'default',
      price: 'default'
    }
    return modalContent
  }
  
}

const openModal = event => {
  modalInstance.show(event)
}

newServiceButton.addEventListener('click', openModal)

const editService = async event => {
  const serviceId = event.target.dataset.id
  const config = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  }
  
  const result = await fetch(`/edit-service/${serviceId}`, config)
}

const deleteService = async event => {
  const serviceId = event.target.dataset.id
  const config = {
    method: 'POST',
    headers: {  
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      id: serviceId
    })
  }
  
  const result = await fetch('/delete-service', config)
  const data = await result.json()

  bsAlert(data.message, 'danger', body)

  setTimeout( () => {
    location.href="/services"
  },1000)
}

deleteButtonList.forEach( button => {
  button.addEventListener('click', deleteService)
})