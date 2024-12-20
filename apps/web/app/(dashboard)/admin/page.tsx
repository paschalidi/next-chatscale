import { Card } from "@/components/ui/card";
import { 
  Users, 
  MessageSquare, 
  Key, 
  Activity 
} from "lucide-react";
import { auth } from "@/auth/auth";

export default async function AdminDashboard() {
  const session = await auth();
  console.log(session)
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Users className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <h3 className="text-2xl font-bold">1,234</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <MessageSquare className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Messages Today</p>
              <h3 className="text-2xl font-bold">5,678</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Key className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Active API Keys</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Activity className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Response Time</p>
              <h3 className="text-2xl font-bold">45ms</h3>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}