import { useState } from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { AiOutlineClose } from 'react-icons/ai';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import { useUser } from '../lib/hooks';

import css from './Header.module.css';

const Header = () => {
  const [dialogType, setDialogType] = useState('');
  const [open, setOpen] = useState(false);
  const user = useUser();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = (formType) => {
    setDialogType(formType);
    setOpen(!open);
  };

  const handleClose = () => {
    // setDialogType('');
    setOpen(!open);
  };

  const CloseBtn = () => (
    <IconButton aria-label="close-dialog" onClick={handleClose}>
      <AiOutlineClose />
    </IconButton>
  );

  return (
    <header className={css.header}>
      <div className={css.logo}>
        <span>xelp</span>
      </div>
      <nav>
        <ul>
          {user ? (
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
          <DialogTitle id="responsive-dialog-title">
            <span>Sign in</span>
            <CloseBtn />
          </DialogTitle>
        ) : (
          // <DialogContent></DialogContent>

          <DialogTitle id="responsive-dialog-title">
            <span>Sign up</span>
            <CloseBtn />
          </DialogTitle>
          // <DialogContent></DialogContent>
        )}
      </Dialog>
    </header>
  );
};

export default Header;
