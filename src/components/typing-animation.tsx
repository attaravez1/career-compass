'use client';

import { useState, useEffect, useRef } from 'react';

interface TypingAnimationProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
}

export default function TypingAnimation({ 
  texts, 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  delay = 2000 
}: TypingAnimationProps) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingTimeout, setTypingTimeout] = useState(typingSpeed);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % texts.length;
      const fullText = texts[i];
      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        setTypingTimeout(delay);
        setIsDeleting(true);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingTimeout(typingSpeed);
      } else {
        setTypingTimeout(isDeleting ? deletingSpeed : typingSpeed);
      }
    };

    timeoutRef.current = setTimeout(handleTyping, typingTimeout);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, isDeleting, loopNum, texts, typingSpeed, deletingSpeed, delay, typingTimeout]);

  return (
    <span className="relative">
      {text}
      <span className="absolute right-[-2px] top-0 h-full w-[2px] bg-primary animate-[pulse_1s_infinite]"/>
    </span>
  );
}
