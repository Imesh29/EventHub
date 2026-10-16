import { AppState, Page } from '../../App';
import Navbar from '../../components/layout/Navbar';

interface Props {
  state: AppState;
  navigate: (page: Page, patch?: Partial<AppState>) => void;
  logout: () => void;
}

export default function PaymentResultPage({ state, navigate, logout }: Props) {
  const { selectedEvent, checkoutItems, paymentSuccess } = state;
  const total = checkoutItems.reduce((s, i) => s + i.ticket.price * i.qty, 0);
  const finalTotal = Math.round(total * 1.05);
  const bookingId = 'BKG-' + (10200 + Math.floor(Math.random() * 900));

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar state={state} navigate={navigate} logout={logout} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', minHeight: 'calc(100vh - 64px)' }}>
        <div style={{ width: '100%', maxWidth: '520px', textAlign: 'center' }}>
          {paymentSuccess ? (
            <>
              {/* Success icon */}
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(16,185,129,0.1)', border: '2px solid rgba(16,185,129,0.3)', boxShadow: '0 0 40px rgba(16,185,129,0.15)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </div>

              <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2.25rem', fontWeight: 400, color: '#0f172a', marginBottom: '10px', letterSpacing: '-0.02em' }}>
                Booking confirmed!
              </h1>
              <p style={{ color: '#64748b', marginBottom: '36px', lineHeight: 1.7, fontSize: '0.9375rem' }}>
                Your tickets are confirmed and on their way. Check your email for the QR codes.
              </p>

              {/* Ticket stub */}
              <div style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', overflow: 'hidden', marginBottom: '28px', textAlign: 'left' }}>
                {/* Stub header */}
                <div style={{ display: 'flex', gap: '16px', padding: '20px', borderBottom: '1px dashed rgba(255,255,255,0.08)' }}>
                  <img src={selectedEvent?.image} alt={selectedEvent?.title}
                    style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1rem', color: '#0f172a', marginBottom: '4px' }}>{selectedEvent?.title}</div>
                    <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{selectedEvent?.date} · {selectedEvent?.time}</div>
                    <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{selectedEvent?.venue}, {selectedEvent?.city}</div>
                  </div>
                </div>

                {/* Stub details */}
                <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {checkoutItems.map(item => (
                    <div key={item.ticket.id}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' }}>{item.ticket.name}</div>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#0f172a' }}>×{item.qty}</div>
                    </div>
                  ))}
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' }}>Total paid</div>
                    <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.375rem', color: '#f59e0b' }}>${finalTotal}</div>
                  </div>
                </div>

                {/* Booking ID */}
                <div style={{ margin: '0 20px 20px', padding: '12px 16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid rgba(16,24,40,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>Booking reference</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9375rem', color: '#2563eb', fontWeight: 500 }}>{bookingId}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => navigate('bookings')}
                  style={{ flex: 1, padding: '13px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0 4px 20px rgba(99,102,241,0.35)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
                  View my tickets
                </button>
                <button onClick={() => navigate('events')}
                  style={{ flex: 1, padding: '13px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 500, color: '#475569', background: '#ffffff', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#0f172a'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                  Browse events
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239,68,68,0.1)', border: '2px solid rgba(239,68,68,0.3)' }}>
                <span style={{ fontSize: '2rem' }}>✕</span>
              </div>
              <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2rem', color: '#0f172a', marginBottom: '12px' }}>Payment failed</h1>
              <p style={{ color: '#64748b', marginBottom: '28px' }}>Something went wrong. No charge was made.</p>
              <button onClick={() => navigate('checkout')}
                style={{ padding: '12px 28px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', cursor: 'pointer' }}>
                Try again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
