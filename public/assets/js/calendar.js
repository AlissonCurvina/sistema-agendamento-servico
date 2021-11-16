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

const deleteEvent = ({event}) => {
  const eventId = event.id
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

}

const eventClickHandler = (info) => {
  if(info.view.type == "dayGridMonth") {
    calendar.changeView('dayGridDay', info.event.start )
  }
  if(info.view.type == "dayGridDay") {
    const isEventToDelete = confirm("Deseja cancelar esse agendamento?")
    if(isEventToDelete) {
      deleteEvent(info)      
    }
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
    eventContent: function(info) {
      let buttonGroup = document.createElement('span')

      console.log(info)
      
      buttonGroup.innerHTML = 
      ` 
        <button class="delete-event">Deletar</button>
        <button class="edit-event">Editar</button>
      `
      const arrayOfElements = [
        buttonGroup
      ]
      return { 
        domNodes: arrayOfElements 
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