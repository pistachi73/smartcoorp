import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@smart-editor/utils/testing/test-utils';
import userEvent from '@testing-library/user-event';

import { mockApiKeys } from '../__mocks__';
import {
  useCreateApiKey,
  useDeleteApiKey,
  useGetApiKeys,
} from '../api-keys.hooks';
import { DeleteApiKeyDialog } from '../delete-api-key-dialog/delete-api-key-dialog';

jest.mock('../api-keys.hooks');

const mockMutate = jest.fn();

describe('<DeleteApiKeyDialog />', () => {
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
      mutate: mockMutate,
      isLoading: false,
    });

    render(
      <DeleteApiKeyDialog
        isOpen={true}
        setIsOpen={jest.fn()}
        toDeleteApiKeys={mockApiKeys}
      />
    );
  });

  it('should render the component', () => {
    expect(
      screen.getByText('Are you sure you want to delete this api keys?')
    ).toBeInTheDocument();

    mockApiKeys.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
    expect(screen.getByText('Yes, delete')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();

    expect(useDeleteApiKey).toHaveBeenCalledWith({
      onSuccess: expect.any(Function),
    });
  });

  it("should call 'deleteApiKey' on click on 'Yes, delete'", async () => {
    userEvent.setup();

    const deleteApiKeysButton = screen.getByRole('button', {
      name: 'Yes, delete',
    });

    expect(deleteApiKeysButton).toBeInTheDocument();

    fireEvent.click(deleteApiKeysButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        apiKeyIds: mockApiKeys.map(({ id }) => id),
      });
    });
  });
});
