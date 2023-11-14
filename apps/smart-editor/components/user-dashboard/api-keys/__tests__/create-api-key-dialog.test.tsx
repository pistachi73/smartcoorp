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
import { CreateApiKeyDialog } from '../create-api-key-dialog/create-api-key-dialog';

jest.mock('../api-keys.hooks');

const mockUserId = 'f863384294';

describe('<CreateApiKeyDialog />', () => {
  const getCreateApiKeyButton = () =>
    screen.getByRole('button', {
      name: 'Create API Key',
    });
  const getApiKeyTokenButton = () => screen.getByTestId('api-key-token');

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

    render(
      <CreateApiKeyDialog
        userId={mockUserId}
        isOpen={true}
        setIsOpen={jest.fn()}
      />
    );
  });

  it('should render the component', () => {
    expect(screen.getByText('Create API Key')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('API Key Token')).toBeInTheDocument();
    expect(screen.getByText('WARNING')).toBeInTheDocument();
    expect(useCreateApiKey).toHaveBeenCalledWith({
      onSuccess: expect.any(Function),
    });
  });

  it('create api key button should be disabled if key not copied', () => {
    userEvent.setup();
    const createApiKeyButton = getCreateApiKeyButton();
    const apiKeyTokenButton = getApiKeyTokenButton();
    expect(createApiKeyButton).toBeDisabled();
    fireEvent.click(apiKeyTokenButton);
    expect(createApiKeyButton).toBeEnabled();
  });

  it('should copy the api key when clicking token value button', async () => {
    userEvent.setup();
    const apiKeyTokenButton = getApiKeyTokenButton();

    fireEvent.click(apiKeyTokenButton);

    const clipboardText = await navigator.clipboard.readText();

    expect(clipboardText).toEqual(apiKeyTokenButton.textContent);
  });

  it("should show error if no name provided when clicking 'Create API Key' button", async () => {
    const mockMutate = jest.fn();
    (useCreateApiKey as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });

    fireEvent.click(getApiKeyTokenButton());
    fireEvent.click(getCreateApiKeyButton());

    expect(
      await screen.findByText('A name is required to create an API Key')
    ).toBeInTheDocument();

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("should call 'useCreateApiKey' hook when clicking 'Create API Key' button", async () => {
    userEvent.setup();

    const mockMutate = jest.fn();
    const mockName = 'mockName';
    (useCreateApiKey as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
    });

    const createApiKeyButton = getCreateApiKeyButton();
    const apiKeyTokenButton = getApiKeyTokenButton();
    const nameInput = screen.getByLabelText('Name');

    fireEvent.change(nameInput, { target: { value: mockName } });
    fireEvent.click(apiKeyTokenButton);
    fireEvent.click(createApiKeyButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        userId: mockUserId,
        apiKeyToken: apiKeyTokenButton.textContent,
        apiKeyName: mockName,
      });
    });
  });
});
