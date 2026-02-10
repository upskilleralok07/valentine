
import { supabase } from './supabase';

export interface Confession {
    id?: string;
    sender_name: string;
    recipient_name: string;
    message: string;
    music_choice: string;
    created_at?: string;
}

export async function saveConfession(data: Confession) {
    const { data: result, error } = await supabase
        .from('confessions')
        .insert([
            {
                id: data.id,
                sender_name: data.sender_name,
                recipient_name: data.recipient_name,
                message: data.message,
                music_choice: data.music_choice,
            },
        ])
        .select();

    if (error) {
        console.error('Error saving confession:', error);
        throw new Error(error.message);
    }

    return result[0];
}

export async function getConfession(id: string) {
    const { data, error } = await supabase
        .from('confessions')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching confession:', error);
        return null;
    }

    return {
        id: data.id,
        senderName: data.sender_name,     // Map back to component prop names
        recipientName: data.recipient_name,
        message: data.message,
        musicChoice: data.music_choice,
        createdAt: data.created_at
    };
}
