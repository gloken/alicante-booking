import React from "react";
import { useAtom } from "jotai";
import { authModalState } from "@/state/authModalState";

type LoginProps = {

}

const Login: React.FC<LoginProps> = () => {
    const [authModal, setAuthModal] = useAtom(authModalState);

    const resetPassword = () => {
        setAuthModal({...authModal, type: 'forgot-password'});
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-medium text-white">Logg inn</h1>
            <form className="space-y-6 px-6 py-4">
                <div>
                    <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">E-post</label>
                    <input type="email" id="email" name="email"
                           className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-grau-600 border-gray-500 placeholder-gray-400 text-white"/>
                </div>
                <div>
                    <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">Passord</label>
                    <input type="password" id="password" name="password"
                           className="border-2 outline-nßone sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-grau-600 border-gray-500 placeholder-gray-400 text-white"/>
                </div>
                <button type="submit"
                        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s">Logg
                    inn
                </button>
                <button className='flex w-full justify-end'
                        onClick={resetPassword}
                >
                    <a href='#' className='text-sm block text-brand-orange hover:underline w-full text-right'>
                        Glemt passordet?
                    </a>
                </button>
            </form>
        </div>
    );
}

export default Login;
