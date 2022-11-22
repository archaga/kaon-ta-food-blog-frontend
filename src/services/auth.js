import axios from 'axios';
import { getDomain } from './domain';
import { getUserToken } from './helpers';

export function login(email, password) {
  const domain = getDomain();

  return axios.post(
    `${process.env.REACT_APP_API_PROTOCOL}${domain}.${process.env.REACT_APP_API_URL}/login`,
    { email, password },
    { Accept: 'application/json' }
  );
}

// eslint-disable-next-line camelcase
export function register(name, email, domain, password, password_confirmation) {
  return axios.post(
    `${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_URL}/register`,
    {
      name,
      email,
      domain,
      password,
      // eslint-disable-next-line camelcase
      password_confirmation,
    },
    {
      headers: {
        Accept: 'application/json',
      },
    }
  );
}

export function getUser() {
  return axios.get(`${process.env.REACT_APP_API_PROTOCOL}${getDomain()}.${process.env.REACT_APP_API_URL}/user`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    },
  });
}

export function logout() {
  return axios.post(
    `${process.env.REACT_APP_API_PROTOCOL}${getDomain()}.${process.env.REACT_APP_API_URL}/logout`,
    {},
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getUserToken()}`,
      },
    }
  );
}
