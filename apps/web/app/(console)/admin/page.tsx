import { Card } from "@/components/ui/card";
import { KeyRound as Key, MessageSquare, Users } from "lucide-react";
import {
  fetchActiveUsers,
  fetchTotalApiKeys,
  fetchTotalMessagesForMonth
} from "@/app/(console)/admin/_services/admin.services";

export default async function AdminDashboard() {
  const totalActiveUsers = await fetchActiveUsers();
  const totalKeys = await fetchTotalApiKeys();
  const { count, month } = await fetchTotalMessagesForMonth();

  console.log({count, totalKeys});
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Users className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Active Users</p>
              <h3 className="text-2xl font-bold">{totalActiveUsers}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <MessageSquare className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Messages during {month}</p>
              <h3 className="text-2xl font-bold">{count}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Key className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Active API Keys</p>
              <h3 className="text-2xl font-bold">{totalKeys ?? '0'}</h3>
            </div>
          </div>
        </Card>
        
      </div>
    </div>
  );
}