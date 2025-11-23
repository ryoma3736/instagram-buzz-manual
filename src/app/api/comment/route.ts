import { NextRequest } from 'next/server';
import { generateContent, prompts } from '@/lib/gemini';
import { handleApiError, successResponse, ApiError } from '@/lib/api-error';
import type { CommentRequest, CommentResponse } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: CommentRequest = await request.json();

    if (!body.mode || !body.context?.trim()) {
      throw new ApiError('Mode and context are required', 400);
    }

    if (body.mode !== 'reply' && body.mode !== 'engagement') {
      throw new ApiError('Mode must be "reply" or "engagement"', 400);
    }

    const result = await generateContent(prompts.comment(body.mode, body.context));
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new ApiError('Failed to parse comment result', 500);
    }

    const comments: CommentResponse = JSON.parse(jsonMatch[0]);
    return successResponse<CommentResponse>(comments);
  } catch (error) {
    return handleApiError(error);
  }
}
