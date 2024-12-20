import * as yup from "yup";
import { createOrgSchema } from "@/app/(auth)/auth/signup/_cargo/schema";

export type CreateOrgFormValues = yup.InferType<typeof createOrgSchema>
export type CreateOrgResponse = {
  "data": {
    "id": string,
    "email": string,
    "token": string,
  },
  "message": null
}