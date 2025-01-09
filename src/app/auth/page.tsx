'use client';

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import AuthModal from "@/components/Modals/AuthModal";
import {useAtom} from "jotai";
// import {counterAtom} from "@/state/authModalState";
import {authModalState} from "@/state/authModalState";

type AuthPageProps = {}

const AuthPage: React.FC<AuthPageProps> = () => {
    const [authModal, setAuthModal] = useAtom(authModalState);

    return (
        <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
            <div className="max-w-7xl mx-auto">
                <Navbar />
                {authModal.isOpen && <AuthModal/>}
            </div>
        </div>
    );
}

export default AuthPage;
