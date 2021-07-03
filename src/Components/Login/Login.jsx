import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [user, setUser] = useState({});
  const [unameError, setUnameError] = useState({});
  const [passError, setPassError] = useState({});

  const signUp = () => {
    let error = 0;
    setUnameError({});
    setPassError({});

    if (user.userId === '' || user.userId === undefined) {
      setUnameError({ ...unameError, error: 'Please enter User Id' });
      error = 1;
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        user.userId
      )
    ) {
      setUnameError({ ...unameError, error: 'Please enter valid User Id' });
      error = 1;
    }

    if (user.password === '' || user.password === undefined) {
      setPassError({ ...passError, error: 'Please enter password' });
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

      fetch('/api/auth', requestOptions)
        .then((response) => response.text())
        .then((result) => {
          let resultVal = JSON.parse(result);
          if (Object.keys(resultVal)[0] === 'token') {
            localStorage.setItem('myweb_token', JSON.parse(result).token);
            window.location.href = '/dashboard';
          } else {
            setUnameError({ ...unameError, error: resultVal.errors[0].msg });
            setPassError({ ...passError, error: resultVal.errors[0].msg });
          }
        })
        .catch((error) => console.log('error', error));
    }
  };

  return (
    <div className='container'>
      <div className='login__form'>
        <h1 className='signIn__text'>Sign In</h1>
        <div>
          <input
            type='text'
            placeholder='Email'
            className='login__input'
            onChange={(e) => setUser({ ...user, userId: e.target.value })}
          />
          <p style={{ color: 'red' }}>{unameError.error}</p>
        </div>
        <div>
          <input
            type='password'
            placeholder='Password'
            className='login__input'
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <p style={{ color: 'red' }}>{passError.error}</p>
        </div>
        <button className='button__submit' onClick={() => signUp()}>
          Sign In
        </button>
        <h4>
          Not an account?{' '}
          <strong>
            <a href='/signup'>Sign Up</a>
          </strong>{' '}
          here
        </h4>
      </div>
    </div>
  );
};

export default Login;
