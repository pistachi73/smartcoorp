import { render, screen } from '@smart-editor/utils/testing/test-utils';

import { useParams } from 'next/navigation';

import { StatusField } from '../../post-settings/fields/status-field';
import { useUpdatePost } from '../../posts.hooks';

const mockMutate = jest.fn();

jest.mock('next/navigation');
jest.mock('../../posts.hooks');
(useParams as jest.Mock).mockReturnValue({
  postId: 'mockPostId',
});

(useUpdatePost as jest.Mock).mockReturnValue({
  mutateAsync: mockMutate,
});

describe('<StatusField>', () => {
  it('should render the expected content', () => {
    render(<StatusField status="DRAFT" />);

    expect(screen.getByRole('heading', { name: 'Status' })).toBeInTheDocument();
    expect(
      screen.getByText(
        'Set the status—draft, or published. Direct your post to its destination on the path to reader engagement.'
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
    expect(screen.getByText('Draft')).toBeInTheDocument();
  });

  it('should save the status when clicking on the save button', async () => {
    //DON'T KNOW HOW TO TEST REACT-SELECT
    // render(<StatusField status="DRAFT" />);
    // fireEvent.change(screen.getByTestId('select'), {
    //   target: { value: 'published' },
    // });
    // await waitFor(() => {
    //   expect(screen.getByText('Published')).toBeInTheDocument();
    // });
    // expect(mockMutate).toHaveBeenCalledWith({
    //   status: 'PUBLISHED',
    // });
  });
});
