export type EventStatus = 'draft' | 'pending' | 'published' | 'sold-out' | 'cancelled' | 'completed';
export interface EventSummary { id: string; title: string; category: string; date: string; venue: string; city: string; image: string; status?: EventStatus; }
