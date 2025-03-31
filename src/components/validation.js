export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach(formElement => {
    setEventListeners(formElement, validationConfig);
  });
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const button = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, button, validationConfig);
    });
  });
}

function isValid(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch
    && inputElement.dataset.patternErrorMessage) {
    inputElement.setCustomValidity(inputElement.dataset.patternErrorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

function showInputError(formElement, inputElement, errorMessage, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError(formElement, inputElement, validationConfig) {  
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
}

function toggleButtonState(inputList, button, validationConfig) {
  debugger
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(validationConfig.inactiveButtonClass);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const button = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, validationConfig);
  });

  toggleButtonState(inputList, button, validationConfig);
}