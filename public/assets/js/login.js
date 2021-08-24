const form = document.querySelector('#login-form');

form.addEventListener('submit', login)

async function login(event) {
  event.preventDefault();
  const username = document.querySelector('#uname').value
  const password = document.querySelector('#pwd').value

  console.log(password)

  fetch('/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(result => {
      if (result.status == 200) {
        location.href = '/'
      }
    })
}
/* 
function validarSenha() {
  var minuscula = /[a-z]/g;
  var maiuscula = /[A-Z]/g;
  var num = /[0-9]/g;
  
  if(!senha1.value.match(minuscula)) {
    alert("Senha deve ter no mínimo 1 letra minuscula!");
    senha1.focus();
    return false;
  }

  if(!senha1.value.match(maiuscula)) {
    alert("Senha deve ter no mínimo 1 letra maiuscula!");
    senha1.focus();
    return false;
  }

  if(!senha1.value.match(num)) {
    alert("Senha deve ter no mínimo 1 caracter numerico!");
    senha1.focus();
    return false;
  }
  
  if(senha1.value != senha2.value) {
    alert("Senha diferente!");
    senha2.value ="";
    senha2.focus();
    return false;
  }
}

function validar(){    
  if(nome.value.length<3) {
    alert("Informe seu nome completo!");
    nome.value ="";
    nome.focus();
    return false;
  }

  if(email.value.length < 6 || email.value.indexOf("@") <= 0 ||
  email.value.lastIndexOf(".") <= email.value.indexOf("@")) {
    alert("Informe um email válido !");
    email.value ="";
    email.focus();
    return false;
  } 
  
  if(senha1.value.length<6 ) {
    alert("Senha deve ter no mínimo 6 dígitos!");
    senha1.value ="";
    senha1.focus();
    return false;
  }
  
  alert("Cadastro realizado com sucesso !");
}
 */