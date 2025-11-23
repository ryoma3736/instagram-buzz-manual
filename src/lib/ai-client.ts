const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

async function callClaude(prompt: string): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY || '',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!res.ok) throw new Error('API Error');
  const data = await res.json();
  return data.content?.[0]?.text || '';
}

export async function generateTranscript(desc: string): Promise<string> {
  return callClaude(`添付のセミナーを完璧に再現するために、完璧な台本を生成してください。情報を一部も漏らしてはいけません。\n\n${desc}`);
}

export async function analyzeBuzz(transcript: string) {
  const r = await callClaude(`コンテンツがバズった理由を分析。JSON形式:{"reasons":[],"patterns":[],"successFactors":[],"recommendations":[]}\n\n${transcript}`);
  try { const m = r.match(/\{[\s\S]*\}/); if (m) return JSON.parse(m[0]); } catch {}
  return { reasons: [r], patterns: [], successFactors: [], recommendations: [] };
}

export async function generateThreads(title: string, transcript: string) {
  const r = await callClaude(`「${title}」について2段階のThreads投稿を作成。太字・絵文字不要。JSON:{"part1":"","part2":""}\n\n${transcript}`);
  try { const m = r.match(/\{[\s\S]*\}/); if (m) return JSON.parse(m[0]); } catch {}
  return { part1: r, part2: '' };
}

export async function generateReelScript(transcript: string): Promise<string> {
  return callClaude(`視点を変えてワンページリール台本を生成:\n\n${transcript}`);
}

export async function generateCaption(transcript: string): Promise<string> {
  return callClaude(`リールキャプションを生成:\n\n${transcript}`);
}

export async function generateComment(content: string, comment?: string) {
  const prompt = comment 
    ? `返信アイディアを3つ。JSON:{"ideas":[]}\n\nポスト:${content}\n\nコメント:${comment}`
    : `感情揺さぶりコメントを3つ。JSON:{"ideas":[]}\n\n${content}`;
  const r = await callClaude(prompt);
  try { const m = r.match(/\{[\s\S]*\}/); if (m) return JSON.parse(m[0]).ideas; } catch {}
  return [r];
}
