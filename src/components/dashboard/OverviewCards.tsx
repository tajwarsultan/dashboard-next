import React from 'react';
import { DollarSign, Users, CreditCard } from 'lucide-react';
import { overviewCards } from '@/lib/dummyData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IconMap = {
  DollarSignIcon: DollarSign,
  UsersIcon: Users,
  CreditCardIcon: CreditCard,
};

const OverviewCards: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {overviewCards.map((card, index) => {
        const Icon = IconMap[card.icon as keyof typeof IconMap] || (() => null);

        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className={`text-xs ${card.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {card.change > 0 ? '+' : ''}{card.change}% from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default OverviewCards;
