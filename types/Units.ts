/*
 * Units
 *
 * Using number to measure the magnitude of a given quantity
 * can easily result in cases where the wrong unit it assumed
 * e.g. seconds and milliseconds
 *
 * In this file we define a standard way to pass around quantities
 * of a given type along with any conversion functions
 */
type Unit = {
  quantity: string;
  unit: string;
  magnitude: number;
};

export type Seconds = Unit & {
  quantity: 'time';
  unit: 'seconds';
};

export type Time = {
  seconds: number;
  nanos: number;
};
