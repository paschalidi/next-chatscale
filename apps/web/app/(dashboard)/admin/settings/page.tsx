"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Globe, Shield } from "lucide-react";

export default function Settings() {
  const [orgSettings, setOrgSettings] = useState({
    name: "Acme Inc",
    domain: "acme.com",
    logo: "",
  });

  const [securitySettings, setSecuritySettings] = useState({
    mfa: false,
    sessionTimeout: "24",
    ipRestrictions: "",
  });

  const handleOrgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving org settings:", orgSettings);
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving security settings:", securitySettings);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="organization" className="space-y-6">
        <TabsList>
          <TabsTrigger value="organization" className="space-x-2">
            <Building className="h-4 w-4" />
            <span>Organization</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="space-x-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organization">
          <Card className="p-6">
            <form onSubmit={handleOrgSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Organization name</label>
                <Input
                  value={orgSettings.name}
                  onChange={(e) =>
                    setOrgSettings({ ...orgSettings, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Domain</label>
                <div className="flex space-x-2">
                  <Input
                    value={orgSettings.domain}
                    onChange={(e) =>
                      setOrgSettings({ ...orgSettings, domain: e.target.value })
                    }
                  />
                  <Button type="button" variant="outline">
                    Verify
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Organization logo</label>
                <Input type="file" accept="image/*" />
              </div>

              <Button type="submit">Save changes</Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <form onSubmit={handleSecuritySubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Session timeout (hours)</label>
                <Input
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) =>
                    setSecuritySettings({
                      ...securitySettings,
                      sessionTimeout: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">IP restrictions</label>
                <Input
                  placeholder="Enter IP addresses or CIDR ranges"
                  value={securitySettings.ipRestrictions}
                  onChange={(e) =>
                    setSecuritySettings({
                      ...securitySettings,
                      ipRestrictions: e.target.value,
                    })
                  }
                />
                <p className="text-sm text-muted-foreground">
                  Enter IP addresses or CIDR ranges, separated by commas
                </p>
              </div>

              <Button type="submit">Save security settings</Button>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}