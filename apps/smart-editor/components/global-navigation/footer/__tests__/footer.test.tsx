import { render, screen } from '@smart-editor/utils/testing/test-utils';

import { Footer } from '..';

describe('<Footer />', () => {
  it('should render expected content', () => {
    render(<Footer />);

    expect(screen.getByTestId('footer-logo')).toBeInTheDocument();
    expect(screen.getByTestId('footer-illustration')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(
      screen.getByText('Craft, Convert, Control: Your Content, Your Way')
    ).toBeInTheDocument();

    const whatsappContact = screen.getByTestId('whatsapp-contact');
    expect(whatsappContact).toBeInTheDocument();
    expect(whatsappContact).toHaveAttribute(
      'href',
      'https://api.whatsapp.com/send?phone=655996255'
    );

    const mailContact = screen.getByTestId('mail-contact');
    expect(mailContact).toBeInTheDocument();
    expect(mailContact).toHaveAttribute(
      'href',
      'mailto:oscarpulido98@gmail.com'
    );

    const linkedinContact = screen.getByTestId('linkedin-contact');
    expect(linkedinContact).toBeInTheDocument();
    expect(linkedinContact).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/oscar-pulido-castillo/'
    );

    expect(
      screen.getByText('© 2023 SmartEditor. All rights reserved.')
    ).toBeInTheDocument();
  });

  it('should not render illustration onMobile', () => {
    render(<Footer />, { deviceType: 'mobile' });

    expect(screen.queryByTestId('footer-illustration')).not.toBeInTheDocument();
  });
});
