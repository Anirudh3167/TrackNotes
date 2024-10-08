
import { GetUser, RegisterUser } from "@/db/Users";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
const handler = NextAuth({ // Default JWT tokens
  pages: {
    newUser: '/signup',
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log("Authorize Function (/api/auth/[...nextauth]/route.ts): ");
        const { username, email, password } = credentials || {};
        let user = await GetUser({ username, email, password });
        return user ? {name:user.username,email:user.email,id:user._id} : null;
      }
    })
  ],
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
        console.log("Sign In Function (/api/auth/[...nextauth]/route.ts): ");
        return user !== null;
    },
  },
})

export { handler as GET, handler as POST }