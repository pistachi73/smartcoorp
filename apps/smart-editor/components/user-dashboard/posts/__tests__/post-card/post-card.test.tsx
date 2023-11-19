import { EPostStatus } from '@prisma/client';
import { render, screen } from '@smart-editor/utils/testing/test-utils';

import { PostCard } from '../../post-card';
import { statusMapping } from '../../post-card/post-card';

const mockUserId = 'mockUserId';

const props = {
  id: '1',
  title: 'Test title',
  wordCount: 500,
  updatedAt: new Date(),
  status: EPostStatus.DRAFT,
  coverImageUrl: 'https://test.com/test.jpg',
  content: 'Test content',
};

jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      id: mockUserId,
    },
  }),
}));

describe('<PostCard />', () => {
  it('should render the component', () => {
    render(<PostCard {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.wordCount)).toBeInTheDocument();
    expect(
      screen.getByText(statusMapping[props.status as EPostStatus])
    ).toBeInTheDocument();

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should render no status', () => {
    render(<PostCard {...props} status={undefined} />);

    expect(
      screen.queryByText(statusMapping[props.status as EPostStatus])
    ).not.toBeInTheDocument();
    expect(screen.getByText('No status')).toBeInTheDocument();
  });

  it('should render placeholder cover image', () => {
    render(<PostCard {...props} coverImageUrl={null} />);

    const image = screen.queryByRole('img');
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('cover-image-placeholder.webp')
    );
  });

  it("should render 'wainting for update' status", () => {
    render(<PostCard {...props} updatedAt={undefined} />);

    expect(
      screen.getByText('Last updated: Waiting for updates')
    ).toBeInTheDocument();
  });

  it("post title should be a link to the post's edit page", () => {
    render(<PostCard {...props} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/posts/${props.id}`);
  });
});
