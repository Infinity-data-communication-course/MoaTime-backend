import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsString, Max, Min } from 'class-validator';

export class CreateEventPayload {
  @IsString()
  @ApiProperty({
    description: '이벤트 이름',
    type: String,
  })
  title!: string;

  @Type(() => Date)
  @IsArray()
  @IsDate({ each: true })
  @ApiProperty({
    description: '이벤트 일정 조사 날짜 리스트',
    type: [Date],
  })
  dates!: Date[];

  @IsInt()
  @Min(0)
  @Max(24)
  @ApiProperty({
    description: '이벤트 시작 가능 시간',
    type: Number,
  })
  startTime!: number;

  @IsInt()
  @Min(0)
  @Max(24)
  @ApiProperty({
    description: '이벤트 종료 가능 시간',
    type: Number,
  })
  endTime!: number;
}
