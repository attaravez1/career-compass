'use server';

/**
 * @fileOverview An AI agent that provides a roadmap for career changers.
 *
 * - careerSwitchAdvisor - A function that creates a personalized plan for switching careers.
 * - CareerSwitchAdvisorInput - The input type for the careerSwitchAdvisor function.
 * - CareerSwitchAdvisorOutput - The return type for the careerSwitchAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerSwitchAdvisorInputSchema = z.object({
  currentRole: z.string().describe("The user's current job title or field."),
  currentSkills: z
    .string()
    .describe('A summary of the user\'s current skills and experiences.'),
  targetField: z
    .string()
    .describe('The new career field the user wants to enter.'),
});
export type CareerSwitchAdvisorInput = z.infer<typeof CareerSwitchAdvisorInputSchema>;


const CareerSwitchAdvisorOutputSchema = z.object({
  transferableSkills: z
    .string()
    .describe(
      'A bulleted list analyzing which of the user\'s current skills are valuable in the new field. Explain how each skill is relevant.'
    ),
  skillGaps: z
    .string()
    .describe(
      'A bulleted list of the key skills the user will need to develop to successfully enter the target field.'
    ),
  actionPlan: z
    .string()
    .describe(
      'A step-by-step action plan for making the career switch. This should be presented as a numbered list and include concrete steps like online courses, certifications, project ideas, and networking strategies. Use emojis to make it engaging.'
    ),
});
export type CareerSwitchAdvisorOutput = z.infer<typeof CareerSwitchAdvisorOutputSchema>;

export async function careerSwitchAdvisor(
  input: CareerSwitchAdvisorInput
): Promise<CareerSwitchAdvisorOutput> {
  return careerSwitchAdvisorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerSwitchAdvisorPrompt',
  input: {schema: CareerSwitchAdvisorInputSchema},
  output: {schema: CareerSwitchAdvisorOutputSchema},
  prompt: `You are an expert AI career coach specializing in helping professionals transition between careers. A user will provide their current role, skills, and the new field they want to enter. Your task is to provide a clear, encouraging, and actionable roadmap for them.

Current Role: {{{currentRole}}}
Current Skills/Experience: {{{currentSkills}}}
Target Field: {{{targetField}}}

Analyze their situation and provide the following:
1.  **Transferable Skills:** Identify which of their existing skills are valuable in the new field. Explain the relevance of each skill.
2.  **Skill Gaps:** Identify the most important skills they are missing for the target field.
3.  **Action Plan:** Create a numbered, step-by-step plan to help them make the switch. Include suggestions for online courses (e.g., from Coursera, edX), professional certifications, types of portfolio projects to build, and networking advice. Be encouraging and use emojis!`,
});

const careerSwitchAdvisorFlow = ai.defineFlow(
  {
    name: 'careerSwitchAdvisorFlow',
    inputSchema: CareerSwitchAdvisorInputSchema,
    outputSchema: CareerSwitchAdvisorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
