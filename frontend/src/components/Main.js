import React, {useContext} from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace,
   onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button 
          className="profile__avatar-button"
          type="button"
          onClick={onEditAvatar}
        >              
        </button>
        <img 
          className="profile__avatar" 
          src={currentUser.avatar} 
          alt={currentUser.name} 
        />
        
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button 
            className="profile__edit-button opacity" 
            type="button"
            onClick={onEditProfile}
          >
          </button>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button 
          className="profile__add-button opacity" 
          type="button"
          onClick={onAddPlace}
        >
        </button>
      </section>

      <section className="elements content__elements">
        <ul className="card-list-section">
          {
            cards.map((card) => (
              <Card 
                key = {card._id}
                card = {card}
                onCardClick = {onCardClick}
                onCardLike = {onCardLike}
                onCardDelete = {onCardDelete}
              />
            ))
          }
        </ul>
      </section>
    </main>
  )
}

export default Main;