'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'JET CHARTER', href: '#' },
  { label: 'TRIP PLANNING', href: '#' },
  { label: 'FUEL SERVICES', href: '#' },
  { label: 'AIR CRAFTS', href: '#' },
  { label: 'CONTACT US', href: '#' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-8 py-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border-2 border-foreground rounded-full flex items-center justify-center">
            <div className="w-4 h-4 border border-foreground rounded-full" />
          </div>
          <span className="text-foreground text-sm font-light tracking-widest">
            AURELIAN AIR
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-12 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-muted-foreground text-xs font-light tracking-widest hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-foreground hover:text-primary transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-20 left-0 right-0 bg-background bg-opacity-95 backdrop-blur-md lg:hidden">
            <div className="flex flex-col gap-6 p-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground text-sm font-light tracking-widest hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
