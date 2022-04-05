import React, {useState, useEffect, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext)

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);    
  }, [props.isOpen, currentUser])

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeAbout(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return(
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      buttonText='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_name" 
        type="text" 
        id="name-input" 
        name="name"
        required
        minLength="2"
        maxLength="40"
        autoComplete="off" 
        placeholder="Имя" 
        onChange={handleChangeName}
        value={name || ''}
      />
      <span 
        className="error" 
        id="name-input-error">
      </span>
      <input
        className="popup__input popup__input_job" 
        type="text" 
        id="job-input"
        name="about"
        required
        minLength="2"
        maxLength="200"
        autoComplete="off" 
        placeholder="Профессия" 
        onChange={handleChangeAbout}
        value={description || ''}
      />
      <span 
        className="error" 
        id="job-input-error">
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
