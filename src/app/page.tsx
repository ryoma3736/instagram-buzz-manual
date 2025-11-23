"use client";

import React, { useState } from "react";
import ReelSearch from "@/components/ReelSearch";
import VideoDownloader from "@/components/VideoDownloader";
import TranscriptGenerator from "@/components/TranscriptGenerator";
import BuzzAnalyzer from "@/components/BuzzAnalyzer";
import ThreadsGenerator from "@/components/ThreadsGenerator";
import ReelScriptGenerator from "@/components/ReelScriptGenerator";
import CaptionGenerator from "@/components/CaptionGenerator";
import CommentHelper from "@/components/CommentHelper";

const menuItems = [
  { id: "search", label: "バズリール検索", icon: "🔍" },
  { id: "download", label: "動画ダウンロード", icon: "📥" },
  { id: "transcript", label: "AI台本生成", icon: "📝" },
  { id: "analyze", label: "バズ分析", icon: "📊" },
  { id: "threads", label: "Threads投稿", icon: "🧵" },
  { id: "reel-script", label: "新リール台本", icon: "🎬" },
  { id: "caption", label: "キャプション生成", icon: "💬" },
  { id: "comment", label: "コメント加速", icon: "🚀" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("search");

  const renderContent = () => {
    switch (activeTab) {
      case "search": return <ReelSearch />;
      case "download": return <VideoDownloader />;
      case "transcript": return <TranscriptGenerator />;
      case "analyze": return <BuzzAnalyzer />;
      case "threads": return <ThreadsGenerator />;
      case "reel-script": return <ReelScriptGenerator />;
      case "caption": return <CaptionGenerator />;
      case "comment": return <CommentHelper />;
      default: return <ReelSearch />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-800 p-6 border-r border-gray-700">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-3xl">📸</span>
            InstaBuzz
          </h1>
          <p className="text-gray-400 text-sm mt-1">バズコンテンツ制作マニュアル</p>
        </div>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                    activeTab === item.id
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
