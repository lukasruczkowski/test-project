import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  public async createUser(user: User): Promise<User> {
    return await this.userRepository.create(user);
  }

  public async deleteUser(id: string): Promise<void> {
    return await this.userRepository.delete(id);
  }

  public async updateUser(id: string, obj: any): Promise<User> {
    return await this.userRepository.update(id, obj);
  }
}
