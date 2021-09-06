export enum Circle {
  밤,
  낮,
  저녁,
}

export type Game = {
  id: number;
  userId: number;
  roomId: number;
  circle: Circle | null;
  countDown: number;
};
