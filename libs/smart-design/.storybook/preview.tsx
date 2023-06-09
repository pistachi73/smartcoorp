import { DocsContainer } from '@storybook/addon-docs';
import { addons } from '@storybook/addons';
import {
  Controls,
  Description,
  Primary,
  Source,
  Stories,
  Title,
} from '@storybook/blocks';
import { UPDATE_GLOBALS } from '@storybook/core-events';
import { Preview } from '@storybook/react';

import { ThemeProvider } from '@smartcoorp/ui/global-styles';
import { Col, Grid, Row } from '@smartcoorp/ui/grid';
import { Select } from '@smartcoorp/ui/select';

import { Styled as S } from '../src/storybook.styles';

import '../src/storybook.css';
import theme from './storybook-theme';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const { largerStory, maxWidth } = context.parameters;
      const { theme } = context.globals;

      return (
        <ThemeProvider theme={theme}>
          <S.ThemeBlock $largerStory={largerStory}>
            <S.ThemeBlockWrapper $maxWidth={maxWidth}>
              <Story />
            </S.ThemeBlockWrapper>
          </S.ThemeBlock>
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
        const { title, subcomponents, argTypes } = story;
        const { theme } = globals;

        const storyTitle = title.split('/')[title.split('/').length - 1];
        let subcomponentsTitles = '';

        if (subcomponents) {
          Object.keys(subcomponents).forEach((key) => {
            subcomponentsTitles += ', ' + key;
          });
        }
        return (
          <ThemeProvider theme={'light'}>
            <DocsContainer {...props}>
              <Grid>
                <Row>
                  <Col size={9}>
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
                      code={`import { ${storyTitle.replace(/\s/g, '')}${
                        subcomponentsTitles && subcomponentsTitles
                      } } from @smart-design/components`}
                    />
                    <Description>###Default</Description>
                    <Primary />
                    {Object.keys(argTypes).length ? <Controls /> : null}
                    <Stories title="References" includePrimary={false} />
                  </Col>
                  <Col size={3}>
                    <S.TableOfContent />
                  </Col>
                </Row>
              </Grid>
            </DocsContainer>
          </ThemeProvider>
        );
      },
    },
  },
};

export default preview;
