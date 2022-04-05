import Popup from "./Popup";

function InfoTooltip({isOpen, onClose, ...props}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="popup__container popup__container_info-tooltip">
        <div className='popup__info-tooltip'>
          <img 
            className='popup__img-tooltip' 
            src={props.imgTooltip} 
            alt={props.title} 
          />

          <h2 className="popup__title popup__title_info-tooltip">
            {props.title}
          </h2>
        </div>
      </div>  
    </Popup>
  )
}

export default InfoTooltip;