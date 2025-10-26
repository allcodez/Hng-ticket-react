export const getTicketStorageKey = (userId: string): string => {
    return `ticketapp_tickets_${userId}`
}

export const getCurrentUserId = (): string | null => {
    const sessionData = localStorage.getItem('ticketapp_session')
    if (!sessionData) return null

    const session = JSON.parse(sessionData)
    return session.id || null
}

export const getUserTickets = (userId: string): any[] => {
    const key = getTicketStorageKey(userId)
    const ticketsData = localStorage.getItem(key)
    return ticketsData ? JSON.parse(ticketsData) : []
}

export const saveUserTickets = (userId: string, tickets: any[]): void => {
    const key = getTicketStorageKey(userId)
    localStorage.setItem(key, JSON.stringify(tickets))
}