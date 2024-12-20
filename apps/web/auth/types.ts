export type SignInResponse = {
  data: {
    token: string;
    email: string;
    id: string;
  };
}

export type SignInRequest = {
  email: string;
  password: string;
}