export function bsAlert(message, type) {
  const body = document.body
  const alertEl = document.createElement('div')
  alertEl.innerHTML = 
  `
    <div 
      class="alert alert-success alert-dismissible position-fixed"     
      role="alert"><
      <button 
        type="button" 
        class="btn-close" 
        data-bs-dismiss="alert" 
        aria-label="Close">
      </button>
    </div>
  `
  body.append(alertEl)
}