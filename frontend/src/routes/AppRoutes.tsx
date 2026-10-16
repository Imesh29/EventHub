import { Navigate, Route, Routes } from 'react-router-dom';
import type { AppState, Page, UserRole } from '../App';
import LoginPage from '../pages/auth/LoginPage';
import LandingPage from '../pages/attendee/LandingPage';
import EventsPage from '../pages/attendee/EventsPage';
import EventDetailPage from '../pages/attendee/EventDetailPage';
import CheckoutPage from '../pages/attendee/CheckoutPage';
import PaymentResultPage from '../pages/attendee/PaymentResultPage';
import BookingsPage from '../pages/attendee/BookingsPage';
import BookingDetailPage from '../pages/attendee/BookingDetailPage';
import DigitalTicketPage from '../pages/attendee/DigitalTicketPage';
import NotificationsPage from '../pages/attendee/NotificationsPage';
import ProfilePage from '../pages/attendee/ProfilePage';
import OrganizerDashboard from '../pages/organizer/OrganizerDashboard';
import CreateEventPage from '../pages/organizer/CreateEventPage';
import ManageEventsPage from '../pages/organizer/ManageEventsPage';
import AnalyticsPage from '../pages/organizer/AnalyticsPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import EventReviewPage from '../pages/admin/EventReviewPage';
type Props={state:AppState;navigate:(page:Page,patch?:Partial<AppState>)=>void;login:(role:UserRole)=>void;logout:()=>void};
export default function AppRoutes(props:Props){return <Routes>
<Route path="/" element={<LandingPage {...props}/>}/><Route path="/login" element={<LoginPage {...props}/>}/><Route path="/register" element={<LoginPage {...props}/>}/>
<Route path="/events" element={<EventsPage {...props}/>}/><Route path="/events/:id" element={<EventDetailPage {...props}/>}/><Route path="/events/detail" element={<EventDetailPage {...props}/>}/>
<Route path="/checkout" element={<CheckoutPage {...props}/>}/><Route path="/payment-result" element={<PaymentResultPage {...props}/>}/><Route path="/bookings" element={<BookingsPage {...props}/>}/><Route path="/bookings/:id" element={<BookingDetailPage {...props}/>}/><Route path="/bookings/detail" element={<BookingDetailPage {...props}/>}/><Route path="/tickets/:id" element={<DigitalTicketPage {...props}/>}/><Route path="/tickets/digital" element={<DigitalTicketPage {...props}/>}/><Route path="/notifications" element={<NotificationsPage {...props}/>}/><Route path="/profile" element={<ProfilePage {...props}/>}/>
<Route path="/organizer/dashboard" element={<OrganizerDashboard {...props}/>}/><Route path="/organizer/events" element={<ManageEventsPage {...props}/>}/><Route path="/organizer/events/create" element={<CreateEventPage {...props}/>}/><Route path="/organizer/events/:id/edit" element={<CreateEventPage {...props}/>}/><Route path="/organizer/analytics" element={<AnalyticsPage {...props}/>}/>
<Route path="/admin/dashboard" element={<AdminDashboard {...props}/>}/><Route path="/admin/moderation/:id" element={<EventReviewPage {...props}/>}/><Route path="/admin/moderation/review" element={<EventReviewPage {...props}/>}/><Route path="*" element={<Navigate to="/" replace/>}/>
</Routes>}
