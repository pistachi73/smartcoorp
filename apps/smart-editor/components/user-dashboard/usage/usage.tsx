import Link from 'next/link';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import { space3XL } from '@smartcoorp/ui/tokens';

import { CodeBlock } from './code-block';
import { codeSnippets, headings } from './helpers';
import { TableOfContent } from './table-of-contents/table-of-contents';
import { Container, DocumentationContainer } from './usage.styles';

export const Usage = async () => {
  return (
    <Container>
      <DocumentationContainer id="usage">
        <Headline size="xlarge" id="title">
          Usage
        </Headline>
        <Body
          variant="neutral"
          noMargin
          style={{
            marginBottom: space3XL,
          }}
        >
          Learn how to use SmartEditor API and get the most out of it.
        </Body>
        <section id="prerequisites">
          <Headline size="large">Prerequisites</Headline>
          <Body variant="neutral" noMargin>
            To get the most out of SmartEditor API, you will need to:
          </Body>

          <ul>
            <li>
              <Link href="/api-keys">Create an API Key</Link>
            </li>
            <li>
              <Link href="/posts">Create a Post</Link>
            </li>
          </ul>
        </section>
        <section id="get-all-posts">
          <Headline size="large">1. Get all posts</Headline>
          <Body variant="neutral" noMargin>
            Retrieve a List of Posts
          </Body>
          <CodeBlock code={codeSnippets.fetchAllPosts} />

          <Headline size="medium">Available query parameters:</Headline>

          <ul>
            <li>
              <Body lineHeight="increased">
                <code>title (string, optional)</code> - Filter posts by title.
              </Body>
            </li>
            <li>
              <Body lineHeight="increased">
                <code>wordcountgt (number, optional)</code> - Filter posts with
                a word count greater than the specified value.
              </Body>
            </li>
            <li>
              <Body lineHeight="increased">
                <code>wordcountlt (number, optional)</code> - Filter posts with
                a word count less than the specified value.
              </Body>
            </li>
          </ul>
        </section>
        <section id="get-a-post-by-id">
          <Headline size="large">2. Get post by ID</Headline>

          <Body variant="neutral" noMargin>
            Retrieve a Specific Blog Post by Its Unique ID
          </Body>

          <CodeBlock code={codeSnippets.fetchPostById} />
        </section>
        <section id="status-codes">
          <Headline size="large">Status codes</Headline>{' '}
          <ul>
            <li>
              <Body lineHeight="increased">
                <code>200 OK</code> - The request was successful, and the
                filtered blog posts are returned in the response.
              </Body>
            </li>
            <li>
              <Body lineHeight="increased">
                <code>204 OK</code> - The request was successful but no content
                was found.
              </Body>
            </li>
            <li>
              <Body lineHeight="increased">
                <code>401 Unauthorized</code> - Authentication failed, check
                your API key.
              </Body>
            </li>
            <li>
              <Body lineHeight="increased">
                <code>429 Too many requests</code> - You have exceeded the rate
                limit.
              </Body>
            </li>
            <li>
              <Body lineHeight="increased">
                <code>500 Error</code> - An error occurred on the server.
              </Body>
            </li>
          </ul>
        </section>
        <section id="rate-limiting">
          <Headline size="large">Rate limiting</Headline>

          <Body noMargin>
            This API has rate limiting in place to prevent abuse. The rate
            limits are as follows:
          </Body>
          <ul>
            <li>
              <Body>100 requests per minute per user.</Body>
            </li>
          </ul>
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
