'use client';

import { useState } from 'react';
import { Moon, Sun, Bell, User, Lock } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface SettingsOption {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export default function SettingsPage() {
  const [notificationSettings, setNotificationSettings] = useState<SettingsOption[]>([
    {
      id: 'email',
      title: 'Email Notifications',
      description: 'Receive email notifications for important updates',
      enabled: true,
    },
    {
      id: 'push',
      title: 'Push Notifications',
      description: 'Receive push notifications on your device',
      enabled: true,
    },
  ]);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSetting = (id: string) => {
    setNotificationSettings(settings =>
      settings.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      {/* Theme Settings */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isDarkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
              <div>
                <h2 className="text-xl font-semibold">Theme</h2>
                <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
              </div>
            </div>
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-label="Toggle theme"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {notificationSettings.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between">
              <div>
                <Label htmlFor={setting.id}>{setting.title}</Label>
                <p className="text-sm text-muted-foreground">{setting.description}</p>
              </div>
              <Switch
                id={setting.id}
                checked={setting.enabled}
                onCheckedChange={() => toggleSetting(setting.id)}
                aria-label={`Toggle ${setting.title}`}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Profile Settings */}
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Profile</h2>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="your.email@example.com"
              />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-3">
            <Lock className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Security</h2>
          </div>
        </CardHeader>
        <CardContent>
          <Button variant="default">
            Change Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
