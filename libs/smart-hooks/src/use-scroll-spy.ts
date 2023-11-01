import React from 'react';

export function useScrollSpy(ids: string[], options: any) {
  const [activeId, setActiveId] = React.useState<string>();
  const observer = React.useRef<IntersectionObserver>();
  React.useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id));
    observer.current?.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);
    elements.forEach((el) => {
      if (el) {
        observer.current?.observe(el);
      }
    });
    return () => observer.current?.disconnect();
  }, [ids, options]);

  console.log(activeId);
  return activeId;
}

export const useScrollspy = (
  ids: string[],
  options?: {
    offset?: number;
    root?: Element;
  }
): [number] => {
  const [elements, setElements] = React.useState<Element[]>([]);

  const [currentIntersectingElementIndex, setCurrentIntersectingElementIndex] =
    React.useState(0);

  const rootMargin = `-${(options && options.offset) || 0}px 0px 0px 0px`;

  const observer = React.useRef<IntersectionObserver>();

  React.useEffect(() => {
    const widgetElements = ids
      .map((item) => document.getElementById(item))
      .filter(Boolean) as Element[];

    setElements(widgetElements);
  }, []);

  React.useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        // find the index of the section that is currently intersecting
        const indexOfElementIntersecting = entries.findIndex((entry) => {
          // if intersection > 0 it means entry is intersecting with the view port
          return entry.intersectionRatio > 0;
        });

        // store the value of indexOfElementIntersecting
        setCurrentIntersectingElementIndex(indexOfElementIntersecting);
      },
      {
        root: (options && options.root) || null,
        // use this option to handle custom offset
        rootMargin,
      }
    );

    const { current: ourObserver } = observer;

    // observe all the elements passed as argument of the hook
    elements.forEach((element) =>
      element ? ourObserver.observe(element) : null
    );

    return () => ourObserver.disconnect();
  }, [elements, options, rootMargin]);

  return [currentIntersectingElementIndex];
};
