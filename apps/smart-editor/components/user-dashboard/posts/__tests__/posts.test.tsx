import { render, screen } from '@smart-editor/utils/testing/test-utils';

import { mockPosts } from '../__mocks__';
import { Posts } from '../posts';
import { useCreatePost, useGetPosts } from '../posts.hooks';

jest.mock('../posts.hooks');
jest.mock('next/navigation');

jest.mock('../filters', () => ({
  Filters: () => <div data-testid="filters" />,
}));
jest.mock('../post-card', () => ({
  PostCard: () => <div data-testid="post-card" />,
  NewPostCard: () => <div data-testid="new-post-card" />,
  SkeletonPostCard: () => <div data-testid="skeleton-post-card" />,
}));

(useCreatePost as jest.Mock).mockReturnValue({
  mutate: jest.fn(),
  isLoading: false,
});

describe('<Posts />', () => {
  it('should render the expected number of <PostCard /> and 1 <NewPostCard />', () => {
    (useGetPosts as jest.Mock).mockReturnValue({
      data: {
        posts: mockPosts,
        count: 3,
      },
    });
    render(<Posts />);

    expect(screen.getByTestId('filters')).toBeInTheDocument();
    expect(screen.getAllByTestId('post-card')).toHaveLength(3);
    expect(screen.getByTestId('new-post-card')).toBeInTheDocument();
  });

  it('should render 3 <SkeletonPostCard /> component if loading', () => {
    (useGetPosts as jest.Mock).mockReturnValue({
      isLoading: true,
    });
    render(<Posts />);

    expect(screen.getAllByTestId('skeleton-post-card')).toHaveLength(3);
  });

  it("should render <InternalServerError /> if 'error' is defined", () => {
    (useGetPosts as jest.Mock).mockReturnValue({
      error: 'error',
    });

    render(<Posts />);

    expect(screen.getByText('Internal Server Error')).toBeInTheDocument();
  });
});
