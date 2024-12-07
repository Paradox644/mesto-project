import { initialCards as cards } from './cards.js'
// @todo: Темплейт карточки
const cardContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
function addCard(cardContainer, cardInfo){
const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
cardElement.querySelector('.card__image').src=cardInfo.link;
cardElement.querySelector('.card__image').alt=cardInfo.name;
cardElement.querySelector('.card__delete-button').addEventListener('click',cardDeleteHandler);
cardElement.querySelector('.card__title').textContent=cardInfo.name;
cardElement.querySelector('.card__like-button').addEventListener('click',likeButtonHandler);
cardElement.querySelector('.card__image').addEventListener('click',cardImageHandler);
cardContainer.append(cardElement);
}
function cardDeleteHandler(evt){
evt.target.closest('.card').remove();
}
function cardAddHandler(evt){
    const popup = document.querySelector('.popup_type_new-card');
    popup.classList.add('popup_is-opened');
}
function popupCloseHandler(evt){
    console.log(evt.target.parentElement);
    evt.target.closest('.popup').classList.remove('popup_is-opened');
}
function profileEditHandler(evt){
    const popup = document.querySelector('.popup_type_edit');
    popup.classList.add('popup_is-opened');
}
function cardImageHandler(evt){
  const popup = document.querySelector('.popup_type_image');
  const popupImage = popup.querySelector('.popup__image');
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  const popupCaption = popup.querySelector('.popup__caption'); 
  const cardTitle = evt.target.parentElement.querySelector('.card__title');
  popupCaption.textContent = cardTitle.textContent;
  popup.classList.add('popup_is-opened');

}
function isFormValid(formElement){
const inputElements = Array.from(formElement.querySelectorAll('.popup__input'));
if (inputElements.some((inputElement)=>{
 return !inputElement.validity.valid;
}))
return false;
return true;
}

function formSubmitHandler(evt){
  evt.preventDefault();
  const form = evt.target.closest('.popup__form');
  if (isFormValid(form)) {
    switch (form.getAttribute('name')) {
      case "edit-profile":
        const profileTitle = document.querySelector('.profile__title');
        const profileDescription = document.querySelector('.profile__description');
        profileTitle.textContent = form.name.value;
        profileDescription.textContent = form.description.value;
        popupCloseHandler(evt);
        form.reset();
        break;
      case "new-place":
        console.log(form['place-name'].value);
        addCard(cardContainer,{link:form.link.value, name:form['place-name'].value});
        popupCloseHandler(evt);
        form.reset();
        break;
    }
  }
  else {
    console.log("I've not set up proper form validation, please pretend this message contains error info")
  }

}

function likeButtonHandler(evt){
  const likeButtonElement = evt.target;
  likeButtonElement.classList.toggle('card__like-button_is-active');
}

(function addInitialCards(){
  cards.forEach((card)=>{
    addCard(cardContainer,card);
  });
})();

const cardAddButtonElement = document.querySelector('.profile__add-button');
cardAddButtonElement.addEventListener('click',cardAddHandler);

const popupCloseElements = document.querySelectorAll('.popup__close');
popupCloseElements.forEach((popupCloseElement)=>{
    popupCloseElement.addEventListener('click',popupCloseHandler);
});

const profileEditButtonElement = document.querySelector('.profile__edit-button');
profileEditButtonElement.addEventListener('click',profileEditHandler);

const popupFormElements = document.querySelectorAll('.popup__form');
popupFormElements.forEach((popupFormElement)=>{
  popupFormElement.addEventListener('submit',formSubmitHandler);
});

(function addPopupAnimations(){
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup)=>{
    popup.classList.add('popup_is-animated');
  });
})();

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
