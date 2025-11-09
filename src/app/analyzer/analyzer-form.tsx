'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Lightbulb, BarChart, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { analyzeResumeOrSkills, AnalyzeResumeOrSkillsOutput } from '@/ai/flows/resume-skill-analyzer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  resumeOrSkills: z.string().min(50, 'Please provide at least 50 characters of your resume or skills.'),
});

export function AnalyzerForm() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResumeOrSkillsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeOrSkills: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeResumeOrSkills(values);
      setAnalysisResult(result);
    } catch (e) {
      setError('An error occurred while analyzing. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const getConfidenceBadgeVariant = (confidence: string | undefined) => {
    switch (confidence?.toLowerCase()) {
      case 'high':
        return 'default';
      case 'medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };


  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="resumeOrSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Your Resume or Skills</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste your full resume here, or list your skills, experience, and interests..."
                      className="min-h-[250px] text-base"
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
                    Analyzing...
                  </>
                ) : (
                  'Analyze My Skills'
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
            <h2 className="text-2xl font-bold font-headline text-center">Analysis Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-primary" />
                    Career Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{analysisResult.careerRecommendations}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    Reasoning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{analysisResult.reasoning}</p>
                </CardContent>
              </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart className="h-6 w-6 text-primary" />
                        Confidence Level
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Badge variant={getConfidenceBadgeVariant(analysisResult.confidenceLevel)} className="text-lg px-4 py-1">
                        {analysisResult.confidenceLevel}
                    </Badge>
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
