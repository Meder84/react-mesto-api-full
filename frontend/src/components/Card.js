import React, {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = props.card.likes.some(id => id === currentUser._id)
  const isOwn = props.card.owner === currentUser._id;

  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn
    ? ''
    : 'card__delete-button_hidden'}`
  )

  const cardLikeButtonClassName = (
    `card__like-button ${isLiked
    ? 'card__like-button_black'
    : ''}`
  )

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return(
    <article className="card">
      <button
        className={`opacity ${cardDeleteButtonClassName}`}
        type="button"
        onClick={handleDeleteClick}
      >
      </button>
      <img
        className="card__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="card__footer">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-elements">
          <button
            className={`opacity ${cardLikeButtonClassName}`}
            type="button"
            onClick={handleLikeClick}
          >
          </button>
          <h3 className="card__like-counter">{props.card.likes.length}</h3>
        </div>
      </div>
    </article>
  )
}

export default Card;
