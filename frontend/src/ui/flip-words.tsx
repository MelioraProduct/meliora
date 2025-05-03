"use client";
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "../lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWord((prev) => {
        const currentIndex = words.indexOf(prev);
        return words[(currentIndex + 1) % words.length];
      });
    }, duration);

    return () => clearInterval(timer);
  }, [words, duration]);

  return (
    <div
      className={cn(
        "z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100 px-2",
        className
      )}
    >
      {currentWord}
    </div>
  );
};
