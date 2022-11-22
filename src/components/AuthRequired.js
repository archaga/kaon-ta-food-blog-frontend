import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../services/auth';
import { getUserToken } from '../services/helpers';

export default function AuthRequired({ children }) {
  const navigate = useNavigate();
  const userToken = getUserToken();
  console.log(userToken);

  useEffect(() => {
    getUser()
      .then((res) => {
        console.log({ res });
        console.table(res.data);
      })
      .catch((err) => {
        navigate(`/page/login`);
      });
  }, []);

  return children;
}
