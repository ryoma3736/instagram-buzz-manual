import { NextRequest, NextResponse } from 'next/server';
import { generateThreads } from '@/lib/ai-client';

export async function POST(req: NextRequest) {
  try {
    const { title, transcript } = await req.json();
    if (!title || !transcript) return NextResponse.json({ error: 'Title and transcript required' }, { status: 400 });
    const post = await generateThreads(title, transcript);
    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
