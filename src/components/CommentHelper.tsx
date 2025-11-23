'use client';

import { useState } from 'react';

type CommentType = 'reply' | 'engagement';

export default function CommentHelper() {
  const [commentType, setCommentType] = useState<CommentType>('reply');
  const [content, setContent] = useState('');
  const [receivedComment, setReceivedComment] = useState('');
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!content.trim()) return;
    if (commentType === 'reply' && !receivedComment.trim()) return;

    setIsGenerating(true);

    // Simulate generation - in real implementation, this would call an API
    setTimeout(() => {
      let generatedIdeas: string[] = [];

      if (commentType === 'reply') {
        generatedIdeas = [
          `ありがとうございます！${receivedComment.includes('?') || receivedComment.includes('？') ? 'そうなんです！' : '嬉しいです！'}`,
          `コメントありがとうございます！参考になれば幸いです`,
          `${receivedComment.length > 20 ? '詳しくコメントいただきありがとうございます！' : 'ありがとうございます！'}また見に来てくださいね`,
          `嬉しいコメントありがとうございます！励みになります`,
        ];
      } else {
        generatedIdeas = [
          `この投稿すごく参考になりました！特に○○の部分が勉強になります`,
          `いつも素敵な投稿ありがとうございます！フォローさせていただきました`,
          `めっちゃ共感します！私も同じこと思ってました`,
          `質問なのですが、○○についてもっと詳しく知りたいです！`,
          `保存しました！後でじっくり見返します`,
        ];
      }

      setIdeas(generatedIdeas);
      setIsGenerating(false);
    }, 1000);
  };

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Comment Helper
      </h2>

      {/* Type Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          タイプ選択
        </label>
        <div className="flex gap-4">
          <button
            onClick={() => setCommentType('reply')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              commentType === 'reply'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            返信 (Reply)
          </button>
          <button
            onClick={() => setCommentType('engagement')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              commentType === 'engagement'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            エンゲージメント (Engagement)
          </button>
        </div>
      </div>

      {/* Content Input */}
      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {commentType === 'reply' ? '自分のコンテンツ内容' : '相手のコンテンツ内容'}
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            commentType === 'reply'
              ? '自分の投稿内容を入力...'
              : 'コメントしたい投稿の内容を入力...'
          }
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-y dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Comment Input (Reply mode only) */}
      {commentType === 'reply' && (
        <div className="space-y-2">
          <label htmlFor="received-comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            受け取ったコメント
          </label>
          <textarea
            id="received-comment"
            value={receivedComment}
            onChange={(e) => setReceivedComment(e.target.value)}
            placeholder="返信したいコメントを入力..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-y dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={
          !content.trim() ||
          (commentType === 'reply' && !receivedComment.trim()) ||
          isGenerating
        }
        className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isGenerating ? '生成中...' : 'アイデアを生成'}
      </button>

      {/* Ideas List */}
      {ideas.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {commentType === 'reply' ? '返信アイデア' : 'コメントアイデア'}
          </h3>
          <ul className="space-y-2">
            {ideas.map((idea, index) => (
              <li
                key={index}
                className="flex items-start justify-between gap-3 p-3 bg-green-50 dark:bg-gray-800 rounded-lg border border-green-200 dark:border-gray-700"
              >
                <span className="flex-1 text-sm text-gray-800 dark:text-gray-200">
                  {idea}
                </span>
                <button
                  onClick={() => handleCopy(idea, index)}
                  className="shrink-0 px-3 py-1 text-xs bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded border border-gray-300 dark:border-gray-600 transition-colors"
                >
                  {copiedIndex === index ? 'コピー完了!' : 'コピー'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
