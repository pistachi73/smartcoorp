import { render, screen } from '@smart-editor/utils/testing/test-utils';

import { ActivateAccountFail } from '../activate-account-fail';

describe('<ActivateAccountFail />', () => {
  it('should render', () => {
    render(<ActivateAccountFail />);

    expect(
      screen.getByText(/Account Verification Failed/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /We're sorry, but we couldn't verify your account at this time./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Back to login/i })
    ).toHaveAttribute('href', '/login');
  });
});
