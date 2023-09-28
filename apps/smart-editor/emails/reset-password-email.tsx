import { Button } from '@react-email/button';
import { Column } from '@react-email/column';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Html } from '@react-email/html';
import { Img } from '@react-email/img';
import { Link } from '@react-email/link';
import { Preview } from '@react-email/preview';
import { Row } from '@react-email/row';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import * as React from 'react';

interface ResetPasswordEmailProps {
  name: string;
  resetPasswordLink: `/${string}`;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:5200';

const ResetPasswordEmail = ({
  name,
  resetPasswordLink,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>SmartEditor reset your password</Preview>
      <Container style={container}>
        <Section style={logo}>
          <Link href="https://smarteditor.app">
            <Img
              src={`${baseUrl}/logo_light.png`}
              width="70"
              alt="SmartEditor"
            />
          </Link>
        </Section>
        <Section style={sectionsBorders}>
          <Row>
            <Column style={sectionBorder} />
            <Column style={sectionCenter} />
            <Column style={sectionBorder} />
          </Row>
        </Section>

        <Section>
          <Text style={text}>Hi {name},</Text>
          <Text style={text}>
            Someone recently requested a password change for your SmartEditor
            account. If this was you, you can set a new password here:
          </Text>
          <Button
            pY={12}
            style={button}
            href={`${baseUrl}${resetPasswordLink}`}
          >
            Reset password
          </Button>
          <Text style={text}>
            If you don&apos;t want to change your password or didn&apos;t
            request this, just ignore and delete this message.
          </Text>
          <Text style={text}>Happy Editing!</Text>
        </Section>
      </Container>
    </Html>
  );
};

export default ResetPasswordEmail;

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  'padding-bottom': '30px',
  'padding-left': '30px',
  'padding-right': '30px',
};

const text = {
  fontSize: '16px',
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: '300',
  color: '#404040',
  lineHeight: '26px',
};

const button = {
  backgroundColor: '#FF5E0E',
  borderRadius: '4px',
  color: 'black',
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  textDecoration: 'none',
  textAlign: 'center' as const,
  verticalAlign: 'center',
  display: 'block',
  width: '100%',

  'font-size': '16px',
};

const logo = {
  display: 'flex',
  justifyContent: 'center',
  alingItems: 'center',
  padding: 30,
};

const sectionsBorders = {
  width: '100%',
  display: 'flex',
};

const sectionBorder = {
  borderBottom: '1px solid rgb(238,238,238)',
  width: '249px',
};

const sectionCenter = {
  borderBottom: '1px solid #FF5E0E',
  width: '102px',
};
