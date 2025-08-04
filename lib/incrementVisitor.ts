// lib/incrementVisitor.ts
import { db } from './firebase'
import { doc, runTransaction } from 'firebase/firestore'

export const incrementUniqueVisitor = async (): Promise<number> => {
    const counterRef = doc(db, 'metrics', 'uniqueVisitors')
    return await runTransaction(db, async (transaction) => {
        const snap = await transaction.get(counterRef)
        const current = snap.exists() ? snap.data().count || 0 : 0
        const newCount = current + 1
        transaction.set(counterRef, { count: newCount }, { merge: true })

        return newCount
    })
}
