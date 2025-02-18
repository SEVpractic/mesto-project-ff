const templateContent = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

initialCards.forEach(card => {
  placesList.append(createCard(card, removeCard))
});

function createCard(cardData = {}, removeCard) {
  const card = templateContent.querySelector('.card').cloneNode(true);
  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardRemoveBtn = card.querySelector('.card__delete-button');

  cardImg.src = cardData.link ? cardData.link : '';
  cardTitle.textContent = cardData.name ? cardData.name : '';

  cardRemoveBtn.addEventListener('click', () => removeCard(card));

  return card;
}

function removeCard(card) {
  if (!card) return;
  card.remove();
}
