import { IoAccessibility } from 'react-icons/io5';

import { fireEvent, render, screen } from '../../test-utils/custom-render';

import { FormField } from './form-field';

const onChangeMock = jest.fn();

jest.mock('react-icons/io5', () => ({
  IoAccessibility: () => <div data-testid="icon" />,
}));

const renderComponent = ({ ...args } = {}) => {
  render(
    <FormField
      label="formfield"
      id="formfield"
      onChange={onChangeMock}
      {...args}
    />
  );
};

describe(`FormField`, () => {
  it('renders FormField expected content', () => {
    renderComponent({ label: 'Expected content', id: 'expectedContent' });

    expect(screen.getByLabelText('Expected content')).toBeInTheDocument();
  });

  it('should call onChange when typing', () => {
    renderComponent();

    const input = screen.getByLabelText('formfield');

    fireEvent.change(input, { target: { value: 'test' } });

    expect(onChangeMock).toHaveBeenCalled();
  });
  it('should show icon', () => {
    renderComponent({ icon: IoAccessibility });

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
  it('should show error message ', () => {
    const errorMessage = 'error message';
    renderComponent({ error: true, errorMessage });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should show show/hide password on password variant', () => {
    renderComponent({ variant: 'password' });

    expect(screen.getByTestId('formfield-password-switch')).toBeInTheDocument();
  });

  it('should toggle between text and password type on password variant', () => {
    renderComponent({ variant: 'password' });

    const input = screen.getByLabelText('formfield');

    expect(input).toHaveAttribute('type', 'password');

    fireEvent.click(screen.getByTestId('formfield-password-switch'));

    expect(input).toHaveAttribute('type', 'text');
  });
});
