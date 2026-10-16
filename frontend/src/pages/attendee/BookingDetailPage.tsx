import { AppState, Page } from '../../App';
import Navbar from '../../components/layout/Navbar';
import { MY_BOOKINGS } from '../../utils/mockData';

interface Props {
  state: AppState;
  navigate: (page: Page, patch?: Partial<AppState>) => void;
  logout: () => void;
}

const STATUS = {
  confirmed: { label: 'CONFIRMED', bg: 'rgba(16,185,129,0.15)', text: '#10b981', dot: '#10b981' },
  pending: { label: 'PENDING', bg: 'rgba(245,158,11,0.15)', text: '#f59e0b', dot: '#f59e0b' },
  cancelled: { label: 'CANCELLED', bg: 'rgba(239,68,68,0.15)', text: '#f87171', dot: '#f87171' },
};

export default function BookingDetailPage({ state, navigate, logout }: Props) {
  const booking = state.selectedBooking ?? MY_BOOKINGS[0];

  const subtotal = booking.tickets.reduce((s, t) => s + t.price * t.qty, 0);
  const fee = Math.round(subtotal * 0.05);
  const total = subtotal + fee;
  const st = STATUS[booking.status];

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar state={state} navigate={navigate} logout={logout} />

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px' }}>
        <button onClick={() => navigate('bookings')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '28px', padding: 0 }}
          onMouseEnter={e => (e.currentTarget.style.color = '#0f172a')}
          onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}>
          ← Back to My Tickets
        </button>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2rem', fontWeight: 400, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              Booking Details
            </h1>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem', color: '#2563eb', letterSpacing: '0.05em' }}>{booking.id}</div>
          </div>
          <span style={{ padding: '6px 14px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', background: st.bg, color: st.text, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: st.dot, display: 'inline-block' }} />
            {st.label}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Event info card */}
          <div style={{ padding: '24px', borderRadius: '18px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <img src={booking.image} alt={booking.eventTitle}
                style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.375rem', fontWeight: 400, color: '#0f172a', marginBottom: '10px' }}>
                  {booking.eventTitle}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { icon: '📅', label: 'Date', value: booking.date },
                    { icon: '📍', label: 'Venue', value: booking.venue },
                    { icon: '🎫', label: 'Booked', value: `Booked on ${booking.bookedAt}` },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.875rem' }}>{row.icon}</span>
                      <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{row.label}:</span>
                      <span style={{ fontSize: '0.875rem', color: '#475569', fontWeight: 500 }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tickets */}
          <div style={{ padding: '24px', borderRadius: '18px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)' }}>
            <h3 style={{ fontWeight: 600, color: '#0f172a', marginBottom: '16px', fontSize: '1rem' }}>Tickets</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {booking.tickets.map((t, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '12px', background: '#f8fafc' }}>
                  <div>
                    <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.9375rem' }}>{t.type}</span>
                    <span style={{ color: '#64748b', fontSize: '0.875rem' }}> × {t.qty}</span>
                  </div>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>${t.price * t.qty}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(16,24,40,0.09)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Row label="Tickets" value={`$${subtotal}`} />
              <Row label="Service Fee" value={`$${fee}`} />
              <div style={{ paddingTop: '10px', borderTop: '1px solid rgba(16,24,40,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>Total</span>
                <span style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.5rem', color: '#0f172a' }}>${total}</span>
              </div>
            </div>

            <div style={{ marginTop: '16px', padding: '10px 14px', borderRadius: '10px', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Payment Status</span>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#10b981', letterSpacing: '0.06em' }}>PAID</span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('digital-ticket', { selectedBooking: booking })}
              style={{ flex: '1 1 160px', padding: '13px 20px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(99,102,241,0.35)', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.35)'; }}>
              🎟 View Tickets
            </button>
            <button
              style={{ flex: '1 1 160px', padding: '13px 20px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 500, color: '#475569', background: '#ffffff', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#0f172a'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
              ↓ Download Receipt
            </button>
            {booking.status !== 'cancelled' && (
              <button
                style={{ flex: '1 1 160px', padding: '13px 20px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 500, color: '#f87171', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.06)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)'; }}>
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
      <span style={{ color: '#64748b' }}>{label}</span>
      <span style={{ color: '#475569' }}>{value}</span>
    </div>
  );
}
