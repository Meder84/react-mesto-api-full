import React from "react";
import Popup from "./Popup";

function ImagePopup({isOpen, onClose, containerClass, ...props}) {

  return (
    <Popup 
      isOpen={props.card.link}   
      onClose={onClose}
      containerClass = 'popup__container-place'
    >
      <img 
        className="popup__image"  
        src={props.card ? props.card.link : '#'} 
        alt={props.card ? props.card.name : ''}
      />
      <figcaption 
        className="popup__caption">
        {props.card ? props.card.name : ''}
      </figcaption>
    </Popup>
  )
}

export default ImagePopup;