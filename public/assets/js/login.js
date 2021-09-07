const form = document.querySelector('#login-form');

form.addEventListener('submit', login)

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
        bsAlert(data.message, 'danger')
        break;
      case 'password':
        bsAlert(data.message, 'danger')
        break;
      }
    }
  } catch(err) {
    console.log(err)
  }
}