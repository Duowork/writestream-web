import { Tagline } from '../Tagline';
import { HeroSignupCTA, SignupCTA } from '../MailingList';
import { motion } from 'framer-motion';
import { Zap, Sparkles, BarChart3, Clock, Pen } from 'lucide-react';
import { SEO } from 'react-roof';

const solutions = [
    {
        title: "Distraction-Free Writing",
        description: "Write your content once in a clean, focused editor designed to eliminate distractions and boost creativity.",
        icon: Pen
    },
    {
        title: "One-Click Publishing",
        description: "Post to all your platforms simultaneously with a single click—no more repetitive copy-pasting.",
        icon: Zap
    },
    {
        title: "Smart Formatting",
        description: "Your content automatically adapts to each platform’s unique style and formatting requirements.",
        icon: Sparkles
    },
    {
        title: "Performance Tracking",
        description: "Never lose track of where you've posted or how each piece performed—stay informed effortlessly.",
        icon: BarChart3
    },
    {
        title: "Time-Saving Efficiency",
        description: "Reclaim hours every week to focus on what matters most: creating impactful content.",
        icon: Clock
    }
];

export default function Home() {
    return (
        <>
            <SEO
                title="Writestream - Write once. Publish everywhere. Measure what works!"
                siteName='Writestream'
                type='website'
                url='https://writestream.online'
                description="Write and publish your content across multiple platforms with ease"
                image="/images/hero/136508.jpg"
            />

            <div className="w-full h-auto">
                <div className='min-h-screen relative overflow-hidden'>
                    <header className='z-10 relative pt-4 pl-4'>
                        <img src="/images/logo/Logo.svg" alt="Writestream Logo" className="h-8 w-auto" />
                    </header>

                    <section className='h-screen'>
                        <div className="h-full relative z-10 flex flex-col items-center justify-center">
                            <h1 className='font-sans font-bold text-4xl sm:text-6xl text-center'>Writestream</h1>
                            <div className='flex flex-col items-center justify-center pt-10 px-2 sm:px-4'>
                                <Tagline />
                                <HeroSignupCTA />
                            </div>
                        </div>
                    </section>

                    {/* Background Image with Overlay */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: 'url("/images/hero/136508.webp")' }}
                    >
                        <div className="absolute inset-0 bg-black/60" />
                    </div>
                </div>

                {/* The problem */}
                <section className='h-auto md:min-h-screen relative overflow-hidden bg-orange-300/90 pb-4'>
                    <h1 className='font-sans text-3xl sm:text-4xl md:text-7xl lg:text-9xl text-center pt-10 font-black mb-10 px-2'>You're doing too much!</h1>
                    <div className='flex flex-col gap-10 px-4 sm:px-8'>
                        <p className='font-mono text-muted text-xl md:text-4xl lg:text-6xl pt-10 font-black mb-2'>You write great content... but:</p>
                        <motion.ol
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={{
                                show: {
                                    transition: {
                                        staggerChildren: 3
                                    }
                                }
                            }}
                            className='w-full h-auto list-disc list-inside text-2xl md:text-3xl lg:text-5xl font-sans font-normal leading-[30px] md:leading-[57px] lg:leading-[77px] space-y-2 sm:space-y-0'
                        >
                            {[
                                "Your writing and publishing space are far apart and cluttered.",
                                "You copy-paste your content across Linked, Medium, Twitter/X, Dev.to and Subtack.",
                                "You manually format your content for each platform.",
                                "You spend hours repurposing for different audiences.",
                                "You can't really tell how well your content performs."
                            ].map((text, i) => (
                                <motion.li
                                    key={i}
                                    variants={{
                                        hidden: { color: 'rgba(255, 255, 255, 0.2)' },
                                        show: {
                                            color: [
                                                'rgba(255, 255, 255, 0.2)',
                                                'rgba(255, 255, 255, 1)',
                                                'rgba(255, 255, 255, 1)',
                                                'rgba(255, 255, 255, 0.2)'
                                            ],
                                            transition: {
                                                duration: 4,
                                                times: [0, 0.1, 0.8, 1],
                                                repeat: Infinity,
                                                repeatDelay: 11,
                                                ease: "easeInOut"
                                            }
                                        }
                                    }}
                                    className={i === 1 ? 'font-sans' : ''}
                                >
                                    {text}
                                </motion.li>
                            ))}
                        </motion.ol>
                    </div>
                </section>

                {/* The solution */}
                <section className='bg-white'>
                    <div className='min-h-screen px-1 sm:px-10 pt-20 lg:pt-40 pb-10'>
                        <div className='flex flex-col items-center justify-center gap-4 pt-10 sm:pt-20 px-4 bg-primary rounded-2xl'>
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-text-primary text-2xl sm:text-4xl text-center sm:text-left font-sans font-black'>Writestream changes the everything.</h1>
                                <p className='text-border-base text-lg sm:text-xl font-sans font-normal text-center sm:text-left'>Don't waste hours copy-pasting content across platforms.</p>
                            </div>
                            <img src="/images/writestream.png" className='w-full sm:w-[936px] h-[500px] object-cover object-top rounded-t-2xl' alt="" />
                        </div>
                    </div>

                    <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 sm:px-10 pb-20'>
                        {solutions.map((solution, index) => (
                            <div key={index} className='flex flex-col gap-4 p-6 rounded-2xl bg-background-base border border-border-base hover:shadow-lg transition-all duration-300 group'>
                                <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300'>
                                    <solution.icon size={24} />
                                </div>
                                <h3 className='text-xl font-bold text-text-primary font-sans'>{solution.title}</h3>
                                <p className='text-text-secondary text-base leading-relaxed font-sans'>{solution.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Email Signup */}
                <section className='min-h-screen relative overflow-hidden bg-background-base flex items-center justify-center'>
                    <SignupCTA />
                </section>

                {/* Footer */}
                <footer className='bg-background-base py-10 pl-4 pr-4'>
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0'>
                        <img src="/images/logo/Logo.svg" alt="Writestream Logo" className="h-8 w-auto" />
                        <div className='flex gap-4 text-text-primary font-sans'>
                            <span>&copy; 2026</span>
                            <a href="" className='hover:underline'>Terms of Service</a>
                            <a href="" className='hover:underline'>Privacy Policy</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
