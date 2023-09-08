import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceXL, spaceXS } from '@smartcoorp/ui/tokens';

import { Illustration } from './illustration';
import {
  ContactContainer,
  ContactImg,
  ContactsContainer,
  FooterContainer,
  LogoContainer,
  RelativeWidthLimiter,
} from './style';

export const Footer = () => {
  return (
    <FooterContainer>
      <RelativeWidthLimiter>
        <LogoContainer>
          <img
            width={45}
            src="logo_light.svg"
            alt="SmartEditor Footer Logo"
            data-testid="footer-logo"
          />
          <Body
            size="small"
            noMargin
            style={{
              lineHeight: '14px',
            }}
          >
            Craft, Convert, Control: Your Content, Your Way
          </Body>
        </LogoContainer>
        <div
          style={{
            marginBlock: spaceXL,
          }}
        >
          <Headline size="small">Contact</Headline>
          <ContactsContainer>
            <ContactContainer
              href="https://api.whatsapp.com/send?phone=655996255"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="whatsapp-contact"
            >
              <ContactImg
                src="./external-logos/whatsapp-logo.svg"
                alt="Contact Icon: Whatsapp"
              />
            </ContactContainer>
            <ContactContainer
              href="mailto:oscarpulido98@gmail.com"
              data-testid="mail-contact"
            >
              <ContactImg
                src="./external-logos/gmail-logo.svg"
                alt="Contact Icon: Gmail"
              />
            </ContactContainer>
            <ContactContainer
              href="https://www.linkedin.com/in/oscar-pulido-castillo/"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="linkedin-contact"
            >
              <ContactImg
                src="./external-logos/linkedin-logo.svg"
                alt="Contact Icon: Linkedin"
              />
            </ContactContainer>
          </ContactsContainer>
        </div>
        <Illustration />
        <Body
          size="small"
          noMargin
          variant="neutral"
          style={{
            paddingBlock: `${spaceXS}`,
          }}
        >
          © 2023 SmartEditor. All rights reserved.
        </Body>
      </RelativeWidthLimiter>
    </FooterContainer>
  );
};
