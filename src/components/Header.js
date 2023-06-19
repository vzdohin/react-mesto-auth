import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../images/logo_white.svg';

function Header() {
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="логотип" />
      <Link className='registration__login-link' to={location.pathname === '/sign-up'? '/sign-in' : '/sign-up'}>{location.pathname === '/sign-in'? 'Регистрация' : 'Войти'}</Link>
    </header>
  );
}

export default Header