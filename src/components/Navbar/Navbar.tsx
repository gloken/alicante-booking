import React from "react";
import Link from "next/link";

type NavbarProps = {}

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <div className="flex items-center justify-between px-2 sm:px-12 md:px-24">
            <Link href="/" className="flex items-center justify-center h-20">
                Next.js
            </Link>
            <div className="flex items-center">
                <button
                    className="bg-brand-orange text-white px-2 sm:px-4 rounded-md text-sm font-medium border-2 border-transparent hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange transition duration-300 ease-in-out">
                    Logg inn
                </button>
            </div>
        </div>
    );
}

export default Navbar;
