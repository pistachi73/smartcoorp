export const getValueType = (value: any) => {
  if (value instanceof File) {
    return 'file';
  }
  if (typeof value === 'string') {
    return 'string';
  }

  if (typeof value === 'number') {
    return 'number';
  }

  if (typeof value === 'boolean') {
    return 'boolean';
  }

  if (Array.isArray(value)) {
    return 'array';
  }

  if (typeof value === 'object') {
    return 'object';
  }

  return 'unknown';
};

export const delimetersMapping: Record<
  ReturnType<typeof getValueType>,
  [string, string]
> = {
  string: ['"', '"'],
  number: ['', ''],
  boolean: ['', ''],
  array: ['[', ']'],
  object: ['{', '}'],
  file: ['<', '>'],
  unknown: ['<', '>'],
};
