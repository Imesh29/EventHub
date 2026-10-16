import { create } from 'zustand';
import type { UserRole } from '../types/user';
type AuthState={role:UserRole|null; setRole:(role:UserRole|null)=>void};
export const useAuthStore=create<AuthState>((set)=>({role:null,setRole:(role)=>set({role})}));
