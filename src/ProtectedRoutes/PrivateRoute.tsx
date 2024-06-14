// PrivateRoute.tsx
import React from 'react';
import { Route, RouteProps, useNavigate } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  ...rest
}) => {
  const navigate = useNavigate();
  const isAuthenticated= true

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
    <Route {...rest}>
      {children}
    </Route>
    </>
  );
};

export default PrivateRoute;
