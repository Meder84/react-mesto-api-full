import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Register (props) {
  const [state, setState] = useState({
    password: '',
    email: '',
  })

  function handleChange (e) {
    const {name, value} = e.target;
    setState(old => ({
      ...old,
      [name]: value,
    }));
  };

  const formReset = () => {
    setState({password: '', email: '',});
  }

  function handleSubmit (e) {
    e.preventDefault();
    const {password, email} = state;
    if (!password || !email ) return;

    props.handleRegister(password, email, formReset);
  }

  return(
    <>
      <Header>
        <Link to="/signin" className="header__link opacity">Войти</Link>
      </Header>
      <div className="sign">
        <h3 className="sign__subtitle">
          Регистрация
        </h3>
        <form
          onSubmit={handleSubmit}
          className="sign__form"
        >
          <label>
            <input
              className="sign__input"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={state.email}
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
              value={state.password}
              onChange={handleChange}
            />
          </label>

          <button
            type="submit"
            className="sign__button opacity"
          >
            Зарегистрироваться
          </button>
        </form>
        <div className="sign__text-container">
          <p className='sign__text'>Уже зарегистрированы? </p>
          <Link to="/signin" className="sign__link opacity">&nbsp;Войти</Link>
        </div>
      </div>
    </>
  )
}

export default Register;

