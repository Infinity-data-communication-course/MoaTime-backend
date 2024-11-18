import { ApiProperty } from '@nestjs/swagger';
import { EventData } from '../type/event-data.type';

export class EventDto {
  @ApiProperty({
    description: '이벤트 ID',
    type: Number,
  })
  id!: number;

  @ApiProperty({
    description: '호스트 ID',
    type: Number,
  })
  hostId!: number;

  @ApiProperty({
    description: '이벤트 이름',
    type: String,
  })
  title!: string;

  @ApiProperty({
    description: '이벤트 일정 조사 날짜 리스트',
    type: [Date],
  })
  dates!: Date[];

  @ApiProperty({
    description: '이벤트 시작 가능 시간',
    type: Number,
  })
  startTime!: number;

  @ApiProperty({
    description: '이벤트 종료 가능 시간',
    type: Number,
  })
  endTime!: number;

  static from(event: EventData): EventDto {
    return {
      id: event.id,
      hostId: event.hostId,
      title: event.title,
      dates: event.dates,
      startTime: event.startTime,
      endTime: event.endTime,
    };
  }

  static fromArray(events: EventData[]): EventDto[] {
    return events.map((event) => this.from(event));
  }
}

export class EventListDto {
  @ApiProperty({
    description: '이벤트 목록',
    type: [EventDto],
  })
  events!: EventDto[];

  static from(events: EventData[]): EventListDto {
    return {
      events: EventDto.fromArray(events),
    };
  }
}
