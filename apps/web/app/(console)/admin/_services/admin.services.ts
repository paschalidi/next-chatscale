'use server'

import { auth } from "@/auth/auth";
import { apiRequest } from "@/lib/apiRequest";
import { format } from 'date-fns';

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

export const fetchTotalMessagesForMonth = async () => {
  const { accessToken, user } = await auth() ?? {};
  if (!accessToken || !user) return {
    count: 0,
    month: format(new Date(), 'MMM') // Returns "Dec"
  };

  try {
    const response = await apiRequest<{
      data: {
        count: number,  // Note: matches our Rust struct field name
        month: number   // This is now a number (1-12)
      }
    }>(`/api/organizations/${user.organizationId}/messages/count`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const monthDate = new Date(2024, response.data.month - 1); // -1 because months are 0-based in JS
    return {
      count: response.data.count ?? 0,
      month: format(monthDate, 'MMM') // Converts number to "Dec"
    };
  } catch (error) {
    console.error('Fetch total messages error:', error);
    return {
      count: 0,
      month: format(new Date(), 'MMM')
    };
  }
}