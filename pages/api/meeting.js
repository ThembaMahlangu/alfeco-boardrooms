// Import the required modules
import { getSession } from 'next-auth/react'
import { graph } from '@microsoft/microsoft-graph-client'

// Define a function to create a meeting
async function createMeeting(req, res) {
  // Get the user session from Next Auth
  const session = await getSession({ req })

  // Check if the user is authenticated
  if (session) {
    // Create a Graph client with the user access token
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, session.accessToken)
      },
    })

    // Define the meeting details
    const meeting = {
      subject: 'Next.js Meeting',
      start: {
        dateTime: '2023-09-20T10:00:00',
        timeZone: 'South Africa Standard Time',
      },
      end: {
        dateTime: '2023-09-20T11:00:00',
        timeZone: 'South Africa Standard Time',
      },
      isOnlineMeeting: true,
      onlineMeetingProvider: 'teamsForBusiness',
    }

    try {
      // Create the meeting in the user's calendar
      const result = await client.api('/me/events').post(meeting)

      // Send a success response with the meeting details
      res.status(200).json(result)
    } catch (error) {
      // Send an error response with the error message
      res.status(500).json(error.message)
    }
  } else {
    // Send an unauthorized response if the user is not authenticated
    res.status(401).json('Unauthorized')
  }
}

// Export the function as an API route
export default createMeeting
