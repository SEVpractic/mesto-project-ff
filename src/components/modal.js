export function openModal(popup) {
  popup.addEventListener("click", closeModalByClickHandler);
  document.addEventListener("keydown", closeModalByEscapeHandler);

  popup.classList.remove("popup_is-animated");
  popup.classList.add("popup_is-opened");
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.add("popup_is-animated");

  popup.removeEventListener("click", closeModalByClickHandler);
  document.removeEventListener("keydown", closeModalByEscapeHandler);
}

function closeModalByClickHandler(e) {
  if (
    e.target === e.currentTarget ||
    e.target.classList.contains("popup__close")
  ) {
    closeModal(e.currentTarget);
  }
}

function closeModalByEscapeHandler(e) {
  if (e.key === "Escape")
    closeModal(document.querySelector(".popup_is-opened"));
}
