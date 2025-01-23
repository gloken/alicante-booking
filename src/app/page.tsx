"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import {useAtom} from "jotai";
import {authModalState} from "@/state/authModalState";
import AuthModal from "@/components/Modals/AuthModal";
import Calendar from "@/components/Calendar/Calendar";

export default function Home() {
    const [authModal] = useAtom(authModalState);

    return (
        <div className="flex flex-col min-h-screen">
            <header className="w-full">
                <Navbar/>
            </header>
            <main className="flex-grow flex flex-col items-center sm:items-start p-8 sm:p-20 gap-8">
                {authModal.isOpen && <AuthModal/>}
                <Calendar/>
            </main>
            <footer className="w-full flex gap-6 flex-wrap items-center justify-center p-8 sm:p-20">
                Nederst
            </footer>
        </div>
    );
}
