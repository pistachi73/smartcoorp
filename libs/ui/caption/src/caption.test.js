import { render, screen } from '../../test-utils';

import { Caption } from './caption';

describe(`Caption`, () => {
  test('renders Caption', () => {
    render(<Caption>This is a Caption</Caption>);
    expect(screen.getByText('This is a Caption')).toBeInTheDocument();
  });
});
