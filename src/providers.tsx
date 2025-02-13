import {Provider} from 'jotai';
import React, {ReactNode, useEffect} from 'react';
import {useSetAtom} from 'jotai';
import {onAuthStateChanged, setPersistence, browserLocalPersistence} from 'firebase/auth';
import {auth} from '@/firebase/firebase';
import {userAtom} from "@/state/userAtom";
import {createBookingUser} from "@/utils/createBookingUser";

const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const setUser = useSetAtom(userAtom);

    useEffect(() => {
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                const unsubscribe = onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        const bookingUser = await createBookingUser(user);
                        setUser(bookingUser);
                    } else {
                        setUser(null);
                    }
                });

                return () => unsubscribe();
            })
            .catch((error) => {
                console.log('Persistence error', error);
            });
    }, [setUser]);

    return <>{children}</>;
}

interface ProvidersProps {
    children: ReactNode
}

const Providers: React.FC<ProvidersProps> = ({children}) => {
    return (
        <Provider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </Provider>
    )
};

export default Providers;
