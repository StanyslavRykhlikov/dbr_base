import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const role = await this.roleService.getRoleByValue('USER');
    if (role != null) {
      const user = await this.userRepository.create(dto);
      await user.$set('roles', [role.id]);
      user.roles = [role];
      return user;
    } else {
      throw 'Ошибка при создании пользователя';
    }
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async getUSerByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async getUSerByLogin(login: string) {
    return this.userRepository.findOne({
      where: { login },
      include: { all: true },
    });
  }

  async addRole(dto: AddRoleDto){
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value)
    if (user && role){
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (user){
      user.banned = true;
      user.banReason = dto.banReason;
      await user.save();
      return user;
    } else {
      throw new HttpException('Пользоавтель не найден', HttpStatus.NOT_FOUND);
    }

  }
}
