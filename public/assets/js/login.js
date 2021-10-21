const form = document.querySelector('#login-form');
const usernameInput = document.querySelector('#uname')
const passwordInput = document.querySelector('#pwd')

form.addEventListener('submit', login)

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
      bsAlert(data.message, 'success', body)

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