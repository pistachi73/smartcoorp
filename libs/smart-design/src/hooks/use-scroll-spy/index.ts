import React from 'react';

export const useScrollSpy = (ids: string[], options: any) => {
  const [activeId, setActiveId] = React.useState<string | undefined>();
  const observer = React.useRef<IntersectionObserver>();
  React.useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id));
    observer.current?.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
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
  return activeId;
};
