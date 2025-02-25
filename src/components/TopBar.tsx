import React from 'react';
import { 
  CircleUserIcon, 
  SearchIcon, 
  BellIcon, 
  MenuIcon 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TopBar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex-grow max-w-md mx-4 outline-none">
          <div className="relative">
            <SearchIcon 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
              size={20} 
            />
            <Input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 w-full"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <BellIcon className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <CircleUserIcon className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
