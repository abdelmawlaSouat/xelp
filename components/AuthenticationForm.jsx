import { useState } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import axios from 'axios';

// import { useUser } from '../lib/hooks';
import css from './AuthenticationForm.module.css';

const AuthForm = ({ dialogType, handleDialogType }) => {
  // useUser({ redirectTo: '/', redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState('');

  async function handleSignInFormSubmit(e) {
    e.preventDefault();
    const { username, password } = e.currentTarget;

    console.log(username.value, password.value);

    if (errorMsg) setErrorMsg('');
    try {
      const res = await axios.post('/api/login', {
        username: username.value,
        password: password.value,
      });
      if (res.status === 200) {
        console.log('Success (authentication)');
        // Router.push('/profile');
      } else {
        console.log('Failed (authentication)');
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);
      setErrorMsg(error.message);
    }
  }

  async function handleSignUpFormSubmit(e) {
    e.preventDefault();
    const { username, password, rpassword } = e.currentTarget;

    if (errorMsg) setErrorMsg('');
    if (!username.value) {
      setErrorMsg(`Username is empty`);
      return;
    }
    if (password.value.length < 8) {
      setErrorMsg(`The password must contain at least 8 characters`);
      return;
    }
    if (password.value !== rpassword.value) {
      setErrorMsg(`The passwords don't match`);
      return;
    }
    try {
      const res = await axios.post('api/signup', {
        username: username.value,
        password: password.value,
      });

      if (!res.data.user) {
        setErrorMsg(`User already exists`);
        return;
      }
    } catch (error) {
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
