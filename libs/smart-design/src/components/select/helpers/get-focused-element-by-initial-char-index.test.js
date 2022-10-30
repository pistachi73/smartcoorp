import { getFocusedElementByInitialCharIndex } from "./get-focused-element-by-initial-char-index";

const mockOptions = [
  { value: "mentor", label: "Mentoring" },
  { value: "teaching", label: "Teaching" },
  { value: "multiple", label: "Multiple" },
  { value: "tutor", label: "Tutoring" },
  { value: "1to1", label: "1 to 1" },
  { value: "mixed", label: "Mixed" },
  { value: "1to3", label: "1 to 3" },
];

describe("Select Functionality - getNextFocusedElementIndex", () => {
  it.each([
    { char: "t", activeElementId: null, expectedFocusedIndex: -1 },
    { char: "z", activeElementId: "mentor", expectedFocusedIndex: -1 },
    { char: "t", activeElementId: "mentor", expectedFocusedIndex: 1 },
    { char: "t", activeElementId: "teaching", expectedFocusedIndex: 3 },
    { char: "t", activeElementId: "tutor", expectedFocusedIndex: 1 },
    { char: "1", activeElementId: "mentor", expectedFocusedIndex: 4 },
    { char: "1", activeElementId: "1to1", expectedFocusedIndex: 6 },
    { char: "m", activeElementId: "mentor", expectedFocusedIndex: 2 },
    { char: "m", activeElementId: "multiple", expectedFocusedIndex: 5 },
    { char: "m", activeElementId: "mixed", expectedFocusedIndex: 0 },
  ])(
    "should return option index $expectedFocusedIndex with char '$char' and activeElementId $activeElementId ",
    ({ char, activeElementId, expectedFocusedIndex }) => {
      const nextFocusedElement = getFocusedElementByInitialCharIndex({
        char,
        activeElementId,
        options: mockOptions,
      });

      expect(nextFocusedElement).toBe(expectedFocusedIndex);
    }
  );
});
