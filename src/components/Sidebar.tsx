import React from "react";
import { 
  HomeIcon, 
  BookOpenIcon, 
  LightBulbIcon, 
  HashtagIcon, 
  VideoCameraIcon, 
  ChartBarIcon 
} from "@heroicons/react/24/outline";

const Sidebar = () => (
  <aside className="w-64 h-screen p-4 bg-white/30 backdrop-blur-md text-white border-r border-white/20">
    <div className="flex items-center mb-12">
      <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg mr-3"></div>
      <h1 className="text-2xl font-bold">InstaBuzz</h1>
    </div>
    <nav>
      <ul>
        <li className="mb-4 flex items-center">
          <HomeIcon className="w-6 h-6 mr-3" />
          <a href="#" className="hover:text-gray-200">Introduction</a>
        </li>
        <li className="mb-4 flex items-center">
          <BookOpenIcon className="w-6 h-6 mr-3" />
          <a href="#" className="hover:text-gray-200">Algorithm Basics</a>
        </li>
        <li className="mb-4 flex items-center">
          <LightBulbIcon className="w-6 h-6 mr-3" />
          <a href="#" className="hover:text-gray-200">Content is King</a>
        </li>
        <li className="mb-4 flex items-center">
          <HashtagIcon className="w-6 h-6 mr-3" />
          <a href="#" className="hover:text-gray-200">Hashtag Strategy</a>
        </li>
        <li className="mb-4 flex items-center">
          <VideoCameraIcon className="w-6 h-6 mr-3" />
          <a href="#" className="hover:text-gray-200">Reels & Stories</a>
        </li>
        <li className="mb-4 flex items-center">
          <ChartBarIcon className="w-6 h-6 mr-3" />
          <a href="#" className="hover:text-gray-200">Analytics</a>
        </li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;

