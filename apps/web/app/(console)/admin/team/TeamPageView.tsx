"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import { Trash2, UserPlus } from "lucide-react";
import { InviteMemberDialog } from "@/app/(console)/admin/team/_components/invite-member-dialog";
import { GetOrganizationUsersResponse } from "@/app/(console)/admin/team/_services/types";

export function TeamPageView({ teamMembers }: {
  teamMembers: GetOrganizationUsersResponse;
}) {
  const [members, setMembers] = useState(teamMembers);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<typeof members[0] | null>(null);

  console.log(members);
  const handleDelete = async () => {
    if (memberToDelete) {
      try {
        // await deleteTeamMember(memberToDelete.id);
        setMembers(members.filter((m) => m.id !== memberToDelete.id));
        setDeleteDialogOpen(false);
        setMemberToDelete(null);
      } catch (error) {
        console.error("Failed to delete team member:", error);
      }
    }
  };

  // const handleInvite = async (data: { email: string; role: string }) => {
  //   try {
  //     const newMember = await inviteTeamMember(data);
  //     if (newMember) {
  //       setMembers([...members, newMember]);
  //       setInviteDialogOpen(false);
  //     }
  //   } catch (error) {
  //     console.error("Failed to invite team member:", error);
  //   }
  // };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team Management</h1>
        <Button onClick={() => setInviteDialogOpen(true)} disabled>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Team Member
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.email}</TableCell>
                <TableCell className="capitalize">{member.role.toLowerCase()}</TableCell>
                <TableCell>
                  {format(new Date(member.created_at), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    disabled
                    onClick={() => {
                      setMemberToDelete(member);
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

      <InviteMemberDialog
        open={inviteDialogOpen}
        onOpenChange={setInviteDialogOpen}
        // onInvite={handleInvite}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove team member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {memberToDelete?.email} from the team?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Remove member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}