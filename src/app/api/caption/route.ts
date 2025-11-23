import { NextRequest } from 'next/server';
import { generateContent, prompts } from '@/lib/gemini';
import { handleApiError, successResponse, ApiError } from '@/lib/api-error';
import type { CaptionRequest, CaptionResponse } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: CaptionRequest = await request.json();

    if (!body.transcript?.trim()) {
      throw new ApiError('Transcript is required', 400);
    }

    const caption = await generateContent(prompts.caption(body.transcript));
    return successResponse<CaptionResponse>({ caption });
  } catch (error) {
    return handleApiError(error);
  }
}
