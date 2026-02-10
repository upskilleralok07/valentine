'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    senderName: '',
    recipientName: '',
    message: '',
    musicChoice: 'lofi',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/${data.id}?preview=true`);
      } else {
        alert('Something went wrong! Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to generate page.');
    } finally {
      setLoading(false);
    }
  };

  const [hearts, setHearts] = useState<{ id: number; x: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    setHearts(
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-500/20 text-4xl"
            initial={{ y: '100vh', x: heart.x }}
            animate={{ y: '-10vh' }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: heart.delay,
            }}
          >
            <FaHeart />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-2xl p-8 max-w-md w-full z-10 border border-pink-500/30 shadow-[0_0_50px_rgba(255,46,99,0.2)]"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500 mb-2 font-serif">
            DarkValentine 💌
          </h1>
          <p className="text-gray-400 text-sm">Create a confession page in 10 seconds.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-pink-400 mb-1">Your Name</label>
            <input
              type="text"
              name="senderName"
              required
              className="w-full bg-black/50 border border-pink-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
              placeholder="e.g. Alok"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm text-pink-400 mb-1">Her Name</label>
            <input
              type="text"
              name="recipientName"
              required
              className="w-full bg-black/50 border border-pink-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
              placeholder="e.g. Priya"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm text-pink-400 mb-1">Your Message</label>
            <textarea
              name="message"
              required
              rows={3}
              className="w-full bg-black/50 border border-pink-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-pink-500 transition-colors resize-none"
              placeholder="Will you be my Valentine? 🌹"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm text-pink-400 mb-1">Background Music</label>
            <select
              name="musicChoice"
              className="w-full bg-black/50 border border-pink-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
              onChange={handleChange}
            >
              <option value="lofi">Romantic Lofi</option>
              <option value="piano">Emotional Piano</option>
              <option value="acoustic">Acoustic Love</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-600 to-red-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-pink-500/50 transition-all mt-6 disabled:opacity-50"
          >
            {loading ? 'Generating...' : '🔥 Generate Love Page'}
          </motion.button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-600">
          Made with ❤️ by DarkValentine Generator
        </div>
      </motion.div>
    </main>
  );
}
