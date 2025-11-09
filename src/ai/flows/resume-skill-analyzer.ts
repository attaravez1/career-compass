'use server';

/**
 * @fileOverview An AI agent that analyzes a user's resume or skills and matches them with ideal career options.
 *
 * - analyzeResumeOrSkills - A function that handles the analysis of the resume or skills and provides career recommendations.
 * - AnalyzeResumeOrSkillsInput - The input type for the analyzeResumeOrSkills function.
 * - AnalyzeResumeOrSkillsOutput - The return type for the analyzeResumeOrSkills function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeOrSkillsInputSchema = z.object({
  resumeOrSkills: z.string().describe('The user provided resume text or skills.'),
});
export type AnalyzeResumeOrSkillsInput = z.infer<
  typeof AnalyzeResumeOrSkillsInputSchema
>;

const AnalyzeResumeOrSkillsOutputSchema = z.object({
  careerRecommendations: z
    .string()
    .describe('A list of career recommendations based on the resume or skills.'),
  confidenceLevel: z
    .string()
    .describe(
      'The confidence level of the career recommendations, e.g., High, Medium, Low.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the career recommendations based on the resume or skills.'
    ),
});

export type AnalyzeResumeOrSkillsOutput = z.infer<
  typeof AnalyzeResumeOrSkillsOutputSchema
>;

export async function analyzeResumeOrSkills(
  input: AnalyzeResumeOrSkillsInput
): Promise<AnalyzeResumeOrSkillsOutput> {
  return analyzeResumeOrSkillsFlow(input);
}

const analyzeResumeOrSkillsPrompt = ai.definePrompt({
  name: 'analyzeResumeOrSkillsPrompt',
  input: {schema: AnalyzeResumeOrSkillsInputSchema},
  output: {schema: AnalyzeResumeOrSkillsOutputSchema},
  prompt: `You are a career counselor AI, specializing in matching candidate skills and experiences with ideal career options.

  Analyze the following resume or skills provided by the candidate:
  {{resumeOrSkills}}

  Based on this information, provide a list of career recommendations, a confidence level (High, Medium, Low), and the reasoning behind the recommendations.
  `,
});

const analyzeResumeOrSkillsFlow = ai.defineFlow(
  {
    name: 'analyzeResumeOrSkillsFlow',
    inputSchema: AnalyzeResumeOrSkillsInputSchema,
    outputSchema: AnalyzeResumeOrSkillsOutputSchema,
  },
  async input => {
    const {output} = await analyzeResumeOrSkillsPrompt(input);
    return output!;
  }
);
