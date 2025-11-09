'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Lightbulb, TrendingUp, CheckSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { careerSwitchAdvisor, CareerSwitchAdvisorOutput } from '@/ai/flows/career-switch-advisor';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  currentRole: z.string().min(2, 'Please enter your current role.'),
  currentSkills: z.string().min(20, 'Please describe your skills in at least 20 characters.'),
  targetField: z.string().min(2, 'Please enter your target field.'),
});

export function CareerSwitchForm() {
  const [analysisResult, setAnalysisResult] = useState<CareerSwitchAdvisorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentRole: '',
      currentSkills: '',
      targetField: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await careerSwitchAdvisor(values);
      setAnalysisResult(result);
    } catch (e) {
      setError('An error occurred while generating your roadmap. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const renderMarkdownList = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.trim().startsWith('* ')) {
        return <li key={index} className="list-disc ml-4 mb-2">{line.substring(2)}</li>;
      }
      if (line.match(/^\d+\.\s/)) {
        return <li key={index} className="list-decimal ml-4 mb-2">{line.replace(/^\d+\.\s/, '')}</li>;
      }
      return <p key={index}>{line}</p>;
    });
  };

  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="currentRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Your Current Role/Field</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Retail Manager" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetField"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Your Target Field</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Data Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="currentSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Your Skills & Experience</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List your key skills, responsibilities, and accomplishments..."
                      className="min-h-[150px] text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Building Your Roadmap...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Create My Action Plan
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {analysisResult && (
          <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-bold font-headline text-center">Your Career Switch Roadmap</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  Transferable Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <ul>{renderMarkdownList(analysisResult.transferableSkills)}</ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  Key Skill Gaps
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <ul>{renderMarkdownList(analysisResult.skillGaps)}</ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="h-6 w-6 text-primary" />
                  Your Action Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <ol>{renderMarkdownList(analysisResult.actionPlan)}</ol>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
