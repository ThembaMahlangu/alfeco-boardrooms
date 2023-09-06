import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Microsoft({
      clientId: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      tenantId: process.env.MICROSOFT_TENANT_ID,
      scope: 'user.read offline_access',
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,

  callbacks: {
    async jwt(token, user, account) {
      if (account) {
        token.accessToken = account.accessToken
      }
      return token
    },
    async session(session, token) {
      session.accessToken = token.accessToken
      return session
    },
  },
})