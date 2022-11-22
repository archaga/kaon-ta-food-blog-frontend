import Cookies from 'js-cookie';

export function getUserToken() {
  return Cookies.get('userToken');
}
