const inputGroup = document.querySelectorAll('.user-data');
const saveButton = document.querySelector('.save-btn');

const editInfo = event => {
    inputGroup.forEach(item => item.disabled = false);
    saveButton.style.display = 'initial';
}

const saveInfo = async event => {
    const result = await fetch('/edit-info', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            fantasyName,
            userName,
            email
        })
    })
}
