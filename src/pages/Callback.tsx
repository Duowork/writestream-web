import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Callback() {
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            navigator.clipboard.writeText(code)
                .then(() => {
                    console.log('Authorization code copied to clipboard');
                    setCopied(true);
                    // navigate('/');
                })
                .catch(err => {
                    console.error('Failed to copy code to clipboard', err);
                });
        } else {
            console.error('No authorization code found in URL search params');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-base text-text-primary">
            <div className="flex flex-col items-center gap-4">
                {!copied ? (
                    <>
                        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                        <p className="font-sans text-lg">Extracting authorization code...</p>
                    </>
                ) : (
                    <>
                        <div className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <p className="font-sans text-lg font-medium">Code copied to clipboard!</p>
                        <p className="text-sm text-text-muted">You can now paste it immediately.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
                        >
                            Return Home
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
