import "./pages/index.css";

import * as card from "./components/card";
import * as modal from "./components/modal";
import * as validation from "./components/validation";
import * as api from "./components/api";

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
const cardCreateForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = cardCreateForm.querySelector(
  ".popup__input_type_card-name"
);
const cardUrlInput = cardCreateForm.querySelector(".popup__input_type_url");
const cardImgPopup = document.querySelector(".popup_type_image");
const cardImgPopupImage = cardImgPopup.querySelector(".popup__image");
const cardImgPopupCaption = cardImgPopup.querySelector(".popup__caption");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error_visible",
};

let myId;

initPage();

profileEditBtn.addEventListener("click", profileOpenHandler);
profileEditForm.addEventListener("submit", profileEditHandler);

addCardBtn.addEventListener("click", createCardOpenHandler);
cardCreateForm.addEventListener("submit", createCardHandler);

validation.enableValidation(validationConfig);

function profileOpenHandler() {
  profileEditForm.reset();
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  validation.clearValidation(profileEditForm, validationConfig);
  modal.openModal(profileEditPopup);
}

function profileEditHandler(e) {
  e.preventDefault();

  api
    .setUserInfo(profileNameInput.value, profileDescriptionInput.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
    });

  modal.closeModal(profileEditPopup);
}

function createCardOpenHandler(e) {
  cardCreateForm.reset();

  validation.clearValidation(cardCreateForm, validationConfig);
  modal.openModal(addCardPopup);
}

function createCardHandler(e) {
  e.preventDefault();

  api.createCard(cardNameInput.value, cardUrlInput.value).then((data) => {
    placesList.prepend(
      card.createCard(myId, data, card.removeCard, card.setLike, showImg)
    );
  });

  modal.closeModal(addCardPopup);
}

function showImg(cardImg, cardTitle) {
  cardImg.addEventListener("click", (e) => {
    e.preventDefault();

    cardImgPopupImage.src = cardImg.src;
    cardImgPopupCaption.textContent = cardTitle.textContent;

    modal.openModal(cardImgPopup);
  });
}

function initPage() {
  Promise.all([api.getUserInfo(), api.getInitialCards()]).then((res) => {
    myId = res[0]._id;
    profileTitle.textContent = res[0].name;
    profileDescription.textContent = res[0].about;

    res[1].forEach((el) => {
      placesList.append(
        card.createCard(myId, el, removeCard, card.setLike, showImg)
      );
    });
  });
}

function removeCard(thisCard, cardId) {
  api.removeCard(cardId).then((res) => card.removeCard(thisCard));
}
