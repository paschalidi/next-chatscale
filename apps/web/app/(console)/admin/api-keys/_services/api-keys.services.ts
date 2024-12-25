'use server'
import { auth } from "@/auth/auth";
import { apiRequest } from "@/lib/apiRequest";
import { ApiKeyFormData, GetAllApiKeysResponse, GetCreateApiKeyResponse } from "./types";

export const fetchApiKeys = async () => {
  const { accessToken, user } = await auth() ?? {};
  if (!accessToken || !user) return [];

  try {
    const response = await apiRequest<{
      data: GetAllApiKeysResponse | null
    }>(`/api/organizations/${user.organizationId}/keys`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data ?? [];
  } catch (error) {
    console.error('Fetch API Keys error:', error);
    return [];
  }
};

export const generateApiKey = async (data: ApiKeyFormData) => {
  const { accessToken, user } = await auth() ?? {};
  if (!accessToken || !user) return null;

  try {
    const response = await apiRequest<{
      data: GetCreateApiKeyResponse
    }>(`/api/organizations/${user.organizationId}/keys`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data ?? null;
  } catch (error) {
    console.error('Generate API Key error:', error);
    return null;
  }
};

export const deleteApiKey = async (keyId: string) => {
  const { accessToken, user } = await auth() ?? {};
  if (!accessToken || !user) return false;

  try {
    await apiRequest(`/api/organizations/${user.organizationId}/keys/${keyId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return true;
  } catch (error) {
    console.error('Delete API Key error:', error);
    return false;
  }
};