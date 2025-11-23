'use client';

import { useState } from 'react';

interface VideoDownloaderProps {
  onDownload?: (url: string) => void;
}

export default function VideoDownloader({ onDownload }: VideoDownloaderProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (!url.trim()) return;

    setIsLoading(true);
    try {
      if (onDownload) {
        onDownload(url);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
      <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
        動画ダウンロード
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="videoUrl"
            className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            リールURL
          </label>
          <input
            id="videoUrl"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.instagram.com/reel/..."
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
        </div>

        <button
          onClick={handleDownload}
          disabled={isLoading || !url.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-zinc-400 dark:focus:ring-offset-zinc-900"
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
              ダウンロード中...
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              ダウンロード
            </span>
          )}
        </button>
      </div>

      <div className="mt-6 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
        <h3 className="mb-3 font-semibold text-zinc-900 dark:text-zinc-100">
          ダウンロード手順
        </h3>
        <ol className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <li className="flex gap-2">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              1
            </span>
            <span>InstagramでリールのURLをコピー</span>
          </li>
          <li className="flex gap-2">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              2
            </span>
            <span>上のフィールドにURLを貼り付け</span>
          </li>
          <li className="flex gap-2">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              3
            </span>
            <span>「ダウンロード」ボタンをクリック</span>
          </li>
          <li className="flex gap-2">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              4
            </span>
            <span>動画ファイルが保存されます</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
