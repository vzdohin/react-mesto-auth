import React from 'react';
import {Link} from 'react-router-dom';

function Login () {
  
  return (
    <form className='registration__form'>
      <h2 className='registration__title'>Вход</h2>
      <div class="registration__inputs">
        <input className='registration__input' type='email' placeholder='Email'></input>
        <input className='registration__input' type='password' placeholder='Пароль'></input>
      </div>
      <button className='registration__button' type='submit'>Войти</button>
    </form>
  )
}

export default Login;