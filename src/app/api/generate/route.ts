import { NextResponse } from 'next/server';
import { saveConfession } from '@/lib/db';
import { nanoid } from 'nanoid';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { senderName, recipientName, message, musicChoice } = body;

        if (!senderName || !recipientName || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const id = nanoid(6); // Generate short unique ID
        const newConfession = {
            id,
            sender_name: senderName,
            recipient_name: recipientName,
            message,
            music_choice: musicChoice || 'lofi',
            created_at: new Date().toISOString(),
        };

        await saveConfession(newConfession);

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error('Error generating confession:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
