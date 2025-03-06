import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { auth } from '../firebase/firebase';
import { useAtom } from 'jotai';
import { authModalState } from '../state/authModalState';
import { userAtom } from '../state/userAtom';
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
import { createBookingUser } from '../utils/createBookingUser';
import { PacmanLoader } from 'react-spinners';

type AuthModalProps = object;

const AuthModal: React.FC<AuthModalProps> = () => {
  const [authModal, setAuthModal] = useAtom(authModalState);
  const [, setUser] = useAtom(userAtom);
  const [signInWithGoogle, userCredential, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  const [inputs, setInputs] = useState({ email: '', password: '' });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useSignInWithEmailAndPassword(auth);

  if (googleError) console.log(googleError);
  if (emailError) console.log(emailError);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password)
      return alert('Please fill all fields');
    try {
      const newUser = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
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
    setAuthModal({ ...authModal, isOpen: false, type: 'login' });
  };

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
      <div
        className="bg-opacity-60 absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black"
        onClick={closeModal}
      ></div>
      <div className="absolute top-[50%] left-[50%] flex w-full translate-x-[-50%] translate-y-[-50%] items-center justify-center sm:w-[450px]">
        <div className="relative mx-auto flex h-full w-full items-center justify-center">
          <div className="from-brand-orange relative mx-6 w-full rounded-lg bg-white bg-gradient-to-b to-slate-900 shadow">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-white hover:bg-gray-800 hover:text-white"
                onClick={closeModal}
              >
                <IoClose className="h-5 w-5" />
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center">
                <PacmanLoader size={35} color={'#ffffff'} loading={loading} />
              </div>
            ) : (
              <>
                <div className="my-4 flex flex-col justify-center gap-4">
                  <button
                    onClick={() => signInWithGoogle()}
                    className="mx-8 flex items-center rounded-md border border-black bg-white px-4 py-2 text-black shadow-md hover:bg-gray-100"
                  >
                    <img
                      src="https://developers.google.com/identity/images/g-logo.png"
                      alt="Google logo"
                      className="mr-2 h-5 w-5"
                    />
                    Logg inn med Google
                  </button>

                  <form className="px-6" onSubmit={handleLogin}>
                    <h1 className="text-xl font-medium text-white">
                      Logg inn med e-post/passord
                    </h1>
                    <div className="space-y-6 border px-6 pt-2 pb-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-gray-300"
                        >
                          E-post
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="block w-full rounded-lg border-2 border-gray-500 bg-gray-600 p-2.5 text-white placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="mb-2 block text-sm font-medium text-gray-300"
                        >
                          Passord
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="block w-full rounded-lg border-2 border-gray-500 bg-gray-600 p-2.5 text-white placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          onChange={handleInputChange}
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-brand-orange hover:bg-brand-orange-s w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-blue-300"
                      >
                        Logg inn
                      </button>
                      <button
                        className="flex w-full justify-end"
                        onClick={() => alert('Click')}
                      >
                        <a
                          href="#"
                          className="text-brand-orange block w-full text-right text-sm hover:underline"
                        >
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
};

export default AuthModal;
