document.addEventListener('DOMContentLoaded', function() {
  calendarEl = document.getElementById('calendar')

  console.log('Sou eu, você pensou que fosse outro script, mas sou eu')

  const setCurrentCalendar = calendarType => {
    let calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: calendarType,
      locale: 'pt-BR',
      headerToolbar: {
        start: 'prev,next',
        center: 'title',
        end: 'today'
      }
    })
    return calendar
  }

  currentCalendar = setCurrentCalendar('dayGridMonth')
  currentCalendar.render()

  let newEventSource = [
    {
      title: 'Teste',
      start: '2021-06-29',
      end: '2021-06-30',
      allDay: true
    },
    {
      title: 'Outro teste',
      start: '2021-06-15T09:00:00',
      end: '2021-06-15T12:00:00'
    },
    {
      title: 'Mais um teste só que dessa vez bem grandão',
      start: '2021-06-15T10:00:00',
      end: '2021-06-15T13:00:00'
    }
  ]
  currentCalendar.addEventSource(newEventSource)
  currentCalendar.render()
})

