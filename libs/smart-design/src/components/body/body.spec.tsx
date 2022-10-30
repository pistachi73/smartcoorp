import { render, screen } from '../../test-utils';

import { Body } from './body';

describe('Body', () => {
  it('should render successfully', () => {
    render(<Body>This is a body component</Body>);
    expect(screen.getByText('This is a body component')).toBeInTheDocument();
  });
});
