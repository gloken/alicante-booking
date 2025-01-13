import React, {useEffect} from "react";
import {IoClose} from "react-icons/io5";
import {auth} from "@/firebase/firebase";
import {useAtom} from "jotai";
import {authModalState} from "@/state/authModalState";
import {userAtom} from "@/state/userAtom";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import {User} from "firebase/auth";
import {createBookingUser} from "@/utils/createBookingUser";
import {PacmanLoader} from "react-spinners";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
    const [authModal, setAuthModal] = useAtom(authModalState);
    const [, setUser] = useAtom(userAtom);
    const [signInWithGoogle, userCredential, loading, error] = useSignInWithGoogle(auth);

    const closeModal = () => {
        setAuthModal({...authModal, isOpen: false, type: 'login'});
    }

    useEffect(() => {
        const storeUserInContext = async (user: User) => {
            const bookingUser = await createBookingUser(user);
            if (bookingUser) {
                setUser(bookingUser);
                closeModal();
            } else {
                alert('Kunne ikke logge inn. Snakk med nerden som lagde denne appen.');
            }
        };

        if (userCredential) {
            storeUserInContext(userCredential.user);
        }
    }, [userCredential]);

    return (
        <>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60"
                 onClick={closeModal}
            ></div>
            <div
                className="w-full sm:w-[450px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center">
                <div className="relative w-full h-full mx-auto flex items-center justify-center">
                    <div
                        className="bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-brand-orange to-slate-900 mx-6">
                        <div className="flex justify-end p-2">
                            <button
                                type="button"
                                className="bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white"
                                onClick={closeModal}
                            >
                                <IoClose className="h-5 w-5"/>
                            </button>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center">
                                <PacmanLoader size={35} color={"#ffffff"} loading={loading}/>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col justify-center my-4 gap-4">
                                    <button
                                        onClick={() => signInWithGoogle()}
                                        className="flex items-center bg-white text-black px-4 py-2 rounded-md shadow-md border border-black hover:bg-gray-100 mx-8"
                                    >
                                        <img
                                            src="https://developers.google.com/identity/images/g-logo.png"
                                            alt="Google logo"
                                            className="h-5 w-5 mr-2"
                                        />
                                        Logg inn med Google
                                    </button>
                                    <button
                                        className="flex items-center bg-white text-black px-4 py-2 rounded-md shadow-md border border-black hover:bg-gray-100 mx-8"
                                    >
                                        <img
                                            src="/ms-symbollockup_mssymbol_19.svg"
                                            alt="Microsoft logo"
                                            className="h-5 w-5 mr-2"
                                        />
                                        Logg inn for Bessa
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthModal;
