import { Meta } from '@storybook/react';

import { TemplateProps, TypographyDocs, noCanvas } from '@smartcoorp/ui/shared';

import { Post } from './post';
import { PostProps } from './post.types';

export default {
  title: 'Post/Post',
  component: Post,
  parameters: {
    maxWidth: true,
    docs: {
      description: {
        component:
          'The Post component is used for rendering blog posts edited with the blog post editor component',
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
  },
} as Meta<PostProps>;

export const Default: TemplateProps<PostProps> = {
  args: {
    title: 'title',
    content: {
      blocks: {
        '2IuO7yysrt': {
          id: '2IuO7yysrt',
          data: {
            chains: ['2IuO7yysrt-EQp02oryAy', '2IuO7yysrt-wRT7D2Ag6z'],
          },
          type: 'columns',
          chainId: 'main',
        },
        '2JWcNZYt1E': {
          id: '2JWcNZYt1E',
          data: {
            items: [
              'Add Text Widget',
              'Switch on Drop Cap',
              'Customize the Drop Cap style',
            ],
            style: 'unordered',
          },
          type: 'list',
          chainId: 'main',
        },
        '6hXXbJqtEw': {
          id: '6hXXbJqtEw',
          data: {
            url: 'https://smartcoorp.s3.eu-north-1.amazonaws.com/blog-post-images/2/6hXXbJqtEw.png',
            caption:
              'González Casanova, Pablo (1965), La democracia en México, México, Ediciones Era.',
          },
          type: 'image',
          chainId: '2IuO7yysrt-EQp02oryAy',
        },
        '8xFPhiFUom': {
          id: '8xFPhiFUom',
          data: {
            text: 'Your blog post design says a lot about your brand, and can have a crucial impact on your readers. In this article, we’ll give you inspirational ideas to improve the look and feel of your WordPress blog posts.',
          },
          type: 'paragraph',
          chainId: 'main',
        },
        '95YkJFkyOY': {
          id: '95YkJFkyOY',
          data: {
            text: 'This brings us to the design element that stood out to us: sub-headings. These are a much darker color than everything else on the blog, and their contrasting nature means they’re engaging and captivating.',
          },
          type: 'paragraph',
          chainId: '2IuO7yysrt-wRT7D2Ag6z',
        },
        '9brKrdsQ2S': {
          id: '9brKrdsQ2S',
          data: {
            text: '',
          },
          type: 'paragraph',
          chainId: '2IuO7yysrt-wRT7D2Ag6z',
        },
        E2hn3AkLf0: {
          id: 'E2hn3AkLf0',
          data: {
            text: 'Gawker was a highly-active media blog network that shut down officially in August of 2016. However, there’s still much we can learn from the website’s design, such as its monochrome color scheme (which puts the content front and center), and the way quotes are displayed.',
          },
          type: 'paragraph',
          chainId: '2IuO7yysrt-EQp02oryAy',
        },
        FI7S2UifMb: {
          id: 'FI7S2UifMb',
          data: {
            text: '1. InVision (Drop Caps)',
            level: 1,
          },
          type: 'header',
          chainId: 'main',
        },
        GAcsYkahoH: {
          id: 'GAcsYkahoH',
          data: {
            text: 'As such, incorporating unique and compelling design elements into your blog is a must. However, you may find inspiration hard to come by, and the task may seem overwhelming if you aren’t a design professional.',
          },
          type: 'paragraph',
          chainId: 'main',
        },
        QB8v7i9N7Q: {
          id: 'QB8v7i9N7Q',
          data: {
            text: 'How to Achieve Drop Caps in Elementor',
            level: 2,
          },
          type: 'header',
          chainId: 'main',
        },
        QakljlE7Z9: {
          id: 'QakljlE7Z9',
          data: {
            text: '<b>Follow these steps:</b>',
          },
          type: 'paragraph',
          chainId: 'main',
        },
        R4dsDjNV1d: {
          id: 'R4dsDjNV1d',
          data: {
            text: '',
          },
          type: 'paragraph',
          chainId: '2IuO7yysrt-wRT7D2Ag6z',
        },
        RE9FBLOIPY: {
          id: 'RE9FBLOIPY',
          data: {
            text: '<a href="google.com">InVision</a> is a top collaboration and workflow platform, and as such, they take their blog’s design very seriously. On the whole, this a very clean blog, with ample use of negative space, tasteful animations (such as the use of a parallax header), and readable, well-set typography.',
          },
          type: 'paragraph',
          chainId: 'main',
        },
        UR0ICCmY9q: {
          id: 'UR0ICCmY9q',
          data: {
            items: [
              'Add Text Widget',
              'Switch on Drop Cap',
              'Customize the Drop Cap style',
            ],
            style: 'ordered',
          },
          type: 'list',
          chainId: 'main',
        },
        WxgdbnwZQ4: {
          id: 'WxgdbnwZQ4',
          data: {
            text: 'Change the primary and secondary color, Space between drop cap and paragraph, change the size of the frame and its border radius and change the drop cap typography.',
          },
          type: 'paragraph',
          chainId: 'main',
        },
        YF8yDS74gj: {
          id: 'YF8yDS74gj',
          data: {
            text: 'Fortunately, high-performing blogs are a great source of inspiration when you’re looking for design ideas. In addition, you don’t have to be a design professional to replicate and incorporate these elements into your own blog. Instead, you can use Elementor to make your job quick and easy.',
          },
          type: 'paragraph',
          chainId: 'main',
        },
        iTrAEtlN5O: {
          id: 'iTrAEtlN5O',
          data: {
            text: '6. Backlinko (Sub-Headlines)',
            level: 3,
          },
          type: 'header',
          chainId: '2IuO7yysrt-wRT7D2Ag6z',
        },
        k5vrbbyZ0H: {
          id: 'k5vrbbyZ0H',
          data: {
            text: 'In this post, we’ll highlight 12 top blog designs found on high-performing blogs. Then we’ll show you how to apply each design secret to your blog using our Page Builder. Let’s get started!',
          },
          type: 'paragraph',
          chainId: 'main',
        },
        q9M3q7vpf1: {
          id: 'q9M3q7vpf1',
          data: {
            url: 'https://smartcoorp.s3.eu-north-1.amazonaws.com/blog-post-images/2/q9M3q7vpf1.png',
            caption: 'Table caption',
          },
          type: 'image',
          chainId: 'main',
        },
        qYd8YwuvfP: {
          id: 'qYd8YwuvfP',
          data: {
            text: '',
          },
          type: 'paragraph',
          chainId: '2IuO7yysrt-wRT7D2Ag6z',
        },
        qzqrkYB4Y0: {
          id: 'qzqrkYB4Y0',
          data: {
            text: 'In this post, we’ll highlight 12 top blog designs found on high-performing blogs. Then we’ll show you how to apply each design secret to your blog using our Page Builder. Let’s get started!',
          },
          type: 'paragraph',
          chainId: 'main',
        },
        xeO9HhlacE: {
          id: 'xeO9HhlacE',
          data: {
            items: [
              'Removing links to your social media profiles',
              'Getting rid of your ecommerce website’s header and footer',
              'Eliminating email signup forms',
              'Removing your main navigation menu',
            ],
            style: 'ordered',
          },
          type: 'list',
          chainId: '2IuO7yysrt-wRT7D2Ag6z',
        },
        zC7rYu5BN2: {
          id: 'zC7rYu5BN2',
          data: {
            text: '4. Gawker (BlockQuotes)',
            level: 3,
          },
          type: 'header',
          chainId: '2IuO7yysrt-EQp02oryAy',
        },
      },
      chains: {
        main: [
          '8xFPhiFUom',
          'GAcsYkahoH',
          'YF8yDS74gj',
          'k5vrbbyZ0H',
          'FI7S2UifMb',
          'RE9FBLOIPY',
          'QB8v7i9N7Q',
          'q9M3q7vpf1',
          'WxgdbnwZQ4',
          'QakljlE7Z9',
          '2JWcNZYt1E',
          'qzqrkYB4Y0',
          'UR0ICCmY9q',
          '2IuO7yysrt',
        ],
        '2IuO7yysrt-EQp02oryAy': ['zC7rYu5BN2', 'E2hn3AkLf0', '6hXXbJqtEw'],
        '2IuO7yysrt-wRT7D2Ag6z': [
          'iTrAEtlN5O',
          '95YkJFkyOY',
          'xeO9HhlacE',
          '9brKrdsQ2S',
          'R4dsDjNV1d',
          'qYd8YwuvfP',
        ],
      },
    },
  },

  parameters: {},
};
