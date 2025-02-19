
// показывает сообщения об ошибки 
function showInputError(form, input, errorMessage) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add("form__input_type_error");
  errorElement.classList.add("form__input-error_active");
  errorElement.textContent = errorMessage;
}

// скрывает сообщение об ошибки
function hideInputError(form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
}

// проверка
function isValid(form, input) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
}

 
function hasInvalidInput(inputList) {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("form__submit_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("form__submit_inactive");
  }
}



function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((form) => {
  const inputList = form.querySelectorAll(".popup__input");
  const buttonElement = form.querySelector(".popup__button");

  inputList.forEach((input) => {

    input.addEventListener("input", () => {
      isValid(form, input);
      toggleButtonState(inputList, buttonElement);
    });
  });

  toggleButtonState(inputList, buttonElement);
   
  });
}

function clearValidation(form) {
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  const buttonElement = form.querySelector(".popup__button");

  inputList.forEach((input) => {
    hideInputError(form, input);

    toggleButtonState(inputList, buttonElement);
  });
}

export { enableValidation, clearValidation };
