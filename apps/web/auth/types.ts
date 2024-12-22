export type SignInResponse = {
  token: string;
  email: string;
  id: string;
}

export type SignInRequest = {
  email: string;
  password: string;
}

export interface UserSession {
  email: string;
  id: string;
  organization_id: string;
  token: string;
}
