import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup(props) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

useEffect(() => {
  setName('');
  setLink('');
}, [props.isOpen]);

function handleChangeName(evt) {
  setName(evt.target.value)
}

function handleChangeInfo(evt) {
  setLink(evt.target.value)
}
  
function handleSubmit(evt) {
  evt.preventDefault();
  props.onAddPlace({
    name,
    link
  })
}  

  return(
    <PopupWithForm
      name='popup_type_add'
      title='Новое место'
      buttonText='Создать'
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
    >
      <input
        className="popup__input popup__input_description" 
        type="text" 
        name="name"
        id="description-input"
        required
        minLength="2"
        maxLength="30"
        autoComplete="off" 
        placeholder="Название" 
        onChange={handleChangeName}
        value={name || ''}
      />
      <span 
        className="error" 
        id="description-input-error">
      </span>
      <input
        className="popup__input popup__input_url" 
        type="url" 
        name="link"
        id="url-input" 
        required
        autoComplete="off" 
        placeholder="Ссылка на картинку" 
        onChange={handleChangeInfo}
        value={link || ''}
      />
      <span 
        className="error" 
        id="url-input-error">
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;