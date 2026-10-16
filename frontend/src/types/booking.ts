export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export interface BookingSummary { id: string; eventId: string; status: BookingStatus; total: number; createdAt: string; }
