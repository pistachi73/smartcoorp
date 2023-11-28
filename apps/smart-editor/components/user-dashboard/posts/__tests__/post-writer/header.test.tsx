import { fromContentToJSON } from '@smart-editor/utils/from-content-to-json';
import {
  fireEvent,
  render,
  screen,
} from '@smart-editor/utils/testing/test-utils';

import { Header } from '../../post-writer/header/header';
import { SavingStatus } from '../../post-writer/post-writer';

const mockUserId = 'mockUserId';
const mockPostId = 'mockPostId';
const mockName = 'mockName';

jest.mock('@smart-editor/utils/from-content-to-json');
jest.mock('next/navigation', () => ({
  useParams: () => ({
    postId: mockPostId,
  }),
}));
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      id: mockUserId,
      user: {
        name: mockName,
      },
    },
    status: 'authenticated',
  }),
}));

describe('<PostWriterHeader />', () => {
  it('should render expected content', () => {
    render(<Header saving="unsaved" />);

    expect(screen.getByText(mockName)).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'Back to settings' })
    ).toHaveAttribute('href', `/posts/${mockPostId}`);

    expect(
      screen.getByRole('button', { name: 'Export JSON' })
    ).toBeInTheDocument();
  });
  it.each<{
    saving: SavingStatus;
    savingText: string;
  }>([
    {
      saving: 'saving',
      savingText: 'Saving...',
    },
    {
      saving: 'saved',
      savingText: 'Saved',
    },
    {
      saving: 'unsaved',
      savingText: '',
    },
  ])(
    'should render expected saving text for $saving status',
    ({ saving, savingText }) => {
      render(<Header saving={saving} />);

      if (saving === 'unsaved') {
        expect(screen.queryByTestId('saving-text')).not.toBeInTheDocument();
      } else {
        expect(screen.getByTestId('saving-text')).toHaveTextContent(savingText);
      }
    }
  );

  it('should export json file when clicking on the export button', () => {
    const title = 'mockTitle';
    const content = 'mockContent';
    render(<Header saving="unsaved" title={title} content={content} />);

    const button = screen.getByRole('button', { name: 'Export JSON' });
    fireEvent.click(button);

    expect(fromContentToJSON).toHaveBeenCalledWith({
      title,
      content,
    });
  });
});
