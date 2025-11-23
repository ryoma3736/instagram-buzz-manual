'use client'

import { useState } from 'react'

type TabType = 'search' | 'download' | 'script' | 'analysis' | 'threads' | 'new-script' | 'caption' | 'comment'

const tabs: { id: TabType; label: string }[] = [
  { id: 'search', label: '検索' },
  { id: 'download', label: 'ダウンロード' },
  { id: 'script', label: '台本生成' },
  { id: 'analysis', label: 'バズ分析' },
  { id: 'threads', label: 'Threads' },
  { id: 'new-script', label: '新台本' },
  { id: 'caption', label: 'キャプション' },
  { id: 'comment', label: 'コメント' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('search')

  const renderContent = () => {
    switch (activeTab) {
      case 'search':
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">検索コンポーネント</h2>
            <p className="text-gray-600">バズコンテンツを検索するためのツールがここに表示されます。</p>
          </div>
        )
      case 'download':
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">ダウンロードコンポーネント</h2>
            <p className="text-gray-600">コンテンツをダウンロードするためのツールがここに表示されます。</p>
          </div>
        )
      case 'script':
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">台本生成コンポーネント</h2>
            <p className="text-gray-600">AIを使用して台本を生成するためのツールがここに表示されます。</p>
          </div>
        )
      case 'analysis':
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">バズ分析コンポーネント</h2>
            <p className="text-gray-600">コンテンツのバズ要因を分析するためのツールがここに表示されます。</p>
          </div>
        )
      case 'threads':
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Threadsコンポーネント</h2>
            <p className="text-gray-600">Threads連携機能がここに表示されます。</p>
          </div>
        )
      case 'new-script':
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">新台本コンポーネント</h2>
            <p className="text-gray-600">新しい台本を作成するためのツールがここに表示されます。</p>
          </div>
        )
      case 'caption':
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">キャプションコンポーネント</h2>
            <p className="text-gray-600">キャプションを生成・編集するためのツールがここに表示されます。</p>
          </div>
        )
      case 'comment':
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">コメントコンポーネント</h2>
            <p className="text-gray-600">コメント管理・生成ツールがここに表示されます。</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Instagramバズコンテンツ制作マニュアル</h1>
          <p className="mt-2 text-purple-100">バズるコンテンツを効率的に制作するためのツール集</p>
        </div>
      </header>

      {/* タブナビゲーション */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* フッター */}
      <footer className="bg-gray-800 text-gray-400 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 Instagramバズコンテンツ制作マニュアル</p>
        </div>
      </footer>
    </div>
  )
}
