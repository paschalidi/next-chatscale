import NextAuth, { Session, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInWithCredentials } from "@/auth/auth.services";
import { JWT } from 'next-auth/jwt';
import { UserSession } from "@/auth/types";
import { config } from "@/config";

function isValidUserSession(
  obj: Partial<UserSession> | undefined
): obj is UserSession {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.email === 'string' &&
    typeof obj.id === 'string' &&
    typeof obj.token === 'string'
  );
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
        console.log('@@',config.auth_secret)
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
            debugger;
            console.error('@@@Authentication error:', session)
            throw new Error("Invalid credentials.")
          }

          debugger;

          return session
        } catch (error) {
          console.error('####@@@Authentication error:', error)
          console.error('Authentication error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    // DEV note: not sure if this is the right way to handle this or even if we need this jwt to be here.
    async jwt({ token: { token: userSession, ...rest }, user }: {
      token: JWT;
      user?: User | UserSession;
    }): Promise<JWT> {
      if (user) {
        userSession = user as UserSession;
      }
      return { ...rest, token: userSession };
    },
    async session({
                    session,
                    token: { token: userSession }
                  }: {
      session: Session;
      token: JWT & { token?: Partial<UserSession> };
    }): Promise<Session & { accessToken: string }> {
      if (session && isValidUserSession(userSession)) {
        const res = {
          user: {
            organizationId: userSession.organization_id,
            email: userSession.email,
            id: userSession.id,
          },
          accessToken: userSession.token,
          expires: session.expires // Ensure we keep the expires property
        }
        return res;
      }
      return { ...session, accessToken: '' };
    }
  },
  secret: config.auth_secret,
  pages: {
    signIn: '/auth/login',
  }
})