export interface Reel {
  id: string;
  url: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  postedAt: string;
  thumbnail?: string;
  author: string;
  keywords: string[];
}

export interface BuzzAnalysis {
  reasons: string[];
  patterns: string[];
  successFactors: string[];
  recommendations: string[];
}

export interface ThreadsPost {
  part1: string;
  part2: string;
}

export interface CommentIdea {
  type: 'reply' | 'engagement';
  ideas: string[];
}
