//Body
const body = document.body

//Form inputs
const form = document.querySelector('.create-user-form')
const statusCheckContent = document.querySelector('.status-check-text')
const checkInput = document.querySelector('.status-check-input')
const serviceInput = document.querySelector('#sname')
const descriptionInput = document.querySelector('#description')
const serviceDurationInput = document.querySelector('#duration')
const priceInput = document.querySelector('#price')

const updateServiceButton = document.querySelector('.update-service-btn')

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

const updateService = async event => {
  event.preventDefault()

  const _id = event.target.dataset.id
  const serviceName = serviceInput.value
  const description = descriptionInput.value
  const durationTime = serviceDurationInput.value
  const price = priceInput.value
  const status = checkInput.checked
 
  const config = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      _id,
      status, 
      serviceName, 
      description, 
      durationTime, 
      price
    })
  }

  const result = await fetch(`/update-service/${event.target.dataset.id}`, config)
  const data = await result.json()

  bsAlert(data.message, 'success', body)

  setTimeout(() => {
    location.href='/services'
  },800)
}

updateServiceButton.addEventListener('click', updateService)

