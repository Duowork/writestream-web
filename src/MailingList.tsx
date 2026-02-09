import { useState } from 'react';
import { Send, User, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { subscribeToMailingList } from './services/mailing-list-service';

/* ------------------------------------------------ */

const triggerSubscriptionEndpoint = async (email: string) => {
    const subscriptionResponse = { isSuccess: false, status: 400, message: "", data: {} }

    try {
        const result = await subscribeToMailingList(email);

        if (result && result.success) {
            subscriptionResponse.isSuccess = true;
            subscriptionResponse.status = 200;
            subscriptionResponse.message = "Thanks for subscribing!";
            subscriptionResponse.data = result?.data;
        }
    } catch (error: any) {
        subscriptionResponse.isSuccess = false;
        subscriptionResponse.status = 400;
        subscriptionResponse.message = error.message || "Failed to subscribe. Please try again.";
    }

    return subscriptionResponse
};

export function HeroSignupCTA() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const response = await triggerSubscriptionEndpoint(email);

        if (response.isSuccess) {
            setStatus('success');
            setName('');
            setEmail(''); 
        } else {
            setStatus('error');
            toast.error(response.message);
        }
    };

    return (
        <div
            className="w-full sm:w-2xl sm:px-6 animate-slide-up"
            style={{ animationDelay: '1s', animationFillMode: 'both' }}
        >
            <div className="bg-primary/50! backdrop-blur-xl border border-white/20 rounded-4xl p-4 pt-8 shadow-2xl relative overflow-hidden group/container">

                <div className="text-center mb-8 relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Be the first to know when we launch
                    </h2>

                    <p className="text-white/80 text-sm md:text-base leading-relaxed font-sans">
                        Join our early access list and help shape Writestream. Plus, get exclusive launch pricing.
                    </p>
                </div>

                {status === 'success' ? (
                    <div className="bg-teal-500 border border-teal-500/50 rounded-xl p-6 text-center animate-fade-in">
                        <div className="w-12 h-12 bg-teal-500/50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Send className="text-white w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">You're on the list!</h3>
                        <p className="text-white/80">We'll reach out to you as soon as we're ready for early access.</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-6 text-white hover:text-white/80 font-medium transition-colors cursor-pointer"
                        >
                            Add another person
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                                <input
                                    required
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all font-sans"
                                />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                                <input
                                    required
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all font-sans"
                                />
                            </div>
                        </div>

                        <button
                            disabled={status === 'loading'}
                            type="submit"
                            className="w-full h-auto! bg-white hover:bg-white/90 text-primary py-4! rounded-xl shadow-lg relative overflow-hidden group transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                            onClick={handleSubmit}
                        >
                            <span className={`flex items-center font-bold justify-center gap-2 transition-transform duration-300 ${status === 'loading' ? '-translate-y-full opacity-0' : ''}`}>
                                Join the Waitlist
                                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </span>
                            {status === 'loading' && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                </div>
                            )}
                        </button>
                        <p className="text-center text-[10px] text-white uppercase tracking-widest mt-4">
                            No spam. Just value. Unsubscribe anytime.
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}

export function SignupCTA() {

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const platforms = [
        {
            name: 'Twitter/X',
            bgColor: "bg-[#000]",
        },
        {
            name: 'LinkedIn',
            bgColor: "bg-[#0073b1]"
        },
        {
            name: 'Medium',
            bgColor: "bg-[#000]",
        },
        {
            name: 'Subtack',
            bgColor: "bg-[#ff6719]",
        },
        {
            name: 'Dev',
            bgColor: "bg-[#171717]",
        },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const response = await triggerSubscriptionEndpoint(email);

        if (response.isSuccess) {
            toast.success('You have been added to the waitlist!', {
                position: "top-center",
                style: {
                    backgroundColor: "#10B981",
                    color: "#fff", "border": "none !important"
                }
            })

            setName('');
            setEmail('');
        } else {
            toast.error(response.message);
        }
    }

    return (
        <div
            className="w-full sm:w-2xl px-2 sm:px-6 animate-slide-up"
            style={{ animationDelay: '1s', animationFillMode: 'both' }}
        >
            <div className="bg-primary! rounded-4xl p-4 pt-8 relative overflow-hidden group/container">

                <div className="text-center mb-8 relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Be the first to know when we launch
                    </h2>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed">
                        Join our early access list and help shape Writestream. Plus, get exclusive launch pricing.
                    </p>
                </div>

                {status === 'success' ? (
                    <div className="bg-teal-500/20 border border-teal-500/50 rounded-xl p-6 text-center animate-fade-in">
                        <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Send className="text-white w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">You're on the list!</h3>
                        <p className="text-white/80">We'll reach out to you as soon as we're ready for early access.</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-6 text-teal-400 hover:text-teal-300 font-medium transition-colors"
                        >
                            Add another person
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                                <input
                                    required
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all font-sans"
                                />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                                <input
                                    required
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all font-sans"
                                />
                            </div>
                        </div>

                        <button
                            disabled={status === 'loading'}
                            type="submit"
                            className="w-full h-auto! bg-white hover:bg-white/90 text-primary py-4! rounded-xl relative overflow-hidden group transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                            onClick={handleSubmit}
                        >
                            <span className={`flex items-center font-bold justify-center gap-2 transition-transform duration-300 ${status === 'loading' ? '-translate-y-full opacity-0' : ''}`}>
                                Get early access
                                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </span>
                            {status === 'loading' && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                </div>
                            )}
                        </button>
                    </form>
                )}
            </div>

            <div className='flex items-center justify-center flex-col gap-4 sm:gap-4'>
                <h2 className='text-gray-700'>Works with your favorite platforms:</h2>
                <div className='flex gap-2 sm:gap-4 flex-wrap'>
                    {platforms.map((platform, index) => (
                        <div key={index} className={`w-auto py-1.5 px-3 ${platform.bgColor} text-[13px] font-medium text-white rounded-full hover:scale-[1.2] transition-all`}>
                            {platform.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}