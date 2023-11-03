import { Heading } from '../shared/table-of-contents/table-of-contents';

export const codeSnippets = {
  headerBlock: `
  ~~~tsx
  type HeaderBlock = {
    type: 'header';
    data: {
      text: string;
      level: 1 | 2 | 3 | 4 | 5 | 6;
    };
  };
  
  const Header = ({ block }: { block: HeaderBlock }) => {
    const {
      data: { text, level },
    } = block;

    if (!text) return null;
  
    const HeaderTag = "h" + level as keyof ReactHTML;
  
    return <HeaderTag>{text}</HeaderTag>; 
  };
  `,
  paragraphBlock: `
  ~~~tsx
  type ParagraphBlock = {
    id: string;
    chainId: string;
    type: 'paragraph';
    data: {
      text: string;
    };
  };
  
  const Paragraph = ({ block }: { block: ParagraphBlock }) => {
    const {
      data: { text },
    } = block;
  
    if (!text) return null;
  
    return <p>{text}</p>;
  };
  `,
  listBlock: `
  ~~~tsx
  type ListBlock = {
    id: string;
    chainId: string;
    type: 'list';
    data: {
      style: 'unordered' | 'ordered';
      items: string[];
    };
  };
  
  const List = ({ block }: { block: ListBlock }) => {
    const {
      data: { style, items },
    } = block;
  
    if (!items.length) return null;
  
    const ListTag = style === 'unordered' ? 'ul' : 'ol';
  
    return (
      <ListTag>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ListTag>
    );
  };
  `,
  imageBlock: `
  ~~~tsx
  type ImageBlock = {
    id: string;
    chainId: string;
    type: 'image';
    data: {
      url?: string;
      caption?: string;
    };
  };
  
  const Image = ({ block }: { block: ImageBlock }) => {
    const {
      data: { url, caption },
    } = block;
  
    if (!url) return null;
  
    return (
      <figure>
        <img src={url} alt={caption} />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    );
  };
  ~~~
  `,
  linkBlock: `
  ~~~tsx
  type LinkBlock = {
    id: string;
    chainId: string;
    type: 'link';
    data: {
      url?: string;
      domain?: string;
      title?: string;
      description?: string;
      imageUrl?: string;
    };
  };
  
  const Link = ({ block }: { block: LinkBlock }) => {
    const {
      data: { url, domain, title, description, imageUrl },
    } = block;
  
    if (!url || !title || !description) return null;
  
    return (
      <a href={url} target={'_blank'}>
        <div>
          <h4>{title}</h4>
          <p>{description}</p>
          <p>{domain}</p>
        </div>
        {imageUrl && <img src={imageUrl} alt={domain} />}
      </a>
    );
  };
  ~~~
  `,
  columnBlock: `
  ~~~tsx
  type ColumnBlock = {
    id: string;
    chainId: string;
    type: 'columns';
    data: {
      chains: string[];
      distribution?: number[];
    };
  };

  const Column = ({
    block,
    children,
  }: {
    block: ColumnBlock;
    children: React.ReactNode;
  }) => {
    const {
      data: { distribution },
    } = block;
  
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div
            style={{
              flexGrow: distribution?.[index] ?? 1,
              flexShrink: 1,
              flexBasis: 0,
            }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  };
  ~~~
  `,
  renderJSON: `
  ~~~tsx
  const BlockChain = ({
    blocks,
    chains,
    chainId,
  }: {
    blocks: Record<string, Block>;
    chains: Record<string, string[]>;
    chainId: string;
  }) => {
    const chain = chains[chainId];
    return (
      <div>
        {chain.map((blockId) => {
          const block = blocks[blockId];
          const blockType = block.type;
  
          switch (blockType) {
            case 'header':
              return <Header key={blockId} block={block} />;
            case 'paragraph':
              return <Paragraph key={blockId} block={block} />;
            case 'list':
              return <List key={blockId} block={block} />;
            case 'image':
              return <Image key={blockId} block={block} />;
            case 'link':
              return <Link key={blockId} block={block} />;
            case 'columns':
              return (
                <Column key={blockId} block={block}>
                  {block.data.chains.map((chainId) => (
                    <BlockChain
                      key={chainId}
                      blocks={blocks}
                      chains={chains}
                      chainId={chainId}
                    />
                  ))}
                </Column>
              );
          }
        })}
      </div>
    );
  };
  ~~~
  `,
  mainChain: `
  ~~~tsx
  <BlockChain
    blocks={blocks}
    chains={chains}
    chainId={'main'}
  />
  ~~~
  `,
};
export const headings: Heading[] = [
  {
    id: 'introduction',
    text: 'Introduction',
    level: 1,
  },
  {
    id: 'prerequisites',
    text: 'Prerequisites',
    level: 1,
  },
  {
    id: 'data-structure',
    text: 'Data structure',
    level: 1,
  },
  {
    id: 'how-to-render-json',
    text: 'How to render JSON',
    level: 1,
  },

  {
    id: 'blocks',
    text: 'Block components',
    level: 2,
  },

  {
    id: 'header',
    text: 'Header',
    level: 3,
  },
  {
    id: 'paragraph',
    text: 'Paragraph',
    level: 3,
  },

  {
    id: 'list',
    text: 'List',
    level: 3,
  },

  {
    id: 'image',
    text: 'Image',
    level: 3,
  },
  {
    id: 'link',
    text: 'Link',
    level: 3,
  },
  {
    id: 'columns',
    text: 'Columns',
    level: 3,
  },
  {
    id: 'block-chain',
    text: 'BlockChain',
    level: 2,
  },
];

