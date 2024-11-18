import { AvailableTime } from './../../../node_modules/.prisma/client/index.d';
import { JoinState } from '@prisma/client';

export type EventJoinData = {
  id: number;
  eventId: number;
  userId: number;
  joinState: JoinState;
  availableTimes: AvailableTime[];
};
