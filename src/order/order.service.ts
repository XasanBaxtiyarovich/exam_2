import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Order } from './entities';
import { CreateOrderDto } from './dto';


@Injectable()
export class OrderService {
  constructor( @InjectRepository(Order)private orderRepository: Repository<Order> ){}

  async create_order(createOrderDto: CreateOrderDto) {
    const newOrder = await this.orderRepository.save(createOrderDto);
  
    return {
      status: HttpStatus.OK,
      new_order: newOrder
    };
  }

  async find_orders() {
    const orders = await this.orderRepository.find();

    if(orders.length === 0) return {
                                    message: 'Order Not Found',
                                    status: HttpStatus.NOT_FOUND
                                   }
    return {
            orders,
            status: HttpStatus.OK
           }
  }

  async remove_order(id: number) {
    const [ order ] = await this.orderRepository.findBy({ order_id: id });
    if(!order) return HttpStatus.NOT_FOUND;

    await this.orderRepository.delete({ order_id: id });

    return HttpStatus.OK;
  }
}