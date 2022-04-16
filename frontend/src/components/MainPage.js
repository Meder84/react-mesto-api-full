import React, {useState, useEffect} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';



function MainPage(props) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});

  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    about: '',
    avatar: '',
    email: '',
    name: '',
    _id: 0,
  });

  useEffect(() => {
    api.getCards().then((cards) => {
      setCards(cards.data.reverse())
    })
    .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    api.getUser().then(({ data }) => {
      setCurrentUser({
        about: data.about,
        avatar: data.avatar,
        email: data.email,
        name: data.name,
        _id: data._id,
      });
    })
    .catch((err) => console.log(err))
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) =>
      c._id === card._id ? newCard.data : c);

      setCards(newCards);
    })
    .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {

    api.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    })
    .catch((err) => console.log(err))
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(data) {
    api.setUser(data).then((data) => {
      setCurrentUser(data.data)
      closeAllPopups()
    })
    .catch((err) => alert(err))
  }

  function handleUpdateAvatar(data) {
    api.userAvatarUpdate(data).then((data) => {
      setCurrentUser(data.data);
      closeAllPopups();
    })
    .catch((err) => alert(err))
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data).then((newCard) => {
      setCards([newCard.data, ...cards]);
      closeAllPopups()
    })
    .catch((err) => alert(err))
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  function handleLogout() {
    setCurrentUser({});
    setCards([]);
    props.onLogOut();
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header>
        <div className="header__link-container">
          <p className="header__text">
            {props.email}
          </p>
          <button
            className="header__button opacity"
            onClick={handleLogout}
          >
            Выйти
          </button>
        </div>
      </Header>
      <Main
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCardClick = {handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
      />
      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <ImagePopup
        card = {selectedCard}
        onClose = {closeAllPopups}
      />
    </CurrentUserContext.Provider>
  )
}

export default MainPage;
