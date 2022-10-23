import { render } from '@testing-library/react';

import { Body } from './body';

describe('Body', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Body>s</Body>);
    expect(baseElement).toBeTruthy();
  });
});
