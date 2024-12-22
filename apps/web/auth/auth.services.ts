'use server'

import { apiRequest } from "@/lib/apiRequest";
import { SignInResponse } from "@/auth/types";
import { signIn, signOut } from "@/auth/auth";
import { CreateOrgFormValues, CreateOrgResponse } from "@/app/(auth)/auth/signup/_cargo/types";

interface SignInCredentials {
  email: string;
  password: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
}

/**
 * Authenticate user with email and password
 */
export const signInWithCredentials = async ({ email, password }: SignInCredentials) => {
  try {
    return await apiRequest<ApiResponse<SignInResponse>>('/api/organization_accounts/sign-in', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Sign in error:', error);
    throw new Error('Authentication failed');
  }
};

/**
 * Create a new organization account
 */
export const createOrganizationAccount = async (formValues: CreateOrgFormValues) => {
  try {
    const { organization_name, password, email } = formValues;

    return await apiRequest<ApiResponse<CreateOrgResponse>>(
      '/api/organization_accounts/create',
      {
        method: "POST",
        body: JSON.stringify({
          organization_name,
          password,
          email
        }),
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Create organization error:', error);
    throw new Error('Failed to create organization');
  }
};

export const signInWrapper = async ({
                                      email,
                                      password
                                    }: {
  email: string;
  password: string;
}) => {
  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // Important: prevent Next.js from handling redirect
    });

    if (!result?.ok) {
      throw new Error('Invalid credentials');
    }

    // If we get here, authentication was successful
    // You can handle the redirect client-side
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Authentication failed' };
  }
}


export const signOutWrapper = async () => {
  await signOut({
    redirectTo: '/'
  })
}