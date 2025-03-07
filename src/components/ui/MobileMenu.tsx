import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './button';
import { Mountain, X } from 'lucide-react';

export interface MenuItem {
  href: string;
  label: string;
}

export interface NavigationItem {
  href: string;
  name: string;
}

interface MobileMenuProps {
  // Support both MenuItem[] and NavigationItem[] formats
  items?: MenuItem[];
  navigation?: NavigationItem[];
  logo?: string;
  logoAlt?: string;
  showConsultButton?: boolean;
}

const MobileMenu = ({
  items,
  navigation,
  logo = '/favicon.svg',
  logoAlt = 'Very Good Marketing',
  showConsultButton = true,
}: MobileMenuProps) => {
  // Convert navigation items to menu items if provided
  const menuItems =
    items || navigation?.map((item) => ({ href: item.href, label: item.name })) || [];

  // State for menu visibility and animation
  const [menuVisible, setMenuVisible] = useState(false);
  const [animationState, setAnimationState] = useState<'idle' | 'opening' | 'open' | 'closing'>(
    'idle'
  );
  const [mounted, setMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // Get current page path for active highlighting
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  // Set up client-side rendering
  useEffect(() => {
    containerRef.current = document.body;
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Clear animation timeouts to prevent race conditions
  const clearAnimationTimeout = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
  };

  const openMenu = () => {
    clearAnimationTimeout();
    setMenuVisible(true);

    requestAnimationFrame(() => {
      setAnimationState('opening');

      animationTimeoutRef.current = setTimeout(() => {
        setAnimationState('open');
      }, 500);
    });

    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    clearAnimationTimeout();
    setAnimationState('closing');

    animationTimeoutRef.current = setTimeout(() => {
      setMenuVisible(false);
      setAnimationState('idle');
      document.body.style.overflow = '';
    }, 500);
  };

  // Handle escape key
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
      document.body.style.overflow = '';
    };
  }, [menuVisible]);

  // Handle backdrop clicks
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      closeMenu();
    }
  };

  // Get animation origin point
  const getAnimationOrigin = () => {
    if (!menuButtonRef.current) return 'top right';

    const rect = menuButtonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    return `${x}px ${y}px`;
  };

  // Don't render the full menu until it's mounted
  if (!mounted)
    return (
      <button
        ref={menuButtonRef}
        type="button"
        onClick={openMenu}
        className="z-50 inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset md:hidden"
        aria-expanded={menuVisible}
        aria-label="Open main menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="8" x2="20" y2="8"></line>
          <line x1="4" y1="16" x2="20" y2="16"></line>
        </svg>
      </button>
    );

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
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="8" x2="20" y2="8"></line>
          <line x1="4" y1="16" x2="20" y2="16"></line>
        </svg>
      </button>

      {menuVisible &&
        createPortal(
          <div
            ref={backdropRef}
            onClick={handleBackdropClick}
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
              <span className="text-xl font-bold">{logoAlt}</span>
            </div>

            {/* Centered navigation */}
            <nav className="flex flex-col items-center justify-center space-y-6 px-4 text-center">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`text-2xl font-medium transition-colors duration-300 ${
                    isActive(item.href)
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-800 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              {showConsultButton && (
                <div className="mt-4 pt-8">
                  <Button asChild variant="blue" size="lg">
                    <a href="/contact" onClick={closeMenu}>
                      Free Consultation
                    </a>
                  </Button>
                </div>
              )}
            </nav>
          </div>,
          document.body
        )}
    </div>
  );
};

export default MobileMenu;
