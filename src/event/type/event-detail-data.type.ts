export type EventDetailData = {
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
    user: {
      name: string;
    };
    userId: number;
    availableTimes: {
      startTime: Date;
      endTime: Date;
    }[];
  }[];
};
