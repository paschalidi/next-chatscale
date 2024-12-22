'use server'

import { auth } from "@/auth/auth";
import { apiRequest } from "@/lib/apiRequest";

export const fetchTotalApiKeys = async () => {
  const { accessToken, user } = await auth() ?? {};
  if (!accessToken || !user) return null;

  try {
    const response = await apiRequest<{
      data: number
    }>(`/api/organizations/${user.organizationId}/keys/count`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data ?? 0;
  } catch (error) {
    console.error('Fetch total API keys error:', error);
    return 0; // Return 0 instead of null for count
  }
}