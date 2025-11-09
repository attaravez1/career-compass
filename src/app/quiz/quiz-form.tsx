'use client';

import { useState } from 'react';
import { Loader2, Lightbulb, Bot, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { quizQuestions } from '@/lib/data';
import { aiQuizPersonalizedRecommendations, AIQuizPersonalizedRecommendationsOutput } from '@/ai/flows/ai-quiz-personalized-recommendations';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function QuizForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<AIQuizPersonalizedRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isQuizFinished = currentQuestionIndex >= quizQuestions.length;
  const progress = (currentQuestionIndex / quizQuestions.length) * 100;

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question answered
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      getRecommendations(newAnswers);
    }
  };

  const getRecommendations = async (finalAnswers: string[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await aiQuizPersonalizedRecommendations({ quizAnswers: finalAnswers });
      setRecommendations(result);
    } catch (e) {
      setError('An error occurred while generating recommendations. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setRecommendations(null);
    setError(null);
    setIsLoading(false);
  };

  if (isQuizFinished) {
    return (
        <Card className="w-full shadow-lg">
            <CardHeader className="text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                <CardTitle className="font-headline text-2xl">Quiz Completed!</CardTitle>
                <CardDescription>Here are your personalized career recommendations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 {isLoading && (
                    <div className="flex flex-col items-center justify-center space-y-2 p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground">Generating your results...</p>
                    </div>
                 )}
                 {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                 )}
                 {recommendations && (
                    <div className="space-y-6 animate-in fade-in-50 duration-500">
                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Bot className="h-6 w-6 text-primary"/>Recommended Careers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-2">
                                  {recommendations.careerRecommendations.map((rec, index) => <li key={index}>{rec}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                         <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Lightbulb className="h-6 w-6 text-primary"/>Reasoning</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{recommendations.reasoning}</p>
                            </CardContent>
                        </Card>
                    </div>
                 )}
                <div className="text-center pt-4">
                    <Button onClick={restartQuiz}>Take Quiz Again</Button>
                </div>
            </CardContent>
        </Card>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <Progress value={progress} className="mb-4" />
        <CardTitle className="font-headline text-2xl text-center">
            Question {currentQuestionIndex + 1} / {quizQuestions.length}
        </CardTitle>
        <CardDescription className="text-center text-xl pt-4">
            {currentQuestion.question}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              size="lg"
              className="h-auto py-4 text-base whitespace-normal justify-start text-left"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