// const BlockChain = ({
//   blocks,
//   chains,
//   chainId,
// }: {
//   blocks: Record<string, Block>;
//   chains: Record<string, string[]>;
//   chainId: string;
// }) => {
//   const chain = chains[chainId];
//   return (
//     <div>
//       {chain.map((blockId) => {
//         const block = blocks[blockId];
//         const blockType = block.type;

//         switch (blockType) {
//           case 'header':
//             return <Header key={blockId} block={block} />;
//           case 'paragraph':
//             return <Paragraph key={blockId} block={block} />;
//           case 'list':
//             return <List key={blockId} block={block} />;
//           case 'image':
//             return <Image key={blockId} block={block} />;
//           case 'link':
//             return <LinkA key={blockId} block={block} />;
//           case 'columns':
//             return (
//               <Column key={blockId} block={block}>
//                 {block.data.chains.map((chainId) => (
//                   <BlockChain
//                     key={chainId}
//                     blocks={blocks}
//                     chains={chains}
//                     chainId={chainId}
//                   />
//                 ))}
//               </Column>
//             );
//         }
//       })}
//     </div>
//   );
// };

// type HeaderBlock = {
//   id: string;
//   chainId: string;
//   type: 'header';
//   data: {
//     text: string;
//     level: 1 | 2 | 3 | 4 | 5 | 6;
//   };
// };

// const Header = ({ block }: { block: HeaderBlock }) => {
//   const {
//     data: { text, level },
//   } = block;

//   if (!text) return null;

//   const HeaderTag = `h${level}` as keyof ReactHTML;
//   return <HeaderTag>{text}</HeaderTag>;
// };

// type ParagraphBlock = {
//   id: string;
//   chainId: string;
//   type: 'paragraph';
//   data: {
//     text: string;
//   };
// };

// const Paragraph = ({ block }: { block: ParagraphBlock }) => {
//   const {
//     data: { text },
//   } = block;

//   if (!text) return null;

//   return <p>{text}</p>;
// };

// type ListBlock = {
//   id: string;
//   chainId: string;
//   type: 'list';
//   data: {
//     style: 'unordered' | 'ordered';
//     items: string[];
//   };
// };

// const List = ({ block }: { block: ListBlock }) => {
//   const {
//     data: { style, items },
//   } = block;

//   if (!items.length) return null;

//   const ListTag = style === 'unordered' ? 'ul' : 'ol';

//   return (
//     <ListTag>
//       {items.map((item) => (
//         <li key={item}>{item}</li>
//       ))}
//     </ListTag>
//   );
// };

// type ImageBlock = {
//   id: string;
//   chainId: string;
//   type: 'image';
//   data: {
//     url?: string;
//     caption?: string;
//   };
// };

// const Image = ({ block }: { block: ImageBlock }) => {
//   const {
//     data: { url, caption },
//   } = block;

//   if (!url) return null;

//   return (
//     <figure>
//       <img src={url} alt={caption} />
//       {caption && <figcaption>{caption}</figcaption>}
//     </figure>
//   );
// };

// type LinkBlock = {
//   id: string;
//   chainId: string;
//   type: 'link';
//   data: {
//     url?: string;
//     domain?: string;
//     title?: string;
//     description?: string;
//     imageUrl?: string;
//   };
// };

// const LinkA = ({ block }: { block: LinkBlock }) => {
//   const {
//     data: { url, domain, title, description, imageUrl },
//   } = block;

//   if (!url || !title || !description) return null;

//   return (
//     <a href={url} target={'_blank'}>
//       <div>
//         <h4>{title}</h4>
//         <p>{description}</p>
//         <p>{domain}</p>
//       </div>
//       {imageUrl && <img src={imageUrl} alt={`${domain}`} />}
//     </a>
//   );
// };

// type ColumnBlock = {
//   id: string;
//   chainId: string;
//   type: 'columns';
//   data: {
//     chains: string[];
//     distribution?: number[];
//   };
// };

// const Column = ({
//   block,
//   children,
// }: {
//   block: ColumnBlock;
//   children: React.ReactNode;
// }) => {
//   const {
//     data: { distribution },
//   } = block;

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'row',
//         width: '100%',
//       }}
//     >
//       {React.Children.map(children, (child, index) => (
//         <div
//           style={{
//             flexGrow: distribution?.[index] ?? 1,
//             flexShrink: 1,
//             flexBasis: 0,
//           }}
//         >
//           {child}
//         </div>
//       ))}
//     </div>
//   );
// };
