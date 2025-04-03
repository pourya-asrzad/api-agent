import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async processQuery(userInput: string) {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an API agent that maps user queries to tool calls. Always use the appropriate tool when responding to a request.',
        },
        { role: 'user', content: userInput },
      ],
      tools: [
        {
          type: 'function',
          function: {
            name: 'fetchUserOrders',
            description: "Retrieve a user's order history",
            parameters: {
              type: 'object',
              properties: {
                userId: { type: 'string', description: 'The user ID' },
              },
              required: ['userId'],
            },
          },
        },
      ],
      tool_choice: 'auto', // Ensures OpenAI actually attempts to call a tool
    });

    console.log('Full AI Response:', JSON.stringify(response, null, 2));

    return response.choices[0].message; // Returning the message that contains tool_calls
  }
}
