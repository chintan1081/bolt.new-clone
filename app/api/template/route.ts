import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { baseprompt as reactBasePrompt, BASE_PROMPT } from '../prompts/reactPrompt'
import { baseprompt as nodeBasePrompt } from '../prompts/nodePrompt'

export async function POST( req: NextRequest ) {
  const client = new Anthropic({
    apiKey: process.env.claudeApiKey,
  });

    const { prompt } =  await req.json();
    const response = await client.messages.create({
      messages : [{
        role: 'user', content: prompt
      }],
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 200,
      system: "Return either react or node on based on project just return react or node as single word. don't return anything extra"
    })

    let answer  = '';
    if (response.content[0] && response.content[0].type === 'text') {
      answer = response.content[0].text; // Type assertion to TextBlock
    }
    console.log(answer);
    
    if (answer == 'react'){
      return NextResponse.json({
        prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you. \nConsider the contents of ALL filesFor all designs I ask you to make, have them be beautiful, not cookie cutter.${reactBasePrompt}`],
      })
      ;
    }
    if (answer == 'node'){
      return NextResponse.json({
        prompts: [`Here is an artifact that contains all files of the project visible to you. \nConsider the contents of ALL filesFor all designs I ask you to make, have them be beautiful, not cookie cutter.${nodeBasePrompt} \n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n .gitignore\n package-lock.json\n .bolt/prompt]`],
      })
    }
    return NextResponse.json(
      { message: 'You cannot access this', status: 403 }, 
    )
  }

  export function GET() {
    return NextResponse.json({ working : "yesssssssss"})
  }