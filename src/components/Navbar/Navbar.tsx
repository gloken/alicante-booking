"use client";

import React from "react";
import {useAtom} from "jotai";
import {signOut} from "firebase/auth";
import {auth} from "@/firebase/firebase";
import {userAtom} from "@/state/userAtom";
import {authModalState} from "@/state/authModalState";

type NavbarProps = {}

const Navbar: React.FC<NavbarProps> = () => {
    const [bookingUser] = useAtom(userAtom);
    const [authModal, setAuthModal] = useAtom(authModalState);

    const handleSignOut = () => {
        signOut(auth);
    };

    const handleSignIn = () => {
        setAuthModal({...authModal, isOpen: true});
    }

    const getInitials = (name: string): string => {
        const initials = name.split(' ').map(([first]) => first).join('');
        return initials.toUpperCase();
    };

    return (
        <div className="flex items-center justify-between px-2 sm:px-12 md:px-24 border-blue-500 border-2 h-16">
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
                                className="h-8 w-8 rounded-full mr-2 cursor-pointer hover:opacity-75 hover:border-2 hover:border-yellow-500 transition duration-300 ease-in-out"
                                onClick={handleSignOut}
                            />
                        ) : (
                            <div
                                title={`Logg ut ${bookingUser.name}`}
                                className="h-8 w-8 rounded-full mr-2 cursor-pointer hover:opacity-75 hover:border-2 hover:border-yellow-500 transition duration-300 ease-in-out flex items-center justify-center bg-gray-500 text-white font-extrabold"
                                onClick={handleSignOut}
                            >
                                {getInitials(bookingUser.name)}
                            </div>
                        )
                        }
                    </div>
                ) : (
                    <div>
                        <button
                            onClick={handleSignIn}
                            className="bg-blue-500 text-white px-2 sm:px-4 rounded-md text-sm font-medium border-2 border-transparent hover:text-blue-500 hover:bg-yellow-500 hover:border-2 hover:border-blue-500 transition duration-300 ease-in-out"
                        >
                            Logg inn
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
