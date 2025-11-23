// API Response Types

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface TranscriptRequest {
  content: string;
}

export interface TranscriptResponse {
  transcript: string;
}

export interface AnalyzeRequest {
  transcript: string;
}

export interface AnalyzeResponse {
  reasons: string[];
  patterns: string[];
  recommendations: string[];
}

export interface ThreadsRequest {
  title: string;
  transcript: string;
}

export interface ThreadsResponse {
  part1: string;
  part2: string;
}

export interface CaptionRequest {
  transcript: string;
}

export interface CaptionResponse {
  caption: string;
}

export interface CommentRequest {
  mode: 'reply' | 'engagement';
  context: string;
}

export interface CommentResponse {
  comments: string[];
}

export interface ReelScriptRequest {
  originalScript: string;
  perspective?: string;
}

export interface ReelScriptResponse {
  newScript: string;
}
