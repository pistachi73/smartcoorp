import Image from 'next/image';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceXL, spaceXS } from '@smartcoorp/ui/tokens';

import {
  ContactContainer,
  ContactsContainer,
  FooterContainer,
  LogoContainer,
  RelativeWidthLimiter,
} from './footer.styles';
import { Illustration } from './illustration';

export const Footer = () => {
  return (
    <FooterContainer>
      <RelativeWidthLimiter>
        <LogoContainer>
          <Image
            width={45}
            height={34.83}
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
          <Headline size="small" as="p">
            Contact
          </Headline>
          <ContactsContainer>
            {/* <ContactContainer
              href="https://api.whatsapp.com/send?phone=655996255"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="whatsapp-contact"
            >
              <div>
                <Image
                  src="./external-logos/whatsapp-logo.svg"
                  alt="Contact Icon: Whatsapp"
                  fill
                />
              </div>
            </ContactContainer> */}
            <ContactContainer
              href="mailto:oscarpulido98@gmail.com"
              data-testid="mail-contact"
            >
              <div>
                <Image
                  src="./external-logos/gmail-logo.svg"
                  alt="Contact Icon: Gmail"
                  fill
                />
              </div>
            </ContactContainer>
            <ContactContainer
              href="https://www.linkedin.com/in/oscar-pulido-castillo/"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="linkedin-contact"
            >
              <div>
                <Image
                  src="./external-logos/linkedin-logo.svg"
                  alt="Contact Icon: Linkedin"
                  fill
                />
              </div>
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
