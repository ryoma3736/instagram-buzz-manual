'use client';

import { useState } from 'react';

export default function ReelScriptGenerator() {
  const [originalScript, setOriginalScript] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!originalScript.trim()) return;

    setIsGenerating(true);

    // Simulate generation - in real implementation, this would call an API
    setTimeout(() => {
      // Create a more engaging version of the script
      const lines = originalScript.split('\n').filter(line => line.trim());
      const enhancedLines = lines.map((line, index) => {
        if (index === 0) {
          return `[Hook] ${line}`;
        } else if (index === lines.length - 1) {
          return `[CTA] ${line}`;
        }
        return line;
      });

      const newScript = `--- Reel台本 ---

${enhancedLines.join('\n\n')}

---
推奨時間: ${Math.min(60, Math.max(15, lines.length * 5))}秒
推奨BGM: トレンド音源を使用
---`;

      setGeneratedScript(newScript);
      setIsGenerating(false);
    }, 1000);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Reel Script Generator
      </h2>

      {/* Original Script Input */}
      <div className="space-y-2">
        <label htmlFor="original-script" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          元台本
        </label>
        <textarea
          id="original-script"
          value={originalScript}
          onChange={(e) => setOriginalScript(e.target.value)}
          placeholder="元の台本を入力してください...&#10;&#10;例:&#10;今日は○○について話します。&#10;まず最初に...&#10;次に...&#10;最後に..."
          rows={10}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!originalScript.trim() || isGenerating}
        className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isGenerating ? '生成中...' : 'Reel台本を生成'}
      </button>

      {/* Generated Script Display */}
      {generatedScript && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">新台本</h3>
            <button
              onClick={handleCopy}
              className="px-4 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
            >
              {copied ? 'コピー完了!' : 'コピー'}
            </button>
          </div>
          <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-orange-200 dark:border-gray-700">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">{generatedScript}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
