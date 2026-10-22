import { doc, setDoc, deleteDoc, getDoc, collection, onSnapshot, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const subscribeToItems = (uid, callbackFn, onError) => {
    const userCollectionRef = collection(db, 'users', uid, 'items');
    const unsubscribe = onSnapshot(userCollectionRef, (querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        callbackFn(items);
    }, (error) => {
        console.error("Error listening to items: ", error);
        onError(error);
    });
    return unsubscribe;
};

export const addCard = async (uid, data) => {
    const collectionRef = collection(db, 'users', uid, 'items');
    await addDoc(collectionRef, {...data, createdAt: serverTimestamp()});
};

export const updateCard = async (uid, id, data) => {
    await updateDoc(doc(db, 'users', uid, 'items', id), data);
};

export const deleteCard = async (uid, id) => {
    await deleteDoc(doc(db, 'users', uid, 'items', id));
};

export const getPreferences = async (uid) => {
    const snap = await getDoc(doc(db, 'users', uid, 'settings', 'preferences'));
    return snap.exists() ? snap.data(): {};
}

export const savePreferences = async (uid, prefs) => {
    await setDoc(doc(db, 'users', uid, 'settings', 'preferences'), prefs, { merge: true });
}