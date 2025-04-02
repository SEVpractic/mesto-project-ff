import "./pages/index.css";

import * as card from "./components/card";
import * as modal from "./components/modal";
import * as validation from "./components/validation";
import * as api from "./components/api";

const placesList = document.querySelector(".places__list");

const profileImage = document.querySelector(".profile__image");
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
const profileImageEditPopup = document.querySelector(".popup_type_image-edit");
const profileImageEditForm = document.querySelector(
  '.popup__form[name="image-edit"]'
);
const profileImageUrlInput = profileImageEditForm.querySelector(
  ".popup__input_type_url"
);

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

profileImage.addEventListener("click", profileImageHandler);
profileImageEditForm.addEventListener("submit", imageEditHandler);

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
  toggleSubmitButton(profileEditForm, true);

  api
    .setUserInfo(profileNameInput.value, profileDescriptionInput.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .finally((_) => toggleSubmitButton(profileEditForm, false));

  modal.closeModal(profileEditPopup);
}

function createCardOpenHandler(e) {
  cardCreateForm.reset();

  validation.clearValidation(cardCreateForm, validationConfig);
  modal.openModal(addCardPopup);
}

function createCardHandler(e) {
  e.preventDefault();
  toggleSubmitButton(profileEditForm, true);

  api
    .createCard(cardNameInput.value, cardUrlInput.value)
    .then((data) => {
      placesList.prepend(
        card.createCard(myId, data, removeCard, toggleLike, showImg)
      );
    })
    .finally((_) => toggleSubmitButton(profileEditForm, false));

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
    profileImage.style.backgroundImage = `url('${res[0].avatar}')`;

    res[1].forEach((el) => {
      placesList.append(
        card.createCard(myId, el, removeCard, toggleLike, showImg)
      );
    });
  });
}

function removeCard(thisCard, cardId) {
  api.removeCard(cardId).then((res) => card.removeCard(thisCard));
}

function toggleLike(thisCard, cardData) {
  if (cardData.likes.some((el) => el._id === myId)) {
    return api.removeLike(cardData._id).then((res) => {
      card.setLike(thisCard, res, myId);
      return res;
    });
  } else {
    return api.addLike(cardData._id).then((res) => {
      card.setLike(thisCard, res, myId);
      return res;
    });
  }
}

function profileImageHandler(e) {
  profileImageEditForm.reset();

  const image = getComputedStyle(profileImage).backgroundImage;
  profileImageUrlInput.value = image.replace(/url\(["']?(.*?)["']?\)/, "$1");

  validation.clearValidation(profileImageEditForm, validationConfig);
  modal.openModal(profileImageEditPopup);
}

function imageEditHandler(e) {
  e.preventDefault();
  toggleSubmitButton(profileEditForm, true);

  api
    .setProfileImage(profileImageUrlInput.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url('${data.avatar}')`;
    })
    .finally((_) => toggleSubmitButton(profileEditForm, false));

  modal.closeModal(profileImageEditPopup);
}

function toggleSubmitButton(form, inProcess) {
  const btn = form.querySelector('button[type="submit"]');
  if (!btn) return;

  if (inProcess) {
    btn.textContent = "Сохранение...";
  } else {
    btn.textContent = "Сохранить";
  }
}
