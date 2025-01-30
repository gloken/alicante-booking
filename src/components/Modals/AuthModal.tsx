import React, {useEffect, useState} from "react";
import {IoClose} from "react-icons/io5";
import {auth} from "@/firebase/firebase";
import {useAtom} from "jotai";
import {authModalState} from "@/state/authModalState";
import {userAtom} from "@/state/userAtom";
import {useSignInWithEmailAndPassword, useSignInWithGoogle} from "react-firebase-hooks/auth";
import {User} from "firebase/auth";
import {createBookingUser} from "@/utils/createBookingUser";
import {PacmanLoader} from "react-spinners";

type AuthModalProps = object;

const AuthModal: React.FC<AuthModalProps> = () => {
    const [authModal, setAuthModal] = useAtom(authModalState);
    const [, setUser] = useAtom(userAtom);
    const [signInWithGoogle, userCredential, googleLoading, googleError] = useSignInWithGoogle(auth);

    const [inputs, setInputs] = useState({ email: "", password: "" });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] = useSignInWithEmailAndPassword(auth);

    if (googleError) console.log(googleError);
    if (emailError) console.log(emailError);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) return alert("Please fill all fields");
        try {
            const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;
            // router.push("/");
        } catch (error: unknown) {
            // toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" });
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    };

    const loading = googleLoading || emailLoading;

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
                alert('Kunne ikke logge inn. Snakk med nerden som lagde dette greiene');
            }
        };

        if (userCredential) {
            storeUserInContext(userCredential.user);
        } else if (emailUser) {
            storeUserInContext(emailUser.user);
        }
    }, [userCredential, emailUser]);

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

                                    <form className="px-6" onSubmit={handleLogin}>
                                        <h1 className="text-xl font-medium text-white">Logg inn med
                                            e-post/passord</h1>
                                        <div className="border space-y-6 px-6 pb-4 pt-2">
                                            <div>
                                                <label htmlFor="email"
                                                       className="text-sm font-medium block mb-2 text-gray-300">E-post</label>
                                                <input type="email" name="email" id="email"
                                                       className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                                       onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="password"
                                                       className="text-sm font-medium block mb-2 text-gray-300">Passord</label>
                                                <input type="password" name="password" id="password"
                                                       className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                                       onChange={handleInputChange}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
                                            >
                                                Logg inn
                                            </button>
                                            <button className="flex w-full justify-end"
                                                    onClick={() => alert('Click')}>
                                                <a href="#"
                                                   className="text-sm block text-brand-orange hover:underline w-full text-right">
                                                    Glemt passordet?
                                                </a>
                                            </button>
                                        </div>
                                    </form>
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
