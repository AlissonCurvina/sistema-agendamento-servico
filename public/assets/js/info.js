const inputGroup = document.querySelectorAll(".user-data");
const saveButton = document.querySelector(".save-btn");
const editInfoButton = document.querySelectorAll(".edit-btn");
const saveInfoButton = document.querySelectorAll(".save-btn");

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

const editInfo = inputId => {
  const inputToUpdate = document.querySelector(`#${inputId}`);

  inputToUpdate.disabled = false;
};

const saveInfo = async inputId => {
  const infoToUpdate = document.querySelector(`#${inputId}`).value;

  const resourceToUpdate = inputId => {
    switch (inputId) {
      case 'uname':
        return 'userName'
      case 'fname':
        return 'fantasyName'
      case 'email':
        return 'email'
    }
  }

  const value = infoToUpdate;
  const resource = resourceToUpdate(inputId)

  console.log(value, resource)

  const result = await fetch("/edit-info", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      value: value,
      resource: resource,
    }),
  });

  const result = wait fetch("/excluir-dados", {
    method: "DELETE",
    headers: {
      "Content-type"
    }
  })
};
