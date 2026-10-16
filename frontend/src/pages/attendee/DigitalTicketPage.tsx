import { AppState, Page } from '../../App';
import Navbar from '../../components/layout/Navbar';
import { MY_BOOKINGS } from '../../utils/mockData';

interface Props {
  state: AppState;
  navigate: (page: Page, patch?: Partial<AppState>) => void;
  logout: () => void;
}

function QRCode() {
  const size = 160;
  const cells = 21;
  const cell = size / cells;
  const pattern = Array.from({ length: cells }, (_, r) =>
    Array.from({ length: cells }, (_, c) => {
      if (r < 7 && (c < 7 || c >= cells - 7)) return true;
      if (r >= cells - 7 && c < 7) return true;
      if ((r === 0 || r === 6) && c < 7) return true;
      if ((r === 0 || r === 6) && c >= cells - 7) return true;
      if ((c === 0 || c === 6) && r < 7) return true;
      if ((c === 0 || c === 6) && r >= cells - 7) return true;
      if (r >= cells - 7 && (c === 0 || c === 6)) return true;
      if (r >= 2 && r <= 4 && c >= 2 && c <= 4) return true;
      if (r >= 2 && r <= 4 && c >= cells - 5 && c <= cells - 3) return true;
      if (r >= cells - 5 && r <= cells - 3 && c >= 2 && c <= 4) return true;
      return (r * 3 + c * 7 + r * c) % 5 < 2;
    })
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      {pattern.map((row, r) =>
        row.map((filled, c) =>
          filled ? (
            <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell - 0.5} height={cell - 0.5} fill="#0f172a" />
          ) : null
        )
      )}
    </svg>
  );
}

export default function DigitalTicketPage({ state, navigate, logout }: Props) {
  const booking = state.selectedBooking ?? MY_BOOKINGS[0];
  const ticketId = `TKT-${Math.abs(booking.id.charCodeAt(4) * 99 + 829102)}`;

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar state={state} navigate={navigate} logout={logout} />

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '48px 24px' }}>
        <button onClick={() => navigate('booking-detail', { selectedBooking: booking })}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '28px', padding: 0 }}
          onMouseEnter={e => (e.currentTarget.style.color = '#0f172a')}
          onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}>
          ← Back to Booking
        </button>

        {/* Ticket card */}
        <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.2)' }}>
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #e2e8f0 0%, #0f0f2e 100%)', padding: '28px 28px 20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.3, backgroundImage: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(99,102,241,0.4) 0%, transparent 60%)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #2563eb, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(99,102,241,0.5)' }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L17 7V18H13V13H7V18H3V7L10 2Z" fill="white" fillOpacity="0.9"/>
                  </svg>
                </div>
                <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '0.9375rem', color: '#0f172a', letterSpacing: '0.1em', textTransform: 'uppercase' }}>EventHub</span>
              </div>
              <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.625rem', fontWeight: 400, color: '#0f172a', marginBottom: '12px', lineHeight: 1.2 }}>
                {booking.eventTitle}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { icon: '📅', text: booking.date },
                  { icon: '📍', text: booking.venue },
                  { icon: '🎟', text: booking.tickets[0]?.type ?? 'General Admission' },
                ].map(row => (
                  <div key={row.icon} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8125rem' }}>{row.icon}</span>
                    <span style={{ fontSize: '0.875rem', color: '#475569' }}>{row.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tear line */}
          <div style={{ height: '1px', background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 8px, transparent 8px, transparent 14px)', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-14px', top: '-14px', width: '28px', height: '28px', borderRadius: '50%', background: '#ffffff' }} />
            <div style={{ position: 'absolute', right: '-14px', top: '-14px', width: '28px', height: '28px', borderRadius: '50%', background: '#ffffff' }} />
          </div>

          {/* QR section */}
          <div style={{ background: '#ffffff', padding: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ padding: '16px', borderRadius: '16px', background: '#f8fafc', border: '1px solid rgba(255,255,255,0.08)', display: 'inline-block' }}>
              <QRCode />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Scan to verify</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: '#2563eb', letterSpacing: '0.08em', fontWeight: 500 }}>{ticketId}</div>
            </div>
          </div>

          {/* Details footer */}
          <div style={{ background: '#ffffff', padding: '20px 28px', borderTop: '1px solid rgba(16,24,40,0.07)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <InfoCell label="Ticket ID" value={ticketId} mono />
              <InfoCell label="Booking" value={booking.id} mono />
              <InfoCell label="Tickets" value={`${booking.tickets.reduce((s, t) => s + t.qty, 0)} ticket(s)`} />
              <InfoCell label="Status" value="VALID" highlight />
            </div>
            <button
              style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0 4px 16px rgba(99,102,241,0.3)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.3)'; }}>
              ↓ Download Ticket
            </button>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.8125rem', color: '#cbd5e1', lineHeight: 1.6 }}>
          Present this ticket at the venue entrance.<br />One ticket per person.
        </p>
      </div>
    </div>
  );
}

function InfoCell({ label, value, mono, highlight }: { label: string; value: string; mono?: boolean; highlight?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: '0.6875rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '3px', fontWeight: 600 }}>{label}</div>
      <div style={{
        fontSize: mono ? '0.8125rem' : '0.9375rem',
        fontFamily: mono ? 'JetBrains Mono, monospace' : 'inherit',
        color: highlight ? '#10b981' : mono ? '#3b82f6' : '#0f172a',
        fontWeight: highlight ? 700 : 500,
        letterSpacing: highlight ? '0.06em' : 'normal',
      }}>
        {value}
      </div>
    </div>
  );
}
