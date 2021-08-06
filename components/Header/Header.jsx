import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { AiOutlineClose } from 'react-icons/ai';
import AuthenticationForm from '../AuthenticationForm';
import { useCurrentUser } from '../../lib/hooks';
import css from './Header.module.css';

const Header = () => {
  const [dialogType, setDialogType] = useState('');
  const [open, setOpen] = useState(false);
  const [user, { mutate }] = useCurrentUser();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  async function handleLogout() {
    await axios.delete('/api/logout');
    mutate(null);
    Router.replace('/');
  }

  const handleClickOpen = (formType) => {
    setDialogType(formType);
    setOpen(!open);
  };

  const handleClose = () => setOpen(!open);

  const CloseBtn = () => (
    <IconButton
      aria-label="close-dialog"
      onClick={handleClose}
      className={css.closeBtn}
    >
      <AiOutlineClose />
    </IconButton>
  );

  const handleDialogType = (formType) => setDialogType(formType);

  return (
    <header className={css.header} data-testid="header">
      <div className={css.logo}>
        <Link href="/">
          <a>xelp</a>
        </Link>
      </div>
      <nav>
        <ul>
          {user ? (
            <>
              <Link href="/">
                <a>
                  <Button color="secondary" style={{ margin: '0 0.5rem' }}>
                    HOME
                  </Button>
                </a>
              </Link>
              <Link href="/profile">
                <a>
                  <Button color="secondary" style={{ margin: '0 0.5rem' }}>
                    Profile
                  </Button>
                </a>
              </Link>
              <Button
                variant="contained"
                color="secondary"
                style={{ margin: '0 0.5rem' }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                color="secondary"
                style={{ margin: '0 0.5rem' }}
                onClick={() => handleClickOpen('sign-up')}
              >
                Sign up
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                style={{ margin: '0 0.5rem' }}
                onClick={() => handleClickOpen('sign-in')}
              >
                Sign in
              </Button>
            </>
          )}
        </ul>
      </nav>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {dialogType === 'sign-in' ? (
          <>
            <div className={css.dialogTitle}>
              <span>Sign in</span>
              <CloseBtn />
            </div>
            <DialogContent>
              <AuthenticationForm
                dialogType={dialogType}
                handleDialogType={handleDialogType}
              />
            </DialogContent>
          </>
        ) : (
          <>
            <div className={css.dialogTitle}>
              <span>Sign up</span>
              <CloseBtn />
            </div>
            <DialogContent>
              <AuthenticationForm
                dialogType={dialogType}
                handleDialogType={handleDialogType}
              />
            </DialogContent>
          </>
        )}
      </Dialog>
    </header>
  );
};

export default Header;
