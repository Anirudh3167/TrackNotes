export { default } from "next-auth/middleware"

// CORS Settings
const allowedOrigins = ["*"]




 export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: [
        // '/((?!api|_next/static|_next/image|.*\\.png$).*)',
        "/my-works",
        "/md-editor"
    ],
  };