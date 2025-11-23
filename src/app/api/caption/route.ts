import { NextRequest, NextResponse } from 'next/server';
import { generateCaption } from '@/lib/ai-client';

export async function POST(req: NextRequest) {
  try {
    const { transcript } = await req.json();
    if (!transcript) return NextResponse.json({ error: 'Transcript required' }, { status: 400 });
    const caption = await generateCaption(transcript);
    return NextResponse.json({ caption });
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
