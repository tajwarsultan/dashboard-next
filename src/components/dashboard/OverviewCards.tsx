import React from "react";
import { formatCurrency } from "@/lib/utils";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  PiggyBank,
  Percent,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const OverviewCards: React.FC = () => {
  const metrics = {
    totalRevenue: 124500,
    totalExpenses: 67800,
    netProfit: 56700,
    growthRate: 12.5,
    transactions: 156,
    savings: 34500,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <h3 className="mt-2 text-2xl font-bold">
              {formatCurrency(metrics.totalRevenue)}
            </h3>
          </div>
          <DollarSign className="h-8 w-8 text-green-500" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <h3 className="mt-2 text-2xl font-bold">
              {formatCurrency(metrics.totalExpenses)}
            </h3>
          </div>
          <CreditCard className="h-8 w-8 text-red-500" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Net Profit</p>
            <h3 className="mt-2 text-2xl font-bold">
              {formatCurrency(metrics.netProfit)}
            </h3>
          </div>
          {metrics.netProfit >= 0 ? (
            <TrendingUp className="h-8 w-8 text-green-500" />
          ) : (
            <TrendingDown className="h-8 w-8 text-red-500" />
          )}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Monthly Growth</p>
            <h3 className="mt-2 text-2xl font-bold">{metrics.growthRate}%</h3>
          </div>
          <Percent className="h-8 w-8 text-blue-500" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Savings</p>
            <h3 className="mt-2 text-2xl font-bold">
              {formatCurrency(metrics.savings)}
            </h3>
          </div>
          <PiggyBank className="h-8 w-8 text-purple-500" />
        </div>
      </Card>
    </div>
  );
};

export default OverviewCards;
