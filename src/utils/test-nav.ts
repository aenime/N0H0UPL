// This is a utility to help test and debug navigation issues

// Function to log current navigation items in localStorage
export function logNavItems() {
  if (typeof window !== 'undefined') {
    const navItems = localStorage.getItem('navItems');
    console.log('Current navigation items:', navItems ? JSON.parse(navItems) : 'Not found');
    return navItems ? JSON.parse(navItems) : null;
  }
  return null;
}

// Function to reset navigation items to default
export function resetNavItems() {
  if (typeof window !== 'undefined') {
    const defaultNavItems = [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
      { label: 'Animals', path: '/animals' },
      { label: 'Gaushala', path: '/gaushala' },
      { label: 'Child Welfare', path: '/child-welfare' },
      { label: 'Environmental', path: '/environmental' },
      { label: 'Donate', path: '/donate' }
    ];
    localStorage.setItem('navItems', JSON.stringify(defaultNavItems));
    console.log('Navigation items reset to default');
    return defaultNavItems;
  }
  return null;
}

// Function to add Home to navigation if missing
export function ensureHomeNav() {
  if (typeof window !== 'undefined') {
    const navItemsStr = localStorage.getItem('navItems');
    if (navItemsStr) {
      const navItems = JSON.parse(navItemsStr);
      const hasHome = navItems.some((item: {label: string, path: string}) => 
        item.path === '/' || item.label.toLowerCase() === 'home');
      
      if (!hasHome) {
        navItems.unshift({ label: 'Home', path: '/' });
        localStorage.setItem('navItems', JSON.stringify(navItems));
        console.log('Home navigation item added');
        return navItems;
      }
      return navItems;
    }
  }
  return null;
}
