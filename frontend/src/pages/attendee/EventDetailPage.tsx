import { useState } from 'react';
import { AppState, Page } from '../../App';
import Navbar from '../../components/layout/Navbar';
import { TicketType, CAT_COLORS } from '../../utils/mockData';

interface Props {
  state: AppState;
  navigate: (page: Page, patch?: Partial<AppState>) => void;
  logout: () => void;
}

export default function EventDetailPage({ state, navigate, logout }: Props) {
  const event = state.selectedEvent;
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  if (!event) { navigate('events'); return null; }

  const setQty = (id: string, qty: number) => setQuantities(q => ({ ...q, [id]: Math.max(0, qty) }));
  const total = event.ticketTypes.reduce((s, t) => s + (quantities[t.id] || 0) * t.price, 0);
  const totalQty = Object.values(quantities).reduce((a, b) => a + b, 0);

  const checkout = () => {
    if (!state.role) { navigate('login'); return; }
    const items = event.ticketTypes.filter(t => (quantities[t.id] || 0) > 0).map(t => ({ ticket: t, qty: quantities[t.id] }));
    navigate('checkout', { checkoutItems: items });
  };

  const colors = CAT_COLORS[event.category] || { bg: 'rgba(99,102,241,0.15)', text: '#3b82f6' };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar state={state} navigate={navigate} logout={logout} />

      {/* Hero image */}
      <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
        <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,6,15,0.2) 0%, rgba(6,6,15,0.97) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, maxWidth: '1100px', margin: '0 auto', padding: '0 24px 36px' }}>
          <button onClick={() => navigate('events')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#475569', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '16px', padding: 0 }}
            onMouseEnter={e => (e.currentTarget.style.color = '#0f172a')}
            onMouseLeave={e => (e.currentTarget.style.color = '#475569')}>
            ← Back to Events
          </button>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
            <span style={{ padding: '4px 12px', borderRadius: '99px', fontSize: '0.8125rem', fontWeight: 600, background: colors.bg, color: colors.text }}>{event.category}</span>
          </div>
          <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 400, color: '#0f172a', letterSpacing: '-0.02em', maxWidth: '700px' }}>
            {event.title}
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }} className="lg:grid-cols-[1fr_380px]">
          {/* Left — details */}
          <div>
            {/* Info cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '36px' }}>
              {[
                { icon: '📅', label: 'Date & Time', value: `${event.date} · ${event.time}` },
                { icon: '📍', label: 'Venue', value: `${event.venue}, ${event.city}` },
                { icon: '🎤', label: 'Organizer', value: event.organizer },
                { icon: '🏷', label: 'Category', value: event.category },
              ].map(item => (
                <div key={item.label} style={{ padding: '16px', borderRadius: '14px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)' }}>
                  <div style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{item.icon}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#0f172a' }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.5rem', fontWeight: 400, color: '#0f172a', marginBottom: '14px' }}>About this event</h2>
              <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '0.9375rem' }}>{event.description}</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {event.tags.map(tag => (
                <span key={tag} style={{ padding: '6px 14px', borderRadius: '99px', fontSize: '0.8125rem', fontWeight: 500, background: 'rgba(99,102,241,0.08)', color: '#3b82f6', border: '1px solid rgba(99,102,241,0.18)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — ticket selector */}
          <div>
            <div style={{ position: 'sticky', top: '80px', padding: '24px', borderRadius: '20px', background: '#ffffff', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.375rem', fontWeight: 400, color: '#0f172a', marginBottom: '20px' }}>
                Select tickets
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {event.ticketTypes.map(ticket => (
                  <TicketRow key={ticket.id} ticket={ticket} qty={quantities[ticket.id] || 0} onQty={qty => setQty(ticket.id, qty)} />
                ))}
              </div>

              {total > 0 && (
                <div style={{ padding: '16px 0', borderTop: '1px solid rgba(16,24,40,0.09)', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b', fontSize: '0.9375rem' }}>Total · {totalQty} ticket{totalQty !== 1 ? 's' : ''}</span>
                    <span style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.5rem', color: '#0f172a' }}>${total}</span>
                  </div>
                </div>
              )}

              <button onClick={checkout} disabled={totalQty === 0}
                style={{
                  width: '100%', padding: '14px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 600, border: 'none', cursor: totalQty > 0 ? 'pointer' : 'not-allowed', transition: 'all 0.15s',
                  background: totalQty > 0 ? '#2563eb' : '#f1f5f9',
                  color: totalQty > 0 ? '#fff' : '#64748b',
                  boxShadow: totalQty > 0 ? '0 4px 20px rgba(99,102,241,0.35)' : 'none',
                }}
                onMouseEnter={e => { if (totalQty > 0) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(99,102,241,0.5)'; } }}
                onMouseLeave={e => { if (totalQty > 0) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.35)'; } }}>
                {totalQty > 0 ? 'Continue to Checkout →' : 'Select tickets to continue'}
              </button>
              {!state.role && totalQty > 0 && (
                <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: '#64748b', marginTop: '10px' }}>
                  You'll be asked to sign in
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .lg\\:grid-cols-\\[1fr_380px\\] { grid-template-columns: 1fr 380px !important; }
        }
      `}</style>
    </div>
  );
}

function TicketRow({ ticket, qty, onQty }: { ticket: TicketType; qty: number; onQty: (n: number) => void }) {
  const isSoldOut = ticket.available === 0;
  return (
    <div style={{ padding: '16px', borderRadius: '14px', background: '#f8fafc', border: '1px solid rgba(16,24,40,0.07)', opacity: isSoldOut ? 0.5 : 1 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#0f172a', marginBottom: '3px' }}>{ticket.name}</div>
          <div style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '8px' }}>{ticket.description}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: 700, fontSize: '1rem', color: '#f59e0b' }}>${ticket.price}</span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              {isSoldOut ? '✕ Sold out' : `${ticket.available} remaining`}
            </span>
          </div>
          {ticket.perks && ticket.perks.length > 0 && (
            <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {ticket.perks.slice(0, 2).map(p => (
                <span key={p} style={{ fontSize: '0.6875rem', padding: '2px 8px', borderRadius: '99px', background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
                  ✓ {p}
                </span>
              ))}
            </div>
          )}
        </div>
        {!isSoldOut && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <button onClick={() => onQty(qty - 1)}
              style={{ width: '30px', height: '30px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.125rem', fontWeight: 300, background: '#f1f5f9', border: '1px solid rgba(255,255,255,0.1)', color: '#0f172a', cursor: 'pointer', transition: 'all 0.1s', lineHeight: 1 }}
              onMouseEnter={e => (e.currentTarget.style.background = '#e2e8f0')}
              onMouseLeave={e => (e.currentTarget.style.background = '#f1f5f9')}>
              −
            </button>
            <span style={{ width: '20px', textAlign: 'center', fontSize: '0.9375rem', fontWeight: 600, color: '#0f172a' }}>{qty}</span>
            <button onClick={() => onQty(qty + 1)}
              style={{ width: '30px', height: '30px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.125rem', fontWeight: 300, background: '#2563eb', border: 'none', color: '#fff', cursor: 'pointer', transition: 'all 0.1s', lineHeight: 1 }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1d4ed8')}
              onMouseLeave={e => (e.currentTarget.style.background = '#2563eb')}>
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
