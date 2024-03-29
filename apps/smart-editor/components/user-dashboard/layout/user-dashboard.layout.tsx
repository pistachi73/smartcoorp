import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { getServerSession } from 'next-auth';
import { BsBoxArrowLeft, BsList } from 'react-icons/bs';

import prisma from '@smartcoorp/prisma';
import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { Headline } from '@smartcoorp/ui/headline';

import { ProfileDropdown } from './profile-dropdown';
import { SidebarNav } from './sidebar-nav';
import {
  Container,
  Content,
  ContentContainer,
  Header,
  HeaderContent,
  Input,
  Logo,
  LogoContainer,
  SidebarContainer,
  Upgrade,
} from './user-dashboard.layout.styles';

type UserDashboardLayoutProps = {
  children: React.ReactNode;
};
export const UserDashboardLayout = async ({
  children,
}: UserDashboardLayoutProps) => {
  const session = await getServerSession(nextAuthConfig);

  const user = await prisma.eUser.findUnique({
    where: {
      id: session?.id,
    },
    include: {
      _count: {
        select: {
          EPost: true,
        },
      },
    },
  });

  const { EPost: numberOfPosts = 0 } = user?._count ?? {};

  return (
    <Container>
      <Input type="checkbox" id="toggle" />

      <SidebarContainer>
        <LogoContainer>
          <Logo>
            <img width={35} src="/logo_light.svg" alt="SmartEditor Logo" />
            <Headline size="small" noMargin as={'p'}>
              <span>.</span>
              SmartEditor
            </Headline>
          </Logo>
          <label htmlFor="toggle" role="button">
            <BsBoxArrowLeft size={20} />
          </label>
        </LogoContainer>
        <SidebarNav />

        <div>
          {session && <ProfileDropdown session={session} />}
          {numberOfPosts >= 5 && (
            <Upgrade>
              <Headline size="small" as="h4">
                Content Limit Reached
              </Headline>
              <Body size="xsmall">
                You&apos;ve hit the limit for total posts on your current plan.
              </Body>
              <Button size="small">Upgrade Now</Button>
            </Upgrade>
          )}
        </div>
      </SidebarContainer>
      <ContentContainer>
        <Header>
          <HeaderContent>
            <label htmlFor="toggle" role="button">
              <BsList size={20} />
            </label>
            <div>
              <Body size="small" noMargin variant="neutral">
                Welcome,
              </Body>
              <Body size="medium" noMargin fontWeight="bold">
                {session?.user?.name}
              </Body>
            </div>
          </HeaderContent>
        </Header>
        <Content>{children}</Content>
      </ContentContainer>
    </Container>
  );
};
