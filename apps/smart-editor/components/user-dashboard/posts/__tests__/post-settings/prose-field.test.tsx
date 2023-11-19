import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@smart-editor/utils/testing/test-utils';

import { useParams } from 'next/navigation';

import { ProseField } from '../../post-settings/fields/prose-field';
import { useUpdatePost } from '../../posts.hooks';

const mockPostId = 'mockPostId';
const mockTitle = 'mockTitle';
const mockDescription = 'mockDescription';
const mockMutate = jest.fn();

jest.mock('next/navigation');
jest.mock('../../posts.hooks');

(useParams as jest.Mock).mockReturnValue({
  postId: mockPostId,
});

(useUpdatePost as jest.Mock).mockReturnValue({
  mutateAsync: mockMutate,
});

describe('<ProseField />', () => {
  it('should render the expected content', () => {
    render(<ProseField title={mockTitle} description={mockDescription} />);

    expect(
      screen.getByRole('heading', { name: 'Title and description' })
    ).toBeInTheDocument();

    expect(screen.getByRole('textbox', { name: 'Title' })).toHaveValue(
      mockTitle
    );
    expect(screen.getByRole('textbox', { name: 'Description' })).toHaveValue(
      mockDescription
    );
  });

  it("save button shuold be disabled if title and description don't change", () => {
    render(<ProseField title={mockTitle} description={mockDescription} />);

    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('save button shuold be enabled if title and description change', () => {
    render(<ProseField title={mockTitle} description={mockDescription} />);

    const titleInput = screen.getByRole('textbox', { name: 'Title' });

    fireEvent.change(titleInput, { target: { value: 'newTitle' } });

    expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled();
  });

  it("should call 'updatePost' on click on 'Save'", async () => {
    render(<ProseField title={mockTitle} description={mockDescription} />);

    const titleInput = screen.getByRole('textbox', { name: 'Title' });

    fireEvent.change(titleInput, { target: { value: 'newTitle' } });

    const button = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        postId: mockPostId,
        data: {
          title: 'newTitle',
          description: mockDescription,
        },
      });
    });
  });
});
