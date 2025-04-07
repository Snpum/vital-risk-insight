
import React from 'react';
import { HeartPulse } from 'lucide-react';

const HealthHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <HeartPulse className="h-6 w-6 text-blue-600" />
          <span className="font-semibold text-lg text-blue-600">VitalRisk Insight</span>
        </div>
        <nav>
          <ul className="flex space-x-4 md:space-x-6">
            <li><a href="/" className="text-sm text-blue-600 font-medium hover:text-blue-800">Home</a></li>
            <li><a href="#about" className="text-sm text-gray-600 font-medium hover:text-blue-800">About</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HealthHeader;
