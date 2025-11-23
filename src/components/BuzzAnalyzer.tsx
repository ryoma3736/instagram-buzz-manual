'use client';

import { useState } from 'react';

interface BuzzAnalysis {
  reasons: string[];
  patterns: string[];
  successFactors: string[];
  recommendations: string[];
}

export default function BuzzAnalyzer() {
  const [transcript, setTranscript] = useState('');
  const [analysis, setAnalysis] = useState<BuzzAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!transcript.trim()) return;

    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      });
      const data = await res.json();
      if (data.success) {
        setAnalysis({
          reasons: data.data.reasons || [],
          patterns: data.data.patterns || [],
          successFactors: data.data.recommendations?.slice(0, 2) || [],
          recommendations: data.data.recommendations || [],
        });
      } else {
        setError(data.error || 'Analysis failed');
      }
    } catch {
      setError('Failed to analyze');
    } finally {
      setIsLoading(false);
    }
  };

  const AnalysisSection = ({
    title,
    items,
    icon,
    color,
  }: {
    title: string;
    items: string[];
    icon: React.ReactNode;
    color: string;
  }) => (
    <div className={`rounded-lg border-l-4 ${color} bg-zinc-50 p-4 dark:bg-zinc-800/50`}>
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{title}</h4>
      </div>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
          >
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="w-full rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
      <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
        バズ分析
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="transcript"
            className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            台本を入力
          </label>
          <textarea
            id="transcript"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="分析したい台本を入力してください..."
            rows={6}
            className="w-full resize-none rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isLoading || !transcript.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-zinc-400 dark:focus:ring-offset-zinc-900"
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
              分析中...
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              分析開始
            </span>
          )}
        </button>

        {analysis && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              分析結果
            </h3>

            <AnalysisSection
              title="バズの理由"
              items={analysis.reasons}
              color="border-blue-500"
              icon={
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              }
            />

            <AnalysisSection
              title="パターン"
              items={analysis.patterns}
              color="border-purple-500"
              icon={
                <svg
                  className="h-5 w-5 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              }
            />

            <AnalysisSection
              title="成功要因"
              items={analysis.successFactors}
              color="border-green-500"
              icon={
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              }
            />

            <AnalysisSection
              title="推奨事項"
              items={analysis.recommendations}
              color="border-orange-500"
              icon={
                <svg
                  className="h-5 w-5 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
