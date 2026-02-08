import axios from 'axios';

/* ------------------------- */

// Helper to get access token
async function getAccessToken() {
    const response = await axios.post(
        `https://accounts.zoho.com/oauth/v2/token`,
        null,
        {
            params: {
                refresh_token: process.env.ZOHO_REFRESH_TOKEN,
                client_id: process.env.ZOHO_CLIENT_ID,
                client_secret: process.env.ZOHO_CLIENT_SECRET,
                grant_type: 'refresh_token'
            }
        }
    );
    return response.data.access_token;
}

// Main function handler
exports.handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { email } = JSON.parse(event.body);

        // Validate email
        if (!email || !email.includes('@')) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid email address' })
            };
        }

        // Get access token
        const accessToken = await getAccessToken();

        // Add subscriber to Zoho
        const contactData = {
            contact_email: email,
            contact_list: [process.env.ZOHO_LIST_KEY]
        };

        const response = await axios.post(
            'https://campaigns.zoho.com/api/v1.1/json/listsubscribe',
            contactData,
            {
                params: {
                    resfmt: 'JSON',
                    listkey: process.env.ZOHO_LIST_KEY
                },
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: 'Successfully subscribed!'
            })
        };

    } catch (error) {
        console.error('Subscription error:', error.response?.data || error.message);

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to subscribe. Please try again.'
            })
        };
    }
};