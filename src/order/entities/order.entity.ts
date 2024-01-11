import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @ApiProperty({example: 1, description: 'Unique ID'})
  @PrimaryGeneratedColumn('increment')
  order_id: number;

  @ApiProperty({ example: 'name', description: 'User name'})
  @Column({type: 'text'})
  name: string;

  @ApiProperty({ example: 'phone', description: 'User phone number'})
  @Column({type: 'text'})
  phone: string;

  @ApiProperty({ example: 'email', description: 'User email'})
  @Column({type: 'text'})
  email: string;

  @CreateDateColumn()
  created_at: Date; // Creation date
}