import { type Heading } from './table-of-contents/table-of-contents';

export const codeSnippets = {
  fetchAllPosts: `
  ~~~js
  fetch('https://www.smarteditor.app/api/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
      'Content-Type': 'application/json',
      Authorization: 'Bearer {api-key}',
    },
  }).then((response) => response.json())
    .then((data) => console.log(data));
  ~~~`,
};

export const headings: Heading[] = [
  {
    id: 'prerequisites',
    text: 'Prerequisites',
    level: 3,
  },
  {
    id: 'get-all-posts',
    text: 'Get all posts',
    level: 2,
  },
  {
    id: 'get-a-post-by-id',
    text: 'Get a post by id',
    level: 2,
  },
  {
    id: 'status-codes',
    text: 'Status codes',
    level: 2,
  },
  {
    id: 'rate-limiting',
    text: 'Rate limiting',
    level: 2,
  },
];
