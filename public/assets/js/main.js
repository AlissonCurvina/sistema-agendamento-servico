const body = document.body

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

  alertPlaceholder.style.position = 'absolute'
  alertPlaceholder.style.bottom = 0

  element.insertAdjacentHTML('beforeend', alertPlaceholder.outerHTML)
}

function clearErrorMessages() {
  const elementsWithErrorMessages = document.querySelectorAll('.error-message')

  elementsWithErrorMessages.forEach( item => {
    item.parentNode.removeChild(item)
  })
}

function addErrorMessage(message, el) {
  const body = document.body
  const messageToAppend = document.createElement('small')

  messageToAppend.innerHTML = message

  messageToAppend.classList.add('my-3', 'text-danger', 'error-message')
  
  el.insertAdjacentHTML('afterend', messageToAppend.outerHTML)
}