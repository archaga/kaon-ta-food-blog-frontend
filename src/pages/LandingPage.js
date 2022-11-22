import { alpha, AppBar, Box, Stack, styled, Toolbar } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useSearchParams } from 'react-router-dom';
import DomainRedirect from '../components/DomainRedirect';
import Logo from '../components/Logo';
import Page from '../components/Page';
import { LandingPageCard } from '../sections/@dashboard/landingPage';

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.COFFEEBEAN[0], 0.8),
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

export default function LandingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const domainError = searchParams.get('domain_error');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  if (domainError) {
    enqueueSnackbar("Domain doesn't exist", { variant: 'error' });
  }

  return (
    <Page title="Landing Page">
      <DomainRedirect>
        <RootStyle>
          <ToolbarStyle>
            <Stack direction="row" alignItems="flex-start" spacing={{ xs: 0.5, sm: 1.5 }}>
              <Logo />
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
          </ToolbarStyle>
          <LandingPageCard />
        </RootStyle>
      </DomainRedirect>
    </Page>
  );
}
