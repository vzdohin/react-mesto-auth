import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

function Login (props) {
  // const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
  
  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
  })}
  function handleSubmit(e){
    e.preventDefault();
  //   if (!formValue.email || formValue.password){
  //     return
  // }
  props.onAuthorize(formValue.email, formValue.password)
  // .then((data)=>{
  //   if (data.jwt){
  //     setFormValue
  //   }
  // })
  }
  return (
    <form className='registration__form'
    noValidate
    onSubmit={handleSubmit}>
      <h2 className='registration__title'>Вход</h2>
      <div class="registration__inputs">
      <input
          name='email'
          className='registration__input'
          type='email'
          id='email-input'
          placeholder='Email'
          value={formValue.email}
          onChange={handleChange} />
        <input
          name='password'
          className='registration__input'
          type='password'
          id='password-input'
          placeholder='Пароль'
          value={formValue.password}
          onChange={handleChange} />
      </div>
      <button className='registration__button' type='submit'>Войти</button>
    </form>
  )
}

export default Login;