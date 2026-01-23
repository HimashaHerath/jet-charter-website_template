'use client';

import { useEffect, useState } from 'react';

const navItems = [
  { label: 'JET CHARTER', href: '#charter' },
  { label: 'TRIP PLANNING', href: '#planning' },
  { label: 'FUEL SERVICES', href: '#fuel' },
  { label: 'AIRCRAFT', href: '#fleet' },
  { label: 'CONTACT US', href: '#contact' },
];

export function Sidebar() {
  const [activeSection, setActiveSection] = useState<string>('charter');

  useEffect(() => {
    const sectionIds = navItems
      .map((item) => item.href.replace('#', ''))
      .filter((id) => id.length > 0);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-40% 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Logo - Top Left */}
      <div className="fixed top-6 left-8 z-50 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="text-foreground text-lg font-light" style={{ fontFamily: 'serif' }}>A</span>
          <span className="text-foreground text-xs" style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>/</span>
        </div>
        <span className="text-foreground/80 text-[10px] font-light tracking-[0.2em] uppercase">
          AURELIAN AIR
        </span>
      </div>

      {/* Left Navigation - Always Visible */}
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
        {navItems.map((item) => {
          const itemId = item.href.replace('#', '');
          const isActive = itemId === activeSection;
          return (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 text-[10px] font-light tracking-[0.15em] transition-colors duration-300 ${
                isActive
                  ? 'text-foreground/90'
                  : 'text-foreground/50 hover:text-foreground/70'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <div className="w-2 h-2 rounded-full border border-foreground/40"></div>
              )}
              <span className={isActive ? '' : 'ml-5'}>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
