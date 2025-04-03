import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { OrderService } from './order/order.service';

@Module({
  imports: [OpenaiModule],
  controllers: [AppController],
  providers: [AppService, OrderService],
})
export class AppModule {}
