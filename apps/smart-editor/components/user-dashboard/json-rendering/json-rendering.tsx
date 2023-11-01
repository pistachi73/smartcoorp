import React from 'react';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import { space3XL } from '@smartcoorp/ui/tokens';

import { CodeBlock } from '../shared/code-block';
import { TableOfContent } from '../shared/table-of-contents';

import { codeSnippets, headings } from './helpers';
import { Container, DocumentationContainer } from './json-rendering.styles';

export const JSONRendering = async () => {
  return (
    <Container>
      <DocumentationContainer id="usage">
        <Headline size="xlarge" id="title" as="h1">
          JSON Rendering
        </Headline>
        <Body
          variant="neutral"
          noMargin
          style={{
            marginBottom: space3XL,
          }}
        >
          Learn how to render SmartEditor content in JSON format.
        </Body>
        <section id="introduction">
          <Headline size="large" as="h2">
            Introduction
          </Headline>
          <Body noMargin>
            In this documentation, we will guide you through the process of
            rendering the content of the JSON data source extracted from
            SmartEditor in a React Application. JSON is a popular data format
            for exchanging information, and integrating it into a React
            application can be a common requirement. We will provide
            step-by-step instructions and examples to help you achieve this
            goal.
          </Body>
        </section>
        <section id="prerequisites">
          <Headline size="large" as="h2">
            Prerequisites
          </Headline>
          <Body noMargin>
            Before you begin, ensure you have the following prerequisites in
            place:
          </Body>

          <ul>
            <li>
              <Body lineHeight="increased">
                A react applicaton or library project.
              </Body>
            </li>

            <li>
              <Body lineHeight="increased">
                Basic knowledge of JavaScript and React.
              </Body>
            </li>

            <li>
              <Body lineHeight="increased">
                The JSON data source that you want to render.
              </Body>
            </li>
          </ul>
        </section>
        <section>
          <section id="how-to-render-json">
            <Headline size="large" as="h2">
              How to render JSON
            </Headline>
            <Body>
              In this section, we will show you how to render the{' '}
              <code>JSON</code> data source. In order to render the{' '}
              <code>JSON</code> data source, we will need to create multiple
              React components:
            </Body>
          </section>
          <section id="blocks">
            <Headline size="medium" as="h3">
              Block components
            </Headline>
            <Body>
              A <code>Block</code> component is a React component that renders a
              block of content. It will receive the block data as props and
              render the content.
            </Body>
          </section>
          <section id="header">
            <Headline size="medium" noMargin as="h4">
              Header
            </Headline>
            <CodeBlock code={codeSnippets.headerBlock} />
          </section>

          <section id="paragraph">
            <Headline size="medium" noMargin as="h4">
              Paragraph
            </Headline>
            <CodeBlock code={codeSnippets.paragraphBlock} />
          </section>

          <section id="list">
            <Headline size="medium" noMargin as="h4">
              List
            </Headline>
            <CodeBlock code={codeSnippets.listBlock} />
          </section>

          <section id="image">
            <Headline size="medium" noMargin as="h4">
              Image
            </Headline>
            <CodeBlock code={codeSnippets.imageBlock} />
          </section>

          <section id="link">
            <Headline size="medium" noMargin as="h4">
              Link
            </Headline>
            <CodeBlock code={codeSnippets.linkBlock} />
          </section>

          <section id="columns">
            <Headline size="medium" noMargin as="h4">
              Columns
            </Headline>
            <CodeBlock code={codeSnippets.columnBlock} />
          </section>
          <section id="block-chain">
            <Headline size="medium" as="h3">
              BlockChain component
            </Headline>
            <Body>
              The <code>BlockChain</code> component is the one in charge of
              rendering the desired chain and all it&apos;s successors. It will
              receive the blocks and chains as props and render the specific
              chain content using the <code>Block</code> components.
            </Body>
            <CodeBlock code={codeSnippets.renderJSON} />

            <Body>
              In order to render all the post, you will need to render the{' '}
              <code>main</code> chain like this:
            </Body>
            <CodeBlock code={codeSnippets.mainChain} />
          </section>
        </section>
      </DocumentationContainer>

      <div
        style={{
          position: 'relative',
        }}
      >
        <TableOfContent headings={headings} />
      </div>
    </Container>
  );
};
