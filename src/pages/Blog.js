import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, Button, Container, Grid, Stack, styled, Typography } from '@mui/material';
// components
import { useEffect, useState } from 'react';
import Iconify from '../components/Iconify';
import Page from '../components/Page';
import { BlogPostCard } from '../sections/@dashboard/blog';
import { getPosts } from '../services/post';

// mock

// ----------------------------------------------------------------------

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.COFFEEBEAN[0], 1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.CIOCCOLATO[0], 0.8),
  },
}));
// ----------------------------------------------------------------------

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let subscribe = true;

    getPosts().then((res) => {
      if (res?.data?.data && subscribe) {
        setPosts(res.data.data);
      }
    });

    return () => {
      subscribe = false;
    };
  }, []);

  return (
    <Page title="Blog">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5, mt: 3 }}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <ColorButton
            variant="contained"
            component={RouterLink}
            to="/dashboard/createPost"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Post
          </ColorButton>
        </Stack>

        <Grid container spacing={3} mt={5}>
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
