import { getConfession } from '@/lib/db';
import ConfessionView from '@/components/ConfessionView';
import MusicPlayer from '@/components/MusicPlayer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

const MUSIC_MAP: Record<string, string> = {
    lofi: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-chill-medium-version-116035.mp3',
    piano: 'https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3?filename=warm-memories-emotional-inspiring-piano-110292.mp3',
    acoustic: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_344db5890c.mp3?filename=acoustic-motivation-112617.mp3',
};

// Define Params type based on Next.js 15 requirements
type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const { id } = await params;
    const confession = await getConfession(id);

    if (!confession) {
        return {
            title: 'Confession Not Found',
        };
    }

    return {
        title: `💌 For ${confession.recipientName} - A Special Message`,
        description: `Someone has a secret message for you... Will you be their Valentine?`,
        openGraph: {
            title: `Message for ${confession.recipientName} 💖`,
            description: 'Open to see your surprise confession!',
        },
    };
}

export default async function ConfessionPage({ params }: Props) {
    const { id } = await params;
    const confession = await getConfession(id);

    if (!confession) {
        notFound();
    }

    const musicUrl = MUSIC_MAP[confession.musicChoice] || MUSIC_MAP['lofi'];

    return (
        <main className="min-h-screen relative">
            <MusicPlayer src={musicUrl} />
            <ConfessionView data={confession} />

            {/* Branding */}
            <div className="fixed bottom-2 left-0 right-0 text-center text-[10px] text-gray-600 opacity-50 pointer-events-none">
                DarkValentine 💌
            </div>
        </main>
    );
}
