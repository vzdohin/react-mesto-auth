import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupEditProfile from './PopupEditProfile';
import PopupAddCard from './PopupAddCard';
import PopupEditAvatar from './PopupEditAvatar';
import PopupConfirm from './PopupConfirm';
import api from '../utils/Api';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Register from './Register';
import Login from './Login';
import { ProtectedRoute } from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {
  // состояния isOpen попаов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  // попап успешна ли регистрация
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(true)
  // состояние карточек
  const [cards, setCards] = useState([]);
  // текущий пользователь 
  const [currentUser, setCurrentUser] = useState({});
  // состояние регистрации
  const [isRegistrationSuccess, setRegistrationSuccess] = useState(true)
  // обработчики кликов открытия
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleConfirmDeleteClick() {
    setIsConfirmDeletePopupOpen(true)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }
  // обработчик закрытия попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(false)
    setSuccessPopupOpen(false)
  }
  //забираем с сервера информацию о профиле (имя, описание, ссылка аватара)
  React.useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data)
      })
      .catch((err) => {
        alert(`Ошибка: ${err}`)
      })
  }, [])
  React.useEffect(() => {
    api.getAllCards(cards).
      then(data => {
        setCards(data)
      })
      .catch((err) => {
        alert(`Ошибка: ${err}`)
      })
  }, [])

  // обрабочик клика по лайку
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === newCard._id ? newCard : c));
      })
      .catch((err) => {
        alert(`Ошибка: ${err}`)
      })
  }
  // обработчик удаления
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        alert(`Ошибка: ${err}`)
      })
    // обработчик измененения имени и описания профиля 
  }
  function handleUpdateUser(newData) {
    api.addNewUserInfo(newData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        alert(`Ошибка: ${err}`)
      })
  }
  // обработчик изменения аватара 
  function handleUpdateAvatar(newData) {
    api.changeAvatar(newData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        alert(`Ошибка: ${err}`)
      })
  }
  // обработчик добавления карточки 
  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard) //----------------------
      .then((data) => {
        setCards([data, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        alert(`Ошибка: ${err}`)
      })
  }


  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Routes>
            <Route
              path='/'
              element={
                < ProtectedRoute
                  component={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onConfirmDelete={handleConfirmDeleteClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />} />

            <Route path='/sign-up'
              element={<Register />} />
            <Route path='/sign-in'
              element={<Login />} />
            {/* <Route path='/1'
              element={<InfoTooltip isSuccess={isRegistrationSuccess} />} /> */}
          </Routes>
          <Footer />
          <PopupEditProfile
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <PopupAddCard
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} />
          <PopupEditAvatar
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />
          <ImagePopup
            selectedCard={selectedCard}
            isOpen={selectedCard}
            onClose={closeAllPopups} />
          <PopupConfirm
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isSuccessPopupOpen}
            isSuccess={isRegistrationSuccess}
            onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
