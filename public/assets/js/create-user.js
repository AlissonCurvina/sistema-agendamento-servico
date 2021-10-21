const formEl = document.querySelector('#create-user-form');
const fantasyNameInputEl = formEl.querySelector('#fantasy-name')
const userNameInputEl = formEl.querySelector('#user-name')
const emailInputEl = formEl.querySelector('#email')
const passwordInputEl = formEl.querySelector('#password')
const confirmationPasswordEl = formEl.querySelector('#confirmation-password')

const validateFormData = async event => {
  event.preventDefault();
  clearErrorMessages()
  
  const rawFantasyName = fantasyNameInputEl.value;
  const fantasyName = rawFantasyName.trim();

  const rawUserName = userNameInputEl.value;
  const userName = rawUserName.trim();

  const rawEmail = emailInputEl.value;
  const email = rawEmail.trim();

  const rawPassword = passwordInputEl.value;
  const password = rawPassword.trim();

  const rawConfirmationPassword = confirmationPasswordEl.value;
  const confirmationPassword = rawConfirmationPassword.trim();

  if(!(confirmationPassword == password)) {
    addErrorMessage('Senhas não conferem', confirmationPasswordEl)
    return
  }
  
  const result = await fetch('/cadastrar-usuario', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      fantasyName,
      userName,
      email,
      password
    })
  })

  const data = await result.json()

  switch(data.status) {
    case 200:
    alert(data.message)
    setTimeout( () => {
      location.href = '/'
    },500)
    break;
    case 401: 
    alert(data.message)
    break;
  }
}

formEl.addEventListener('submit', validateFormData)