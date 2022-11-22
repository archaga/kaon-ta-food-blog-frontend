import axios from 'axios';

export function getDomain() {
  const host = window.location.host;
  const domain = host.split('.')[0];

  if (domain === process.env.REACT_APP_HOST_URL) {
    return null;
  }

  return domain;
}

export function getTenant(domain) {
  return axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_URL}/tenant/${domain}`, {
    headers: {
      Accept: 'application/json',
    },
  });
}
