const DEFAULT_INSPIRE = 1.25
const DEFAULT_EXPIRE = 1.25
const DEFAULT_BREAK = 10

export interface SessionState {
  preset: SessionPreset;
  rounds: SessionRound[];
  date: SessionDate;
}

export type SessionPreset = "SHORT" | "MEDIUM" | "LONG" | "CUSTOM";
export type SessionDate = "NOW" | "DATE" | "RECURING";

export interface SessionRound {
  cycles: number;
  expire: number;
  inspire: number;
  hold: number;
  break: number;
}

export const ROUNDS_SHORT: SessionRound[] = [
  { cycles: 20, inspire: DEFAULT_INSPIRE, expire: DEFAULT_EXPIRE, hold: 30, break: DEFAULT_BREAK },
  { cycles: 20, inspire: DEFAULT_INSPIRE, expire: DEFAULT_EXPIRE, hold: 45, break: DEFAULT_BREAK },
  { cycles: 20, inspire: DEFAULT_INSPIRE, expire: DEFAULT_EXPIRE, hold: 60, break: DEFAULT_BREAK },
];

export const ROUNDS_MEDIUM: SessionRound[] = [
  { cycles: 30, inspire: DEFAULT_INSPIRE, expire: DEFAULT_EXPIRE, hold: 45, break: DEFAULT_BREAK },
  { cycles: 30, inspire: DEFAULT_INSPIRE, expire: DEFAULT_EXPIRE, hold: 60, break: DEFAULT_BREAK },
  { cycles: 30, inspire: DEFAULT_INSPIRE, expire: DEFAULT_EXPIRE, hold: 90, break: DEFAULT_BREAK },
];

export const ROUNDS_LONG: SessionRound[] = [
  { cycles: 35, inspire: DEFAULT_INSPIRE, expire: DEFAULT_EXPIRE, hold: 60, break: DEFAULT_BREAK },
  { cycles: 35, inspire: DEFAULT_INSPIRE, expire: DEFAULT_EXPIRE, hold: 90, break: DEFAULT_BREAK },
  { cycles: 35, inspire: DEFAULT_INSPIRE, expire: DEFAULT_EXPIRE, hold: 120, break: DEFAULT_BREAK },
  { cycles: 35, inspire: DEFAULT_INSPIRE, expire: DEFAULT_EXPIRE, hold: 150, break: DEFAULT_BREAK },
];

export const ROUND_DEFAULT: SessionRound = {
  cycles: 35,
  inspire: DEFAULT_INSPIRE,
  expire: DEFAULT_EXPIRE,
  hold: 60,
  break: DEFAULT_BREAK,
};

