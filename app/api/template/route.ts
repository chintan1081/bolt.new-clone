import Anthropic from '@anthropic-ai/sdk';
import { getSystemPrompt } from '../prompts/prompt';
import { NextRequest, NextResponse } from 'next/server';
import { baseprompt as reactBasePrompt, BASE_PROMPT } from '../prompts/reactPrompt'
import { baseprompt as nodeBasePrompt } from '../prompts/nodePrompt'

export async function POST( req: NextRequest ) {
  const client = new Anthropic({
    apiKey: process.env.claudeApiKey,
  });

    const { prompt } =  await req.json();
    const responce = await client.messages.create({
      messages : [{
        role: 'user', content: prompt
      }],
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 200,
      system: "Return either react or node on based on project just return react or node as single word. don't return anything extra"
    })
    const answer = responce.content[0].text;
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
    // const responce = await client.messages.create({
    //   messages: [{
    //     role: 'user', content: "For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos. \n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n\n"
    //   }, {
    //     role: 'user', content: "Here is an artifact that contains all files of the project visible to you. \nConsider the contents of ALL filesFor all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos. \n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n\n in the project.{BASE_PROMPT} \n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n .gitignore\n package-lock.json\n .bolt/prompt"
    //   }, {
    //     role: 'user', content: 'Create todo app'
    //   }],
    //   model: 'claude-3-5-sonnet-20241022',
    //   max_tokens: 8000,
    //   system: getSystemPrompt()

    // })

    // const answer = responce.content[0].text;
    // console.log(answer);

    
  }

  export function GET() {
    return NextResponse.json({ working : "yesssssssss"})
  }