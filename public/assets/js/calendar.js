const calendarEl = document.getElementById('calendar')
const modalEl = document.querySelector('#create-event-modal')
const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl)

const body = document.body

const changeCalendarView = dateInfo => {
  calendar.changeView('dayGridDay', dateInfo.dateStr)
}

const createDefaultCalendar = () => {
  const calendarInitialConfig = {
    initialView: 'dayGridMonth',
    locale: 'pt-BR',
    headerToolbar: {
      start: 'prev,next',
      center: 'title',
      end: 'listWeek,dayGridMonth,today'
    },
    selectable: true,
    select: function(info) {
      /* alert('Início do evento: ' + info.start.toLocaleString()) */
      modalInstance.show()
    },
    events: [
      {
        id: 999,
        title: 'Repeating Event',
        start: '2021-09-16T16:00:00'
      }
    ]
  }
  const calendar = new FullCalendar.Calendar(calendarEl, calendarInitialConfig)

  return calendar
}

const calendar = createDefaultCalendar()
calendar.render()