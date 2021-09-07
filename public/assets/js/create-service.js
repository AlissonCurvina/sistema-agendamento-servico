const statusCheckContent = document.querySelector('.status-check-text')
const checkInput = document.querySelector('.status-check-input')
const serviceInput = document.querySelector('#sname')
const descriptionInput = document.querySelector('#description')
const serviceDurationInput = document.querySelector('#duration')
const priceInput = document.querySelector('#price')
const createServiceButton = document.querySelector('#create-service-btn')

function bsAlert(message, type) {
  const body = document.body
  const alertEl = document.createElement('div')
  alertEl.innerHTML = 
  `
    <div 
      class="alert alert-${type} alert-dismissible position-fixed"     
      role="alert">${message}
      <button 
        type="button" 
        class="btn-close" 
        data-bs-dismiss="alert" 
        aria-label="Close">
      </button>
    </div>
  `
  body.append(alertEl)
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

const createService = event => {
  event.preventDefault()

  const serviceContent = serviceInput.value
  const descriptionContent = descriptionInput.value
  const serviceDurationContent = serviceDurationInput.value
  const priceContent = priceInput.value
  const checkContent = checkInput.checked

  if(
    !serviceContent || 
    !descriptionContent || 
    !serviceDurationContent || 
    !priceContent
  ) {
    const tooltip = new bootstrap.Tooltip(checkInput)
  }

  console.log(
    checkContent, 
    serviceContent, 
    descriptionContent, 
    serviceDurationContent, 
    priceContent
  )
  
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

  fetch('/create-service', config)
}

createServiceButton.addEventListener('click', createService)