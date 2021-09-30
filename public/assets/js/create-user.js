const form = document.querySelector('#create-user-form');
const body = document.body

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

  alertPlaceholder.style.position = 'absolute'
  alertPlaceholder.style.bottom = 0

  element.insertAdjacentHTML('beforeend', alertPlaceholder.outerHTML)
}

const validateFormData = async event => {
  event.preventDefault();
  
  const rawFantasyName = document.querySelector('#fname').value;
  const fantasyName = rawFantasyName.trim();

  const rawUserName = document.querySelector('#uname').value;
  const userName = rawUserName.trim();

  const rawEmail = document.querySelector('#email').value;
  const email = rawEmail.trim();

  const rawPassword = document.querySelector('#pwd').value;
  const password = rawPassword.trim();

  const rawConfirmationPassword = document.querySelector('#cpwd').value;
  const confirmationPassword = rawConfirmationPassword.trim();

  let emailToCheck = /gmail/

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

  console.log(data.status)

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

form.addEventListener('submit', validateFormData)