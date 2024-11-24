import { ApiProperty } from '@nestjs/swagger';
import { EventMyData } from '../type/event-my-data.type';
import { JoinState } from '@prisma/client';

export class EventMyDto {
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

  @ApiProperty({
    description: '호스트 이름',
    type: String,
  })
  hostName: string;

  @ApiProperty({
    description: 'join 상태',
    enum: JoinState,
  })
  joinState!: JoinState;

  static from(event: EventMyData): EventMyDto {
    return {
      id: event.id,
      hostId: event.hostId,
      title: event.title,
      dates: event.dates,
      startTime: event.startTime,
      endTime: event.endTime,
      hostName: event.host.name,
      joinState: event.eventJoin[0]?.joinState,
    };
  }

  static fromArray(events: EventMyData[]): EventMyDto[] {
    return events.map((event) => this.from(event));
  }
}

export class EventMyListDto {
  @ApiProperty({
    description: 'user의 이벤트 목록',
    type: [EventMyDto],
  })
  events!: EventMyDto[];

  static from(events: EventMyData[]): EventMyListDto {
    return {
      events: EventMyDto.fromArray(events),
    };
  }
}
