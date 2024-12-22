import { fetchOrganizationUsers } from "@/app/(console)/admin/team/_services/team.services";
import { TeamPageView } from "@/app/(console)/admin/team/TeamPageView";

export default async function TeamManagement() {
  const teamMembers =await  fetchOrganizationUsers();

  return (<TeamPageView teamMembers={teamMembers ?? []}></TeamPageView>
  )
}