import { initialCards as cards } from './cards.js'

const cardContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupFormElements = document.querySelectorAll('.popup__form');

function addCard(cardContainer, cardInfo){
const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
cardElement.querySelector('.card__image').src=cardInfo.link;
cardElement.querySelector('.card__image').alt=cardInfo.name;
cardElement.querySelector('.card__delete-button').addEventListener('click',handleCardDelete);
cardElement.querySelector('.card__title').textContent=cardInfo.name;
cardElement.querySelector('.card__like-button').addEventListener('click',handleLikeButton);
cardElement.querySelector('.card__image').addEventListener('click',cardImageHandler);
cardContainer.append(cardElement);
}

function handleCardDelete(evt){
evt.target.closest('.card').remove();
}

function handleCardAdd(evt){
    const popup = document.querySelector('.popup_type_new-card');
    openPopup(popup);
}

function openPopup(popup){
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown',closePopupWithEsc);
}
function closePopupWithEsc(evt){
  document.removeEventListener('keydown',closePopupWithEsc);
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    openedPopup.classList.remove('popup_is-opened');
    const form = openedPopup.querySelector('.popup__form');
    if (!form) return;
    refreshFormState(form);
  }
}
function handlePopupClose(evt){
  document.removeEventListener('keydown',closePopupWithEsc);
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup_is-opened');
    const form = evt.target.querySelector('.popup__form');
    if (!form) return;
    refreshFormState(form);
  }
  else if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__button')) {
    evt.target.closest('.popup').classList.remove('popup_is-opened');
    const form = evt.target.parentElement.querySelector('.popup__form');
    if (!form) return;
    refreshFormState(form);
  }
  else {
    return;
  }
  
}
function refreshFormState(form) {
  const formInputs = form.querySelectorAll('.popup__input');
  formInputs.forEach((formInput)=>{hideInputError(formInput);});
  setFormButtonState(form,true);
  switch (form.getAttribute('name')) {
    case "edit-profile":
      form.name.value = profileTitle.textContent;
      form.description.value = profileDescription.textContent;
      break;
    case "new-place":
      form.reset();
      break;
  }
}

function handleProfileEdit(evt){
    const popup = document.querySelector('.popup_type_edit');
    openPopup(popup);
}

function cardImageHandler(evt){
  const popup = document.querySelector('.popup_type_image');
  const popupImage = popup.querySelector('.popup__image');
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  const popupCaption = popup.querySelector('.popup__caption'); 
  const cardTitle = evt.target.parentElement.querySelector('.card__title');
  popupCaption.textContent = cardTitle.textContent;
  openPopup(popup);

}

function isFormValid(formElement){
const inputElements = Array.from(formElement.querySelectorAll('.popup__input'));
if (inputElements.some((inputElement)=>{
 return !inputElement.validity.valid;
}))
return false;
return true;
}
function setFormButtonState(form,state){
  const button = form.querySelector('.popup__button');
  if (state) button.removeAttribute('disabled');
  else button.setAttribute('disabled',true);
}
function handleFormSubmit(evt){
  evt.preventDefault();
  const form = evt.target.closest('.popup__form');
  if (isFormValid(form)) {
    switch (form.getAttribute('name')) {
      case "edit-profile":
        profileTitle.textContent = form.name.value;
        profileDescription.textContent = form.description.value;
        handlePopupClose(evt);
        form.reset();
        break;
      case "new-place":
        // console.log(form['place-name'].value);
        addCard(cardContainer,
          {
          link:form.link.value,
          name:form['place-name'].value
          });
        handlePopupClose(evt);
        form.reset();
        break;
    }
  }
  else {
    setFormButtonState(form,false);
  }
}

function showInputError(inputElement,errorMessage){
  const errorElement = inputElement.parentElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent=errorMessage;
  errorElement.classList.add('popup__input-error_active');
  inputElement.classList.add('popup__input_type_error');

}

function hideInputError(inputElement){
  const errorElement = inputElement.parentElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent='';
  errorElement.classList.remove('popup__input-error_active');  
  inputElement.classList.remove('popup__input_type_error');
}

function handleFormInputValidity(evt){
  const formInput = evt.target;
  const form = formInput.parentElement;
  // console.log(formInput.validity.valid);
  if (isFormValid(form)) {
    hideInputError(formInput);
    setFormButtonState(form,true);
  }
  else {
    showInputError(formInput,formInput.validationMessage);
    setFormButtonState(form,false);
  }

}

function handleLikeButton(evt){
  const likeButtonElement = evt.target;
  likeButtonElement.classList.toggle('card__like-button_is-active');
}

(function addInitialCards(){
  cards.forEach((card)=>{
    addCard(cardContainer,card);
  });
})();

(function removeStandardValidation(){
  const forms = document.querySelectorAll('.popup__form');
  forms.forEach((form)=>{
    form.setAttribute('novalidate',true);
  });
})();

(function addCardAddHandlers(){
  const cardAddButtonElement = document.querySelector('.profile__add-button');
  cardAddButtonElement.addEventListener('click',handleCardAdd);
})();

(function addPopupCloseHandlers(){
  const popupCloseElements = document.querySelectorAll('.popup__close');
  const popupBackgrounds = document.querySelectorAll('.popup');
  popupBackgrounds.forEach((popupBackground)=>{
    popupBackground.addEventListener('click',handlePopupClose);
  });
  popupCloseElements.forEach((popupCloseElement)=>{
    popupCloseElement.addEventListener('click',handlePopupClose);
  });
})();

(function addProfileEditHandler(){
  const profileEditButtonElement = document.querySelector('.profile__edit-button');
  profileEditButtonElement.addEventListener('click',handleProfileEdit);
})();

(function addPopupFormSubmitHandlers (){
  popupFormElements.forEach((popupFormElement)=>{
    popupFormElement.addEventListener('submit',handleFormSubmit);
  });
})();

(function addPopupAnimations(){
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup)=>{
    popup.classList.add('popup_is-animated');
  });
})();

function setFormValidationParameters(form){
switch (form.getAttribute('name')) {
  case 'edit-profile':
    form.name.setAttribute('required',true);
    form.name.setAttribute('minlength',2);
    form.name.setAttribute('maxlength',40);
    form.description.setAttribute('required',true);
    form.description.setAttribute('minlength',2);
    form.description.setAttribute('maxlength',200);
    break;
  case 'new-place':
    form['place-name'].setAttribute('required',true);
    form['place-name'].setAttribute('minlength',2);
    form['place-name'].setAttribute('maxlength',30);
    break;
}
}

function addFormInputHandlers(form){
  const formInputs = form.querySelectorAll('.popup__input');
  formInputs.forEach((formInput)=>{
    formInput.addEventListener('input',handleFormInputValidity);
  });
}

(function setupFormsValidation(){
  popupFormElements.forEach((popupFormElement)=>{
    setFormValidationParameters(popupFormElement);
    addFormInputHandlers(popupFormElement);
  });
})();

(function disableAllButtons(){
  const allButtons = document.querySelectorAll('.popup__button');
  allButtons.forEach((button)=>{
    button.setAttribute('disabled',true);
  })
})();
