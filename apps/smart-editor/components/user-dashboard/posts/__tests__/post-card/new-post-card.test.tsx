import {
  fireEvent,
  render,
  screen,
} from '@smart-editor/utils/testing/test-utils';

import { NewPostCard } from '../../post-card';
import { useCreatePost } from '../../posts.hooks';

jest.mock('../../posts.hooks');

const mockMutate = jest.fn();
(useCreatePost as jest.Mock).mockReturnValue({
  mutate: mockMutate,
  isLoading: false,
});

describe('<NewPostCard />', () => {
  it("should render 'Embark on a New Journey' content", () => {
    const totalPosts = 2;
    render(<NewPostCard totalPosts={totalPosts} />);

    expect(screen.getByText('Embark on a New Journey')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Craft, Share, and Publish Your Unique Stories – Write a New Post Today'
      )
    ).toBeInTheDocument();
    expect(screen.getByText(`${totalPosts} / 5`)).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Upgrade Now' })
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    expect(mockMutate).toHaveBeenCalled();
  });
  it("should render 'You've Reached Your Post Limit' content", () => {
    render(<NewPostCard totalPosts={5} />);

    expect(
      screen.getByText("You've Reached Your Post Limit")
    ).toBeInTheDocument();
    expect(
      screen.getByText('Upgrade to Premium to Write More Posts')
    ).toBeInTheDocument();

    expect(screen.getByText('5 / 5')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(
      screen.getByRole('link', { name: 'Upgrade Now' })
    ).toBeInTheDocument();
  });
});
