export function validateUrl(url: string): boolean {
  return /instagram\.com\/(reel|p|reels)\/[\w-]+/.test(url);
}

export function extractId(url: string): string | null {
  const m = url.match(/\/(reel|p|reels)\/([\w-]+)/);
  return m ? m[2] : null;
}

export function formatViews(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

export const mockReels = [
  { id: '1', url: 'https://instagram.com/reel/ABC123', title: '心理学で解説！人間関係が劇的に変わる3つの法則', views: 150000, likes: 12000, comments: 890, postedAt: new Date(Date.now() - 30*24*60*60*1000).toISOString(), author: '@psychology_master', keywords: ['心理学', '人間関係'] },
  { id: '2', url: 'https://instagram.com/reel/DEF456', title: '節約術！月5万円貯まる簡単テクニック', views: 280000, likes: 25000, comments: 1500, postedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString(), author: '@money_saver', keywords: ['節約', 'お金'] },
  { id: '3', url: 'https://instagram.com/reel/GHI789', title: '5分でできる！超簡単パスタレシピ', views: 520000, likes: 45000, comments: 3200, postedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString(), author: '@quick_recipes', keywords: ['レシピ', '料理'] },
  { id: '4', url: 'https://instagram.com/reel/JKL012', title: '驚きの事実！睡眠の質を上げる意外な方法', views: 89000, likes: 7800, comments: 456, postedAt: new Date(Date.now() - 60*24*60*60*1000).toISOString(), author: '@health_tips', keywords: ['睡眠', '健康'] },
  { id: '5', url: 'https://instagram.com/reel/MNO345', title: 'これ知ってた？日本語の面白い雑学', views: 340000, likes: 28000, comments: 2100, postedAt: new Date(Date.now() - 20*24*60*60*1000).toISOString(), author: '@trivia_japan', keywords: ['雑学', '日本語'] },
];
