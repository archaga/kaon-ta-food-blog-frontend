import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography, styled, alpha } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { BlogShowCard } from '../sections/@dashboard/blog';

// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.COFFEEBEAN[0], 1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.CIOCCOLATO[0], 0.8),
  },
}));
// ----------------------------------------------------------------------

export default function BlogShowCard() {
  return (
    <Page title="Blog">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{mb: 5, mt: 3}}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <ColorButton variant="contained" component={RouterLink} to="/dashboard/createPost" startIcon={<Iconify icon="eva:plus-fill" />}>
            Create Post
          </ColorButton>
        </Stack>

        <Grid container spacing={3} mt={5}>
          {POSTS.map((post) => (
            <BlogShowCard key={post.id} post={post}  />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
