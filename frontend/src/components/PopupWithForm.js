import React from "react";
import Popup from "./Popup";

function PopupWithForm ({isOpen, name, onClose, ...props}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <form 
        className="popup__form" 
        name={name} 
        action="#"
        onSubmit={props.onSubmit}
      >

        <h2 className="popup__title">{props.title}</h2>
        {props.children}

        <button 
          className="popup__button" 
          type="submit"
        >
            {props.buttonText}
        </button>
      </form>
    </Popup>
  )
}

export default PopupWithForm;