import React from 'react';

import { act, fireEvent, render, screen, waitFor } from '../../../test-utils';

import { SingleSelect } from './single-select';

const mockOptions = [
  { value: 'value1', label: 'label1' },
  { value: 'value2', label: 'label2' },
  { value: 'value3', label: 'label3' },
  { value: 'value4', label: 'label4' },
];

const mockErrorMessage = 'This is an error message';
const mockLabel = 'Description';

const renderSingleSelect = ({
  error = false,
  onChange = jest.fn(),
  ...rest
} = {}) => {
  render(
    <SingleSelect
      id="single-select"
      options={mockOptions}
      onChange={onChange}
      error={error}
      errorMessage={mockErrorMessage}
      {...rest}
    />
  );
};

afterEach(jest.clearAllMocks);

describe(`SingleSelect`, () => {
  it('should render expected closed content with label', () => {
    renderSingleSelect({ label: mockLabel });

    expect(screen.getByText(mockLabel)).toBeInTheDocument();
    expect(screen.queryByText(mockOptions[0].label)).not.toBeInTheDocument();

    expect(screen.getByTestId('select-options-container')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
    expect(screen.getByTestId('select-value-container')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    expect(screen.getByTestId('select-value-container')).toHaveAttribute(
      'aria-controls',
      'single-select-options-container'
    );
    expect(screen.getByTestId('select-value-container')).toHaveAttribute(
      'aria-labelledby',
      'single-select-label'
    );
  });

  it('should render expected closed content without label', () => {
    renderSingleSelect({ labelDescription: 'this is a description' });

    expect(screen.queryByText(mockLabel)).not.toBeInTheDocument();
    expect(screen.queryByText(mockOptions[0].label)).not.toBeInTheDocument();

    expect(screen.getByTestId('select-options-container')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
    expect(screen.getByTestId('select-value-container')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    expect(screen.getByTestId('select-value-container')).toHaveAttribute(
      'aria-controls',
      'single-select-options-container'
    );
    expect(screen.getByTestId('select-value-container')).toHaveAttribute(
      'aria-label',
      'this is a description'
    );
  });

  it('should open select options container on arrow click', () => {
    renderSingleSelect();
    fireEvent.click(screen.getByTestId('open-select-icon'));

    expect(screen.getByRole('option', { name: 'label1' })).toBeInTheDocument();
  });

  it('should open select options container and focus options container', () => {
    renderSingleSelect();

    fireEvent.click(screen.getByTestId('select-value-container'));

    mockOptions.map(({ label }) =>
      expect(screen.getByRole('option', { name: label })).toBeInTheDocument()
    );

    expect(screen.getByTestId('select-value-container')).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(screen.getByTestId('select-options-container')).toHaveAttribute(
      'aria-hidden',
      'false'
    );
  });

  it('should show default value (initial value)', async () => {
    renderSingleSelect({ defaultValue: mockOptions[1].value });

    expect(
      screen.getByRole('button', { name: mockOptions[1].label })
    ).toBeInTheDocument();
  });

  it('should not show default value if it is not an option', () => {
    const randomOption = {
      label: 'randomLabel',
      value: 'randomValue',
    };
    renderSingleSelect({ defaultValue: randomOption.value });

    expect(screen.queryByText(randomOption.label)).not.toBeInTheDocument();
  });

  it('should focus correct element when deselecting option when open', () => {
    const mockDefaultValue = mockOptions[0].value;
    renderSingleSelect({
      value: mockDefaultValue,
      defaultValue: mockDefaultValue,
    });

    fireEvent.click(screen.getByTestId('select-value-container'));
    fireEvent.click(screen.getByTestId('remove-selection'));

    expect(screen.getByRole('listbox')).toHaveFocus();
  });

  it('should focus correct element when deselectiong option when closed', () => {
    const mockDefaultValue = mockOptions[0].value;
    renderSingleSelect({
      value: mockDefaultValue,
      defaultValue: mockDefaultValue,
    });

    fireEvent.click(screen.getByTestId('remove-selection'));

    expect(screen.getByTestId('select-value-container')).toHaveFocus();
  });

  it('should select and deselect option', async () => {
    const selectedOptionIndex = 2;
    const mockOnChange = jest.fn();

    renderSingleSelect({ onChange: mockOnChange });

    fireEvent.click(screen.getByTestId('select-value-container'));

    expect(screen.getByRole('listbox')).toHaveFocus();

    /** SELECT OPTION */
    fireEvent.click(
      screen.getByRole('option', {
        name: mockOptions[selectedOptionIndex].label,
      })
    );

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(
      mockOptions[selectedOptionIndex].value
    );

    await waitFor(() => {
      expect(screen.queryByText(mockOptions[3].label)).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('select-value-container')).toHaveFocus();

    expect(
      screen.getByText(mockOptions[selectedOptionIndex].label)
    ).toBeInTheDocument();

    /** DESELECT OPTION */
    fireEvent.click(screen.getByTestId('remove-selection'));

    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenCalledWith('');

    expect(
      screen.queryByText(mockOptions[selectedOptionIndex].label)
    ).not.toBeInTheDocument();
  });

  it.each([
    { key: 'Enter', keyCode: 13 },
    { key: 'SpaceBar', keyCode: 32 },
  ])('should select option on $key keydown', async ({ key, keyCode }) => {
    const mockOnChange = jest.fn();
    renderSingleSelect({ onChange: mockOnChange });

    fireEvent.click(screen.getByTestId('select-value-container'));

    fireEvent.keyDown(screen.getByText('label2'), {
      key: key,
      code: key,
      keyCode: keyCode,
      charCode: keyCode,
    });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('value2');

    await waitFor(() => {
      expect(screen.queryByText('label3')).not.toBeInTheDocument();
    });
  });

  it.each([
    {
      key: 'ArrowRight',
      keyCode: 39,
      initialFocus: 'label1',
      expectedFocusLabel: 'label2',
    },
    {
      key: 'ArrowRight',
      keyCode: 39,
      initialFocus: 'label4',
      expectedFocusLabel: 'label1',
    },
    {
      key: 'ArrowDown',
      keyCode: 40,
      initialFocus: 'label1',
      expectedFocusLabel: 'label2',
    },
    {
      key: 'ArrowDown',
      keyCode: 40,
      initialFocus: 'label4',
      expectedFocusLabel: 'label1',
    },
    {
      key: 'ArrowLeft',
      keyCode: 37,
      initialFocus: 'label1',
      expectedFocusLabel: 'label4',
    },
    {
      key: 'ArrowLeft',
      keyCode: 37,
      initialFocus: 'label3',
      expectedFocusLabel: 'label2',
    },
    {
      key: 'ArrowUp',
      keyCode: 38,
      initialFocus: 'label1',
      expectedFocusLabel: 'label4',
    },
    {
      key: 'ArrowUp',
      keyCode: 38,
      initialFocus: 'label3',
      expectedFocusLabel: 'label2',
    },
    {
      key: 'l',
      keyCode: 76,
      initialFocus: 'label1',
      expectedFocusLabel: 'label2',
    },
    {
      key: 'l',
      keyCode: 76,
      initialFocus: 'label4',
      expectedFocusLabel: 'label1',
    },
  ])(
    'should focus $expectedFocusLabel if initial focus is $initialFocus on $key keydown',
    ({ key, keyCode, initialFocus, expectedFocusLabel }) => {
      renderSingleSelect();

      fireEvent.click(screen.getByTestId('select-value-container'));

      act(() => screen.getByText(initialFocus).focus());

      fireEvent.keyDown(screen.getByText(initialFocus), {
        key: key,
        code: key,
        keyCode: keyCode,
        charCode: keyCode,
      });

      expect(
        screen.getByRole('option', { name: expectedFocusLabel })
      ).toHaveFocus();
    }
  );

  it('should render error message', () => {
    const errorMessage = 'bad request';
    renderSingleSelect({ error: true, errorMessage });

    expect(screen.getByTestId('select-value-container')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
