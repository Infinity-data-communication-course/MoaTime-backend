import { ApiProperty } from '@nestjs/swagger';
import { UserData } from '../type/user-data';

export class UserDto {
  @ApiProperty({
    description: '유저 ID',
    type: Number,
  })
  id!: number;

  @ApiProperty({
    description: '유저 이메일',
    type: String,
  })
  email!: string;

  @ApiProperty({
    description: '유저 비밀번호',
    type: String,
  })
  password!: string;

  @ApiProperty({
    description: '유저 이름',
    type: String,
  })
  name!: string;

  static from(user: UserData): UserDto {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
    };
  }

  static fromArray(users: UserData[]): UserDto[] {
    return users.map((user) => this.from(user));
  }
}

export class UserListDto {
  @ApiProperty({
    description: '유저 목록',
    type: [UserDto],
  })
  users!: UserDto[];

  static from(users: UserData[]): UserListDto {
    return {
      users: UserDto.fromArray(users),
    };
  }
}
