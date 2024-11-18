import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class InviteUserPayload {
  @IsString()
  @ApiProperty({
    description: '유저 ID',
    type: Number,
  })
  userId!: number;
}
