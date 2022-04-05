import React from "react";
import logo from '../images/logo.svg';

function Header(props) {
  return(
    <header className="header">
      <img 
        className="logo header__logo opacity" 
        src={logo}
        alt="Текст Mesto." 
      />
      <div>
        {props.children}
      </div>
    </header>
  )
}

export default Header;