import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Settings, 
  HelpCircle, 
  LineChart,
  Airplay
} from 'lucide-react';
import { Button } from "@/components/ui/button";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

// Our main navigation items
const navItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    href: '/customers',
    label: 'Customers',
    icon: Users
  },
  {
    href: '/analytics',
    label: 'Analytics',
    icon: LineChart
  },
  {
    href: '/billing',
    label: 'Billing',
    icon: CreditCard
  },
  {
    href: '/report',
    label: 'Report',
    icon: Airplay
  }
];

// Footer navigation items
const footerItems: NavItem[] = [
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings
  },
  {
    href: '/help',
    label: 'Help',
    icon: HelpCircle
  }
];

const Sidebar: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col fixed left-0 z-20 top-16 bottom-0 w-64 bg-white shadow-md">
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            className="group"
          >
            <Button 
              variant="ghost" 
              className="w-full justify-start hover:bg-gray-100 space-x-2"
            >
              <item.icon 
                className="h-5 w-5 text-gray-500 group-hover:text-blue-600" 
              />
              <span>{item.label}</span>
            </Button>
          </Link>
        ))}
      </nav>

      <div className="border-t p-4 space-y-2">
        {footerItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            className="group"
          >
            <Button 
              variant="ghost" 
              className="w-full justify-start hover:bg-gray-100 space-x-2"
            >
              <item.icon 
                className="h-5 w-5 text-gray-500 group-hover:text-blue-600" 
              />
              <span>{item.label}</span>
            </Button>
          </Link>
        ))}
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t flex items-center space-x-3">
        <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center">
          <span className="text-gray-600 font-bold">JD</span>
        </div>
        <a href="/profile">
          <div className="font-semibold">John Doe</div>
          <div className="text-xs text-gray-500">john.doe@example.com</div>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;