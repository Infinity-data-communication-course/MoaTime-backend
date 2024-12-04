import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsObject, IsDate, Min, Max } from 'class-validator';

class TimeRange {
  @Type(() => Date)
  @IsDate()
  @ApiProperty({
    description: '날짜',
    type: Date,
  })
  date!: Date;

  @IsInt()
  @Min(0)
  @Max(24)
  @ApiProperty({
    description: '가능한 시간의 시작 시간',
    type: Number,
  })
  startTime!: number;

  @IsInt()
  @Min(0)
  @Max(24)
  @ApiProperty({
    description: '가능한 시간의 종료 시간',
    type: Number,
  })
  endTime!: number;
}

export class CreateAvailableTimePayload {
  @IsArray()
  @IsObject({ each: true })
  @ApiProperty({
    description: '가능한 시간 범위의 리스트',
    type: [TimeRange],
  })
  @Type(() => TimeRange)
  availableTimes!: TimeRange[];
}
