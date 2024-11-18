export const EventJoinStatus = {
  PENDING: 'PENDING', // 초대됨
  JOINED: 'JOINED', // 참여 수락
  REFUSED: 'REFUSED', // 참여 거절
};

export type EventJoinStatusData =
  (typeof EventJoinStatus)[keyof typeof EventJoinStatus];
