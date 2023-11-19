import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@smart-editor/utils/testing/test-utils';

import { useParams } from 'next/navigation';

import { DeletePostField } from '../../post-settings/fields/delete-post-field';

jest.mock('next/navigation');
jest.mock('next-auth/react');

(useParams as jest.Mock).mockReturnValue({
  postId: 'mockPostId',
});

describe('<DeletePostField />', () => {
  it('should render the expected content', async () => {
    render(<DeletePostField />);

    expect(
      screen.getByRole('heading', { name: 'Delete post' })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Deleting the post will permanently remove all it's data and content."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Delete post' })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Delete post' }));

    await waitFor(() => {
      expect(
        screen.getByText('This action cannot be undone.')
      ).toBeInTheDocument();
    });
  });
});
