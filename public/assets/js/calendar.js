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

const eventClickHandler = (info) => {
  calendar.changeView('dayGridDay', info.event.start )
}

const createCalendar = () => {
  const calendarInitialConfig = {
    initialView: 'dayGridMonth',
    validRange: {
      start: Date.now(),
      end: currentDate.setDate(currentDate.getDate() + 20)
    },
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