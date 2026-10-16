export interface Ticket { id: string; bookingId: string; eventId: string; type: string; qrValue: string; status: 'valid' | 'used' | 'cancelled'; }
