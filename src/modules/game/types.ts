export enum Cycle {
  밤,
  낮,
  저녁,
}

export type Game = {
  id: number;
  userId: number;
  roomId: number;
  cycle: Cycle | null;
  countDown: number;
};
