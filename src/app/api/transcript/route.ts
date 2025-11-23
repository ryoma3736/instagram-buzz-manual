import { NextRequest, NextResponse } from 'next/server';
import { generateTranscript } from '@/lib/ai-client';

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();
    if (!description) return NextResponse.json({ error: 'Description required' }, { status: 400 });
    const transcript = await generateTranscript(description);
    return NextResponse.json({ transcript });
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
