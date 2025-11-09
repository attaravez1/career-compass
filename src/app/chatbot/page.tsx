import { ChatbotInterface } from './chatbot-interface';

export default function ChatbotPage() {
  return (
    <div className="flex items-center justify-center w-full bg-muted/40 py-12 flex-grow">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">AI Career Counselor</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Chat with our AI counselor to get personalized career suggestions and advice.
          </p>
        </div>
        <ChatbotInterface />
      </div>
    </div>
  );
}
