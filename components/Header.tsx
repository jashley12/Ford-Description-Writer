import React from 'react';

const Header: React.FC = () => {
  const logoSrc = "https://di-uploads-pod45.dealerinspire.com/bobtomesford/uploads/2025/05/Bob-Tomes-Ford-Logo-1-.png";

  return (
    <header className="bg-gray-800 shadow-md p-4">
      <div className="container mx-auto text-center flex flex-col items-center gap-4">
        <div className="max-w-xs">
          <img src={logoSrc} alt="Bob Tomes Ford Logo" className="w-full h-auto" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-400">
            Vehicle Description Generator
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;