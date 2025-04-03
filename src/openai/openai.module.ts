import { Module } from '@nestjs/common';
import { OpenAIController } from './openai.controller';
import { OpenAIService } from './openai.service';
import { OrderService } from 'src/order/order.service';

@Module({
  controllers: [OpenAIController],
  providers: [OpenAIService, OrderService],
})
export class OpenaiModule {}
