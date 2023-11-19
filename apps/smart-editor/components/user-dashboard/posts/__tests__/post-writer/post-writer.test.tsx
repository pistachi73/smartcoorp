import { render, screen } from '@smart-editor/utils/testing/test-utils';

import { PostWriter } from '../../post-writer';
import { useGetPost } from '../../posts.hooks';

jest.mock('../../posts.hooks');

jest.mock('@smartcoorp/ui/post-editor', () => ({
  SkeletonPostEditor: () => <div data-testid="skeleton-post-editor" />,
  PostEditor: () => <div data-testid="post-editor" />,
}));

jest.mock('../../post-writer/header/header', () => ({
  Header: () => <div data-testid="header" />,
}));

jest.mock('../../post-writer/editor', () => ({
  Editor: () => <div data-testid="editor" />,
}));

describe('<PostWriter />', () => {
  it('should render the component', () => {
    (useGetPost as jest.Mock).mockReturnValue({
      data: {
        post: {
          content: 'content',
        },
      },
    });

    render(<PostWriter />);
    expect(screen.getByTestId('editor')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
  it('should render loading post editor', () => {
    (useGetPost as jest.Mock).mockReturnValue({
      data: undefined,
    });

    render(<PostWriter />);
    expect(screen.getByTestId('skeleton-post-editor')).toBeInTheDocument();
  });
});
