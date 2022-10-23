import styled from 'styled-components';

import { GlobalStyles, ThemeProvider } from '../src/global-styles';
import '../src/helpers/storybook.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
};
const ThemeBlock = styled.div`
  width: ${(props) => (props.vertical ? '50%' : '100%')};
  height: ${(props) => (props.vertical ? '50vh' : '100%')};
  bottom: 0;
  padding: 32px;
  background: ${(props) => props.theme.backgroundScreen};
`;

const Container = styled.div`
  display: flex;
`;
const withTheme = (StoryFn, context) => {
  const { theme } = context.globals;

  const story1Id = '1';
  const story2Id = '2';
  switch (theme) {
    case 'horizontal-side-by-side': {
      return (
        <>
          <ThemeProvider theme={'light'}>
            <GlobalStyles />
            <ThemeBlock left>
              <StoryFn storyId={story1Id} />
            </ThemeBlock>
          </ThemeProvider>
          <ThemeProvider theme={'dark'}>
            <GlobalStyles />
            <ThemeBlock>
              <StoryFn storyId={story2Id} />
            </ThemeBlock>
          </ThemeProvider>
        </>
      );
    }
    case 'vertical-side-by-side': {
      return (
        <Container>
          <ThemeProvider theme={'light'}>
            <GlobalStyles />
            <ThemeBlock vertical>
              <StoryFn storyId={story1Id} />
            </ThemeBlock>
          </ThemeProvider>
          <ThemeProvider theme={'dark'}>
            <GlobalStyles />
            <ThemeBlock vertical>
              <StoryFn storyId={story2Id} />
            </ThemeBlock>
          </ThemeProvider>
        </Container>
      );
    }
    default: {
      return (
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <ThemeBlock fill>
            <StoryFn />
          </ThemeBlock>
        </ThemeProvider>
      );
    }
  }
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'circlehollow', title: 'light' },
        { value: 'dark', icon: 'circle', title: 'dark' },
        {
          value: 'vertical-side-by-side',
          icon: 'sidebar',
          title: 'vertical side by side',
        },
        {
          value: 'horizontal-side-by-side',
          icon: 'sidebar',
          title: 'horizontal side by side',
        },
      ],
      showName: true,
    },
  },
};

export const decorators = [withTheme];
