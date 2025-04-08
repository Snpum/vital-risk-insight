
import React from 'react';
import { HeartPulse, UserPlus, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HealthHeader = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <HeartPulse className="h-6 w-6 text-blue-600" />
          <span className="font-semibold text-lg text-blue-600 cursor-pointer" onClick={() => navigate('/')}>VitalRisk Insight</span>
        </div>
        <nav className="flex items-center">
          <ul className="flex space-x-4 md:space-x-6 mr-4">
            <li><a href="/" className="text-sm text-blue-600 font-medium hover:text-blue-800">Home</a></li>
            <li><a href="/about" className="text-sm text-gray-600 font-medium hover:text-blue-800">About</a></li>
          </ul>
          {user?.isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Hello, {user.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => navigate('/login')}
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => navigate('/create-account')}
              >
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default HealthHeader;
