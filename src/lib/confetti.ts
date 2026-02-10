'use client';

import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: NodeJS.Timeout = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
            ...defaults,
            particleCount,
            origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 },
        });
    }, 250);
};
