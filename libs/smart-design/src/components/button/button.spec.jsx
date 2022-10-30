import { fireEvent, render, screen } from '../../test-utils';

import { Button } from './button';

const renderComponent = ({ children = 'button', ...props } = {}) => {
  render(<Button {...props}>{children}</Button>);
};

afterEach(() => jest.clearAllMocks());

describe(`Button`, () => {
  it('should render expectect content', () => {
    renderComponent();
    expect(screen.getByText(/button/i)).toBeInTheDocument();
  });

  it('should render <Link> with relative path', () => {
    renderComponent({ to: '/route1/route2' });

    const button = screen.getByRole('link', { name: /button/i });

    expect(button).toHaveAttribute('href', '/route1/route2');
  });

  it('should render <a> external link', () => {
    const mockTarget = '_blank';
    renderComponent({ href: 'https://google.es', target: mockTarget });

    const button = screen.getByRole('link', { name: /button/i });

    expect(button).toHaveAttribute('href', 'https://google.es');
    expect(button).toHaveAttribute('target', mockTarget);
  });

  it('should render <button> and call callback function on Button click', () => {
    const mockCallback = jest.fn();
    renderComponent({ onClick: mockCallback });

    fireEvent.click(screen.getByRole('button', { name: /button/i }));

    expect(mockCallback).toHaveBeenCalled();
  });

  it('should not render button children when loading', () => {
    renderComponent({ loading: true });

    expect(screen.queryByText(/button/i)).not.toBeVisible();
    expect(screen.getByTestId('dot-loading')).toBeInTheDocument();
  });
});
