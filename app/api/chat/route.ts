import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { getSystemPrompt } from "../prompts/prompt";

export async function POST( req : NextRequest) {
  const {prompt} = await req.json();
  const client = new Anthropic({
    apiKey: process.env.claudeApiKey,
  });
  type Message = {
    role: string;
    content: string;
  };
  
  const responce = await client.messages.create({
    messages: JSON.parse(prompt).map((content: string): Message => ({ role: 'user', content })),
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 100,
    system: getSystemPrompt()
  })
    const answer = responce.content[0];
  return NextResponse.json({ msg : answer})
}