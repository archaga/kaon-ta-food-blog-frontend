import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Card, Container, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/Logo';
import Page from '../components/Page';
// sections
import DomainRedirect from '../components/DomainRedirect';
import { RegisterForm } from '../sections/auth/register';

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
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Register">
      <DomainRedirect>
        <RootStyle>
          <HeaderStyle>
            <Logo />
          </HeaderStyle>

          {mdUp && (
            <SectionStyle>
              <img src="/static/mock-images/covers/breakfast.jpg" alt="login" />
            </SectionStyle>
          )}
          <Container>
            <ContentStyle>
              <Typography variant="h4" align="center" sx={{ mb: 3 }} gutterBottom>
                Register
              </Typography>
              <RegisterForm />
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                Already have an account?{' '}
                <Link variant="subtitle2" to="/page/login" component={RouterLink}>
                  Login
                </Link>
              </Typography>
            </ContentStyle>
          </Container>
        </RootStyle>
      </DomainRedirect>
    </Page>
  );
}
