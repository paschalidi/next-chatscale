export { auth as middleware } from "@/auth/auth";

export const config = {
  matcher: [
    '/admin/:path*',  // Match all routes under /admin
  ]
};