import type { Entries } from './util-types';

export function ObjectEntries<T extends object>(t: T): Entries<T>[] {
  return Object.entries(t) as any;
}
