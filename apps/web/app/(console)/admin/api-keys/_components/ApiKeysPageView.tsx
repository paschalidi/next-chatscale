'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { KeyRound as Key, Trash2 } from "lucide-react";
import { GetAllApiKeysResponse } from "@/app/(console)/admin/api-keys/_services/types";
import { ApiKeyFormData, GenerateKeyDialog } from "@/app/(console)/admin/api-keys/_components/generate-key-dialog";
import { deleteApiKey, generateApiKey } from "@/app/(console)/admin/api-keys/_services/api-keys.services";

export const ApiKeysPageView = ({
                                  apiKeys,
                                  organizationId,
                                }: {
  apiKeys: GetAllApiKeysResponse;
  organizationId: string;
}) => {

  const [keys, setKeys] = useState(apiKeys);

  const [generateDialogOpen, setGenerateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<typeof keys[0] | null>(null);

  const handleKeyDeletion = async () => {
    if (keyToDelete) {
      try {
        await deleteApiKey(keyToDelete.id);
      } catch (error) {
        console.error("Failed to delete API key:", error);
        return;
      }
      setKeys(keys.filter((k) => k.id !== keyToDelete.id));
      setDeleteDialogOpen(false);
      setKeyToDelete(null);
    }
  };

  const handleKeyGeneration = async (data: ApiKeyFormData) => {
    try {
      const response = await generateApiKey(data);
      if (response) {
        setKeys([response, ...keys]);
        return response
      }
    } catch (error) {
      console.error("Failed to generate API key:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">API Keys</h1>
        <Button onClick={() => setGenerateDialogOpen(true)}>
          <Key className="mr-2 h-4 w-4"/>
          Generate New Key
        </Button>
      </div>

      {
        keys.length === 0 ? (
            <div className="text-center text-muted-foreground pt-[12vh]">
              No API keys found. Click the button above to generate a new key.
            </div>
          ) :
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Key</TableHead>
                  <TableHead>App id</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  keys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell>
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                          ***************
                        </code>
                      </TableCell>
                      <TableCell>
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                          {organizationId}
                        </code>
                      </TableCell>

                      <TableCell> {format(new Date(key.created_at), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => {
                            setKeyToDelete(key);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4"/>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Card>
      }

      <GenerateKeyDialog
        open={generateDialogOpen}
        onOpenChange={setGenerateDialogOpen}
        handleKeyAddition={handleKeyGeneration}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete API key</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this API key? Any applications using
              this key will no longer be able to access the API.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleKeyDeletion}
              className="bg-destructive text-destructive-foreground"
            >
              Delete key
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
    ;
}