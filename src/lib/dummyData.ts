// lib/dummyData.ts
import { DollarSign, Users, CreditCard } from "lucide-react";

export interface RevenueData {
    name: string;
    revenue: number;
    cost: number;
  }
  
  export interface OverviewCard {
    title: string;
    value: string;
    change: number;
    icon: React.ElementType;
  }
  
  export const monthlyRevenueData: RevenueData[] = [
    { name: 'Jan', revenue: 4000, cost: 2400 },
    { name: 'Feb', revenue: 3000, cost: 1398 },
    { name: 'Mar', revenue: 2000, cost: 9800 },
    { name: 'Apr', revenue: 2780, cost: 3908 },
    { name: 'May', revenue: 1890, cost: 4800 },
    { name: 'Jun', revenue: 2390, cost: 3800 },
  ];
  
  export const overviewCards: OverviewCard[] = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: 20.1,
      icon: DollarSign,
    },
    {
      title: 'Subscriptions',
      value: '572',
      change: 10.2,
      icon: Users,
    },
    {
      title: 'Active Now',
      value: '64',
      change: 5.5,
      icon: CreditCard,
    },
  ];