import update from 'immutability-helper';
import * as R from 'ramda';

import { Block } from '../post-editor.types';

export const updateBlocks = R.curry((query, prevBlocks: Block[]) =>
  update(prevBlocks, query)
);

export const log = (x: any) => {
  console.log(x);
  return x;
};

const mapIndexed = R.addIndex(R.map);
const addIndex = (obj: any, idx: number) => ({
  idx: idx,
  ...obj,
});

export const addIdxToObject = <T>(obj: T[]): T & { idx: number }[] =>
  mapIndexed(addIndex, obj);

export const removeIdxFromObject = R.map(({ idx, ...rest }: any) => ({
  ...rest,
}));

export const filterAndSaveRemoved = R.curry(
  <T>(filter: (x: T) => boolean, removed: T[], x: T) => {
    if (filter(x)) {
      return true;
    } else {
      removed.push(x);
      return false;
    }
  }
);

// const removeItems = R.curry((removed: any[], x: any) => {
//   if (j.includes(x.idx)) {
//     removed.push(x);
//   }
//   return !j.includes(x.idx);
// });
