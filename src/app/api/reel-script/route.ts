import { NextRequest, NextResponse } from 'next/server';
import { generateReelScript } from '@/lib/ai-client';

export async function POST(req: NextRequest) {
  try {
    const { transcript } = await req.json();
    if (!transcript) return NextResponse.json({ error: 'Transcript required' }, { status: 400 });
    const script = await generateReelScript(transcript);
    return NextResponse.json({ script });
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
