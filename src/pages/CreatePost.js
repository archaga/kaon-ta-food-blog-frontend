
// material
import {  Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { CreatePostForm } from '../sections/@dashboard/post';


// ----------------------------------------------------------------------

export default function CreatePost() {
  return (
    <Page title="Create Post">
      <Container>
        <Typography variant="h4" align="center" sx={{mt: 3, mb: 5}} gutterBottom>
            Create Post
          </Typography>
        <CreatePostForm />
      </Container>
    </Page>
  );
}
