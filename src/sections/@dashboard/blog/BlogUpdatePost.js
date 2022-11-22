import { alpha, Box, Button, Dialog, DialogActions, DialogContent, Stack, styled, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { updatePost } from '../../../services/post';

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.COFFEEBEAN[0], 1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.CIOCCOLATO[0], 0.8),
  },
}));

export default function BlogUpdatePost({ open, handleClose, post }) {
  const { title, description } = post;
  const { enqueueSnackbar } = useSnackbar();
  const PostSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  const formik = useFormik({
    initialValues: {
      title,
      description,
    },
    validationSchema: PostSchema,
    onSubmit: async (value) => {
      console.log(value);

      // eslint-disable-next-line camelcase
      const { title, description } = value;

      return updatePost(post.id, title, description)
        .then(() => {
          enqueueSnackbar('Post updated successfully.', { variant: 'success' });
          window.location.reload();
          handleClose();
        })
        .catch(() => {
          enqueueSnackbar('Post update failed.', { variant: 'error' });
        });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={1}>
              <TextField
                name="title"
                id="title"
                label="Title"
                variant="standard"
                {...getFieldProps('title')}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
              />
              <TextField
                name="description"
                id="description"
                label="Description"
                multiline
                variant="standard"
                {...getFieldProps('description')}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />
            </Stack>
          </DialogContent>

          <DialogActions>
            <Stack direction="row" spacing={1}>
              <Box display="inline">
                <ColorButton id="submit" type="submit" variant="contained" disabled={isSubmitting}>
                  Submit
                </ColorButton>
              </Box>
            </Stack>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
}
