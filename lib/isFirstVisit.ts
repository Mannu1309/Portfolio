// lib/isFirstVisit.ts
export const isFirstVisit = (): boolean => {
    const visited = localStorage.getItem('hasVisited')

    if (visited) return false
    localStorage.setItem('hasVisited', 'true')
    return true
}
