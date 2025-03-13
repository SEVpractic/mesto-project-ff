import './pages/index.css'

import { initialCards } from './components/initialCards'
import * as card from './components/card'
import * as modal from './components/modal'

const placesList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditForm = document.querySelector('.popup__form[name="edit-profile"]')
const profileNameInput = profileEditForm.querySelector('.popup__input_type_name');
const profileDescriptionInput = profileEditForm.querySelector('.popup__input_type_description');
const profileEditBtn = document.querySelector('.profile__edit-button');

const addCardBtn = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');

const cardImages = document.querySelectorAll('.card__image');
const cardImagePopup = document.querySelector('.popup_type_image');



initialCards.forEach(el => {
  placesList.append(card.createCard(el, card.removeCard))
});

profileEditBtn.addEventListener('click', () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  
  modal.openModal(profileEditPopup);
});

addCardBtn.addEventListener('click', () => modal.openModal(addCardPopup));

// cardImages.forEach(cardImage => {
//   cardImage.addEventListener('click',() => modal.openModal(cardImagePopup));
// });
