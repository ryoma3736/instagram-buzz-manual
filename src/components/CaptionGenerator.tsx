'use client';

import { useState } from 'react';

export default function CaptionGenerator() {
  const [script, setScript] = useState('');
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!script.trim()) return;

    setIsGenerating(true);

    // Simulate generation - in real implementation, this would call an API
    setTimeout(() => {
      // Extract key points and create a caption
      const sentences = script.split(/[。！？\n]/).filter(s => s.trim());
      const keyPoints = sentences.slice(0, 3).map(s => s.trim());

      const generatedCaption = `${keyPoints[0] || ''}

${keyPoints.slice(1).map(point => `\u2728 ${point}`).join('\n')}

---

\u{1F449} 保存して後で見返してね！
\u{1F4AC} コメントで感想教えてください

#インスタグラム #Reels #バズ #おすすめ #fyp`;

      setCaption(generatedCaption);
      setIsGenerating(false);
    }, 1000);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Caption Generator
      </h2>

      {/* Script Input */}
      <div className="space-y-2">
        <label htmlFor="script" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          台本
        </label>
        <textarea
          id="script"
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="台本を入力してください...&#10;&#10;キャプションは台本の内容から自動生成されます。"
          rows={8}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!script.trim() || isGenerating}
        className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isGenerating ? '生成中...' : 'キャプションを生成'}
      </button>

      {/* Caption Display */}
      {caption && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">キャプション</h3>
            <button
              onClick={handleCopy}
              className="px-4 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
            >
              {copied ? 'コピー完了!' : 'コピー'}
            </button>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-blue-200 dark:border-gray-700">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">{caption}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
