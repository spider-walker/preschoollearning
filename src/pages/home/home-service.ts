import { collection, addDoc, serverTimestamp,getDocs } from 'firebase/firestore';

import { db } from '../../service/firebase.config';
const collectionRef = collection(db, 'todo');
export async function addTodoItem(item: any): Promise<any> {
	const docRef = await addDoc(collectionRef, {
		...item,
		createdAt: serverTimestamp(),
	});
	return docRef;
}

export async function getTodoItem(): Promise<any> {
    const querySnapshot = await getDocs(collectionRef);
    return querySnapshot.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        };
    });
}
