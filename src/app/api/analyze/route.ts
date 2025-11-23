import { NextRequest } from 'next/server';
import { generateContent, prompts } from '@/lib/gemini';
import { handleApiError, successResponse, ApiError } from '@/lib/api-error';
import type { AnalyzeRequest, AnalyzeResponse } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();

    if (!body.transcript?.trim()) {
      throw new ApiError('Transcript is required', 400);
    }

    const result = await generateContent(prompts.analyze(body.transcript));
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new ApiError('Failed to parse analysis result', 500);
    }

    const analysis: AnalyzeResponse = JSON.parse(jsonMatch[0]);
    return successResponse<AnalyzeResponse>(analysis);
  } catch (error) {
    return handleApiError(error);
  }
}
