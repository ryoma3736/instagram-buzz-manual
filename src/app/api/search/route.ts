import { NextRequest, NextResponse } from 'next/server';
import { mockReels } from '@/lib/instagram';

export async function POST(req: NextRequest) {
  const { keyword, minViews = 30000, maxAgeMonths = 6 } = await req.json();
  if (!keyword) return NextResponse.json({ error: 'Keyword required' }, { status: 400 });
  
  const cutoff = Date.now() - maxAgeMonths * 30 * 24 * 60 * 60 * 1000;
  const reels = mockReels.filter(r => 
    (r.title.includes(keyword) || r.keywords.some(k => k.includes(keyword))) &&
    r.views >= minViews &&
    new Date(r.postedAt).getTime() >= cutoff
  ).sort((a, b) => b.views - a.views);
  
  return NextResponse.json({ reels, total: reels.length, keyword });
}
