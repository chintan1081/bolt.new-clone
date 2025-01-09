import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { getSystemPrompt } from "../prompts/prompt";
import { log } from "console";



export async function POST( req : NextRequest) {
    
  const client = new Anthropic({
    apiKey: process.env.claudeApiKey,
  });

  const {prompt} = await req.json();
  const responce = await client.messages.create({
    messages : JSON.parse(prompt).map( content => ({ role : 'user', content })),
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 8000,
    system: getSystemPrompt()
  })
  const answer = responce.content[0].text;
  console.log(answer);
  return NextResponse.json({ msg : answer})
}