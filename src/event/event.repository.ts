import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateEventData } from './type/create-event-data.type';
import { User } from '@prisma/client';
import { EventData } from './type/event-data.type';
import { JoinState } from '@prisma/client';
import { EventJoinData } from './type/event-join-data.type';
import { EventMyData } from './type/event-my-data.type';
import { EventDetailData } from './type/event-detail-data.type';
import { CreateAvailableTimeData } from './type/create-available-time-data.type';

@Injectable()
export class EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(data: CreateEventData): Promise<EventData> {
    return this.prisma.event.create({
      data: {
        hostId: data.hostId,
        title: data.title,
        dates: data.dates,
        startTime: data.startTime,
        endTime: data.endTime,
        eventJoin: {
          create: { userId: data.hostId, joinState: JoinState.JOINED },
        },
      },
      select: {
        id: true,
        hostId: true,
        title: true,
        dates: true,
        startTime: true,
        endTime: true,
      },
    });
  }

  async getUserById(userId: number): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
        deletedAt: null,
      },
    });
  }

  async getEventById(eventId: number): Promise<EventData | null> {
    return this.prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        hostId: true,
        title: true,
        dates: true,
        startTime: true,
        endTime: true,
      },
    });
  }

  async getEventJoin(
    eventId: number,
    userId: number,
  ): Promise<EventJoinData | null> {
    return this.prisma.eventJoin.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
        user: {
          deletedAt: null,
        },
      },
      select: {
        id: true,
        eventId: true,
        userId: true,
        joinState: true,
        availableTimes: true,
      },
    });
  }

  async inviteUser(eventId: number, userId: number): Promise<void> {
    await this.prisma.eventJoin.create({
      data: {
        eventId,
        userId,
        joinState: JoinState.PENDING,
      },
    });
  }

  async joinEvent(eventId: number, userId: number): Promise<void> {
    await this.prisma.eventJoin.update({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
      },
      data: {
        joinState: JoinState.JOINED,
      },
    });
  }

  async refuseEvent(eventId: number, userId: number): Promise<void> {
    await this.prisma.eventJoin.update({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
      },
      data: {
        joinState: JoinState.REFUSED,
      },
    });
  }

  async exitEvent(eventId: number, userId: number): Promise<void> {
    await this.prisma.eventJoin.delete({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
      },
    });
  }

  async deleteEvent(eventId: number): Promise<void> {
    await this.prisma.event.delete({
      where: {
        id: eventId,
      },
    });
  }

  async getMyEvents(userId: number): Promise<EventMyData[]> {
    return this.prisma.event.findMany({
      where: {
        eventJoin: {
          some: {
            userId,
          },
        },
      },
      select: {
        id: true,
        hostId: true,
        title: true,
        dates: true,
        startTime: true,
        endTime: true,
        host: {
          select: {
            name: true,
          },
        },
        eventJoin: {
          where: {
            userId,
          },
          select: { joinState: true },
        },
      },
    });
  }

  async getEventDetail(eventId: number): Promise<EventDetailData> {
    return this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
      select: {
        id: true,
        hostId: true,
        title: true,
        dates: true,
        startTime: true,
        endTime: true,
        host: { select: { name: true } },
        eventJoin: {
          where: {
            joinState: JoinState.JOINED,
          },
          distinct: ['userId'],
          select: {
            userId: true,
            user: {
              select: {
                name: true,
              },
            },
            availableTimes: {
              select: {
                date: true,
                startTime: true,
                endTime: true,
              },
            },
          },
        },
      },
    });
  }

  async createAvailableTime(
    eventJoinId: number,
    data: CreateAvailableTimeData[],
  ): Promise<void> {
    await this.prisma.$transaction(async (prisma) => {
      await prisma.availableTime.deleteMany({
        where: {
          eventJoinId,
        },
      });

      await prisma.availableTime.createMany({
        data,
      });
    });
  }
}
