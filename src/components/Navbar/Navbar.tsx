import React from 'react';
import { useAtom } from 'jotai';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase.ts';
import { userAtom } from '@/state/userAtom.ts';
import SignIn from '@/components/SignIn/SignIn.tsx';
import Avatar from '@/components/Avatar/Avatar.tsx';

type NavbarProps = object;

const Navbar: React.FC<NavbarProps> = () => {
  const [bookingUser] = useAtom(userAtom);

  const handleSignOut = () => {
    signOut(auth);
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
          <Avatar
            photoUrl={bookingUser?.user.photoURL}
            name={bookingUser?.user?.displayName ?? 'NN'}
            onClick={handleSignOut}
          />
        ) : (
          <SignIn />
        )}
      </div>
    </div>
  );
};

export default Navbar;
