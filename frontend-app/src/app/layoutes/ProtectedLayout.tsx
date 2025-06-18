import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useEffect } from 'react';

const ProtectedLayout = () => {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/'); 
    }
  }, [user, navigate]);

  if (!user) return null; 

  return (
    <div className="flex h-screen bg-gray-100">
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
