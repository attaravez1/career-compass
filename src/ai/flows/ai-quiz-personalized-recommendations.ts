'use server';
/**
 * @fileOverview Generates personalized career path recommendations based on user's quiz answers.
 *
 * - aiQuizPersonalizedRecommendations - A function that generates personalized career path recommendations.
 * - AIQuizPersonalizedRecommendationsInput - The input type for the aiQuizPersonalizedRecommendations function.
 * - AIQuizPersonalizedRecommendationsOutput - The return type for the aiQuizPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIQuizPersonalizedRecommendationsInputSchema = z.object({
  quizAnswers: z
    .array(z.string())
    .describe('An array of strings representing the user choices in the career quiz.'),
});
export type AIQuizPersonalizedRecommendationsInput = z.infer<
  typeof AIQuizPersonalizedRecommendationsInputSchema
>;

const AIQuizPersonalizedRecommendationsOutputSchema = z.object({
  careerRecommendations: z
    .array(z.string())
    .describe('An array of personalized career path recommendations.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the career recommendations.'),
});
export type AIQuizPersonalizedRecommendationsOutput = z.infer<
  typeof AIQuizPersonalizedRecommendationsOutputSchema
>;

export async function aiQuizPersonalizedRecommendations(
  input: AIQuizPersonalizedRecommendationsInput
): Promise<AIQuizPersonalizedRecommendationsOutput> {
  return aiQuizPersonalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiQuizPersonalizedRecommendationsPrompt',
  input: {schema: AIQuizPersonalizedRecommendationsInputSchema},
  output: {schema: AIQuizPersonalizedRecommendationsOutputSchema},
  prompt: `Based on the following quiz answers, provide personalized career path recommendations. Explain the reasoning behind each recommendation.

Quiz Answers: {{quizAnswers}}

Format the output as a JSON object with 'careerRecommendations' (an array of career paths) and 'reasoning' (explanation for each career path).
`,
});

const aiQuizPersonalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiQuizPersonalizedRecommendationsFlow',
    inputSchema: AIQuizPersonalizedRecommendationsInputSchema,
    outputSchema: AIQuizPersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
