'use client';

import { useState } from 'react';

export default function ThreadsGenerator() {
  const [title, setTitle] = useState('');
  const [script, setScript] = useState('');
  const [part1, setPart1] = useState('');
  const [part2, setPart2] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState<'part1' | 'part2' | null>(null);

  const handleGenerate = async () => {
    if (!title.trim() || !script.trim()) return;

    setIsGenerating(true);

    // Simulate generation - in real implementation, this would call an API
    setTimeout(() => {
      const midPoint = Math.floor(script.length / 2);
      const splitIndex = script.indexOf('。', midPoint) + 1 || midPoint;

      setPart1(`【${title}】Part 1\n\n${script.slice(0, splitIndex).trim()}\n\n続きはPart 2へ...`);
      setPart2(`【${title}】Part 2\n\n${script.slice(splitIndex).trim()}`);
      setIsGenerating(false);
    }, 1000);
  };

  const handleCopy = async (part: 'part1' | 'part2') => {
    const text = part === 'part1' ? part1 : part2;
    await navigator.clipboard.writeText(text);
    setCopied(part);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Threads Generator
      </h2>

      {/* Title Input */}
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          タイトル
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="投稿のタイトルを入力..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Script Input */}
      <div className="space-y-2">
        <label htmlFor="script" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          台本
        </label>
        <textarea
          id="script"
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="台本を入力..."
          rows={8}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!title.trim() || !script.trim() || isGenerating}
        className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isGenerating ? '生成中...' : 'Threads投稿を生成'}
      </button>

      {/* Part 1 Display */}
      {part1 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Part 1</h3>
            <button
              onClick={() => handleCopy('part1')}
              className="px-4 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
            >
              {copied === 'part1' ? 'コピー完了!' : 'コピー'}
            </button>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">{part1}</pre>
          </div>
        </div>
      )}

      {/* Part 2 Display */}
      {part2 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Part 2</h3>
            <button
              onClick={() => handleCopy('part2')}
              className="px-4 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
            >
              {copied === 'part2' ? 'コピー完了!' : 'コピー'}
            </button>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">{part2}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
