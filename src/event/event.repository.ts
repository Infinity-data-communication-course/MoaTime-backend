import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateEventData } from './type/create-event-data.type';
import { User } from '@prisma/client';
import { EventData } from './type/event-data.type';
import { JoinState } from '@prisma/client';
import { EventJoinData } from './type/event-join-data.type';

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

  async getEventById(eventId: number): Promise<EventData | null> {
    return this.prisma.event.findUnique({
      where: { id: eventId, deletedAt: null },
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

  async getEventJoin(eventId: number, userId: number): Promise<EventJoinData> {
    const eventJoin = await this.prisma.eventJoin.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
        user: {
          deletedAt: null,
        },
        deletedAt: null,
      },
      select: {
        id: true,
        eventId: true,
        userId: true,
        joinState: true,
        availableTimes: true,
      },
    });

    return eventJoin;
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
        deletedAt: null,
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
        deletedAt: null,
      },
      data: {
        joinState: JoinState.REFUSED,
      },
    });
  }

  async exitEvent(eventId: number, userId: number): Promise<void> {
    await this.prisma.eventJoin.update({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async deleteEvent(eventId: number): Promise<void> {
    await this.prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        deletedAt: new Date(),
        eventJoin: {
          updateMany: {
            where: {
              eventId,
            },
            data: {
              deletedAt: new Date(),
            },
          },
        },
      },
    });

    const eventJoinIdArray = await this.prisma.eventJoin.findMany({
      where: { eventId },
      select: { id: true },
    });

    eventJoinIdArray.map(
      async (eventJoinId) =>
        await this.prisma.availableTime.deleteMany({
          where: { eventJoinId: eventJoinId.id },
        }),
    );
  }
}
