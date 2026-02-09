import { toast } from "sonner";

/**
 * Mailing List Service - Secure Cross-Origin Client
 */

export async function subscribeToMailingList(email: string) {
    if (!email || !email.includes("@")) {
        toast.error("Invalid email address");
        return;
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
