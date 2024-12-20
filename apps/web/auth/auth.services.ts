'use server'

import { apiRequest } from "@/lib/apiRequest";
import { SignInResponse } from "@/auth/types";
import { signIn, signOut } from "@/auth/auth";
import { CreateOrgFormValues, CreateOrgResponse } from "@/app/(auth)/auth/signup/_cargo/types";

export const signInWithCredentials = async ({
                                              email,
                                              password
                                            }: {
  email: string;
  password: string;
}) => {

  return apiRequest<{ data: SignInResponse, message:string }>('/api/organization_accounts/sign_in', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password: password
    }),
    headers: { 'Content-Type': 'application/json' }
  })

}


export const createOrganizationAccount = async ({
                                                  organization_name,
                                                  password,
                                                  email
                                                }: CreateOrgFormValues) => {
  return await apiRequest<{data: CreateOrgResponse, message:string }>(
    '/api/organization_accounts/create',
    {
      method: "POST",
      body: JSON.stringify({
        organization_name,
        password,
        email
      })
    }
  );
}


export const signInWrapper = async ({
                                      email, password
                                    }: {
  email: string;
  password: string;
}) => {
  await signIn('credentials', {
    email,
    password,
    redirectTo: '/admin'
  })

}
export const signOutWrapper = async () => {
  await signOut({
    redirectTo: '/'
  })
}
