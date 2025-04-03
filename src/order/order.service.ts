import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  private orders = [
    { id: 1, userId: '123', total: 50, status: 'Shipped' },
    { id: 2, userId: '456', total: 30, status: 'Processing' },
  ];
  getOrdersByUser(userId: string) {
    return this.orders.filter((order) => order.userId === userId);
  }
}
