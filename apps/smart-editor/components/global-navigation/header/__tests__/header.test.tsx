import { render, screen } from '@smart-editor/utils/testing/test-utils';

import { Header } from '..';

describe.skip('<Header />', () => {
  it('should render', () => {
    render(<Header />);

    expect(screen.getByRole('img')).toBeInTheDocument();

    const loginButton = screen.getByRole('link', { name: 'Log in' });

    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute('href', '/login');

    const getStartedButton = screen.getByRole('link', { name: 'Get Started' });

    expect(getStartedButton).toBeInTheDocument();
    expect(getStartedButton).toHaveAttribute('href', '/signup');
  });
});
