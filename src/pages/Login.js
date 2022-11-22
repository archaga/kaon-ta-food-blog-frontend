import { Card, Container, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import Page from '../components/Page';
import useResponsive from '../hooks/useResponsive';

import DomainRedirect from '../components/DomainRedirect';
import Logo from '../components/Logo';
import NonAuthRequired from '../components/NonAuthRequired';
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 700,
  maxHeight: 700,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 500,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login">
      <NonAuthRequired>
        <DomainRedirect>
          <RootStyle>
            <HeaderStyle>
              <Logo />
            </HeaderStyle>

            {mdUp && (
              <SectionStyle>
                <img src="/static/mock-images/covers/pancake.jpg" alt="login" />
              </SectionStyle>
            )}

            <Container maxWidth="sm">
              <ContentStyle>
                <Typography variant="h4" align="center" sx={{ mb: 3 }} gutterBottom>
                  Login
                </Typography>

                <LoginForm />
                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                  Don’t have an account?{' '}
                  <Link variant="subtitle2" component={RouterLink} to="/page/register">
                    Register
                  </Link>
                </Typography>
              </ContentStyle>
            </Container>
          </RootStyle>
        </DomainRedirect>
      </NonAuthRequired>
    </Page>
  );
}
