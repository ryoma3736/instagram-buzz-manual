import { NextRequest, NextResponse } from 'next/server';
import { validateUrl, extractId } from '@/lib/instagram';

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  if (!url || !validateUrl(url)) return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  
  const reelId = extractId(url);
  return NextResponse.json({
    reelId,
    status: 'ready',
    instructions: ['1. Visit https://snapinsta.to/ja', '2. Paste URL', '3. Download'],
  });
}
