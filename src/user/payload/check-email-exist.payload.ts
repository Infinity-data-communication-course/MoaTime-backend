import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CheckEmailExistPayload {
  @IsString()
  @ApiProperty({
    description: '유저 이메일',
    type: String,
  })
  email!: string;
}
