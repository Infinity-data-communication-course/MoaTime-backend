import { UserDto } from './dto/user.dto';
import { UpdateUserPayload } from './payload/update-user.payload';
import { UserRepository } from './user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.deleteUser(userId);
  }

  async checkEmailExist(email: string): Promise<boolean> {
    const userExist = await this.userRepository.checkEmailExist(email);

    return userExist;
  }

  async getUser(userId: number): Promise<UserDto> {
    const user = await this.userRepository.getUserById(userId);

    return UserDto.from(user);
  }

  async updateUser(payload: UpdateUserPayload, userId: number): Promise<void> {
    return this.userRepository.updateUser(payload, userId);
  }
}
