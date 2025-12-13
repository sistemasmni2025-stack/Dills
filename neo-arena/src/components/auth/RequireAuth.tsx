import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, setRedirectPath } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      setRedirectPath(location.pathname + location.search);
      navigate('/login', { replace: true });
    }
  }, [loading, user, location, navigate, setRedirectPath]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 rounded-full border-4 border-slate-700 border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;
  return <>{children}</>;
};
