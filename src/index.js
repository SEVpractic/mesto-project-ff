export { cardImgPopup };

import "./pages/index.css";

import { initialCards } from "./components/initialCards";
import * as card from "./components/card";
import * as modal from "./components/modal";

const placesList = document.querySelector(".places__list");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditPopup = document.querySelector(".popup_type_edit");
const profileEditForm = document.querySelector(
  '.popup__form[name="edit-profile"]'
);
const profileNameInput = profileEditForm.querySelector(
  ".popup__input_type_name"
);
const profileDescriptionInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);
const profileEditBtn = document.querySelector(".profile__edit-button");

const addCardBtn = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const cardImgPopup = document.querySelector(".popup_type_image");
const cardCreateForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = cardCreateForm.querySelector(
  ".popup__input_type_card-name"
);
const cardUrlInput = cardCreateForm.querySelector(".popup__input_type_url");

initialCards.forEach((el) => {
  placesList.append(
    card.createCard(el, card.removeCard, card.setLike, card.showImg)
  );
});

profileEditBtn.addEventListener("click", profileOpenHandler);
profileEditForm.addEventListener("submit", profileEditHandler);

addCardBtn.addEventListener("click", () => modal.openModal(addCardPopup));
cardCreateForm.addEventListener("submit", createCardHandler);

function profileOpenHandler() {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  modal.openModal(profileEditPopup);
}

function profileEditHandler(e) {
  e.preventDefault();

  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  modal.closeModal(profileEditPopup);
}

function createCardHandler(e) {
  e.preventDefault();

  const content = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };
  placesList.prepend(
    card.createCard(content, card.removeCard, card.setLike, card.showImg)
  );

  modal.closeModal(addCardPopup);
}
