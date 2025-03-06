import React from 'react';
import { useAtom } from 'jotai';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { userAtom } from '../../state/userAtom';
import { authModalState } from '../../state/authModalState';

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
    <div className="flex h-16 items-center justify-between border-2 border-blue-500 px-2 sm:px-12 md:px-24">
      <div className="flex items-center">
        Løkens Bookingkalender - Gran Vista
      </div>
      <div className="ml-auto flex items-center">
        {bookingUser?.user ? (
          <div>
            {bookingUser.user.photoURL ? (
              <img
                src={bookingUser.user.photoURL}
                title={`Logg ut ${bookingUser.name}`}
                alt={`Profilbilde av ${bookingUser.name}`}
                className="mr-2 h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out hover:border-2 hover:border-yellow-500 hover:opacity-75"
                onClick={handleSignOut}
              />
            ) : (
              <div
                title={`Logg ut ${bookingUser.name}`}
                className="mr-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-500 font-extrabold text-white transition duration-300 ease-in-out hover:border-2 hover:border-yellow-500 hover:opacity-75"
                onClick={handleSignOut}
              >
                {getInitials(bookingUser.name)}
              </div>
            )}
          </div>
        ) : (
          <div>
            <button
              onClick={handleSignIn}
              className="rounded-md border-2 border-transparent bg-blue-500 px-2 text-sm font-medium text-white transition duration-300 ease-in-out hover:border-2 hover:border-blue-500 hover:bg-yellow-500 hover:text-blue-500 sm:px-4"
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
