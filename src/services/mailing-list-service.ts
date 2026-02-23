/**
 * Mailing List Service - Secure Cross-Origin Client
 */

export async function subscribeToMailingList(name: string, email: string) {
    if (!name)  throw Error("First name is required")

    if (name && name.length < 2) {
        throw Error("First name must be at least 2 characters long")
    }

    if (!email || !email.includes("@")) {
        throw Error("Invalid email address");
    }

    // Get the base URL from environment variables (e.g., https://your-api.netlify.app)
    // If not set, it defaults to the local relative path for development
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
    const FUNCTION_PATH = '/.netlify/functions/subscribe';

    try {
        const response = await fetch(`${API_BASE_URL}${FUNCTION_PATH}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const result = await response.json();

        if (response.ok) {
            return {
                success: true,
                message: "Successfully subscribed!",
                data: result
            };
        } else {
            throw new Error(result.error || "Subscription failed");
        }
    } catch (error: any) {
        console.error("Subscription error:", error.message);
        throw error;
    }
}
