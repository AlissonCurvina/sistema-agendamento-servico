//Itens do form
const formEl = document.querySelector('#create-event-form')
const dueTimeInputEl = formEl.querySelector('#due-time')
const serviceInputEl = formEl.querySelector('#service')
const serviceDescriptionEl = formEl.querySelector('#description')
const clientNameInputEl = formEl.querySelector('#client-name')
const clientPhoneInputEl = formEl.querySelector('#client-phone')
const clientEmailInputEl = formEl.querySelector('#client-email')
const createEventButton = formEl.querySelector('#create-event-btn')

//Modal
const modalEl = body.querySelector('#create-event-modal')
const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl)

const modalSelectEl = modalEl.querySelector('#due-time')

const populateModal = date => {
  //Define o data attr com a data do dia que foi clicado
  modalEl.dataset.currentDate = date
  
  const config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      date: date
    })
  }

  fetch('/get-available-hours', config)  
    .then( result => result.json())
    .then( ({availableHours}) => {
    availableHours.forEach( hour => {
      const formatedHour = hour.slice(0,5)
      modalSelectEl.innerHTML += `<option value="${hour}">${formatedHour}</option>`
    })
  })
}

function openCreateEventModal({dateStr}) {
  populateModal(dateStr)

  modalInstance.show()
}

//Atualiza a descrição do serviço baseado no serviço que foi selecionado
const getServiceDescription = id => {
  serviceDescriptionEl.value = ''

  fetch(`/service/${id}`)
  .then( result => result.json())
  .then( data => {
    serviceDescriptionEl.value = data.description
  })
}

serviceInputEl.addEventListener('change', event => {
  const selectedService = event.target.options[serviceInputEl.selectedIndex]
  const serviceId = selectedService.dataset.id

  getServiceDescription(serviceId)
})

const createEvent = scheduleInfo => {
  const config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(scheduleInfo)
  }

  fetch('/create-event', config)
  
  /* const newEvent = {
    title: scheduleInfo.clientName,
    start: scheduleInfo.dueTime
  } */

  calendar.addEvent(newEvent)
  modalInstance.hide()
  bsAlert('Atendimento agendado', 'success', body)
}

//Formata a data do agendamento
const createScheduleDate = (hour, date) => `${date}T${hour}.000Z`

const validateForm = event => {
  event.preventDefault()
  clearErrorMessages()
  
  const currentDate = modalEl.dataset.currentDate

  const dueTime = createScheduleDate(dueTimeInputEl.value, currentDate)
  const service = serviceInputEl.options[serviceInputEl.selectedIndex].dataset.id
  const clientName = clientNameInputEl.value
  const clientPhone = clientPhoneInputEl.value
  const clientEmail = clientEmailInputEl.value

  const formInputList = [
    ['Digite seu nome', clientName, clientNameInputEl],
    ['Digite seu telefone celular', clientPhone, clientPhoneInputEl],
    ['Digite seu email', clientEmail, clientEmailInputEl]
  ]

  const inputsWithErrosList = formInputList.map( input => {
    if(!input[1]) {
      addErrorMessage(input[0], input[2])
      return 'Erro'
    }
    return 'Sem erro'
  })

  const isEveryInputOk = inputsWithErrosList.every(item => item == 'Sem erro')

  if(isEveryInputOk) {
    const scheduleInfo = {
      dueTime: dueTime,
      service: service,
      clientName: clientName,
      clientPhone: clientPhone,
      clientEmail: clientEmail
    }
    createEvent(scheduleInfo)
  }
}

modalEl.addEventListener('hide.bs.modal', () => {
  modalSelectEl.innerHTML = ''
})

createEventButton.addEventListener('click', event => {
  validateForm(event)
})