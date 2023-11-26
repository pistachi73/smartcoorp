import Link from 'next/link';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import { space3XL } from '@smartcoorp/ui/tokens';

import { CodeBlock } from '../shared/code-block';
import { TableOfContent } from '../shared/table-of-contents';

import { Container, DocumentationContainer } from './api-reference.styles';
import { codeSnippets, headings } from './helpers';

export const ApiReference = () => {
  return (
    <Container>
      <DocumentationContainer>
        <Headline size="xlarge" as="h1">
          API Reference
        </Headline>
        <Body
          noMargin
          style={{
            marginBottom: space3XL,
          }}
        >
          Learn how to use SmartEditor API and get the most out of it.
        </Body>
        <section id="prerequisites">
          <Headline size="large" as="h2">
            Prerequisites
          </Headline>
          <Body noMargin>
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
          <Headline size="large" as="h2">
            1. Get all posts
          </Headline>
          <Body noMargin>Retrieve a list of posts</Body>
          <CodeBlock code={codeSnippets.fetchAllPosts} />

          <Headline size="medium" as="h3">
            Available query parameters:
          </Headline>
          <Body noMargin>
            The following query parameters are available for filtering posts.
            The query parameters can be combined to create more complex filters.
          </Body>

          <ul>
            <li>
              <Body lineHeight="increased">
                <code>title</code> (<b>string</b>, optional) - Filter posts by
                title.
              </Body>
            </li>
            <li>
              <Body lineHeight="increased">
                <code>status</code> (<b>STATUS</b>, optional) - Filter posts by
                status.
              </Body>
            </li>
            <li>
              <Body lineHeight="increased">
                <code>wordcountgt</code> (<b>number</b>, optional) - Filter
                posts with a word count greater than the specified value.
              </Body>
            </li>
            <li>
              <Body lineHeight="increased">
                <code>wordcountlt</code> (<b>number</b>, optional) - Filter
                posts with a word count less than the specified value.
              </Body>
            </li>
          </ul>

          <Headline size="medium" as="h3">
            Example:
          </Headline>
          <Body noMargin>
            The following example retrieves all posts with a title containing
            the word &apos;<b>integrating</b>&apos; or a status of{' '}
            <b>PUBLISHED</b>.
          </Body>
          <CodeBlock code={codeSnippets.fetchPostsWithQuery} />
        </section>
        <section id="get-a-post-by-id">
          <Headline size="large" as="h2">
            2. Get post by ID
          </Headline>

          <Body noMargin>Retrieve a specific blog post by its unique ID</Body>

          <CodeBlock code={codeSnippets.fetchPostById} />
        </section>
        <section id="status-codes">
          <Headline size="large" as="h2">
            Status codes
          </Headline>{' '}
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
          <Headline size="large" as="h2">
            Rate limiting
          </Headline>

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
