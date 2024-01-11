import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { Order } from './entities';
import { CreateOrderDto } from './dto';
import { OrderService } from './order.service';


@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Create Order
  @ApiOperation({summary: 'Create order'})
  @ApiResponse({status: 200, type: Order})
  @Post('add')
  create_order(
    @Body() createOrderDto: CreateOrderDto
  ): Promise<Object> {
    return this.orderService.create_order(createOrderDto);
  }

  // Find All Orders 
  @ApiOperation({summary: 'Find all orders'})
  @ApiResponse({status: 200, type: [Order]})
  @Get('find-all')
  find_orders(): Promise<Object> {
    return this.orderService.find_orders()
  };

  // Remove One Order
  @ApiOperation({summary: 'Remove order'})
  @ApiResponse({status: 200})
  @Delete('remove/:id')
  remove_order(
    @Param('id') id: number
  ): Promise<Number> {
    return this.orderService.remove_order(id);
  }
}
