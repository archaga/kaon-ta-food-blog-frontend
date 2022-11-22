import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDomain, getTenant } from '../services/domain';

export default function DomainRedirect({ children }) {
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  useEffect(() => {
    const domain = getDomain();

    if (domain) {
      getTenant(domain)
        .then((res) => {
          if (!res.data.success && pathname === '/') {
            navigate('/page/home');
          } else if (!res.data.success && pathname === '/page/register') {
            navigate('/page/home');
          }
        })
        .catch((err) => {
          document.location = `${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_HOST_URL}?domain_error=true`;
        });
    }
  }, []);

  return children;
}
