import { useState } from 'react';
import { AppState, Page } from '../../App';
import Navbar from '../../components/layout/Navbar';
import { CAT_COLORS } from '../../utils/mockData';

interface Props {
  state: AppState;
  navigate: (page: Page, patch?: Partial<AppState>) => void;
  logout: () => void;
}

const PENDING_EVENTS = [
  {
    id: 'rev-001',
    title: 'Neon Nights Music Festival',
    category: 'Music' as const,
    organizer: 'Pulse Events',
    organizerEmail: 'contact@pulseevents.com',
    submittedAt: 'Sep 20, 2026',
    date: 'Oct 18, 2026',
    time: '7:00 PM',
    venue: 'Skyline Arena',
    city: 'New York',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&h=400&fit=crop&auto=format',
    description: 'Three nights of underground electronic and indie acts across four stages. Featuring headliners from Berlin, London, and Tokyo alongside the best local talent. Expect immersive light installations, curated street food, and an after-party that runs till dawn.',
    tags: ['Electronic', 'Indie', 'Multi-stage', 'After-party'],
    ticketTypes: [
      { name: 'General Admission', price: 85, capacity: 2000 },
      { name: 'VIP Lounge', price: 220, capacity: 200 },
    ],
    flagged: false,
  },
];

export default function EventReviewPage({ state, navigate, logout }: Props) {
  const eventId = state.reviewEventId ?? 'rev-001';
  const event = PENDING_EVENTS.find(e => e.id === eventId) ?? PENDING_EVENTS[0];

  const [decision, setDecision] = useState<'approved' | 'rejected' | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const colors = CAT_COLORS[event.category] || { bg: 'rgba(99,102,241,0.15)', text: '#3b82f6' };

  const handleApprove = () => {
    setDecision('approved');
    setTimeout(() => navigate('admin'), 1500);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) return;
    setDecision('rejected');
    setTimeout(() => navigate('admin'), 1500);
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar state={state} navigate={navigate} logout={logout} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
        <button onClick={() => navigate('admin')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '28px', padding: 0 }}
          onMouseEnter={e => (e.currentTarget.style.color = '#0f172a')}
          onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}>
          ← Back to Admin Panel
        </button>

        {/* Admin badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', marginBottom: '12px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Admin · Event Review</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2rem', fontWeight: 400, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Event Review
          </h1>
          <span style={{ padding: '6px 14px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>
            PENDING REVIEW
          </span>
        </div>

        {decision && (
          <div style={{ padding: '16px 20px', borderRadius: '14px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px',
            background: decision === 'approved' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${decision === 'approved' ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)'}` }}>
            <span style={{ fontSize: '1.25rem' }}>{decision === 'approved' ? '✓' : '✕'}</span>
            <span style={{ color: decision === 'approved' ? '#10b981' : '#f87171', fontWeight: 500 }}>
              Event {decision === 'approved' ? 'approved' : 'rejected'}. Redirecting...
            </span>
          </div>
        )}

        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Hero image */}
          <div style={{ borderRadius: '18px', overflow: 'hidden', height: '240px' }}>
            <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ display: 'grid', gap: '20px' }} className="review-grid">
            {/* Event details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <InfoPanel title="Event Details" icon="📋">
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  <span style={{ padding: '4px 12px', borderRadius: '99px', fontSize: '0.8125rem', fontWeight: 600, background: colors.bg, color: colors.text }}>{event.category}</span>
                  {event.tags.map(t => (
                    <span key={t} style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', color: '#64748b' }}>{t}</span>
                  ))}
                </div>
                <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.5rem', fontWeight: 400, color: '#0f172a', marginBottom: '12px' }}>{event.title}</h2>
                <p style={{ fontSize: '0.9375rem', color: '#475569', lineHeight: 1.7, marginBottom: '16px' }}>{event.description}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[
                    { icon: '📅', label: 'Date', value: `${event.date} · ${event.time}` },
                    { icon: '📍', label: 'Venue', value: `${event.venue}, ${event.city}` },
                  ].map(row => (
                    <div key={row.label} style={{ padding: '12px', borderRadius: '10px', background: '#f8fafc' }}>
                      <div style={{ fontSize: '1rem', marginBottom: '4px' }}>{row.icon}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '2px' }}>{row.label}</div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#0f172a' }}>{row.value}</div>
                    </div>
                  ))}
                </div>
              </InfoPanel>

              <InfoPanel title="Ticket Types" icon="🎟">
                {event.ticketTypes.map((t, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '10px', background: '#f8fafc', marginBottom: i < event.ticketTypes.length - 1 ? '8px' : 0 }}>
                    <div>
                      <div style={{ fontWeight: 500, color: '#0f172a', fontSize: '0.9375rem' }}>{t.name}</div>
                      <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>Capacity: {t.capacity.toLocaleString()}</div>
                    </div>
                    <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.25rem', color: '#f59e0b' }}>${t.price}</div>
                  </div>
                ))}
              </InfoPanel>
            </div>

            {/* Organizer info + moderation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <InfoPanel title="Organizer" icon="🎤">
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0, color: '#f59e0b', fontWeight: 700 }}>
                    PE
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.9375rem' }}>{event.organizer}</div>
                    <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{event.organizerEmail}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: '#64748b' }}>Submitted</span>
                    <span style={{ color: '#475569' }}>{event.submittedAt}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: '#64748b' }}>Previous events</span>
                    <span style={{ color: '#10b981', fontWeight: 500 }}>3 approved</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: '#64748b' }}>Trust level</span>
                    <span style={{ color: '#f59e0b', fontWeight: 500 }}>Verified</span>
                  </div>
                </div>
              </InfoPanel>

              {/* Moderation actions */}
              <div style={{ padding: '24px', borderRadius: '18px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)' }}>
                <h3 style={{ fontWeight: 600, color: '#0f172a', marginBottom: '16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ⚖️ Moderation Decision
                </h3>

                {!showRejectForm ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button onClick={handleApprove} disabled={!!decision}
                      style={{ width: '100%', padding: '13px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 600, color: '#fff', background: decision ? '#f1f5f9' : '#10b981', border: 'none', cursor: decision ? 'not-allowed' : 'pointer', transition: 'all 0.15s', boxShadow: decision ? 'none' : '0 4px 16px rgba(16,185,129,0.3)' }}
                      onMouseEnter={e => { if (!decision) e.currentTarget.style.boxShadow = '0 8px 24px rgba(16,185,129,0.45)'; }}
                      onMouseLeave={e => { if (!decision) e.currentTarget.style.boxShadow = '0 4px 16px rgba(16,185,129,0.3)'; }}>
                      ✓ Approve Event
                    </button>
                    <button onClick={() => setShowRejectForm(true)} disabled={!!decision}
                      style={{ width: '100%', padding: '13px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 600, color: decision ? '#cbd5e1' : '#f87171', background: 'rgba(239,68,68,0.07)', border: `1px solid ${decision ? 'rgba(255,255,255,0.05)' : 'rgba(239,68,68,0.25)'}`, cursor: decision ? 'not-allowed' : 'pointer', transition: 'all 0.15s' }}
                      onMouseEnter={e => { if (!decision) e.currentTarget.style.background = 'rgba(239,68,68,0.14)'; }}
                      onMouseLeave={e => { if (!decision) e.currentTarget.style.background = 'rgba(239,68,68,0.07)'; }}>
                      ✕ Reject Event
                    </button>
                  </div>
                ) : (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: '#475569', marginBottom: '8px' }}>
                      Reason for rejection
                    </label>
                    <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)}
                      placeholder="Provide a clear reason for rejecting this event..."
                      rows={4}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', fontSize: '0.875rem', outline: 'none', background: '#f8fafc', border: '1px solid rgba(16,24,40,0.09)', color: '#0f172a', resize: 'vertical', fontFamily: 'inherit', marginBottom: '12px' }} />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => setShowRejectForm(false)}
                        style={{ flex: 1, padding: '10px', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 500, color: '#64748b', background: '#f8fafc', border: '1px solid rgba(16,24,40,0.09)', cursor: 'pointer' }}>
                        Cancel
                      </button>
                      <button onClick={handleReject}
                        style={{ flex: 2, padding: '10px', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 600, color: '#fff', background: '#ef4444', border: 'none', cursor: 'pointer' }}>
                        Confirm Rejection
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .review-grid { grid-template-columns: 3fr 2fr !important; align-items: start; }
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}

function InfoPanel({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '20px', borderRadius: '16px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)' }}>
      <h3 style={{ fontWeight: 600, color: '#0f172a', marginBottom: '14px', fontSize: '0.9375rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span>{icon}</span> {title}
      </h3>
      {children}
    </div>
  );
}
