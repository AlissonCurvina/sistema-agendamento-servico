const inputGroup = document.querySelectorAll(".user-data");
const saveButton = document.querySelector(".save-btn");
const editInfoButton = document.querySelectorAll(".edit-btn");
const saveInfoButton = document.querySelectorAll(".save-btn");
const deleteButton = document.querySelector(".delete-btn");

editInfoButton.forEach(editButton => {
  editButton.addEventListener("click", event => {
    const clickedButton = event.target.dataset.type

    editInfo(clickedButton)
  });
});

saveInfoButton.forEach(saveButton => {
  saveButton.addEventListener("click", event => {
    const clickedButton = event.target.dataset.type

    saveInfo(clickedButton)
  });
});

deleteButton.addEventListener('click', event => {
  deleteUser(event.target.dataset.id)
})

const editInfo = inputId => {
  const inputToUpdate = document.querySelector(`#${inputId}`);

  inputToUpdate.disabled = false;
};

const saveInfo = async inputId => {
  const infoToUpdate = document.querySelector(`#${inputId}`).value;
  const value = infoToUpdate;

  const resourceToUpdate = inputId => {
    switch (inputId) {
      case 'uname':
        return 'username'
      case 'fname':
        return 'fantasyName'
      case 'email':
        return 'email'
    }
  }

  const resource = resourceToUpdate(inputId)

  console.log(resource)

  const result = await fetch("/edit-info", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      resource,
      value
    })
  });
};

const deleteUser = async id => {
  const result = await fetch('/excluir-dados', {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id
    })
  })
  location.href = '/'
}