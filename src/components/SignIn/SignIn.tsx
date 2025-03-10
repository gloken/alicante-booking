import React, { useRef } from 'react';
import SignInForm from '@/components/SignIn/SignInForm.tsx';

type SignInProps = object;

const SignIn: React.FC<SignInProps> = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => dialogRef.current?.showModal();

  return (
    <>
      <div>
        <button className="btn btn-secondary" onClick={openModal}>
          Logg inn
        </button>
      </div>

      <dialog className="modal" ref={dialogRef}>
        <div className="modal-box w-full max-w-3xl p-0">
          <div className="card lg:card-side bg-base-100">
            <figure className="hidden w-1/2 lg:flex">
              <img
                src="/ch38-front.jpg"
                alt="Calle Händel 38"
                className="h-full w-full object-cover"
              />
            </figure>
            <div className="card-body w-full p-2 lg:w-1/2">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute top-1 right-1">
                  x
                </button>
              </form>
              <div className="flex w-full justify-center">
                <h2 className="card-title">Logg inn</h2>
              </div>
              <SignInForm />
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop glass">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default SignIn;
