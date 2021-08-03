import { useState } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import css from './AuthenticationForm.module.css';

const AuthForm = ({ dialogType, handleDialogType }) => {
  const [alert, setAlert] = useState(null);

  async function handleSignInFormSubmit(e) {
    e.preventDefault();
    const { username, password } = e.currentTarget;

    if (alert) setAlert(null);
    try {
      await axios.post('/api/signIn', {
        username: username.value,
        password: password.value,
      });
      setAlert(null);
      Router.replace('/profile');
    } catch (error) {
      setAlert({ type: 'error', value: 'Incorrect username or password.' });
    }
  }

  async function handleSignUpFormSubmit(e) {
    e.preventDefault();
    const { username, email, password, rpassword } = e.currentTarget;

    if (alert) setAlert(null);
    if (!username.value) {
      setAlert({ type: 'error', value: 'Username is empty' });
      return;
    }
    if (password.value.length < 8) {
      setAlert({
        type: 'error',
        value: 'The password must contain at least 8 characters',
      });
      return;
    }
    if (password.value !== rpassword.value) {
      setAlert({ type: 'error', value: "The passwords don't match" });
      return;
    }
    try {
      const res = await axios.post('/api/signUp', {
        email: email.value,
        username: username.value,
        password: password.value,
      });
      setAlert({
        type: 'success',
        value: res.data.message,
      });
      handleDialogType('sign-in');
    } catch (err) {
      setAlert({
        type: 'error',
        value: err.text(),
      });
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
      {alert && <Alert severity={alert.type}>{alert.value}</Alert>}

      <TextField
        name="username"
        label="Username"
        style={{ margin: '0.5rem 0' }}
      />
      {dialogType === 'sign-up' && (
        <TextField name="email" label="Email" style={{ margin: '0.5rem 0' }} />
      )}
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
