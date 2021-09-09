const form = document.querySelector('#login-form');
const usernameInput = document.querySelector('#uname')
const passwordInput = document.querySelector('#pwd')

form.addEventListener('submit', login)

const bsAlert = (message, type) => {
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

const clearErrorMessages = () => {
  const elementsWithErrorMessages = document.querySelectorAll('.error-message')

  elementsWithErrorMessages.forEach( item => {
    item.parentNode.removeChild(item)
  })
}

const addErrorMessage = (message, el) => {
  const body = document.body
  const messageToAppend = document.createElement('small')

  messageToAppend.innerHTML = 
  `
    ${message}
  `

  messageToAppend.classList.add('my-3', 'text-danger', 'error-message')
  
  el.insertAdjacentHTML('afterend', messageToAppend.outerHTML)

}

async function login(event) {
  event.preventDefault();
  const username = document.querySelector('#uname').value
  const password = document.querySelector('#pwd').value

  const config = 
  {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }

  try {
    const result = await fetch('/', config)
    const data = await result.json()

    if(data.status == 200) {
      bsAlert(data.message, 'success')

      setTimeout(() => {
        location.href = '/'
      }, 600)
      
    } 
    else {
      switch(data.type) {
      case 'user': 
        clearErrorMessages()

        usernameInput.classList.add('is-invalid')
        addErrorMessage(data.message, usernameInput)
      
        break;
      case 'password':
        clearErrorMessages()
        
        passwordInput.classList.add('is-invalid')
        addErrorMessage(data.message, passwordInput)

        break;
      }
    }
  } catch(err) {
    console.log(err)
  }
}