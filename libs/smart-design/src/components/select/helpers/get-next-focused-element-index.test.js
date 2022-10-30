import { getNextFocusedElementIndex } from './get-next-focused-element-index';

const mockOptions = [
  { value: 'value0', label: 'label0' },
  { value: 'value1', label: 'label1' },
  { value: 'value2', label: 'label2' },
  { value: 'value3', label: 'label3' },
];

describe('Select Functionality - getNextFocusedElementIndex', () => {
  it.each([
    { direction: 1, activeElementId: null, expectedFocusedIndex: -1 },
    { direction: 1, activeElementId: 'value0', expectedFocusedIndex: 1 },
    { direction: 1, activeElementId: 'value1', expectedFocusedIndex: 2 },
    { direction: 1, activeElementId: 'value3', expectedFocusedIndex: 0 },
    { direction: -1, activeElementId: 'value3', expectedFocusedIndex: 2 },
    { direction: -1, activeElementId: 'value2', expectedFocusedIndex: 1 },
    { direction: -1, activeElementId: 'value0', expectedFocusedIndex: 3 },
  ])(
    'should return option index $expectedFocusedIndex with direction $direction and activeElementId $activeElementId ',
    ({ direction, activeElementId, expectedFocusedIndex }) => {
      const nextFocusedElement = getNextFocusedElementIndex({
        direction,
        activeElementId,
        options: mockOptions,
      });

      expect(nextFocusedElement).toBe(expectedFocusedIndex);
    }
  );
});
