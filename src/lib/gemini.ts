import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('GEMINI_API_KEY is not set');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generateContent(prompt: string): Promise<string> {
  if (!genAI) {
    throw new Error('Gemini API is not configured. Please set GEMINI_API_KEY.');
  }

  // Gemini 3 Pro Preview - Released Nov 18, 2025
  // Context: 1M tokens, Output: 65K tokens, Multimodal
  const model = genAI.getGenerativeModel({ model: 'gemini-3-pro-preview' });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// Prompt templates
export const prompts = {
  transcript: (content: string) => `
あなたはプロのInstagramリール台本作成者です。
以下の内容から、バズりやすいリール用の台本を作成してください。

【内容】
${content}

【要件】
- 最初の3秒で視聴者の注意を引くフック
- 簡潔で分かりやすい言葉
- 感情に訴える表現
- 60秒以内で読める長さ

台本のみを出力してください。
`,

  analyze: (transcript: string) => `
以下のリール台本を分析し、バズの要因を特定してください。

【台本】
${transcript}

以下の形式でJSON形式で回答してください:
{
  "reasons": ["バズの理由1", "バズの理由2", ...],
  "patterns": ["成功パターン1", "成功パターン2", ...],
  "recommendations": ["改善提案1", "改善提案2", ...]
}

JSONのみを出力してください。
`,

  threads: (title: string, transcript: string) => `
以下の台本からThreads用の2部構成の投稿を作成してください。

【タイトル】${title}
【台本】${transcript}

【要件】
- Part 1: 導入と前半の内容
- Part 2: 後半の内容と結論
- 絵文字や太字は使わない
- プレーンテキストのみ
- 各パートは500文字以内

以下の形式でJSON形式で回答してください:
{
  "part1": "Part 1の内容",
  "part2": "Part 2の内容"
}

JSONのみを出力してください。
`,

  caption: (transcript: string) => `
以下の台本からInstagramリール用のキャプションを作成してください。

【台本】
${transcript}

【要件】
- 興味を引く1行目
- 価値を伝える本文
- 関連ハッシュタグ5-10個
- 300文字以内

キャプションのみを出力してください。
`,

  comment: (mode: 'reply' | 'engagement', context: string) => `
${mode === 'reply'
  ? `以下のコメントに対する返信案を5つ生成してください。

【受信コメント】
${context}`
  : `以下の投稿に対するエンゲージメント用コメント案を5つ生成してください。

【投稿内容】
${context}`}

【要件】
- 自然で親しみやすい表現
- 絵文字を適度に使用
- 各コメント30文字以内

以下の形式でJSON形式で回答してください:
{
  "comments": ["コメント1", "コメント2", "コメント3", "コメント4", "コメント5"]
}

JSONのみを出力してください。
`,

  reelScript: (originalScript: string, perspective?: string) => `
以下の台本から、${perspective || '異なる視点'}で新しいリール台本を作成してください。

【元の台本】
${originalScript}

【要件】
- オリジナルの本質は維持
- 新鮮な切り口
- バズ要素を強化
- 60秒以内で読める長さ

新しい台本のみを出力してください。
`,
};
