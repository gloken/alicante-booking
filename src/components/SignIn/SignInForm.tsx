import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai/index';
import { userAtom } from '@/state/userAtom.ts';
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase.ts';
import { User } from 'firebase/auth';
import { createBookingUser } from '@/utils/createBookingUser.ts';
import { PacmanLoader } from 'react-spinners';

type SignInFormProps = object;

const SignInForm: React.FC<SignInFormProps> = () => {
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

  useEffect(() => {
    const storeUserInContext = async (user: User) => {
      const bookingUser = await createBookingUser(user);
      if (bookingUser) {
        setUser(bookingUser);
        // closeModal();
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
    <div>
      {loading ? (
        <div className="flex items-center justify-center">
          <PacmanLoader size={35} color={'#ffffff'} loading={loading} />
        </div>
      ) : (
        <>
          <div className="my-4 flex flex-col gap-4">
            <button
              onClick={() => signInWithGoogle()}
              className="btn btn-outline btn-primary"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="mr-2 h-5 w-5"
              />
              Logg inn med Google
            </button>

            <form onSubmit={handleLogin}>
              <h1 className="text-xl font-medium">
                Logg inn med e-post/passord
              </h1>
              <div className="border-secondary rounded-lg border p-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">E-post</legend>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="input input-bordered"
                    onChange={handleInputChange}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Passord</legend>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="input input-bordered"
                    onChange={handleInputChange}
                  />
                </fieldset>
                <button type="submit" className="btn btn-primary mt-4 w-full">
                  Logg inn
                </button>
                <button
                  className="btn btn-link mt-2 w-full"
                  onClick={() => alert('Click')}
                >
                  Glemt passordet?
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default SignInForm;
