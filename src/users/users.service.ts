import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

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
      return user;
    } else {
      throw 'Ошибка при создании пользователя';
    }
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll({ include: { all: true } });
  }
}
