// Import NextAuth and AzureAD provider
import NextAuth from 'next-auth';
import AzureAD from 'next-auth/providers/azure-ad';
import { getSession } from 'next-auth/react';
// Import Microsoft Graph client library
import { Client } from '@microsoft/microsoft-graph-client';

export default NextAuth({
  // Use AzureAD as the provider
  providers: [
    AzureAD({
      clientId: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      tenantId: process.env.MICROSOFT_TENANT_ID,
      authorizationParams: {
        prompt: 'login',
        scope: 'user.read onlineMeetings.readWrite',
      },
      profile: (profile) => ({
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }),
    }),
  ],

  database: process.env.DATABASE_URL,

  session: {
    jwt: false,
  },

  // Define a custom signOut function
  signOut: async (options) => {
    const tenantId = process.env.MICROSOFT_TENANT_ID;
    await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return NextAuth.signOut(options);
  },
});

// Define a function to get the user's profile using the Microsoft Graph API
export async function getUserProfile() {
  const session = await getSession();
  const accessToken = session.account.id_token;

  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });

  return await client.api('/me').get();
}

// Define a function to create a meeting using the Microsoft Graph API
export async function createMeeting(subject, start, end, attendees) {
  const session = await getSession();
  const accessToken = session.account.id_token;

  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });

  const meeting = {
    subject: subject,
    startDateTime: start,
    endDateTime: end,
    participants: {
      attendees: attendees.map((email) => ({
        upn: email,
        identity: {
          user: {
            id: email,
          },
        },
      })),
    },
  };

  return await client.api('/me/onlineMeetings').post(meeting);
}

// Define a function to get meetings using the Microsoft Graph API
export async function getMeetings() {
  const session = await getSession();
  const accessToken = session.account.id_token;

  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });

  return await client.api('/me/onlineMeetings').get();
}