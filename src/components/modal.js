export function openModal(popup) {
  popup.querySelector('.popup__close').addEventListener('click', e => closeModal(popup));
  popup.addEventListener('click', closeModalByOverlay);
  document.addEventListener('keydown', closeModalByEscape);

  popup.classList.remove('popup_is-animated');
  popup.classList.add('popup_is-opened');
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');

  popup.querySelector('.popup__close').removeEventListener('click', e => closeModal(popup));
  popup.removeEventListener('click', e => closeModalByOverlay);
  document.removeEventListener('keydown', e => closeModalByEscape);
}

function closeModalByOverlay(e) {
  if (e.target === e.currentTarget) closeModal(e.currentTarget); 
}

function closeModalByEscape(e) {
  if (e.key === 'Escape') closeModal(e.currentTarget);
}