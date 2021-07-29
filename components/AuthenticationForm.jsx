import { useState } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

import { useUser } from '../lib/hooks';
import css from './AuthenticationForm.module.css';

const AuthForm = ({ dialogType, handleDialogType }) => {
  useUser({ redirectTo: '/', redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState('');

  async function handleSignInFormSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg('');

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    console.log(body);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push('/profile');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);
      setErrorMsg(error.message);
    }
  }

  async function handleSignUpFormSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg('');

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`);
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.status === 200) {
        handleDialogType('sign-in');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);
      setErrorMsg(error.message);
    }
  }

  return (
    <form
      className={css.authForm}
      onSubmit={
        dialogType === 'sign-in'
          ? handleSignInFormSubmit
          : handleSignUpFormSubmit
      }
    >
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <TextField
        name="username"
        label="Username"
        style={{ margin: '0.5rem 0' }}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        style={{ margin: '0.5rem 0' }}
      />
      {dialogType === 'sign-up' && (
        <TextField
          name="rpassword"
          label="Repeat password"
          type="password"
          style={{ margin: '0.5rem 0' }}
        />
      )}

      <div className="submit">
        {dialogType === 'sign-in' ? (
          <div className={css.btnsContainer}>
            <Button
              color="secondary"
              style={{ textTransform: 'none' }}
              onClick={() => handleDialogType('sign-up')}
            >
              I don&apos;t have an account
            </Button>

            <Button variant="contained" color="secondary" type="submit">
              Sign in
            </Button>
          </div>
        ) : (
          <div className={css.btnsContainer}>
            <Button
              color="secondary"
              style={{ textTransform: 'none' }}
              onClick={() => handleDialogType('sign-in')}
            >
              I already have an account
            </Button>

            <Button variant="contained" color="secondary" type="submit">
              Sign up
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

AuthForm.propTypes = {
  dialogType: PropTypes.string.isRequired,
  handleDialogType: PropTypes.func.isRequired,
};

export default AuthForm;
