export type UserRole = 'user' | 'organizer' | 'admin';
export interface User { id: string; name: string; email: string; role: UserRole; avatar?: string; }
