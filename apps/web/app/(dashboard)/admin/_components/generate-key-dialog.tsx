"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function GenerateKeyDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [environment, setEnvironment] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock key generation
    const key = `sk_${environment}_${Math.random().toString(36).substring(2, 15)}`;
    setGeneratedKey(key);
  };

  const handleClose = () => {
    onOpenChange(false);
    setName("");
    setEnvironment("");
    setGeneratedKey("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate new API key</DialogTitle>
          <DialogDescription>
            Create a new API key for your application.
          </DialogDescription>
        </DialogHeader>
        {!generatedKey ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="name">
                Key name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Production API Key"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Environment</label>
              <Select value={environment} onValueChange={setEnvironment} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="live">Production</SelectItem>
                  <SelectItem value="test">Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Generate key</Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Your new API key</label>
              <div className="p-4 bg-muted rounded-md">
                <code className="text-sm break-all">{generatedKey}</code>
              </div>
              <p className="text-sm text-muted-foreground">
                Make sure to copy your API key now. You won't be able to see it again!
              </p>
            </div>
            <DialogFooter>
              <Button onClick={handleClose}>Done</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}