import {firestore} from "@/firebase/firebase";
import {collection, getDocs, query} from "@firebase/firestore";

// export const addUser = async (userData: any) => {
//     const docRef = await addDoc(collection(firestore, 'allowedUsers'), userData);
//     return docRef.id;
// };
//
// export const updateUser = async (id: string, userData: any) => {
//     const userDoc = doc(firestore, 'allowedUsers', id);
//     await updateDoc(userDoc, userData);
// };

const eventCollection = collection(firestore, 'events');

// export const addEvent = async (eventData: any) => {
//     await addDoc(eventCollection, eventData);
// }

export const getEvents = async () => {
    const q = query(eventCollection);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
};
