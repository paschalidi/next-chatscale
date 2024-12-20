import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateOrgFormValues } from './types'
import { signInWrapper, createOrganizationAccount } from "@/auth/auth.services";

export const useMutateCreateAccountOrg = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, CreateOrgFormValues>({
    mutationFn: async (data) => {
      await createOrganizationAccount(data)
      await signInWrapper(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] })
    },
  })
}