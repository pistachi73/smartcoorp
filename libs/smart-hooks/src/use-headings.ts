import React from 'react';

type Heading = {
  id: string;
  text: string;
  level: number;
};

export const useHeadings = () => {
  const [headings, setHeadings] = React.useState<Heading[]>([]);
  React.useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))
      .filter((element) => element.id)
      .map((element) => ({
        id: element.id,
        text: element.textContent ?? '',
        level: Number(element.tagName.substring(1)),
      }));
    setHeadings(elements);
  }, []);
  return headings;
};
