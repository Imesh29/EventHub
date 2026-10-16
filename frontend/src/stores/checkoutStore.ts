import { create } from 'zustand';
type CheckoutState={eventId:string|null; quantities:Record<string,number>; setEventId:(id:string|null)=>void; setQuantity:(id:string,qty:number)=>void; reset:()=>void};
export const useCheckoutStore=create<CheckoutState>((set)=>({eventId:null,quantities:{},setEventId:(eventId)=>set({eventId}),setQuantity:(id,qty)=>set(s=>({quantities:{...s.quantities,[id]:qty}})),reset:()=>set({eventId:null,quantities:{}})}));
