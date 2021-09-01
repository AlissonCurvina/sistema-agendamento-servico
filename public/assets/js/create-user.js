const form = document.querySelector('#create-user-form');
const body = document.getElementsByTagName('body')[0]

/* const createToast = message => {
  const message = document.createElement('div')
    message.innerHTML = 
    `
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <img src="..." class="rounded me-2" alt="...">
          <strong class="me-auto">Bootstrap</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          ${message}
        </div>
      </div>
    </div>
    `
    body.insertAdjacentElement('afterend', message)

    let toastLiveExample = document.querySelector('#liveToast')

    let toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
} */

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

  if(!emailToCheck.test(email)) {
    createToast('Use um e-mail válido gmail. O da sua conta google!')
  }

  if(password != confirmationPassword) {
    createToast('As senhas conferem!')
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

  if(result.status = 200) {
    console.log('Criado e logado')
  }
  window.location.href = '/'
}

form.addEventListener('submit', validateFormData)