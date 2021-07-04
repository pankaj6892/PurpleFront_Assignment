import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [user, setUser] = useState({});
  const [errorName, setErrorName] = useState({});
  const [errorEmail, setErrorEmail] = useState({});
  const [errorPassword, setErrorPassword] = useState({});
  const [errorConfirmPass, setErrorConfirmPass] = useState({});
  const [errorPhone, setErrorPhone] = useState({});
  const url = 'https://auth-app-purple.herokuapp.com';
  let error = 0;

  async function signupCall() {
    setErrorName({});
    setErrorEmail({});
    setErrorPassword({});
    setErrorConfirmPass({});
    setErrorPhone({});
    error = 0;
    if (user.name === '' || user.name === undefined) {
      setErrorName({ ...errorName, name: 'Please enter name' });
      error = 1;
    }
    if (user.email === '' || user.email === undefined) {
      setErrorEmail({ ...errorEmail, email: 'Please enter email' });
      error = 1;
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        user.email
      )
    ) {
      setErrorEmail({ ...errorEmail, email: 'Please enter valid email' });
      error = 1;
    }

    if (user.password === '' || user.password === undefined) {
      setErrorPassword({ ...errorPassword, password: 'Please enter password' });
      error = 1;
    } else if (!/(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(user.password)) {
      setErrorPassword({
        ...errorPassword,
        password:
          'Password must be atleast 6 characters long with atlease 1 upper and lower case caharacter',
      });
      error = 1;
    }

    if (user.confirmPassword === '' || user.confirmPassword === undefined) {
      setErrorConfirmPass({
        ...errorConfirmPass,
        confirmPassword: 'Please enter confirm password',
      });
      error = 1;
    } else if (user.password !== user.confirmPassword) {
      setErrorConfirmPass({
        ...setErrorConfirmPass,
        confirmPassword: 'Password is not matching',
      });
      error = 1;
    }
    if (user.phone === '' || user.phone === undefined) {
      setErrorPhone({ ...errorPhone, phone: 'Please enter phone' });
      error = 1;
    } else if (!/^[6-9]\d{9}$/.test(user.phone)) {
      setErrorPhone({
        ...errorPhone,
        phone: 'Please enter valid phone number',
      });
      error = 1;
    }

    if (error === 0) {
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify(user);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(url + '/api/users', requestOptions)
        .then((response) => response.text())
        .then((result) => {
          let resultVal = JSON.parse(result);

          if (Object.keys(resultVal)[0] === 'token') {
            localStorage.setItem('myweb_token', JSON.parse(result).token);
            window.location.href = '/dashboard';
          } else {
            setErrorEmail({ ...errorEmail, email: resultVal.errors[0].msg });
          }
        })
        .catch((error) => console.log('error', error));
    }
  }

  return (
    <div className='container'>
      <div className='login__form'>
        <h1 className='signIn__text'>Sign Up</h1>
        <div>
          <input
            id='name'
            type='text'
            placeholder='Name'
            className='login__input'
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <p style={{ color: 'red' }}>{errorName.name}</p>
        </div>
        <div>
          <input
            id='email'
            type='text'
            placeholder='Email'
            className='login__input'
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <p style={{ color: 'red' }}>{errorEmail.email}</p>
        </div>
        <div>
          <input
            type='password'
            id='password'
            placeholder='Password'
            className='login__input'
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <p style={{ color: 'red' }}>{errorPassword.password}</p>
        </div>
        <div>
          <input
            type='password'
            id='confirmPassword'
            placeholder='Confirm Password'
            className='login__input'
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
          />
          <p style={{ color: 'red' }}>{errorConfirmPass.confirmPassword}</p>
        </div>
        <div>
          <input
            id='phone'
            type='text'
            placeholder='999-99-99-999'
            className='login__input'
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
          <p style={{ color: 'red' }}>{errorPhone.phone}</p>
        </div>
        <button className='button__submit' onClick={() => signupCall()}>
          Sign Up
        </button>
        <h4>
          Already have an account?{' '}
          <strong>
            <a href='/'>Sign In</a>
          </strong>{' '}
          here
        </h4>
      </div>
    </div>
  );
};

export default Signup;
