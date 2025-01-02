import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import AuthModal from "@/components/Modals/AuthModal";

type AuthPageProps = {

}

const AuthPage: React.FC<AuthPageProps> = () => {
    return (
        <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
            <div className="max-w-7xl mx-auto">
                <Navbar />
                <AuthModal />
            </div>
        </div>
    );
}

export default AuthPage;
