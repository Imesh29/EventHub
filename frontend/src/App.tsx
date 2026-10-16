import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import type { Event, TicketType, Booking } from './utils/mockData';

export type Page = 'login'|'register'|'landing'|'events'|'event-detail'|'checkout'|'payment-result'|'bookings'|'booking-detail'|'digital-ticket'|'organizer'|'admin'|'create-event'|'manage-events'|'notifications'|'profile'|'analytics'|'event-review';
export type UserRole = 'user'|'organizer'|'admin'|null;
export interface AppState { page:Page; role:UserRole; selectedEvent:Event|null; checkoutItems:{ticket:TicketType;qty:number}[]; paymentSuccess:boolean; selectedBooking:Booking|null; editEventId:string|null; reviewEventId:string|null; }
const paths:Record<Page,string>={login:'/login',register:'/register',landing:'/',events:'/events','event-detail':'/events/detail',checkout:'/checkout','payment-result':'/payment-result',bookings:'/bookings','booking-detail':'/bookings/detail','digital-ticket':'/tickets/digital',organizer:'/organizer/dashboard',admin:'/admin/dashboard','create-event':'/organizer/events/create','manage-events':'/organizer/events',notifications:'/notifications',profile:'/profile',analytics:'/organizer/analytics','event-review':'/admin/moderation/review'};
export default function App(){
 const routerNavigate=useNavigate();
 const [state,setState]=useState<AppState>({page:'landing',role:null,selectedEvent:null,checkoutItems:[],paymentSuccess:false,selectedBooking:null,editEventId:null,reviewEventId:null});
 const navigate=(page:Page,patch?:Partial<AppState>)=>{setState(s=>({...s,page,...patch}));routerNavigate(paths[page]);window.scrollTo({top:0,behavior:'instant'});};
 const login=(role:UserRole)=>{if(role==='organizer')navigate('organizer',{role});else if(role==='admin')navigate('admin',{role});else navigate('landing',{role});};
 const logout=()=>{setState({page:'login',role:null,selectedEvent:null,checkoutItems:[],paymentSuccess:false,selectedBooking:null,editEventId:null,reviewEventId:null});routerNavigate('/login');};
 return <AppRoutes state={state} navigate={navigate} login={login} logout={logout}/>;
}
