'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, User, CornerDownLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { aiChatbotCounselor } from '@/ai/flows/ai-chatbot-counselor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  message: z.string().min(10, 'Please describe your interests and skills in more detail.'),
});

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function ChatbotInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: values.message };
    setMessages((prev) => [...prev, userMessage]);
    form.reset();

    try {
      const response = await aiChatbotCounselor({
        interestsAndSkills: values.message,
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: `**Career Suggestions:**\n${response.careerSuggestions}\n\n**Advice:**\n${response.advice}`,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, lineIndex) => (
      <p key={lineIndex} className="mb-2 last:mb-0">
        {line.split(/(\*\*.*?\*\*)/g).map((part, partIndex) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    ));
  };


  return (
    <Card className="w-full shadow-2xl rounded-xl overflow-hidden">
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] p-6" viewportRef={scrollAreaRef}>
          <div className="space-y-6">
            {messages.length === 0 && (
                <div className="flex items-start gap-4 p-4 rounded-lg bg-card text-card-foreground">
                    <Avatar>
                        <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                    <div className="prose prose-sm max-w-none">
                        <p className="font-semibold">AI Counselor</p>
                        <p>Hello! Tell me about your interests, skills, career goals, and past experiences. The more detail you provide, the better I can assist you.</p>
                    </div>
                </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'assistant' && (
                  <Avatar>
                    <AvatarFallback><Bot /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[85%] rounded-lg p-3 text-sm prose prose-sm max-w-none ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {renderMarkdown(message.content)}
                </div>
                {message.role === 'user' && (
                  <Avatar>
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-4">
                 <Avatar>
                    <AvatarFallback><Bot /></AvatarFallback>
                 </Avatar>
                <div className="bg-muted rounded-lg p-3 flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Thinking...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <Separator />
        <div className="p-4 bg-background/80">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I love solving puzzles, I'm good at math, and I want a job that helps people..."
                        className="min-h-[60px]"
                        {...field}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <CornerDownLeft className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
