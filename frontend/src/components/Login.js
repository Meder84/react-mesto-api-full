import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';


const initState = {
  password: '',
  email: '',
}

const Login = (props) => {
  const [state, setState] = useState(initState);    
  
  const handleChange = e => {
    const {name, value} = e.target;
    setState(old => ({
      ...old,
      [name]: value, 
    }));
  };

  const formReset = () => {
    setState(initState);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const {password, email} = state;

    if (!password || !email){
      return;
    }
    props.handleLogin(password, email, formReset);
  }

  return(
    <>
      <Header>
        <Link to="/signup" className="header__link opacity">Регистрация</Link>
      </Header>
      <div className="sign">
      <h3 className="sign__subtitle">
          Вход
        </h3>
        <form onSubmit={handleSubmit} className="sign__form">
          <label>
            <input 
              className="sign__input"
              id="email" 
              name="email" 
              type="email" 
              placeholder="Email"
              value={state.email || ''} 
              onChange={handleChange} 
            />
          </label>
          

          <label>
            <input 
              className="sign__input"
              id="password" 
              name="password" 
              type="password" 
              placeholder="Пароль"
              value={state.password || ''} 
              onChange={handleChange} 
            />
          </label>
          
          <button 
            type="submit" 
            className="sign__button opacity"
          >
            Войти
          </button>
        </form>
      </div>
    </>
  )
}

export default Login;

