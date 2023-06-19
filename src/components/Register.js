import React from 'react';
import { Link } from 'react-router-dom';


function Register() {

  return (
    <form className='registration__form'>
      <h2 className='registration__title'>Регистрация</h2>
      <div class="registration__inputs">
        <input className='registration__input' type='email' placeholder='Email'></input>
        <input className='registration__input' type='password' placeholder='Пароль'></input>
      </div>
      <button className='registration__button' type='submit'>Зарегистрироваться</button>
      <div className='registration__sign-in'>
        <p className='registration__login-text'>Уже зарегистрированы?</p>
        <Link className='registration__login-link' to='/sign-in'>&nbsp;Войти</Link>
      </div>
    </form>
  )



}

export default Register;