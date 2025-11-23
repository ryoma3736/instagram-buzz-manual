import { NextRequest, NextResponse } from 'next/server';
import { generateComment } from '@/lib/ai-client';

export async function POST(req: NextRequest) {
  try {
    const { content, comment, type } = await req.json();
    if (!content) return NextResponse.json({ error: 'Content required' }, { status: 400 });
    const ideas = await generateComment(content, type === 'reply' ? comment : undefined);
    return NextResponse.json({ ideas, type: type || 'engagement' });
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
