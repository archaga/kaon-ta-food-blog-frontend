import { Link as RouterLink } from 'react-router-dom';
import {Button, Typography, styled, alpha} from '@mui/material';
import LandingPageLayout from './LandingPageLayout';

const backgroundImage =
  '/static/mock-images/products/image_1.jpg';

  const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.background.COFFEEBEAN[0], 1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.background.CIOCCOLATO[0], 1),
    },
  }));

export default function LandingPageCard() {
  return (
    <LandingPageLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', 
        backgroundPosition: 'center',
      }}
    >
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" mt={8} marked="center">
        The older you get, the more you eat.
      </Typography>
      <ColorButton
        variant="contained"
        size="large"
        component={RouterLink} to="/page/register"
        sx={{ minWidth: 200, mt: 5 }}
      >
        Get Started
      </ColorButton>
    </LandingPageLayout>
  );
}