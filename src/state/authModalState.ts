import { atom } from 'jotai';

type AuthModalState = {
  isOpen: boolean;
  type: 'login' | 'register' | 'forgot-password';
};

const initialAuthModalState: AuthModalState = {
  isOpen: false,
  type: 'login',
};

export const authModalState = atom<AuthModalState>(initialAuthModalState);
