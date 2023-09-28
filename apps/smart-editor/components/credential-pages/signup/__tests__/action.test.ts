import { prismaMock } from '@smart-editor/utils/testing/prisma-mock';

import { signupAction } from '../action';

const mockSend = jest.fn();

const mockUser: any = {
  id: 1,
  name: 'name',
  email: 'email',
};

const mockToken: any = {
  token: 'token',
};

jest.mock('resend', () => ({
  __esModule: true,
  ...jest.requireActual('resend'),

  Resend: class {
    constructor() {
      return {
        emails: {
          send: mockSend,
        },
      };
    }
  },
}));

beforeEach(() => {
  jest.resetAllMocks();
});

describe('<Signup /> Action', () => {
  it('should throw error if user already exists', async () => {
    prismaMock.eUser.findFirst.mockResolvedValueOnce(mockUser);

    const result = await signupAction({
      email: 'email',
      name: 'name',
      password: 'password',
    });

    expect(result).toEqual({
      error: 'User already exists.',
    });
  });

  it('should throw error if user is not created', async () => {
    prismaMock.eUser.findFirst.mockResolvedValueOnce(null);
    prismaMock.eUser.create.mockResolvedValueOnce(null as any);

    const result = await signupAction({
      email: 'email',
      name: 'name',
      password: 'password',
    });

    expect(result).toEqual({
      error: 'Error creating user.',
    });
  });

  it('should throw error if token is not created', async () => {
    prismaMock.eUser.findFirst.mockResolvedValueOnce(null);
    prismaMock.eUser.create.mockResolvedValueOnce(mockUser);
    prismaMock.eAccountVerificationToken.create.mockResolvedValueOnce(
      null as any
    );

    const result = await signupAction({
      email: 'email',
      name: 'name',
      password: 'password',
    });

    expect(result).toEqual({
      error: 'Error creating activation token.',
    });
  });

  it('should throw error if email is not sent', async () => {
    mockSend.mockRejectedValueOnce(new Error('error'));
    prismaMock.eUser.findFirst.mockResolvedValueOnce(null);
    prismaMock.eUser.create.mockResolvedValueOnce(mockUser);
    prismaMock.eAccountVerificationToken.create.mockResolvedValueOnce(
      mockToken
    );

    const result = await signupAction({
      email: 'email',
      name: 'name',
      password: 'password',
    });

    expect(result).toEqual({
      error: 'Error sending email',
    });
  });

  it('should return success if email is sent', async () => {
    mockSend.mockResolvedValueOnce(null);
    prismaMock.eUser.findFirst.mockResolvedValueOnce(null);
    prismaMock.eUser.create.mockResolvedValueOnce(mockUser);
    prismaMock.eAccountVerificationToken.create.mockResolvedValueOnce(
      mockToken
    );

    const result = await signupAction({
      email: 'email',
      name: 'name',
      password: 'password',
    });

    expect(result).toEqual({});
  });
});
