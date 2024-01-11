import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Admin } from './entities';
import { AddAdminDto, SignInDto, UpdateDataDto, UpdatePasswordDto } from './dto';


@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)private adminRepository: Repository<Admin>,
    private jwtService: JwtService
  ) {}

  async add_admin(addAdminDto: AddAdminDto): Promise<Object>  {
    const [ existingAdmin ] = await this.adminRepository.findBy({ user_name: addAdminDto.user_name });
    if (existingAdmin) {
      return { 
        message: 'username already exists',
        status: HttpStatus.CONFLICT
      };
    }
    
    const hashedPassword = await bcrypt.hash(addAdminDto.password, 7);
    
    const newAdminData = {
      first_name: addAdminDto.first_name,
      user_name: addAdminDto.user_name,
      hashed_password: hashedPassword
    };
    const newAdmin = await this.adminRepository.save(newAdminData);
  
    return {
      message: 'added successfully',
      status: HttpStatus.OK,
      new_admin: newAdmin
    };
  }

  async signIn(signInDto: SignInDto): Promise<Object> {
    const [ admin ] = await this.adminRepository.findBy({ user_name: signInDto.user_name });
    
    if (!admin) return {
                          message: 'username or password is incorrect',
                          status: HttpStatus.NOT_FOUND
                       };

    const pass = await bcrypt.compare(signInDto.password, admin.hashed_password);
    if (!pass) return { 
                        message: 'username or password is incorrect',
                        status: HttpStatus.NOT_FOUND 
                      };

    const token = await this.getToken(admin);
    
    return {
              message: 'Sign in succesfully', 
              status: HttpStatus.OK,
              admin,
              token
           }
  }

  async find_one_admin(id: number): Promise<Object> {
    const [ admin ] = await this.adminRepository.findBy({ admin_id: id });
    if (!admin) return {
                        message: 'Admin Not Found',
                        status: HttpStatus.NOT_FOUND
                       };
    return {
            admin,
            status: HttpStatus.OK
           };
  }

  async find_admins(): Promise<Object> {
    const admins = await this.adminRepository.find();
    if (admins.length === 0) return {
                                      message: 'Admins Not Found',
                                      status: HttpStatus.NOT_FOUND
                                    };
    return {
            status: HttpStatus.OK,
            admins
           }
  }

  async searche_admin(username: string): Promise<Object> {
    const admin = await this.adminRepository.find({
      where : {
        user_name : Like(`%${username}%`)
      }
    });

    if (admin.length === 0) return {
                              message: 'Admin Not Found',
                              status: HttpStatus.NOT_FOUND
                            };
    return {
            status: HttpStatus.OK,
            admin
           };
  }

  async update_data(id: number, updateDataDto: UpdateDataDto): Promise<Object> {
    const [ admin ] = await this.adminRepository.findBy({ admin_id: id });

    if(!admin) return {
                        message: 'Admin not found',
                        status: HttpStatus.NOT_FOUND
                      };
    
    if (admin.user_name !== updateDataDto.user_name) {
      const [ username ] = await this.adminRepository.findBy({ user_name: updateDataDto.user_name });
      
      if (!username) return {
                              message: 'username already exists',
                              status: HttpStatus.NOT_FOUND
                            };
    }
    
    await this.adminRepository.update(
      { 
        admin_id: id
      },
      {
        ...updateDataDto
      }
    );

    const update_admin = await this.adminRepository.findBy({ admin_id: id });

    return {
            status: HttpStatus.OK,
            admin: update_admin
           }
  }

  async update_password(id: number, updatePasswordDto: UpdatePasswordDto): Promise<Object>  {
    const [ admin ] = await this.adminRepository.findBy({ admin_id: id });
    if (!admin) return {
                          message: 'Admin Not Found',
                          status: HttpStatus.NOT_FOUND
                       };

    const pass = await bcrypt.compare(updatePasswordDto.password, admin.hashed_password);
    if (!pass) return { 
                        message: 'Old password is incorrect', 
                        status: HttpStatus.CONFLICT
                      };

    if(updatePasswordDto.new_password != updatePasswordDto.confirm_password) return {
                                                                                      message: 'confirm password is incorrect',
                                                                                      status: HttpStatus.UNAUTHORIZED
                                                                                    };
                                                                                    
    const hashed_password = await bcrypt.hash(updatePasswordDto.new_password, 7);

    await this.adminRepository.update(
      {
        admin_id: id
      }, 
      {
        hashed_password
      }
    );

    const [ update_pass_admin ] =  await this.adminRepository.findBy({ admin_id: id });

    return {
            status: HttpStatus.OK,
            person: update_pass_admin
           }
  }

  async remove_admin(id: number): Promise<HttpStatus> {
    const [ admin ] = await this.adminRepository.findBy({ admin_id: id });
    if(!admin) return HttpStatus.NOT_FOUND;

    await this.adminRepository.delete({ admin_id: id });

    return HttpStatus.OK;
  } 

  async getToken(admin: Admin) {
    const jwtPayload = { 
                        id: admin.admin_id
                       };
  
    const token = await this.jwtService.signAsync(jwtPayload, {
                    secret: process.env.ACCES_TOKEN_KEY_PERSON,
                    expiresIn: process.env.ACCESS_TOKEN_TIME
                  })
    return token;
  }
}
