import { Avatar, Box, Divider, IconButton, MenuItem, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MenuPopover from '../../components/MenuPopover';
import { getUser, logout } from '../../services/auth';
import account from '../../_mock/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    linkTo: '/page/home',
  },
  {
    label: 'Blog',
    linkTo: '/Dashboard/blog',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [user, setUser] = useState();
  const anchorRef = useRef(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  useEffect(() => {
    getUser().then((res) => {
      console.log({ userRes: res });
      setUser(res.data.data);
    });
  }, []);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        {user && (
          <>
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle2" noWrap>
                {user?.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {user?.email}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />
          </>
        )}

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {user && (
          <MenuItem
            onClick={() => {
              handleClose();
              logout().then((res) => {
                Cookies.remove('userToken');
                window.location.reload();

                enqueueSnackbar('Logged out successfully.', {
                  variant: 'success',
                });
              });
            }}
            sx={{ m: 1 }}
          >
            Logout
          </MenuItem>
        )}
        {!user && (
          <MenuItem
            onClick={() => {
              handleClose();
              navigate('/page/login');
            }}
            sx={{ m: 1 }}
          >
            Login
          </MenuItem>
        )}
      </MenuPopover>
    </>
  );
}
