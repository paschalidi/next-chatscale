import 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken: string
    user: {
      organizationId: string
      id: string
      email: string
      name?: string
    }
  }
}