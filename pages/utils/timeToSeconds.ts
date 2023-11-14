import type { Time, Seconds } from '../../types/Units';

const nanosInSeconds = 1_000_000_000;

export const toSeconds = (magnitude: number): Seconds => ({
  quantity: 'time',
  unit: 'seconds',
  magnitude,
});

export const timeToSeconds = (time: Time): Seconds =>
  toSeconds(time.seconds + time.nanos / nanosInSeconds);
