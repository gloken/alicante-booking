import React from 'react';
import { useAtom } from 'jotai';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase.ts';
import { userAtom } from '@/state/userAtom.ts';
import { authModalState } from '@/state/authModalState.ts';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';

type NavbarProps = object;

const Navbar: React.FC<NavbarProps> = () => {
  const [bookingUser] = useAtom(userAtom);
  const [authModal, setAuthModal] = useAtom(authModalState);

  const handleSignOut = () => {
    signOut(auth);
  };

  const handleSignIn = () => {
    setAuthModal({ ...authModal, isOpen: true });
  };

  const getInitials = (name: string): string => {
    const initials = name
      .split(' ')
      .map(([first]) => first)
      .join('');
    return initials.toUpperCase();
  };

  return (
    <div className="bg-tan-700 text-tan-100 flex h-16 items-center justify-between px-2 sm:px-12 md:px-24">
      <div className="flex items-center">
        Løkens Bookingkalender - Gran Vista
      </div>
      <div className="ml-auto flex items-center">
        {bookingUser?.user ? (
          <div onClick={handleSignOut} className="cursor-pointer">
            <Avatar
              className="hover:border-sunset-orange-700 hover:border-2"
              title="Logg ut"
            >
              <AvatarImage src={bookingUser.user.photoURL ?? ''} />
              <AvatarFallback>{getInitials(bookingUser.name)}</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <div>
            <button
              onClick={handleSignIn}
              className="bg-sunset-orange-500 hover:bg-sunset-orange-700 text-tan-100 rounded-lg px-4 py-2"
            >
              Logg inn
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
