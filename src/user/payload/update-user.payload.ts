import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserPayload {
  @IsString()
  @ApiProperty({
    description: '유저 이름',
    type: String,
  })
  name!: string;

  @IsString()
  @ApiProperty({
    description: '유저 이메일',
    type: String,
  })
  email!: string;
}
