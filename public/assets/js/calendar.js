const calendarEl = document.getElementById('calendar')
const modalEl = document.querySelector('#create-event-modal')
const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl)

const body = document.body

const changeCalendarView = dateInfo => {
  calendar.changeView('dayGridDay', dateInfo.date)
}

const dateClickHandler = info => {
  if(info.view.type == 'dayGridDay') {
    return
  }
  changeCalendarView(info)
  console.log(info)
}

const openModal = () => {
  modalInstance.show()
}

const eventClickHandler = info => {
  openModal()
}

const createCalendar = () => {
  const calendarInitialConfig = {
    initialView: 'dayGridMonth',
    locale: 'pt-BR',
    headerToolbar: {
      start:  'dayGridMonth,prev,next',
      end: 'title'
    },
    events: [],
    selectable: true,
    dateClick: function(info) {
      eventClickHandler(info)
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