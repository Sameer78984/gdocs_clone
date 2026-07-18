import { User } from '@prisma/client';

export interface UserDTO {
  id: string;
  name: string;
  email: string;
}

export const toUserDTO = (user: User): UserDTO => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};
