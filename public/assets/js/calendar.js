const body = document.body

const calendarEl = document.getElementById('calendar')
const modalEl = document.querySelector('#create-event-modal')
const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl)

const modalSelectEl = modalEl.querySelector('#time')

const dateClickHandler = info => {
  openCreateEventModal(info)
  console.log(info)
}

const eventClickHandler = (info) => {
  console.log(info.event.start)
  calendar.changeView('dayGridDay', info.event.start )
}

const populateModal = date => {
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
      modalSelectEl.innerHTML += `<option value="${hour}">${hour}</option>`
    })
  })
}

const openCreateEventModal = ({dateStr}) => {
  populateModal(dateStr)

  modalInstance.show()
}

const createCalendar = () => {
  const calendarInitialConfig = {
    initialView: 'dayGridMonth',
    locale: 'pt-BR',
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
    },
    viewClassNames: function(info) {
      
    }
  }
  const calendar = new FullCalendar.Calendar(calendarEl, calendarInitialConfig)

  fetch('/all-events')
    .then( result => result.json())
    .then(data => calendar.addEventSource(data))

  calendar.render()

  return calendar
}

const calendar = createCalendar()

modalEl.addEventListener('hide.bs.modal', () => {
  modalSelectEl.innerHTML = ''
})