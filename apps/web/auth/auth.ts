import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInWithCredentials } from "@/auth/auth.services";

interface LoginCredentials extends Record<string, unknown> {
  email?: string;
  password?: string;
}

interface User {
  id: string
  email: string
  name?: string
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
        },
        password: {
          type: "password",
          label: "Password"
        },
      },

      async authorize(
        credentials: Partial<Record<"email" | "password", unknown>>,
        req: Request
      ): Promise<User | null> {
        try {
          if (!credentials.email || !credentials.password) {
            throw new Error("Invalid credentials.")
          }
          const {
            data: session
          } = await signInWithCredentials({
            email: credentials.email as string,
            password: credentials.password as string
          })
          if (!session) {
            throw new Error("Invalid credentials.")
          }

          return session
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async session({ session, token }) {
      console.log('@@@', session)
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub // Add user id to session
        }
      }
    }
  }
})