import {User} from "firebase/auth";
import { Role, BookingUser } from "../state/userAtom";
import {collection, getDocs, query, where} from "@firebase/firestore";
import {firestore} from "../firebase/firebase";

export const createBookingUser = async (user: User): Promise<BookingUser | null> => {
    const q = query(collection(firestore, 'allowedUsers'), where('email', '==', user.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        const roles = userDoc.roles as Role[];

        return {
            user: user,
            name: userDoc.name,
            email: userDoc.email,
            roles: roles,
        };
    }

    return null;
};
