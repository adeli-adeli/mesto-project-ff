// Находим форму в DOM



// функция открытия popup

export function openModal(modalObj) {
  modalObj.classList.add("popup_is-opened");

  document.addEventListener("keydown", handleEscButton);
  modalObj.addEventListener("click", handleOverlayClick);
}

// функция закрытия popup

export function closeModal(modalObj) {
  modalObj.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", handleEscButton);
  modalObj.removeEventListener("click", handleOverlayClick);
}

// закрытие popup на кнопку

export function handleEscButton(evt) {
  if (evt.key === "Escape") {
    const popupToClose = document.querySelector(".popup_is-opened");
    closeModal(popupToClose);
  }
}

// закрытие popup на оверлей

export function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    const popupToClose = document.querySelector(".popup_is-opened");

    closeModal(popupToClose);
  }
}
