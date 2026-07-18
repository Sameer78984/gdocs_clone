import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';
import { ConflictError, AuthenticationError } from '../../core/errors';
import { RegisterInput, LoginInput } from './auth.schema';
import { toUserDTO, UserDTO } from './utils/user.mapper';
import { generateToken } from '../../lib/jwt';
import { AUTH_CONSTANTS } from './constants/auth.constants';

export class AuthService {
  async register(data: RegisterInput): Promise<{ user: UserDTO; token: string }> {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(data.password, AUTH_CONSTANTS.SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        passwordHash,
      },
    });

    const token = generateToken({ id: user.id, email: user.email });

    return { user: toUserDTO(user), token };
  }

  async login(data: LoginInput): Promise<{ user: UserDTO; token: string }> {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid email or password');
    }

    const token = generateToken({ id: user.id, email: user.email });

    return { user: toUserDTO(user), token };
  }
}

export const authService = new AuthService();
