
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
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log("Authorize Function (/api/auth/[...nextauth]/route.ts): ");
        console.log(credentials,"\n\n");
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        return user ? user : null;
      }
    })
  ],
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
        console.log("Sign In Function (/api/auth/[...nextauth]/route.ts): ");
        console.log(credentials);
        return true;
    },
  },
})

export { handler as GET, handler as POST }