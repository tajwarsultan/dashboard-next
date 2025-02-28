'use client';
import React from 'react';
import { 
  CircleUserIcon, 
  SearchIcon, 
  BellIcon, 
  MenuIcon 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <BellIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <div className="flex justify-between items-center p-2">
                <span className="font-semibold">Notifications</span>
                <Button variant="ghost" size="sm">Mark all as read</Button>
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                <div className="p-2 hover:bg-gray-100">
                  <p className="font-medium">New message received</p>
                  <p className="text-sm text-gray-500">2 minutes ago</p>
                </div>
                <DropdownMenuSeparator />
                <div className="p-2 hover:bg-gray-100">
                  <p className="font-medium">System update completed</p>
                  <p className="text-sm text-gray-500">1 hour ago</p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <CircleUserIcon className="h-8 w-8" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="flex flex-col items-center gap-2 p-4">
                <CircleUserIcon className="h-16 w-16" />
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-gray-500">john.doe@example.com</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
