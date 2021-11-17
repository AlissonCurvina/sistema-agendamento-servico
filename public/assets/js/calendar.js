const calendarEl = document.getElementById('calendar')
const currentDate = new Date()

const dateClickHandler = info => {
  if(info.view.type == 'dayGridDay') {
    return
  }

  if(info.dateStr < Date.now()) {
    return
  }

  openCreateEventModal(info)
}

const deleteEvent = (event) => {
  const eventId = event.target.dataset.id
  const config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({eventId}) 
  }

  fetch('/delete-event', config)
  .then( results => results.json())
  .then( data => {
    if(data.status == 200) {
      window.location = '/'
    }
  })
}

const editEvent = event => {
  const startString = event.target.dataset.startstr
  populateModal(startString)
  fetchAvailableHours(startString)

  console.log(startString)

  const eventId = event.target.dataset.id
  const config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({eventId}) 
  }

  fetch('/edit-event', config)
  .then( results => results.json())
  .then( data => {
    const matchedEvent = data.find( event => event.id == eventId)
    const eventSummary = matchedEvent.summary
    let clientName = eventSummary.slice(eventSummary.indexOf('|') + 2, eventSummary.length)
    let clientPhone = clientName.slice(clientName.indexOf('|') + 2, clientName.length)
    let clientEmail = clientPhone.slice(clientPhone.indexOf('|') + 2, clientPhone.length)
    const service = eventSummary.slice(eventSummary[0], eventSummary.indexOf('|') - 1 )
    
    clientNameInputEl.value = clientName.slice(clientName[0], clientName.indexOf('|') - 1)
    clientPhoneInputEl.value = clientPhone.slice(clientPhone[0], clientPhone.indexOf('|') - 1)
    clientEmailInputEl.value = clientEmail

    console.log(dueTimeInputEl.value)
  })

  modalInstance.show()

  /* fetch('/delete-event', config)
  .then( results => results.json())
  .then( data => {
  }) */
}

const eventClickHandler = (info) => {
  if(info.view.type == "dayGridMonth") {
    calendar.changeView('dayGridDay', info.event.start )
  }
}

const createCalendar = () => {
  const calendarInitialConfig = {
    initialView: 'dayGridMonth',
    validRange: {
      start: Date.now(),
      end: currentDate.setDate(currentDate.getDate() + 20)
    },
    locale: 'pt-BR',
    eventDidMount: function(info) {
      console.log(info.el)
      if(info.view.type == 'dayGridDay') {
        let buttonGroup = document.createElement('span')

        buttonGroup.innerHTML = 
        ` 
          <button class="delete-event" data-id="${info.event.id}">Deletar</button>
          <button class="edit-event" data-id="${info.event.id}" data-startStr="${info.event.startStr}">Editar</button>
        `

        info.el.innerHTML += buttonGroup.outerHTML

        const deleteEventButton = document.querySelector('.delete-event')
        const editEventButton = document.querySelector('.edit-event')

        deleteEventButton.addEventListener('click', deleteEvent)
        editEventButton.addEventListener('click', editEvent)
      }
    },
    headerToolbar: {
      start: 'dayGridMonth,prev,next',
      end: 'title'
    },
    selectable: true,
    dateClick: function(info) {
      dateClickHandler(info)
    },
    eventClick: function(info) {
      eventClickHandler(info)
    }
  }
  
  const calendar = new FullCalendar.Calendar(calendarEl, calendarInitialConfig)

  fetch('/all-events')
    .then( result => result.json())
    .then(data => {
      const example = data.map( ({description, summary, start, end, id}) => {
        return {
          description,
          title: summary,
          start: start.dateTime,
          end: end.dateTime,
          id
        }
      })

      console.log(example)

      calendar.addEventSource(example)
    })

  calendar.render()

  return calendar
}

const calendar = createCalendar()