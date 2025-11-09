'use server';

/**
 * @fileOverview An AI-powered chatbot that provides career suggestions and advice.
 *
 * - aiChatbotCounselor - A function that handles the chatbot interaction and returns career advice.
 * - AIChatbotCounselorInput - The input type for the aiChatbotCounselor function.
 * - AIChatbotCounselorOutput - The return type for the aiChatbotCounselor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotCounselorInputSchema = z.object({
  interestsAndSkills: z
    .string()
    .describe('A description of the user\'s interests and skills.'),
  careerGoals: z
    .string()
    .optional()
    .describe('Optional: The user\'s current career goals, if any.'),
  previousExperiences: z
    .string()
    .optional()
    .describe('Optional: A summary of the user\'s previous work experiences.'),
});
export type AIChatbotCounselorInput = z.infer<typeof AIChatbotCounselorInputSchema>;

const AIChatbotCounselorOutputSchema = z.object({
  careerSuggestions: z
    .string()
    .describe('A list of possible careers based on the user\'s skills and interests.'),
  advice: z.string().describe('Advice for pursuing the suggested careers.'),
});
export type AIChatbotCounselorOutput = z.infer<typeof AIChatbotCounselorOutputSchema>;

export async function aiChatbotCounselor(input: AIChatbotCounselorInput): Promise<AIChatbotCounselorOutput> {
  return aiChatbotCounselorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotCounselorPrompt',
  input: {schema: AIChatbotCounselorInputSchema},
  output: {schema: AIChatbotCounselorOutputSchema},
  prompt: `You are an AI career counselor. A student will provide you with
their interests, skills, goals, and prior experience, and you will provide
career suggestions and advice.

Interests and Skills: {{{interestsAndSkills}}}
Goals: {{{careerGoals}}}
Experience: {{{previousExperiences}}}

Respond in a professional and helpful tone.`,
});

const aiChatbotCounselorFlow = ai.defineFlow(
  {
    name: 'aiChatbotCounselorFlow',
    inputSchema: AIChatbotCounselorInputSchema,
    outputSchema: AIChatbotCounselorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
