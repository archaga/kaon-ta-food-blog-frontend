import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// material
import { alpha, Button, IconButton, InputAdornment, Stack, styled, TextField } from '@mui/material';

// component
import { useSnackbar } from 'notistack';
import Iconify from '../../../components/Iconify';
import { register } from '../../../services/auth';

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.COFFEEBEAN[0], 1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.CIOCCOLATO[0], 0.8),
  },
}));
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    domain: Yup.string().required('Domain is required'),
    password: Yup.string().required('Password is required'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password Confirmation is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      domain: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (initialValues) => {
      console.log(initialValues);
      console.log(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_URL}/register`);

      // eslint-disable-next-line camelcase
      const { name, email, domain, password, password_confirmation } = initialValues;
      register(name, email, domain, password, password_confirmation)
        .then((res) => {
          document.location = `${process.env.REACT_APP_API_PROTOCOL}${initialValues.domain}.${process.env.REACT_APP_HOST_URL}/page/home`;
          return Promise.resolve(res);
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar(err.response.data.message, { variant: 'error' });
        });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              type="text"
              label="Name"
              name="flname"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
          </Stack>
          <TextField
            fullWidth
            type="text"
            label="Domain"
            name="udomain"
            {...getFieldProps('domain')}
            error={Boolean(touched.domain && errors.domain)}
            helperText={touched.domain && errors.domain}
          />
          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            name="uemail"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            name="password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Confirmation Password"
            name="password_confirmation"
            {...getFieldProps('password_confirmation')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <ColorButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </ColorButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
