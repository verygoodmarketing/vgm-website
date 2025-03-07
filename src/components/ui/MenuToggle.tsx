import type { MenuItem, NavigationItem } from './MobileMenu';
import MobileMenu from './MobileMenu';

interface MenuToggleProps {
  items?: MenuItem[];
  navigation?: NavigationItem[];
  logo?: string;
  logoAlt?: string;
}

// This component is now a simple wrapper over MobileMenu
// for backward compatibility with existing code
const MenuToggle = ({ items, navigation, logo, logoAlt }: MenuToggleProps) => {
  return (
    <MobileMenu
      items={items}
      navigation={navigation}
      logo={logo}
      logoAlt={logoAlt}
      showConsultButton={true}
    />
  );
};

export default MenuToggle;
