import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ children, isAllowed, redirectTo = '/login' }) {
  if (!isAllowed) return <Navigate to={redirectTo} replace />;

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
