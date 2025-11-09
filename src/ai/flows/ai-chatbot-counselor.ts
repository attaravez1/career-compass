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

const LearningResourceSchema = z.object({
  title: z.string().describe('The title of the tutorial or video.'),
  url: z.string().url().describe('The URL to the resource.'),
});

const AIChatbotCounselorOutputSchema = z.object({
  careerSuggestions: z
    .string()
    .describe(
      'A bulleted list of possible careers based on the user\'s skills and interests. Be encouraging and use emojis.'
    ),
  advice: z
    .string()
    .describe(
      'Actionable advice for pursuing the suggested careers. Present this in a clear, readable format, not a single paragraph.'
    ),
  learningResources: z
    .array(LearningResourceSchema)
    .optional()
    .describe(
      'A list of 2-3 helpful beginner-friendly YouTube videos or tutorials if the user seems new to a field. Only provide this if relevant.'
    ),
});
export type AIChatbotCounselorOutput = z.infer<typeof AIChatbotCounselorOutputSchema>;

export async function aiChatbotCounselor(input: AIChatbotCounselorInput): Promise<AIChatbotCounselorOutput> {
  return aiChatbotCounselorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotCounselorPrompt',
  input: {schema: AIChatbotCounselorInputSchema},
  output: {schema: AIChatbotCounselorOutputSchema},
  prompt: `You are a friendly and encouraging AI career counselor. A student will provide you with
their interests, skills, goals, and prior experience, and you will provide
career suggestions and advice.

Interests and Skills: {{{interestsAndSkills}}}
Goals: {{{careerGoals}}}
Experience: {{{previousExperiences}}}

Your response should be positive, helpful, and easy to read. Use emojis to make it more engaging! 
- Provide career suggestions as a bulleted list.
- Break up the advice into smaller, digestible paragraphs.
- If the user seems like a beginner in a suggested field, find 2-3 relevant, high-quality beginner tutorials or videos from YouTube and add them to the learningResources array.
- Respond in a professional yet conversational and helpful tone.`,
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
