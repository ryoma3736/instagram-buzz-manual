import { NextRequest } from 'next/server';
import { generateContent, prompts } from '@/lib/gemini';
import { handleApiError, successResponse, ApiError } from '@/lib/api-error';
import type { ThreadsRequest, ThreadsResponse } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: ThreadsRequest = await request.json();

    if (!body.title?.trim() || !body.transcript?.trim()) {
      throw new ApiError('Title and transcript are required', 400);
    }

    const result = await generateContent(prompts.threads(body.title, body.transcript));
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new ApiError('Failed to parse threads result', 500);
    }

    const threads: ThreadsResponse = JSON.parse(jsonMatch[0]);
    return successResponse<ThreadsResponse>(threads);
  } catch (error) {
    return handleApiError(error);
  }
}
