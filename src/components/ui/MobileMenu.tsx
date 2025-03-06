import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './button';

export interface MenuItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  items: MenuItem[];
  logo?: string;
  logoAlt?: string;
  isOpen: boolean;
  onClose: () => void;
  buttonPosition: { x: number; y: number };
  showConsultButton?: boolean;
}

const MobileMenu = ({
  items,
  logo = '/favicon.svg',
  logoAlt = 'Logo',
  isOpen,
  onClose,
  buttonPosition,
  showConsultButton = false,
}: MobileMenuProps) => {
  const [mounted, setMounted] = useState(false);
  const [animationState, setAnimationState] = useState<'closed' | 'opening' | 'open' | 'closing'>(
    'closed'
  );
  const backdropRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // Calculate x and y position for the animation origin
  const originX = buttonPosition.x;
  const originY = buttonPosition.y;

  // Handle mounting for client-side only rendering
  useEffect(() => {
    containerRef.current = document.body;
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle animation states and body scroll locking
  useEffect(() => {
    if (!mounted) return;

    if (isOpen && animationState === 'closed') {
      setAnimationState('opening');
      document.body.style.overflow = 'hidden';

      // After opening animation completes
      setTimeout(() => {
        setAnimationState('open');
      }, 500); // Match this with the CSS transition duration
    } else if (!isOpen && (animationState === 'open' || animationState === 'opening')) {
      setAnimationState('closing');

      // After closing animation completes
      setTimeout(() => {
        setAnimationState('closed');
        document.body.style.overflow = '';
      }, 500); // Match this with the CSS transition duration
    }
  }, [isOpen, animationState, mounted]);

  // Handle clicks outside the menu content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  // Don't render anything on the server or if not mounted
  if (!mounted || !containerRef.current) return null;

  // Don't render if the menu is fully closed
  if (animationState === 'closed' && !isOpen) return null;

  // Calculate scale values for the animation
  const getScaleStyles = () => {
    if (typeof window === 'undefined') return {}; // Safety check for SSR

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate the scale needed to cover the entire screen
    // Get the largest possible distance from the origin point to any corner
    const maxDistance = Math.max(
      Math.hypot(viewportWidth - originX, viewportHeight - originY),
      Math.hypot(originX, viewportHeight - originY),
      Math.hypot(viewportWidth - originX, originY),
      Math.hypot(originX, originY)
    );

    // We double the max distance to ensure full coverage and convert to a scale factor
    // Initial size is 50px diameter (25px radius), so we need to scale accordingly
    const scale = (maxDistance * 2.2) / 25;

    // State-dependent transform
    const transform =
      animationState === 'opening' || animationState === 'open' ? `scale(${scale})` : 'scale(0)';

    return {
      left: `${originX - 25}px`, // Center the 50px circle on the origin
      top: `${originY - 25}px`,
      transformOrigin: 'center',
      transform,
    };
  };

  const menuContent = (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Animated circle background */}
      <div
        className="fixed h-[50px] w-[50px] rounded-full bg-blue-600 transition-transform duration-500 ease-out"
        style={getScaleStyles()}
      />

      {/* Menu content (only shown when fully open) */}
      <div
        className={`relative z-10 flex h-full w-full flex-col items-center justify-between p-8 text-white transition-opacity duration-300 ${
          animationState === 'open' ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {/* Logo */}
        <div className="mt-8 w-full text-center">
          <img src={logo} alt={logoAlt} className="inline-block h-12" />
        </div>

        {/* Menu items */}
        <nav className="flex flex-col items-center">
          <ul className="flex flex-col items-center space-y-6 text-2xl font-medium">
            {items.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="block px-4 py-2 transition-colors hover:text-blue-200"
                  onClick={onClose}
                >
                  {item.label}
                </a>
              </li>
            ))}

            {/* Free Consultation Button */}
            {showConsultButton && (
              <li className="mt-6">
                <Button variant="blue" size="lg">
                  <a href="/contact" onClick={onClose}>
                    Free Consultation
                  </a>
                </Button>
              </li>
            )}
          </ul>
        </nav>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-8 right-8 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Close menu"
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
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Empty bottom space to balance the layout */}
        <div className="h-12" />
      </div>
    </div>
  );

  return createPortal(menuContent, containerRef.current);
};

export default MobileMenu;
