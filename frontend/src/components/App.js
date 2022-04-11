import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import MainPage from './MainPage'
import tick from '../images/tick.svg'
import cross from '../images/cross.svg';
import InfoTooltip from './InfoTooltip';

const initState = {
  password: '',
  email: '',
  message: '',
  imgTooltip: '',
  loggedIn: false,
}

function App () {
  const history = useHistory();
  const [state, setState] = useState(initState);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)

  useEffect(() => {
    tokenCheck();
  }, []);

  function handleRegister(password, email, formReset) {
    auth.register(password, email)
    .then(() => {

      setState((old) => ({
        ...old,
        message: 'Вы успешно зарегистрировались!',
        imgTooltip: tick,
      }));

      formReset();
      history.push('/signin');
    })
    .catch(() => setState((old) => ({
      ...old,
      message: 'Что-то пошло не так! Попробуйте ещё раз.',
      imgTooltip: cross,
    })))
    .finally(() => setIsInfoTooltipOpen(true))
  }

  function handleLogin (password, email, formReset) {
    auth.authorize(password, email)
      .then((data) => {
        console.dir(data.token)
        if (!data.token) return;

        localStorage.setItem('jwt', data.token);
        formReset();
        history.push('/main-page');
        setState({
          loggedIn: true,
          email: email,
        });
      })
      .catch( () => {
        setState({
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
          imgTooltip: cross,
        });
        setIsInfoTooltipOpen(true)
      })
  }

  function handleLogout () {
    localStorage.removeItem('jwt');
    history.push('/signup');
  }

  function tokenCheck () {
    if (!localStorage.getItem('jwt')) return;

    const jwt = localStorage.getItem('jwt');

    auth.getContent(jwt).then((res) => {
      if (!res) return;

      setState({
        loggedIn: true,
        email: res.data.email,
      });

      history.push("/main-page");
    })
    .catch(err => {
      console.log(err);
    });
  }

  function closePopup () {
    setIsInfoTooltipOpen(false);
  }

  return (
    <div className="body body_theme_dark">
      <div className="page">
        <Switch>
          <ProtectedRoute path="/main-page" loggedIn={state.loggedIn}>
            <MainPage
              handleLogout={handleLogout}
              email={state.email}
            />
          </ProtectedRoute>

          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>


          <Route path="/">
          {state.loggedIn
            ? <Redirect to="/main-page" />
            : <Redirect to="/signup" />
          }
          </Route>
        </Switch>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closePopup}
          title={state.message}
          imgTooltip={state.imgTooltip}
        />
      </div>
    </div>
  )
};

export default App;

