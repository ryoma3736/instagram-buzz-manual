import { NextRequest } from 'next/server';
import { generateContent, prompts } from '@/lib/gemini';
import { handleApiError, successResponse, ApiError } from '@/lib/api-error';
import type { TranscriptRequest, TranscriptResponse } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: TranscriptRequest = await request.json();

    if (!body.content?.trim()) {
      throw new ApiError('Content is required', 400);
    }

    const transcript = await generateContent(prompts.transcript(body.content));

    return successResponse<TranscriptResponse>({ transcript });
  } catch (error) {
    return handleApiError(error);
  }
}
