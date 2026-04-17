"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Ask about hydration, BMI, steps, or how to keep your weekly routine steady.",
    },
  ]);
  const [value, setValue] = useState("");
  const [pending, startTransition] = useTransition();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = value.trim();
    if (!message) return;

    setMessages((current) => [...current, { role: "user", content: message }]);
    setValue("");

    startTransition(async () => {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const payload = (await response.json()) as { reply?: string; error?: string };
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: payload.reply ?? payload.error ?? "I could not respond right now.",
        },
      ]);
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle>AI support</CardTitle>
        <CardDescription>A lightweight assistant for general health-tracking guidance.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-72 space-y-3 overflow-y-auto rounded-[1.6rem] border border-[#edf0df] bg-[#fbfcf7] p-4">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={message.role === "assistant" ? "mr-8" : "ml-8 text-right"}
            >
              <div
                className={
                  message.role === "assistant"
                    ? "inline-block rounded-[1.2rem] bg-white px-4 py-3 text-sm shadow-xs"
                    : "inline-block rounded-[1.2rem] bg-[#a9cd63] px-4 py-3 text-sm text-white"
                }
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex gap-3">
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="How much water should I aim for today?"
            className="rounded-full border-[#e4e9d6] bg-[#fbfcf7]"
          />
          <Button type="submit" disabled={pending} className="rounded-full bg-[#a9cd63] text-white hover:bg-[#98be52]">
            {pending ? "Thinking..." : "Send"}
          </Button>
        </form>
      </CardContent>
    </>
  );
}
