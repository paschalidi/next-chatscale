'use server'

import { apiRequest } from "@/lib/apiRequest";
import { SignInResponse } from "@/auth/types";
import { signIn, signOut } from "@/auth/auth";
import { CreateOrgFormValues, CreateOrgResponse } from "@/app/(auth)/auth/signup/_cargo/types";
import { AuthError } from "next-auth";

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

    await apiRequest<ApiResponse<CreateOrgResponse>>(
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
    return {}
  } catch (error) {
    console.error('Create organization error:', error);
    return {
      error: 'Account creation failed, the email may already be in use.'
    }
  }
};

export const signInWrapper = async ({
                                      email, password
                                    }: {
  email: string;
  password: string;
}) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false
    });
    return {}
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Credentials dont match.' }
    }
    return { error: 'Failed to sign in' }
  }
}
export const signOutWrapper = async () => {
  try {
    await signOut({
      redirect: false
    })

    return {}
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Credentials dont match.' }
    }
    return { error: 'Failed to sign in' }
  }

}