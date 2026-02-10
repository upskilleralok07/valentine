'use client';

import { useState, useRef, useEffect } from 'react';
import { FaMusic, FaVolumeMute } from 'react-icons/fa';

export default function MusicPlayer({ src }: { src: string }) {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Attempt autoplay
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.5;
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => setPlaying(true))
                    .catch(() => setPlaying(false)); // Autoplay blocked
            }
        }
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (playing) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setPlaying(!playing);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={togglePlay}
                className="bg-white/10 backdrop-blur-lg p-3 rounded-full border border-pink-500/30 text-pink-500 hover:bg-pink-500/20 transition-all shadow-lg animate-pulse"
            >
                {playing ? <FaMusic /> : <FaVolumeMute />}
            </button>
            <audio ref={audioRef} src={src} loop />
        </div>
    );
}
