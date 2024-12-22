import { Card } from "@/components/ui/card";
import { KeyRound as Key, MessageSquare, Users } from "lucide-react";
import { fetchTotalApiKeys } from "@/app/(console)/admin/_services/admin.services";

export default async function AdminDashboard() {
  const totalKeys = await fetchTotalApiKeys();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Users className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Active Users</p>
              <h3 className="text-2xl font-bold">-</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <MessageSquare className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Messages Today</p>
              <h3 className="text-2xl font-bold">-</h3>
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