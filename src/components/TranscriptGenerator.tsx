'use client';

import { useState } from 'react';

interface TranscriptGeneratorProps {
  onGenerate?: (content: string) => Promise<string>;
}

export default function TranscriptGenerator({
  onGenerate,
}: TranscriptGeneratorProps) {
  const [content, setContent] = useState('');
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      if (onGenerate) {
        const result = await onGenerate(content);
        setTranscript(result);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!transcript) return;

    try {
      await navigator.clipboard.writeText(transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy transcript:', err);
    }
  };

  return (
    <div className="w-full rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
      <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
        台本生成
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="videoContent"
            className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            動画内容
          </label>
          <textarea
            id="videoContent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="動画の内容やテーマを入力してください..."
            rows={4}
            className="w-full resize-none rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !content.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-zinc-400 dark:focus:ring-offset-zinc-900"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              生成中...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              台本を生成
            </span>
          )}
        </button>

        {transcript && (
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                生成された台本
              </label>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 rounded-lg px-3 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
              >
                {copied ? (
                  <>
                    <svg
                      className="h-4 w-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    コピー済み
                  </>
                ) : (
                  <>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    コピー
                  </>
                )}
              </button>
            </div>
            <div className="max-h-64 overflow-y-auto rounded-lg bg-zinc-100 p-4 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              <pre className="whitespace-pre-wrap font-sans">{transcript}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
