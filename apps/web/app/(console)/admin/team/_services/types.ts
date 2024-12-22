export type OrganizationUser = {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export type GetOrganizationUsersResponse = OrganizationUser[];