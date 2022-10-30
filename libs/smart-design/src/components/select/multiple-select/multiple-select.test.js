import React from 'react';

import { act, fireEvent, render, screen } from '../../../test-utils';

import { MultipleSelect } from './multiple-select';

const mockOptions = [
  { value: 'value1', label: 'label1' },
  { value: 'value2', label: 'label2' },
  { value: 'value3', label: 'label3' },
  { value: 'value4', label: 'label4' },
];

const mockErrorMessage = 'This is an error message';
const mockLabel = 'Description';

const renderMultiSelect = ({
  error = false,
  onChange = jest.fn(),
  ...rest
} = {}) => {
  render(
    <MultipleSelect
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

describe(`MultipleSelect`, () => {
  it('should render expected closed content with label', () => {
    renderMultiSelect({ label: mockLabel });

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
    renderMultiSelect({ labelDescription: 'this is a description' });

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
    renderMultiSelect();
    fireEvent.click(screen.getByTestId('open-select-icon'));

    expect(screen.getByRole('option', { name: 'label1' })).toBeInTheDocument();
  });
  it('should open select options container and focus options container', () => {
    renderMultiSelect();

    fireEvent.click(screen.getByTestId('select-value-container'));

    mockOptions.map(({ label }) =>
      expect(screen.getByText(label)).toBeInTheDocument()
    );

    expect(screen.getByTestId('select-value-container')).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(screen.getByTestId('select-options-container')).toHaveAttribute(
      'aria-hidden',
      'false'
    );
    expect(screen.getByRole('listbox')).toHaveAttribute(
      'aria-multiselectable',
      'true'
    );
  });

  it('should show default value (initial value)', async () => {
    renderMultiSelect({
      defaultValue: [mockOptions[1].value, mockOptions[2].value],
    });

    expect(
      screen.getByText(`${mockOptions[1].label}, ${mockOptions[2].label}`)
    ).toBeInTheDocument();
  });

  it('should not show default value if it is not an option', () => {
    const defaultValue = [
      {
        label: 'randomLabel',
        value: 'randomValue',
      },
      { label: mockOptions[3].label, value: mockOptions[3].value },
      { label: mockOptions[2].label, value: mockOptions[2].value },
    ];
    renderMultiSelect({
      defaultValue: [
        defaultValue[0].value,
        defaultValue[1].value,
        defaultValue[2].value,
      ],
    });

    expect(screen.queryByText(defaultValue[0].label)).not.toBeInTheDocument();
    expect(
      screen.getByText(`${defaultValue[2].label}, ${defaultValue[1].label}`)
    ).toBeInTheDocument();
  });

  it('should focus correct element when deselectiong option when open', () => {
    const mockDefaultValue = [mockOptions[0].value];
    renderMultiSelect({
      value: mockDefaultValue,
      defaultValue: mockDefaultValue,
    });

    fireEvent.click(screen.getByTestId('select-value-container'));
    fireEvent.click(screen.getByTestId('remove-selection'));

    expect(screen.getByRole('listbox')).toHaveFocus();
  });

  it('should focus correct element when deselectiong option when closed', () => {
    const mockDefaultValue = [mockOptions[0].value];
    renderMultiSelect({
      value: mockDefaultValue,
      defaultValue: mockDefaultValue,
    });

    fireEvent.click(screen.getByTestId('remove-selection'));

    expect(screen.getByTestId('select-value-container')).toHaveFocus();
  });

  it('should select and deselect option', async () => {
    const firstSelectedIndex = 2;
    const secondSelectedIndex = 1;
    const mockOnChange = jest.fn();

    renderMultiSelect({ onChange: mockOnChange });

    fireEvent.click(screen.getByTestId('select-value-container'));

    expect(screen.getByRole('listbox')).toHaveFocus();

    /** SELECT OPTION */
    fireEvent.click(screen.getByText(mockOptions[firstSelectedIndex].label));

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith([
      mockOptions[firstSelectedIndex].value,
    ]);

    expect(
      screen.getByRole('button', {
        name: mockOptions[firstSelectedIndex].label,
      })
    ).toBeInTheDocument();

    /** SELECT OPTION  2*/
    fireEvent.click(screen.getByText(mockOptions[secondSelectedIndex].label));

    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenCalledWith([
      mockOptions[secondSelectedIndex].value,
      mockOptions[firstSelectedIndex].value,
    ]);

    expect(
      screen.getByRole('button', {
        name: `${mockOptions[firstSelectedIndex].label}, ${mockOptions[secondSelectedIndex].label}`,
      })
    ).toBeInTheDocument();

    /** DESELECT OPTION  1*/
    fireEvent.click(screen.getByText(mockOptions[firstSelectedIndex].label));

    expect(mockOnChange).toHaveBeenCalledTimes(3);
    expect(mockOnChange).toHaveBeenCalledWith([
      mockOptions[secondSelectedIndex].value,
    ]);

    expect(
      screen.getByRole('button', {
        name: mockOptions[secondSelectedIndex].label,
      })
    ).toBeInTheDocument();
  });

  it('should remove all selected options', () => {
    const mockOnChange = jest.fn();
    const defaultValue = [mockOptions[1].value, mockOptions[2].value];
    renderMultiSelect({
      onChange: mockOnChange,
      value: defaultValue,
      defaultValue,
    });

    fireEvent.click(screen.getByTestId('remove-selection'));

    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenCalledWith([]);

    expect(
      screen.queryByRole('button', {
        name: `${mockOptions[1].label}, ${mockOptions[2].label}`,
      })
    ).not.toBeInTheDocument();
  });

  it('should show select all option and select all options', () => {
    renderMultiSelect({ selectAllOption: true });

    fireEvent.click(screen.getByTestId('select-value-container'));

    fireEvent.click(screen.getByText('Select all'));

    fireEvent.click(screen.getByTestId('select-value-container'));

    expect(
      screen.getByRole('button', {
        name: mockOptions.map(({ label }) => label).join(', '),
      })
    ).toBeInTheDocument();
  });

  it('should be semi selected (select all option)', () => {
    const defaultValue = [mockOptions[1].value, mockOptions[2].value];
    renderMultiSelect({
      value: defaultValue,
      defaultValue,
      selectAllOption: true,
    });

    fireEvent.click(screen.getByTestId('select-value-container'));

    expect(screen.getByTestId('semiselected')).toBeInTheDocument();
  });

  it('should not show remove-options option when no options selected', () => {
    const defaultValue = [mockOptions[1].value];
    renderMultiSelect({ value: defaultValue, defaultValue });

    fireEvent.click(screen.getByTestId('select-value-container'));

    expect(screen.getByTestId('remove-selection')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('option', { name: mockOptions[1].label }));

    expect(screen.queryByTestId('remove-selection')).not.toBeInTheDocument();
  });

  it.each([
    { key: 'Enter', keyCode: 13 },
    { key: 'SpaceBar', keyCode: 32 },
  ])('should select option on $key keydown', async ({ key, keyCode }) => {
    const mockOnChange = jest.fn();
    renderMultiSelect({ onChange: mockOnChange });

    fireEvent.click(screen.getByTestId('select-value-container'));

    fireEvent.keyDown(screen.getByText('label2'), {
      key: key,
      code: key,
      keyCode: keyCode,
      charCode: keyCode,
    });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(['value2']);

    fireEvent.keyDown(screen.getByText('label3'), {
      key: key,
      code: key,
      keyCode: keyCode,
      charCode: keyCode,
    });

    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenCalledWith(['value2', 'value3']);

    expect(
      screen.getByRole('button', { name: 'label2, label3' })
    ).toBeInTheDocument();
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
      renderMultiSelect();

      fireEvent.click(screen.getByTestId('select-value-container'));

      act(() => screen.getByText(initialFocus).focus());

      fireEvent.keyDown(screen.getByText(initialFocus), {
        key: key,
        code: key,
        keyCode: keyCode,
        charCode: keyCode,
      });

      expect(screen.getByText(expectedFocusLabel)).toHaveFocus();
    }
  );
  it.each([
    {
      key: 'ArrowRight',
      keyCode: 39,
      initialFocus: 'Select all',
      expectedFocusLabel: 'label1',
    },
    {
      key: 'ArrowDown',
      keyCode: 40,
      initialFocus: 'label4',
      expectedFocusLabel: 'Select all',
    },
    {
      key: 'ArrowLeft',
      keyCode: 37,
      initialFocus: 'label1',
      expectedFocusLabel: 'Select all',
    },
    {
      key: 'ArrowUp',
      keyCode: 38,
      initialFocus: 'Select all',
      expectedFocusLabel: 'label4',
    },
    {
      key: 's',
      keyCode: 83,
      initialFocus: 'label4',
      expectedFocusLabel: 'Select all',
    },
  ])(
    'should focus $expectedFocusLabel if initial focus is $initialFocus on $key keydown when select all option available',
    ({ key, keyCode, initialFocus, expectedFocusLabel }) => {
      renderMultiSelect({ selectAllOption: true });

      fireEvent.click(screen.getByTestId('select-value-container'));

      act(() => screen.getByText(initialFocus).focus());

      fireEvent.keyDown(screen.getByText(initialFocus), {
        key: key,
        code: key,
        keyCode: keyCode,
        charCode: keyCode,
      });

      expect(screen.getByText(expectedFocusLabel)).toHaveFocus();
    }
  );

  it('should render error message', () => {
    const errorMessage = 'bad request';
    renderMultiSelect({ error: true, errorMessage });

    expect(screen.getByTestId('select-value-container')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
