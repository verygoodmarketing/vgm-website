import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Menu, Mountain, X } from 'lucide-react';
import { Button } from '@/ui/button';

interface MobileMenuProps {
  navigation: Array<{ name: string; href: string }>;
}

export default function MobileMenu({ navigation }: MobileMenuProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [animationState, setAnimationState] = useState<'idle' | 'opening' | 'open' | 'closing'>(
    'idle'
  );
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const animationTimeoutRef = useRef<number | null>(null);
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  // Clear any existing timeouts to prevent race conditions
  const clearAnimationTimeout = useCallback(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    // Clear any existing timeouts
    clearAnimationTimeout();

    // First make the menu visible
    setMenuVisible(true);

    // Then start the opening animation in the next frame
    // This ensures the menu is in the DOM before animation starts
    requestAnimationFrame(() => {
      setAnimationState('opening');

      // Set a timeout to mark animation as complete
      animationTimeoutRef.current = setTimeout(() => {
        setAnimationState('open');
      }, 500); // Match this with the CSS animation duration
    });

    // Lock body scroll
    document.body.style.overflow = 'hidden';
  }, [clearAnimationTimeout]);

  const closeMenu = useCallback(() => {
    // Clear any existing timeouts
    clearAnimationTimeout();

    // Start the closing animation
    setAnimationState('closing');

    // Set a timeout to hide the menu after animation completes
    animationTimeoutRef.current = setTimeout(() => {
      setMenuVisible(false);
      setAnimationState('idle');
      // Restore body scroll
      document.body.style.overflow = '';
    }, 500); // Match this with the CSS animation duration
  }, [clearAnimationTimeout]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuVisible) {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
      clearAnimationTimeout();
      // Ensure body scroll is restored when component unmounts
      document.body.style.overflow = '';
    };
  }, [menuVisible, closeMenu, clearAnimationTimeout]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAnimationTimeout();
    };
  }, [clearAnimationTimeout]);

  // Calculate animation origin position
  const getAnimationOrigin = () => {
    if (!menuButtonRef.current) return 'top right';

    const rect = menuButtonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    return `${x}px ${y}px`;
  };

  return (
    <div className="md:hidden">
      <button
        ref={menuButtonRef}
        type="button"
        onClick={openMenu}
        className="z-50 inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset"
        aria-expanded={menuVisible}
        aria-label="Open main menu"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {menuVisible && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-white ${
            animationState === 'opening'
              ? 'menu-opening'
              : animationState === 'closing'
                ? 'menu-closing'
                : animationState === 'open'
                  ? 'menu-open'
                  : ''
          }`}
          style={{
            ['--origin' as any]: getAnimationOrigin(),
          }}
        >
          {/* Close button */}
          <button
            type="button"
            className="absolute top-6 right-6 rounded-full p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Logo at top */}
          <div className="absolute top-6 left-6 flex items-center">
            <Mountain className="mr-2 h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Very Good Marketing</span>
          </div>

          {/* Centered navigation */}
          <nav className="flex flex-col items-center justify-center space-y-6 px-4 text-center">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                className={`text-2xl font-medium transition-colors duration-300 ${
                  isActive(item.href)
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-800 hover:text-blue-600'
                }`}
              >
                {item.name}
              </a>
            ))}
            <div className="mt-4 pt-8">
              <Button asChild variant="blue" size="lg">
                <a href="/contact" onClick={closeMenu}>
                  Free Consultation
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
