import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('admins')
export class Admin {
  @ApiProperty({example: 1, description: 'Unique ID'})
  @PrimaryGeneratedColumn('increment')
  admin_id: number;

  @ApiProperty({ example: 'firstname', description: 'Admin first name'})
  @Column({type: 'text'})
  first_name: string;

  @ApiProperty({ example: 'username', description: 'Admin user name'})
  @Column({type: 'text'})
  user_name: string;

  @ApiProperty({ example: 'xndjbechfruevbyrbv', description: 'Admin hashed password'})
  @Column({type: 'text'})
  hashed_password: string;

  @CreateDateColumn()
  created_at: Date; // Creation date
}