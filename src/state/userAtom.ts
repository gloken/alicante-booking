import { atom } from 'jotai';
import { User } from 'firebase/auth';

export type Role = 'ADMIN' | 'OWNER' | 'GUEST';

export interface BookingUser {
  user: User;
  name: string;
  email: string;
  roles: Role[];
}

export const userAtom = atom<BookingUser | null>(null);
