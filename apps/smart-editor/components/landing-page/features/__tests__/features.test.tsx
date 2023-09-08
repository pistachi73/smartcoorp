import { render, screen } from '@smart-editor/utils/test-utils';

import { Features, features } from '../features';

describe('<Features />', () => {
  it('should render the expected content', () => {
    render(<Features />);

    features.map((feature) => {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
      expect(screen.getByText(feature.description.trim())).toBeInTheDocument();
    });
  });
});
