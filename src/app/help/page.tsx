import OverviewCards from '@/components/dashboard/OverviewCards'
import RevenueChart from '@/components/dashboard/RevenueChart'

export default function DashboardPage() {
  return (
    <div className="space-y-6 pt-10">
      <OverviewCards />
      <RevenueChart />
    </div>
  )
}