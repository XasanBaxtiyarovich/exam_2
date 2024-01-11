import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';

import { Admin } from './entities';
import { AdminService } from './admin.service';
import { AddAdminDto, SignInDto, UpdateDataDto, UpdatePasswordDto } from './dto';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Add Admin
  @ApiOperation({summary: 'Add admin'})
  @ApiResponse({status: 200, type: Admin})
  @Post('add-admin')
  add_admin(
    @Body() addAdminDto: AddAdminDto
  ): Promise<Object> {
    return this.adminService.add_admin(addAdminDto);
  }

  // Sign In
  @ApiOperation({summary: 'Sign in'})
  @ApiResponse({status: 200, type: Admin})
  @Post('signin')
  signIn(
    @Body() SignInDto: SignInDto
  ): Promise<Object> {
    return this.adminService.signIn(SignInDto)
  }

  // Find One Admin
  @ApiOperation({summary: 'Find one admin'})
  @ApiResponse({status: 200, type: Admin})
  @Get('find/admin/:id')
  find_one_admin(
    @Param('id') id: number
  ): Promise<Object> {
    return this.adminService.find_one_admin(id);
  }

  // Find All Admins 
  @ApiOperation({summary: 'Find all admins'})
  @ApiResponse({status: 200, type: [Admin]})
  @Get('find-all/admins')
  find_admins(): Promise<Object> {
    return this.adminService.find_admins()
  };

  // Searche One Admin
  @ApiOperation({summary: 'Searche admin'})
  @ApiResponse({status: 200, type: Admin})
  @Get('searche/admin/:name')
  searche_admin(
    @Param('name') name: string
  ): Promise<Object> {
    return this.adminService.searche_admin(name);
  }

  // Update Admin Data
  @ApiOperation({summary: 'Update data admin'})
  @ApiResponse({status: 200, type: Admin})
  @Put('update/:id')
  update_data(
    @Param('id') id: number, 
    @Body() updateDataDto: UpdateDataDto
  ): Promise<Object> {
    return this.adminService.update_data(id, updateDataDto)
  }

  // Update Admin Password
  @ApiOperation({summary: 'Update password admin'})
  @ApiResponse({status: 200, type: Admin})
  @Put('update-password/:id')
  update_password(
    @Param('id') id: number, 
    @Body() updatePasswordDto: UpdatePasswordDto
  ): Promise<Object> {
    return this.adminService.update_password(id, updatePasswordDto);
  }

  // Remove One Admin
  @ApiOperation({summary: 'Remove admin'})
  @ApiResponse({status: 200})
  @Delete('remove/:id')
  remove_admin(
    @Param('id') id: number
  ): Promise<Number> {
    return this.adminService.remove_admin(id);
  }
}