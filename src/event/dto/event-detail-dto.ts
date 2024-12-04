import { ApiProperty } from '@nestjs/swagger';
import { EventDetailData } from '../type/event-detail-data.type';

export class AvailableTimeDto {
  @ApiProperty({
    description: '시작 시간',
    type: Number,
  })
  startTime!: number;

  @ApiProperty({
    description: '끝 시간',
    type: Number,
  })
  endTime!: number;
}

export class EventJoinDto {
  @ApiProperty({
    description: '유저 ID',
    type: Number,
  })
  userId!: number;

  @ApiProperty({
    description: '유저 이름',
    type: String,
  })
  userName!: string;

  @ApiProperty({
    description: '시작 시간',
    type: [AvailableTimeDto],
  })
  availableTimes!: AvailableTimeDto[];
}

export class EventDetailDto {
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
    description: 'eventJoin 리스트',
    type: [EventJoinDto],
  })
  eventJoins: EventJoinDto[];

  static from(event: EventDetailData): EventDetailDto {
    return {
      id: event.id,
      hostId: event.hostId,
      title: event.title,
      dates: event.dates,
      startTime: event.startTime,
      endTime: event.endTime,
      hostName: event.host.name,
      eventJoins: event.eventJoin.map((eventJoin) => {
        return {
          userId: eventJoin.userId,
          userName: eventJoin.user.name,
          availableTimes: eventJoin.availableTimes,
        };
      }),
    };
  }

  static fromArray(events: EventDetailData[]): EventDetailDto[] {
    return events.map((event) => this.from(event));
  }
}

export class EventDetailListDto {
  @ApiProperty({
    description: '이벤트 목록',
    type: [EventDetailDto],
  })
  events!: EventDetailDto[];

  static from(events: EventDetailData[]): EventDetailListDto {
    return {
      events: EventDetailDto.fromArray(events),
    };
  }
}
