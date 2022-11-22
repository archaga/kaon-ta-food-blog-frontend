import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../services/auth';
import { getUserToken } from '../services/helpers';

export default function NonAuthRequired({ children }) {
  const navigate = useNavigate();
  const userToken = getUserToken();
  console.log(userToken);

  useEffect(() => {
    getUser()
      .then((res) => {
        console.log({ res });
        console.table(res.data);

        navigate(`/page/home`);
      })
      .catch((err) => {
        console.trace(err);
      });
  }, []);

  return children;
}
