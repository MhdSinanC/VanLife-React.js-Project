import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyAF5JCeJ--Zt3TS6rEPbSJox6JxMYbMhfc",
    authDomain: "van-life-c974e.firebaseapp.com",
    projectId: "van-life-c974e",
    storageBucket: "van-life-c974e.firebasestorage.app",
    messagingSenderId: "656776512466",
    appId: "1:656776512466:web:9170d5a62e07169efa7e0b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


//Refactored fetching functions
const vansCollectionRef = collection(db, 'vans');

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef);
    const vans = snapshot.docs.map(doc => (
        { ...doc.data(), id: doc.id }
    ))
    return vans;
}

export async function getVan(id) {
    const docRef = doc(db, 'vans', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id }
    }

}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", 123));
    const snapshot = await getDocs(q);
    const hostVans = snapshot.docs.map(doc => (
        {...doc.data(), id: doc.id}
    ))
    return hostVans;
}


// export async function getVans(id) {
//     const url = id ? `/api/vans/${id}` : '/api/vans';
//     const res = await fetch(url);

//     if (!res.ok) {
//         throw new Error('Failed to fetch Vans!');
//     }

//     const data = await res.json();
//     return data.vans;
// }


// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : '/api/host/vans'
//     const res = await fetch(url);

//     if (!res.ok) {
//         throw new Error('Failed to fetch host vans');
//     }
//     const data = await res.json();
//     return data.vans;
// }


export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}