import { JoinState } from '@prisma/client';

export type EventMyData = {
  id: number;
  hostId: number;
  title: string;
  dates: Date[];
  startTime: number;
  endTime: number;
  host: {
    name: string;
  };
  eventJoin: {
    joinState: JoinState;
  }[];
};
