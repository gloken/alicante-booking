import { firestore } from "@/firebase/firebase";
import { collection, query, where, getDocs/*, addDoc, updateDoc, doc*/ } from "@firebase/firestore";

export const getUserByEmail = async (email: string) => {
    const q = query(collection(firestore, 'allowedUsers'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
    }
    return null;
};

// export const addUser = async (userData: any) => {
//     const docRef = await addDoc(collection(firestore, 'allowedUsers'), userData);
//     return docRef.id;
// };
//
// export const updateUser = async (id: string, userData: any) => {
//     const userDoc = doc(firestore, 'allowedUsers', id);
//     await updateDoc(userDoc, userData);
// };
