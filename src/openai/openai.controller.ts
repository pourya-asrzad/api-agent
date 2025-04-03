import { Controller, Post, Body } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { OrderService } from '../order/order.service';

@Controller('ai')
export class OpenAIController {
  constructor(
    private readonly openAIService: OpenAIService,
    private readonly orderService: OrderService,
  ) {}

  @Post('query')
  async handleQuery(@Body('query') query: string) {
    const aiResponse = await this.openAIService.processQuery(query);

    // Extract tool_calls from AI response
    if (aiResponse.tool_calls) {
      for (const toolCall of aiResponse.tool_calls) {
        if (toolCall.function.name === 'fetchUserOrders') {
          const args = JSON.parse(toolCall.function.arguments);
          return this.orderService.getOrdersByUser(args.userId);
        }
      }
    }

    return { message: 'No matching function found.' };
  }
}
