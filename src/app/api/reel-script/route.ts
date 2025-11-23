import { NextRequest } from 'next/server';
import { generateContent, prompts } from '@/lib/gemini';
import { handleApiError, successResponse, ApiError } from '@/lib/api-error';
import type { ReelScriptRequest, ReelScriptResponse } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: ReelScriptRequest = await request.json();

    if (!body.originalScript?.trim()) {
      throw new ApiError('Original script is required', 400);
    }

    const newScript = await generateContent(
      prompts.reelScript(body.originalScript, body.perspective)
    );
    return successResponse<ReelScriptResponse>({ newScript });
  } catch (error) {
    return handleApiError(error);
  }
}
