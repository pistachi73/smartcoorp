import { prismaMock } from '@smart-editor/utils/testing/prisma-mock';

import { forgotPasswordAction } from '../action';

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

describe('<ForgotPassword /> Action', () => {
  it('should throw error if email is not registered', async () => {
    prismaMock.eUser.findUnique.mockResolvedValueOnce(null);

    const result = await forgotPasswordAction({ email: 'email' });

    expect(result).toEqual({
      error: 'This email is not registered.',
    });
  });

  it('should throw error if token is not created', async () => {
    prismaMock.eUser.findUnique.mockResolvedValueOnce(mockUser);
    prismaMock.ePasswordResetToken.create.mockResolvedValueOnce(null as any);

    const result = await forgotPasswordAction({ email: 'email' });

    expect(result).toEqual({
      error: 'Error creating password reset token',
    });
  });

  it('should throw error if email is not sent', async () => {
    mockSend.mockRejectedValueOnce(new Error('error'));
    prismaMock.eUser.findUnique.mockResolvedValueOnce(mockUser);
    prismaMock.ePasswordResetToken.create.mockResolvedValueOnce(mockToken);

    const result = await forgotPasswordAction({ email: 'email' });

    expect(result).toEqual({
      error: 'Error sending email',
    });
  });

  it('should return empty object if email is sent', async () => {
    mockSend.mockResolvedValue('yay');
    prismaMock.eUser.findUnique.mockResolvedValueOnce(mockUser);
    prismaMock.ePasswordResetToken.create.mockResolvedValueOnce(mockToken);

    const result = await forgotPasswordAction({ email: 'email' });

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith({
      from: 'SmartEditor <noreply@cookiecoaching.com>',
      to: ['email'],
      subject: 'Reset your password',
      react: expect.anything(),
    });

    expect(result).toEqual({});
  });
});
