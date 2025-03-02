import { Card } from "@/components/ui/card"
import { 
  BarChart, 
  Activity, 
  Users, 
  DollarSign 
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold">1,234</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <Activity className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Active Sessions</p>
              <h3 className="text-2xl font-bold">642</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <BarChart className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Weekly Growth</p>
              <h3 className="text-2xl font-bold">+12.5%</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <DollarSign className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <h3 className="text-2xl font-bold">$12,345</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <p className="text-gray-600">No recent activities</p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              New Project
            </button>
            <button className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Add User
            </button>
            <button className="p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              Generate Report
            </button>
            <button className="p-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              Settings
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
