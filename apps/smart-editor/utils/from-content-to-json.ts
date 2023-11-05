const toKebabCase = (str: string) =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x) => x.toLowerCase())
    .join('-');

export const fromContentToJSON = ({
  content,
  title,
}: {
  content: any;
  title?: string | null;
}) => {
  if (!title || !content) return;

  const file = new File(
    ['\ufeff' + JSON.stringify(content)],
    `${toKebabCase(title)}.json`,
    {
      type: 'text/json;charset=utf-8',
    }
  );
  const url = window.URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  a.click();
  window.URL.revokeObjectURL(url);
};
