// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar } from '@mui/material';
//
import AccountPopover from './AccountPopover';
// ----------------------------------------------------------------------


const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.COFFEEBEAN[0], 1),
  [theme.breakpoints.up('lg')]: {
    width: '100%',
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardNavbar() {
  return (
    <RootStyle>
      <ToolbarStyle>
      
     
      <Box sx={{ flexGrow: 1 }} />
      <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
        <AccountPopover />
      </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
