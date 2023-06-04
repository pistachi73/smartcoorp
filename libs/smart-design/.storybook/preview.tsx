import { DocsContainer } from '@storybook/addon-docs';
import { addons } from '@storybook/addons';
import {
  ArgsTable,
  Description,
  Primary,
  Source,
  Stories,
  Title,
} from '@storybook/blocks';
import { UPDATE_GLOBALS } from '@storybook/core-events';
import { Preview } from '@storybook/react';
import styled from 'styled-components';

import { Select } from '../src';
import { GlobalStyles, ThemeProvider } from '../src/global-styles';
import { Styled as S } from '../src/helpers/storybook.styles';

import '../src/helpers/storybook.css';
import '../src/global-styles/fonts.css';
import theme from './storybook-theme';

const ThemeBlock = styled.div<{ vertical?: boolean }>`
  width: ${(props) => (props.vertical ? '50%' : '100%')};
  height: ${(props) => (props.vertical ? '500px' : '100%')};
  bottom: 0;
  padding: 32px;
  background: ${(props) => props.theme.backgroundScreen};
`;

const preview: Preview = {
  decorators: [
    (Story, context) => {
      return (
        <ThemeProvider theme={context.globals['theme']}>
          <GlobalStyles />
          <ThemeBlock>
            <Story />
          </ThemeBlock>
        </ThemeProvider>
      );
    },
  ],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Choose a theme to apply',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', left: '⚪️', title: 'Default theme' },
          { value: 'dark', left: '⚫️', title: 'Dark theme' },
        ],
      },
    },
  },
  parameters: {
    docs: {
      theme,
      container: (props: any) => {
        const channel = addons.getChannel();
        const story = props.context.storyById(props.context.id);
        const { globals } = props.context.getStoryContext(story);
        const { theme } = globals;

        const { title } = story;
        const storyTitle = title.split('/')[title.split('/').length - 1];
        return (
          <ThemeProvider theme={'light'}>
            <GlobalStyles />

            <DocsContainer {...props}>
              <Title />
              <S.SelectContainer className="sb-unstyled">
                <Select
                  value={theme}
                  defaultValue={theme}
                  size="small"
                  options={[
                    { value: 'light', label: 'Light theme' },
                    { value: 'dark', label: 'Dark theme' },
                  ]}
                  onChange={(value) => {
                    channel.emit(UPDATE_GLOBALS, {
                      globals: { theme: value },
                    });
                  }}
                />
              </S.SelectContainer>

              <Description />
              <Description>##Usage</Description>
              <Source
                language="tsx"
                code={`import { ${storyTitle.replace(
                  /\s/g,
                  ''
                )} } from @smart-design/components`}
              />
              <Description>###Example</Description>
              <Primary />
              <ArgsTable />
              <Stories title="References" {...props} />
            </DocsContainer>
          </ThemeProvider>
        );
      },
    },
  },
};

export default preview;
