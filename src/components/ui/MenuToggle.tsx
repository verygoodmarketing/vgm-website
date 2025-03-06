import { useRef, useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';
import type { MenuItem } from './MobileMenu';

interface MenuToggleProps {
  items: MenuItem[];
  logo?: string;
  logoAlt?: string;
}

const MenuToggle = ({ items, logo, logoAlt }: MenuToggleProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle client-side only rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update button position when window resizes
  useEffect(() => {
    if (!isMounted) return;

    const updateButtonPosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonPosition({
          x: rect.x + rect.width / 2,
          y: rect.y + rect.height / 2,
        });
      }
    };

    // Initial position
    updateButtonPosition();

    // Update on resize
    window.addEventListener('resize', updateButtonPosition);

    return () => {
      window.removeEventListener('resize', updateButtonPosition);
    };
  }, [isMounted]);

  const toggleMenu = () => {
    // Update button position when toggling (especially important for opening)
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
      });
    }
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-600 text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none md:hidden"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-90 opacity-0' : ''}`}
        >
          <line x1="4" y1="8" x2="20" y2="8"></line>
          <line x1="4" y1="16" x2="20" y2="16"></line>
        </svg>
      </button>

      {isMounted && (
        <MobileMenu
          items={items}
          logo={logo}
          logoAlt={logoAlt}
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          buttonPosition={buttonPosition}
          showConsultButton={true}
        />
      )}
    </>
  );
};

export default MenuToggle;
