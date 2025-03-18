"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <button className="text-xl font-bold text-blue-600">IngredientScan</button>
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <button className="text-gray-700 hover:text-blue-600 transition-colors">Início</button>
            </Link>
            <Link href="/analyze">
              <button className="text-gray-700 hover:text-blue-600 transition-colors">Analisar</button>
            </Link>
            <Link href="/pricing">
              <button className="text-gray-700 hover:text-blue-600 transition-colors">Preços</button>
            </Link>
            <Link href="/login">
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">Login</button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/">
                <button className="text-gray-700 hover:text-blue-600 transition-colors">Início</button>
              </Link>
              <Link href="/analyze">
                <button className="text-gray-700 hover:text-blue-600 transition-colors">Analisar</button>
              </Link>
              <Link href="/pricing">
                <button className="text-gray-700 hover:text-blue-600 transition-colors">Preços</button>
              </Link>
              <Link href="/login">
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors text-center">Login</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;