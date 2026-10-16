import { AppState, Page } from '../../App';
import Navbar from '../../components/layout/Navbar';
import { MY_BOOKINGS } from '../../utils/mockData';

interface Props {
  state: AppState;
  navigate: (page: Page, patch?: Partial<AppState>) => void;
  logout: () => void;
}

const STATUS: Record<string, { bg: string; color: string; dot: string }> = {
  confirmed: { bg: 'rgba(16,185,129,0.1)', color: '#10b981', dot: '#10b981' },
  pending: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', dot: '#f59e0b' },
  cancelled: { bg: 'rgba(239,68,68,0.1)', color: '#ef4444', dot: '#ef4444' },
};

export default function BookingsPage({ state, navigate, logout }: Props) {
  const totalSpent = MY_BOOKINGS.filter(b => b.status === 'confirmed').reduce((s, b) => s + b.total, 0);

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar state={state} navigate={navigate} logout={logout} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2.5rem', fontWeight: 400, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '6px' }}>My Tickets</h1>
            <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>{MY_BOOKINGS.length} bookings · ${totalSpent} confirmed spend</p>
          </div>
          <button onClick={() => navigate('events')}
            style={{ padding: '10px 20px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0 4px 16px rgba(99,102,241,0.3)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
            + Book new event
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '36px' }}>
          {[
            { label: 'Upcoming', value: MY_BOOKINGS.filter(b => b.status !== 'cancelled').length, color: '#2563eb' },
            { label: 'Confirmed', value: MY_BOOKINGS.filter(b => b.status === 'confirmed').length, color: '#10b981' },
            { label: 'Total spent', value: `$${totalSpent}`, color: '#f59e0b' },
          ].map(s => (
            <div key={s.label} style={{ padding: '16px 20px', borderRadius: '14px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{s.label}</div>
              <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.75rem', color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Booking list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {MY_BOOKINGS.map(booking => {
            const s = STATUS[booking.status];
            return (
              <div key={booking.id} style={{ padding: '20px', borderRadius: '18px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)', transition: 'all 0.2s', cursor: 'pointer' }}
                onClick={() => navigate('booking-detail', { selectedBooking: booking })}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.3)'; (e.currentTarget as HTMLElement).style.background = 'rgba(13,13,26,0.9)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,24,40,0.07)'; (e.currentTarget as HTMLElement).style.background = '#ffffff'; }}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <img src={booking.image} alt={booking.eventTitle}
                    style={{ width: '100px', height: '80px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
                      <h3 style={{ fontWeight: 600, fontSize: '1rem', color: '#0f172a' }}>{booking.eventTitle}</h3>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, background: s.bg, color: s.color, flexShrink: 0 }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: s.dot }} />
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '3px' }}>📅 {booking.date}</p>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '12px' }}>📍 {booking.venue}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {booking.tickets.map((t, i) => (
                          <span key={i} style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '99px', background: '#f8fafc', color: '#475569', border: '1px solid rgba(16,24,40,0.07)' }}>
                            {t.type} × {t.qty}
                          </span>
                        ))}
                      </div>
                      <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                        <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.5rem', color: '#0f172a' }}>${booking.total}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Booked {booking.bookedAt}</div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#2563eb', marginTop: '2px' }}>{booking.id}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
