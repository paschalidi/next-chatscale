'use server'
import { apiRequest } from "@/lib/apiRequest";
import { TParticipantsResponse } from "@/app/live/services.types";


export const createParticipant = async ({ name }: { name: string }) => {
  return await apiRequest<TParticipantsResponse>(
    '/api/participants',
    {
      method: "POST",
      body: JSON.stringify({ name })
    }
  );
}
