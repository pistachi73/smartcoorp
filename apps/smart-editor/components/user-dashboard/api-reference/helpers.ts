import { Heading } from '../shared/table-of-contents/table-of-contents';

export const codeSnippets = {
  fetchAllPosts: `
  ~~~js
  fetch('https://www.smarteditor.app/api/posts', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer {api-key}',
      },
    }).then((response) => response.json())
      .then((data) => console.log(data));
  ~~~`,
  fetchPostById: `
  ~~~js
  fetch('https://www.smarteditor.app/api/posts/{post-id}', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer {api-key}',
    },
  }).then((response) => response.json())
    .then((data) => console.log(data));
  ~~~`,
  new: `
  ~~~tsx
  const Test = (a:string) => {
    return <div>Hello</div>;
  };
  ~~~`,
  fetchPostsWithQuery: `
  ~~~js
  fetch(
    'https://www.smarteditor.app/api/posts?title=integrating&status=PUBLISHED',
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer {api-key}',
      },
    }
  ~~~`,
};

export const headings: Heading[] = [
  {
    id: 'prerequisites',
    text: 'Prerequisites',
    level: 1,
  },
  {
    id: 'get-all-posts',
    text: 'Get all posts',
    level: 1,
  },
  {
    id: 'get-a-post-by-id',
    text: 'Get a post by id',
    level: 1,
  },
  {
    id: 'status-codes',
    text: 'Status codes',
    level: 1,
  },
  {
    id: 'rate-limiting',
    text: 'Rate limiting',
    level: 1,
  },
];
