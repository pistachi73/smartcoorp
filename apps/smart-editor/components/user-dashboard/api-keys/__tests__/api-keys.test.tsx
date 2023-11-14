import {
  fireEvent,
  render,
  screen,
} from '@smart-editor/utils/testing/test-utils';

import { mockApiKeys } from '../__mocks__';
import { ApiKeys } from '../api-keys';
import {
  useCreateApiKey,
  useDeleteApiKey,
  useGetApiKeys,
} from '../api-keys.hooks';

jest.mock('@smartcoorp/ui/resizable-panel', () => ({
  ResizablePanel: () => <div>ResizablePanel</div>,
}));

jest.mock('../api-keys.hooks');
jest.mock('next/navigation');

const mockUserId = 'f863384294';

describe('<ApiKeys />', () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    (useGetApiKeys as jest.Mock).mockReturnValue({
      data: {
        apiKeys: mockApiKeys,
      },
    });

    (useCreateApiKey as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });

    (useDeleteApiKey as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });
  });

  it('should render the component', async () => {
    render(<ApiKeys userId={mockUserId} />);

    expect(screen.getByText('ResizablePanel')).toBeInTheDocument();

    mockApiKeys.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('should render <InternalServerError /> on error', async () => {
    (useGetApiKeys as jest.Mock).mockReturnValue({
      error: true,
    });

    render(<ApiKeys userId={mockUserId} />);

    expect(screen.getByTestId('internal-server-error')).toBeInTheDocument();
  });

  it("should open <CreateApiKeyDialog /> when clicking 'New' button", async () => {
    render(<ApiKeys userId={mockUserId} />);
    fireEvent.click(screen.getByText('New'));
    expect(screen.getByText('Create API Key')).toBeInTheDocument();
  });

  it("should open <DeleteApiKeyDialog /> when clicking 'Delete' button", async () => {
    const { container } = render(<ApiKeys userId={mockUserId} />);

    fireEvent.click(container.querySelector('#row1-checkbox') as HTMLElement);
    fireEvent.click(screen.getByTestId('delete-rows-button'));

    expect(
      screen.getByText('Are you sure you want to delete this api keys?')
    ).toBeInTheDocument();
  });
});
