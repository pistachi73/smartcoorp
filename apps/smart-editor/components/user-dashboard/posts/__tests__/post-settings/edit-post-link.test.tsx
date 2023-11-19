import { render, screen } from '@smart-editor/utils/testing/test-utils';

import { useParams } from 'next/navigation';

import { EditPostLink } from '../../post-settings/fields/edit-post-link';

jest.mock('next/navigation');

const mockPostId = 'mockPostId';
(useParams as jest.Mock).mockReturnValue({
  postId: mockPostId,
});

describe('<EditPostLink />', () => {
  it('should render the expected content', () => {
    render(<EditPostLink />);
    expect(
      screen.getByRole('heading', { name: 'Edit blog post content' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/posts/${mockPostId}/edit`
    );

    expect(
      screen.getByText(
        'Edit the content of your blog post. This link will open the editor in a new tab.'
      )
    ).toBeInTheDocument();
  });
});
