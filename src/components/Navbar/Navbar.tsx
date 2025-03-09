import React from 'react';
import { useAtom } from 'jotai';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase.ts';
import { userAtom } from '@/state/userAtom.ts';
import { authModalState } from '@/state/authModalState.ts';

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
    <div className="navbar bg-base-200 text-base-content">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl normal-case">
          Løkens Bookingkalender - Gran Vista
        </a>
      </div>
      <div className="navbar-end">
        {bookingUser?.user ? (
          <div>
            {bookingUser.user.photoURL ? (
              <img
                src={bookingUser.user.photoURL}
                title={`Logg ut ${bookingUser.name}`}
                alt={`Profilbilde av ${bookingUser.name}`}
                className="avatar h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out hover:border-2 hover:border-yellow-500 hover:opacity-75"
                onClick={handleSignOut}
              />
            ) : (
              <div
                title={`Logg ut ${bookingUser.name}`}
                className="avatar placeholder flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-500 text-white transition duration-300 ease-in-out hover:border-2 hover:border-yellow-500 hover:opacity-75"
                onClick={handleSignOut}
              >
                {getInitials(bookingUser.name)}
              </div>
            )}
          </div>
        ) : (
          <div>
            <button onClick={handleSignIn} className="btn btn-primary">
              Logg inn
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
