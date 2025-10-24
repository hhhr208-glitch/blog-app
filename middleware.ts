// middleware.ts
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(
  function middleware() {
   
  },
  {
  
    publicRoutes: ['/']
  }
);

// Configure which routes to protect
export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|login|register|$).*)",
  ],
};