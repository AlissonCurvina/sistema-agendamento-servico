//Form inputs
const form = document.querySelector('.create-user-form')
const statusCheckContent = document.querySelector('.status-check-text')
const checkInput = document.querySelector('.status-check-input')
const serviceInput = document.querySelector('#sname')
const descriptionInput = document.querySelector('#description')
const serviceDurationInput = document.querySelector('#duration')
const priceInput = document.querySelector('#price')

const updateServiceButton = document.querySelector('.update-service-btn')

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

  /*
  console.log(data) */
}

updateServiceButton.addEventListener('click', updateService)