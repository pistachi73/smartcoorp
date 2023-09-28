import { prismaMock } from '@smart-editor/utils/testing/prisma-mock';

import { resetPasswordAction } from '../action';

beforeEach(jest.resetAllMocks);

describe('<ResetPassword /> Action', () => {
  it('should throw error if passwords are different', async () => {
    const result = await resetPasswordAction(
      {
        password: 'password',
        confirmPassword: 'password1',
      },
      'token'
    );

    expect(result).toEqual({
      error: 'Passwords do not match. Please try again.',
    });
  });

  it('should throw error if passwordResetToken is not found', async () => {
    prismaMock.ePasswordResetToken.findUnique.mockResolvedValueOnce(null);

    const result = await resetPasswordAction(
      {
        password: 'password',
        confirmPassword: 'password',
      },
      'token'
    );

    expect(result).toEqual({
      error: 'Invalid or expired password reset token.',
    });
  });

  it('should throw error if user update or token update fails', async () => {
    prismaMock.ePasswordResetToken.findUnique.mockResolvedValueOnce({
      token: 'token',
    } as any);

    prismaMock.$transaction.mockRejectedValueOnce(new Error());

    const result = await resetPasswordAction(
      {
        password: 'password',
        confirmPassword: 'password',
      },
      'token'
    );

    expect(result).toEqual({
      error: 'Something went wrong. Please try again.',
    });
  });

  it('should return success if user and token are updated', async () => {
    prismaMock.ePasswordResetToken.findUnique.mockResolvedValueOnce({
      token: 'token',
    } as any);

    const result = await resetPasswordAction(
      {
        password: 'password',
        confirmPassword: 'password',
      },
      'token'
    );

    expect(result).toEqual({});
  });
});
