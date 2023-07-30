import { User } from '@prisma/client';

export const usersDataMock: User[] = [
  {
    id: 1,
    email: 'email1',
    username: 'username1',
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
    profileImageUrl: null,
    password: 'password1',
  },
  {
    id: 2,
    email: 'email2',
    username: 'username2',
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
    profileImageUrl: null,
    password: 'password2',
  },
];
