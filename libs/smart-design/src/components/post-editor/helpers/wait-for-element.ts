export const waitForElement = (id: string) => {
  return new Promise<HTMLElement | null>((resolve) => {
    if (document.getElementById(id)) {
      return resolve(document.getElementById(id));
    }

    const observer = new MutationObserver(() => {
      if (document.getElementById(id)) {
        resolve(document.getElementById(id));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};
