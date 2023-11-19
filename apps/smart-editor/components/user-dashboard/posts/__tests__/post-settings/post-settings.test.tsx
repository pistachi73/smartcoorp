import { render, screen } from '@smart-editor/utils/testing/test-utils';

import { PostSettings } from '../../post-settings/post-settings';
import { useGetPost } from '../../posts.hooks';

jest.mock('@smart-editor/components/shared/styled-form-field', () => ({
  ...jest.requireActual('@smart-editor/components/shared/styled-form-field'),
  SkeletonFormField: () => <div data-testid="skeleton-form-field" />,
}));

jest.mock('../../post-settings/fields', () => ({
  DeletePostField: () => <div data-testid="delete-post-field" />,
  EditPostLink: () => <div data-testid="edit-post-link" />,
  CoverImageField: () => <div data-testid="cover-image-field" />,
  StatusField: () => <div data-testid="status-field" />,
  ProseField: () => <div data-testid="prose-field" />,
}));

jest.mock('../../posts.hooks');

describe('<PostSettings />', () => {
  it('should render the form component', () => {
    (useGetPost as jest.Mock).mockReturnValue({});
    render(<PostSettings />);

    expect(screen.getByTestId('edit-post-link')).toBeInTheDocument();
    expect(screen.getByTestId('prose-field')).toBeInTheDocument();
    expect(screen.getByTestId('status-field')).toBeInTheDocument();
    expect(screen.getByTestId('cover-image-field')).toBeInTheDocument();
    expect(screen.getByTestId('delete-post-field')).toBeInTheDocument();
  });
  it('should render <SkeletonFormField /> if loading', () => {
    (useGetPost as jest.Mock).mockReturnValue({
      isLoading: true,
    });
    render(<PostSettings />);

    expect(screen.getByTestId('skeleton-form-field')).toBeInTheDocument();
  });
});
