import { useState } from 'react';
import Link from 'next/link';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { AiOutlineClose } from 'react-icons/ai';
import AuthForm from './AuthenticationForm';

import { useUser } from '../lib/hooks';

import css from './Header.module.css';

const Header = () => {
  const [dialogType, setDialogType] = useState('');
  const [open, setOpen] = useState(false);
  // const user = useUser();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
    <header className={css.header}>
      <div className={css.logo}>
        <Link href="/">
          <a>xelp</a>
        </Link>
      </div>
      <nav>
        <ul>
          {0 === 1 ? (
            <>
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <a href="/api/logout">Logout</a>
              </li>
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
              <AuthForm
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
              <AuthForm
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
