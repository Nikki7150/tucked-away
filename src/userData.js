import { doc, setDoc, deleteDoc, getDocs, collection, onSnapshot, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const subscribeToItems = (uid, callbackFn) => {
    const userCollectionRef = collection(db, 'users', uid, 'items');
    const unsubscribe = onSnapshot(userCollectionRef, (querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        callbackFn(items);
    }, (error) => {
        console.error("Error listening to items: ", error);
    });
    return unsubscribe;
};

export const addCard = async (uid, data) => {
    const collectionRef = collection(db, 'users', uid, 'items');
    await addDoc(collectionRef, {...data, createdAt: serverTimestamp()});
};

export const updateCard = async (uid, data) => {
    await updateDoc(doc(db, 'users', uid, 'items', id), data);
};

export const deleteCard = async (uid, data) => {
    await deleteDoc(doc(db, 'users', uid, 'items', id));
};

export const toggleFavoriteCard = async () => {

};