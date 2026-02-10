'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerConfetti } from '@/lib/confetti';
import { useSearchParams } from 'next/navigation';
import { FaHeart, FaTimes, FaWhatsapp, FaCopy, FaInstagram } from 'react-icons/fa';

interface ConfessionProps {
    data: {
        id: string; // Added ID to props
        senderName: string;
        recipientName: string;
        message: string;
        musicChoice: string;
    };
}

const NO_PHRASES = [
    "No 😢",
    "Are you sure? 🥺",
    "Think again... 💔",
    "Don't do this 😭",
    "I'll buy chocolates 🍫",
    "Please? 🌹",
    "Last chance! 😖",
    "Okay fine... YES! 😈",
];

export default function ConfessionView({ data }: ConfessionProps) {
    const [noCount, setNoCount] = useState(0);
    const [yesPressed, setYesPressed] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const searchParams = useSearchParams();
    const isPreview = searchParams.get('preview') === 'true';
    const [copied, setCopied] = useState(false);

    const handleNoClick = () => {
        setNoCount(noCount + 1);
        // Random move
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        setPosition({ x, y });
    };

    const handleYesClick = () => {
        setYesPressed(true);
        triggerConfetti();
    };

    const copyLink = () => {
        const url = window.location.href.split('?')[0];
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareWhatsapp = () => {
        const url = window.location.href.split('?')[0];
        window.open(`https://wa.me/?text=I have a secret message for you 💌 ${url}`, '_blank');
    };

    const yesButtonSize = noCount * 20 + 16;
    const noPhrase = NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center relative overflow-hidden">

            {/* Share Modal for Preview */}
            {isPreview && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="fixed top-4 left-4 right-4 z-50 flex justify-center pointer-events-none"
                >
                    <div className="bg-black/80 backdrop-blur-md border border-pink-500/50 rounded-xl p-4 shadow-2xl pointer-events-auto flex items-center gap-4">
                        <span className="text-white font-bold hidden md:block">✨ Your page is ready! Share it:</span>
                        <button onClick={copyLink} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors text-sm">
                            {copied ? 'Copied!' : <><FaCopy /> Copy Link</>}
                        </button>
                        <button onClick={shareWhatsapp} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-lg transition-colors text-sm">
                            <FaWhatsapp /> WhatsApp
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Confession Card */}
            <AnimatePresence>
                {!yesPressed ? (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.2, opacity: 0 }}
                        className="glass max-w-lg w-full p-8 rounded-3xl border border-pink-500/30 shadow-[0_0_60px_rgba(255,46,99,0.3)] z-10"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold font-serif mb-6 text-pink-500 animate-pulse">
                            To {data.recipientName} 💖
                        </h1>

                        <p className="text-lg md:text-xl text-gray-200 mb-8 italic leading-relaxed">
                            "{data.message}"
                        </p>

                        <div className="text-right text-pink-400 font-semibold mb-10">
                            - {data.senderName}
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-8">
                            Will you be my Valentine? 🥺
                        </h2>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative h-32">
                            <button
                                onClick={handleYesClick}
                                style={{ fontSize: yesButtonSize }}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-all duration-200 shadow-lg hover:shadow-green-500/50 z-20 min-w-[100px]"
                            >
                                YES 💘
                            </button>

                            {noCount < 8 && (
                                <motion.button
                                    onClick={handleNoClick}
                                    animate={{ x: position.x, y: position.y }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-red-500/50 z-10 min-w-[100px] absolute md:static"
                                >
                                    {noPhrase}
                                </motion.button>
                            )}
                        </div>

                        {noCount >= 8 && (
                            <p className="mt-4 text-red-500 text-sm font-bold animate-bounce tracking-widest uppercase">
                                Okay fine 😡 but you still belong to me 💀❤️
                            </p>
                        )}

                    </motion.div>
                ) : (
                    /* Success Modal */
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-4"
                    >
                        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl text-center border border-pink-500 shadow-2xl max-w-md w-full">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="text-6xl mb-4"
                            >
                                💖
                            </motion.div>
                            <h2 className="text-3xl font-bold text-pink-500 mb-4 font-serif">
                                Yayyy! 😭💘
                            </h2>
                            <p className="text-xl text-white mb-6">
                                Thank you my hubby dubby!! I love you forever 🥺❤️
                            </p>
                            <p className="text-sm text-gray-300">
                                (Now screenshot this and send it to me 😘)
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Background Effects */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/20 via-black to-black"></div>
        </div>
    );
}
