import vansData from '../data.js'

export function getHostVans(req,res) {
    const hostVans = vansData.filter(data => data.hostId == 123)
    res.json(hostVans);
}



// export async function getHostVans() {
//     const q = query(vansCollectionRef, where("hostId", "==", 123));
//     const snapshot = await getDocs(q);
//     const hostVans = snapshot.docs.map(doc => (
//         {...doc.data(), id: doc.id}
//     ))
//     return hostVans;
// }