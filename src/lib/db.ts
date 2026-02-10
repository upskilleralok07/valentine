import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'confessions.json');

export interface Confession {
    id: string;
    senderName: string;
    recipientName: string;
    message: string;
    musicChoice: string;
    createdAt: number;
}

// Ensure data directory and file exist
async function ensureDb() {
    try {
        await fs.access(DB_FILE);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.writeFile(DB_FILE, JSON.stringify([]));
    }
}

export async function saveConfession(data: Confession) {
    await ensureDb();
    const fileContent = await fs.readFile(DB_FILE, 'utf-8');
    const confessions = JSON.parse(fileContent) as Confession[];
    confessions.push(data);
    await fs.writeFile(DB_FILE, JSON.stringify(confessions, null, 2));
    return data;
}

export async function getConfession(id: string) {
    await ensureDb();
    const fileContent = await fs.readFile(DB_FILE, 'utf-8');
    const confessions = JSON.parse(fileContent) as Confession[];
    return confessions.find((c) => c.id === id) || null;
}
