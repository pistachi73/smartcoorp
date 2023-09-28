import { render, screen } from '@smart-editor/utils/testing/test-utils';

import { SignupSuccess } from '../signup-success';

describe('<SignupSuccess />', () => {
  it('should render', () => {
    render(<SignupSuccess />);

    expect(
      screen.getByText(/Account Created Successfully/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /An activation email has been sent to the email address you provided during registration. Please check your email and follow the instructions to activate your account./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /If you don't receive the email within a few minutes, please check your spam folder./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Back to login/i })
    ).toHaveAttribute('href', '/login');
  });
});
