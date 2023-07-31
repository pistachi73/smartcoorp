import { User } from '@prisma/client';

export const mockUsers: User[] = [
  {
    id: 1,
    email: 'email1@email.com',
    username: 'username1',
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
    profileImageUrl: null,
    password: 'password1',
  },
  {
    id: 2,
    email: 'email2@email.com',
    username: 'username2',
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
    profileImageUrl: null,
    password: 'password2',
  },
];
