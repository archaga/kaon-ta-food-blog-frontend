import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui

import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {

  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src="/static/mock-images/covers/KaonTa.png" alt="KaonTa" width="100%" height="100%" viewBox="0 0 512 512"/>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
