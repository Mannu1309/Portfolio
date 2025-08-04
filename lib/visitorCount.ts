// lib/visitorCount.ts
import { db } from './firebase'
import { doc, getDoc } from 'firebase/firestore'

export const getVisitorCount = async (): Promise<number> => {
    const docRef = doc(db, 'metrics', 'uniqueVisitors')
    const snap = await getDoc(docRef)
    return snap.exists() ? snap.data().count || 0 : 0
}
