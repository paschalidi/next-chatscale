'use server'
import { auth } from "@/auth/auth";
import { apiRequest } from "@/lib/apiRequest";
import { GetOrganizationUsersResponse } from "@/app/(console)/admin/team/_services/types";



export const fetchOrganizationUsers = async () => {
  const { accessToken, user } = await auth() ?? {};
  if (!accessToken || !user) return null;

  try {
    const response = await apiRequest<{
      data: GetOrganizationUsersResponse
    }>(`/api/organizations/${user.organizationId}/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data ?? [];
  } catch (error) {
    console.error('Fetch Organization Users error:', error);
    return null;
  }
}