# Mobile Menu Component for Astro.js with React

This directory contains React components that implement a mobile menu with a circular animation effect for Astro.js projects.

## Components

1. **MobileMenu.tsx**: The main component that renders the full-screen menu with circular animation.
2. **MenuToggle.tsx**: A button component that toggles the mobile menu and tracks its position.

## Features

- Circular animation that expands from the toggle button
- Responsive design (only shows on mobile screens)
- Smooth transitions between states
- Prevents scrolling of background content when menu is open
- Closes when clicking outside of the menu content
- Centered menu items
- Close button in the upper right corner
- Logo at the top center

## Usage

### Step 1: Import the MenuToggle Component

In your Astro component (like a header or layout):

```astro
---
// Your imports
import MenuToggle from './ui/MenuToggle';

// Your menu items
const navItems = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];
---

<header>
  <!-- Your header content -->
  <div class="sm:hidden">
    <MenuToggle
      items={navItems}
      logo="/path/to/your/logo.svg"
      logoAlt="Your Logo Alt Text"
      client:load
    />
  </div>
</header>
```

### Important Notes

1. **The `client:load` directive is required** - This ensures the React component is hydrated on the client-side immediately.
2. **Use media queries for responsive behavior** - The example uses Tailwind's `sm:hidden` to hide the menu toggle on larger screens.
3. **Logo path** - Make sure to provide the correct path to your logo.
4. **Menu items structure** - Each menu item should have `href` and `label` properties.

### Customization

You can customize the appearance of the menu by modifying the Tailwind classes in the components:

- **Background color**: Change the `bg-blue-600` class in MobileMenu.tsx
- **Text color**: Modify the `text-white` class
- **Animation speed**: Adjust the `duration-500` class and the matching timeout values (500ms) in the useEffect hook

## TypeScript Type Definitions

The components use TypeScript for type safety. The main types are:

```typescript
// MenuItem type for navigation items
export interface MenuItem {
  href: string;
  label: string;
}

// Props for the MenuToggle component
interface MenuToggleProps {
  items: MenuItem[];
  logo?: string;
  logoAlt?: string;
}

// Props for the MobileMenu component
interface MobileMenuProps {
  items: MenuItem[];
  logo?: string;
  logoAlt?: string;
  isOpen: boolean;
  onClose: () => void;
  buttonPosition: { x: number; y: number };
}
```

## Dependencies

This component requires:

- React
- Tailwind CSS
- The `cn` utility function (usually in a utils.ts file)

Make sure your Astro project has the React integration installed:

```bash
npx astro add react
```
