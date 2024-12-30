'use server'
import { apiRequest } from "@/lib/apiRequest";
import { TParticipantsResponse } from "@/app/(live)/live/services.types";


export const createParticipant = async ({ name, organizationId }: { name: string, organizationId: string }) => {
  return await apiRequest<{ data: TParticipantsResponse, message: string }>(
    `/api/organizations/${organizationId}/participants`,
    {
      method: "POST",
      body: JSON.stringify({ name })
    }
  );
}
