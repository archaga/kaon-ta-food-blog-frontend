import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// material
import {
  alpha,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  TextField,
} from '@mui/material';
// component
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import Iconify from '../../../components/Iconify';
import { login } from '../../../services/auth';
import { getDomain } from '../../../services/domain';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.background.COFFEEBEAN[0], 1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.background.CIOCCOLATO[0], 0.8),
    },
  }));

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      const { email, password } = values;
      console.log({
        values,
        REACT_APP_API_URL: process.env.REACT_APP_API_URL,
        domain: getDomain(),
      });
      return login(email, password).then((res) => {
        console.log({ res });
        if (res?.data?.success) {
          const { token } = res.data.data;

          Cookies.set('userToken', token);

          enqueueSnackbar('Welcome!', {
            variant: 'success',
          });
          navigate('/page/home');
        } else {
          enqueueSnackbar(res.data.errorMessage, {
            variant: 'error',
          });
        }
      });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
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
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />
        </Stack>

        <ColorButton fullWidth size="large" type="submit" variant="contained" disabled={Boolean(isSubmitting)}>
          Login
        </ColorButton>
      </Form>
    </FormikProvider>
  );
}
