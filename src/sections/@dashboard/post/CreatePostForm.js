import { alpha, Box, Button, Card, Stack, styled, TextField, Tooltip } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { createPost } from '../../../services/post';

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.COFFEEBEAN[0], 1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.CIOCCOLATO[0], 0.8),
  },
}));

export default function CreatePostForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [image, setImage] = useState();
  const PostSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: PostSchema,
    onSubmit: (value) => {
      console.log(value);

      // eslint-disable-next-line camelcase
      const { title, description } = value;

      return createPost(title, description, image)
        .then((res) => {
          enqueueSnackbar('Post created successfully.', { variant: 'success' });
          navigate('/dashboard/blog');
          return Promise.resolve(res);
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar('Post create failed.', { variant: 'error' });
        });
    },
  });

  const handleUploadImage = (e) => {
    if (e.target.files.length < 1) return;
    setImage(e.target.files[0]);
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Card>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box
            sx={{
              '& > :not(style)': { ml: 14, mt: 5, width: '100ch' },
            }}
            noValidate
            autoComplete="off"
          >
            {image && (
              <Stack direction="row" justifyContent="center" alignItems="center" alignContent="center" pb={1}>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Post"
                  style={{ maxWidth: '75vw', maxHeight: '50vh', objectFit: 'cover' }}
                />
              </Stack>
            )}
            <TextField
              name="title"
              id="title"
              label="Title"
              variant="standard"
              {...getFieldProps('title')}
              error={Boolean(touched.title && errors.title)}
              helperText={touched.title && errors.title}
            />
          </Box>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { ml: 14.5, mt: 7, width: '100ch' },
            }}
            noValidate
            autoComplete="off"
          >
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
          </Box>
          <Box>
            <ColorButton sx={{ mt: 6, ml: 14.5, mb: 6 }} variant="contained" component="label">
              Upload File
              <input
                accept=".png, .jpg, .jpeg"
                id="uploadFile"
                multiple={false}
                type="file"
                hidden
                onChange={handleUploadImage}
              />
            </ColorButton>
            <Box sx={{ ml: 3 }} display="inline">
              <Tooltip title={!image ? 'Image is required' : undefined} disableHoverListener={!image}>
                <span>
                  <ColorButton id="submit" type="submit" variant="contained" disabled={!image || formik.isSubmitting}>
                    Submit
                  </ColorButton>
                </span>
              </Tooltip>
            </Box>
          </Box>
        </Form>
      </FormikProvider>
    </Card>
  );
}
