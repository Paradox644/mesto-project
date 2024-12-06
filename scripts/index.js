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
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
