import { render, screen } from '@smart-editor/utils/testing/test-utils';

import { ActivateAccountSuccess } from '../activate-account-success';

describe('<ActivateAccountSuccess />', () => {
  it('should render', () => {
    render(<ActivateAccountSuccess />);

    expect(screen.getByText(/Account activated/i)).toBeInTheDocument();

    expect(
      screen.getByText(
        /Congratulations, your SmartEditor account has been successfully verified./i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /Back to login/i })
    ).toHaveAttribute('href', '/login');
  });
});
