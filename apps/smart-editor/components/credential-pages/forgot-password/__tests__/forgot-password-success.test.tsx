import { render, screen } from '@smart-editor/utils/testing/test-utils';

import { ForgotPasswordSuccess } from '../forgot-password-success';

describe('<ForgotPasswordSuccess />', () => {
  it('should render', () => {
    render(<ForgotPasswordSuccess />);

    expect(screen.getByText(/Password reset email sent/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Check your inbox for instructions to complete the password reset process/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Back to login/i })
    ).toHaveAttribute('href', '/login');
  });
});
