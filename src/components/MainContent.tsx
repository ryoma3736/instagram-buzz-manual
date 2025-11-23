import React from "react";
import Card from "./Card";

const MainContent = () => (
  <main className="flex-1 p-8 bg-gray-900 text-white">
    <header className="mb-8">
      <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Introduction
      </h2>
      <p className="text-lg text-gray-400">
        Your guide to going viral on Instagram.
      </p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card title="Understanding the Algorithm">
        <p>Learn how the Instagram algorithm works and how to make it work for you.</p>
      </Card>
      <Card title="Creating Engaging Content">
        <p>Discover the secrets to creating content that people love to share.</p>
      </Card>
      <Card title="Mastering Hashtags">
        <p>Find out how to use hashtags to reach a wider audience.</p>
      </Card>
      <Card title="The Power of Reels">
        <p>Learn how to create viral Reels that get millions of views.</p>
      </Card>
      <Card title="Stories that Sell">
        <p>Use Instagram Stories to connect with your audience and drive sales.</p>
      </Card>
      <Card title="Analyzing Your Performance">
        <p>Track your progress and optimize your strategy for maximum results.</p>
      </Card>
    </div>
  </main>
);

export default MainContent;

