import { NextRequest, NextResponse } from 'next/server';
import { analyzeBuzz } from '@/lib/ai-client';

export async function POST(req: NextRequest) {
  try {
    const { transcript } = await req.json();
    if (!transcript) return NextResponse.json({ error: 'Transcript required' }, { status: 400 });
    const analysis = await analyzeBuzz(transcript);
    return NextResponse.json(analysis);
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
