import { useState } from 'react';
import { AppState, Page } from '../../App';
import Navbar from '../../components/layout/Navbar';
import { ORGANIZER_EVENTS, EventStatus } from '../../utils/mockData';

interface Props {
  state: AppState;
  navigate: (page: Page, patch?: Partial<AppState>) => void;
  logout: () => void;
}

const STATUS_CONFIG: Record<EventStatus, { label: string; bg: string; text: string }> = {
  draft: { label: 'DRAFT', bg: 'rgba(90,90,122,0.2)', text: '#475569' },
  pending_review: { label: 'PENDING REVIEW', bg: 'rgba(245,158,11,0.15)', text: '#f59e0b' },
  published: { label: 'PUBLISHED', bg: 'rgba(16,185,129,0.15)', text: '#10b981' },
  sold_out: { label: 'SOLD OUT', bg: 'rgba(99,102,241,0.15)', text: '#3b82f6' },
  cancelled: { label: 'CANCELLED', bg: 'rgba(239,68,68,0.15)', text: '#f87171' },
  completed: { label: 'COMPLETED', bg: 'rgba(59,130,246,0.15)', text: '#93c5fd' },
};

export default function ManageEventsPage({ state, navigate, logout }: Props) {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState(ORGANIZER_EVENTS);
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  const filtered = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));

  const cancelEvent = (id: string) =>
    setEvents(evs => evs.map(e => e.id === id ? { ...e, status: 'cancelled' as EventStatus } : e));

  const deleteEvent = (id: string) =>
    setEvents(evs => evs.filter(e => e.id !== id));

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar state={state} navigate={navigate} logout={logout} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Organizer</span>
            </div>
            <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2.25rem', fontWeight: 400, color: '#0f172a', letterSpacing: '-0.02em' }}>
              My Events
            </h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Manage and monitor all your events</p>
          </div>
          <button onClick={() => navigate('create-event', { editEventId: null })}
            style={{ padding: '11px 22px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(99,102,241,0.35)', transition: 'all 0.15s', flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.35)'; }}>
            + Create Event
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '24px', maxWidth: '400px' }}>
          <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..."
            style={{ width: '100%', padding: '11px 16px 11px 40px', borderRadius: '12px', fontSize: '0.9375rem', outline: 'none', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)', color: '#0f172a' }} />
        </div>

        {/* Table */}
        <div style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(16,24,40,0.09)' }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 100px 120px 120px 140px 160px', background: '#ffffff', borderBottom: '1px solid rgba(16,24,40,0.09)', padding: '12px 20px', gap: '16px' }}
            className="events-table-header">
            {['Event', 'Date', 'Sold', 'Revenue', 'Status', 'Actions'].map(h => (
              <div key={h} style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ padding: '60px 20px', textAlign: 'center', background: '#ffffff' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🔍</div>
              <p style={{ color: '#64748b' }}>No events match your search.</p>
            </div>
          )}

          {filtered.map((event, i) => {
            const st = STATUS_CONFIG[event.status];
            const pct = Math.round((event.sales / event.capacity) * 100);
            return (
              <div key={event.id}
                style={{ display: 'grid', gridTemplateColumns: '2fr 100px 120px 120px 140px 160px', padding: '18px 20px', gap: '16px', alignItems: 'center', background: i % 2 === 0 ? '#ffffff' : 'rgba(13,13,26,0.5)', borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}
                className="events-table-row"
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(99,102,241,0.04)')}
                onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? '#ffffff' : 'rgba(13,13,26,0.5)')}>

                <div>
                  <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '2px', fontSize: '0.9375rem' }}>{event.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <div style={{ flex: 1, height: '4px', borderRadius: '99px', background: '#f8fafc', maxWidth: '120px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: pct > 80 ? '#10b981' : '#2563eb', borderRadius: '99px' }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{pct}% sold</span>
                  </div>
                </div>

                <div style={{ fontSize: '0.875rem', color: '#475569' }}>{event.date}</div>

                <div>
                  <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.9375rem' }}>{event.sales.toLocaleString()}</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>/{event.capacity.toLocaleString()}</span>
                </div>

                <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.125rem', color: '#f59e0b' }}>
                  ${event.revenue > 0 ? `${(event.revenue / 1000).toFixed(0)}K` : '0'}
                </div>

                <div>
                  <span style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.04em', background: st.bg, color: st.text }}>
                    {st.label}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', position: 'relative' }}>
                  <ActionBtn label="View" onClick={() => navigate('event-detail', { selectedEvent: { id: event.id, title: event.title, category: 'Music' as const, date: event.date, time: '7:00 PM', venue: 'Skyline Arena', city: 'New York', country: 'US', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&h=560&fit=crop&auto=format', description: 'Three nights of underground electronic and indie acts across four stages.', organizer: 'Pulse Events', status: 'active' as const, ticketTypes: [], tags: [], featured: true } })} />
                  <ActionBtn label="Edit" onClick={() => navigate('create-event', { editEventId: event.id })} accent />
                  <div style={{ position: 'relative' }}>
                    <button onClick={() => setActionMenu(actionMenu === event.id ? null : event.id)}
                      style={{ padding: '5px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 500, background: 'rgba(255,255,255,0.04)', color: '#64748b', border: '1px solid rgba(16,24,40,0.09)', cursor: 'pointer' }}>
                      ···
                    </button>
                    {actionMenu === event.id && (
                      <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 6px)', width: '140px', background: '#ffffff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', zIndex: 10 }}>
                        {[
                          { label: 'Duplicate', action: () => setActionMenu(null) },
                          { label: 'Cancel', action: () => { cancelEvent(event.id); setActionMenu(null); } },
                          { label: 'Delete', action: () => { deleteEvent(event.id); setActionMenu(null); }, danger: true },
                        ].map(a => (
                          <button key={a.label} onClick={a.action}
                            style={{ width: '100%', padding: '10px 16px', textAlign: 'left', fontSize: '0.875rem', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', color: (a as any).danger ? '#f87171' : '#475569', transition: 'background 0.1s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                            {a.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {actionMenu && <div style={{ position: 'fixed', inset: 0, zIndex: 9 }} onClick={() => setActionMenu(null)} />}

      <style>{`
        @media (max-width: 900px) {
          .events-table-header, .events-table-row {
            grid-template-columns: 1fr 80px 100px 100px !important;
          }
          .events-table-header > div:nth-child(5),
          .events-table-header > div:nth-child(6),
          .events-table-row > div:nth-child(5),
          .events-table-row > div:nth-child(6) { display: none; }
        }
      `}</style>
    </div>
  );
}

function ActionBtn({ label, onClick, accent }: { label: string; onClick: () => void; accent?: boolean }) {
  return (
    <button onClick={onClick}
      style={{ padding: '5px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s', border: 'none',
        background: accent ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.04)',
        color: accent ? '#3b82f6' : '#475569',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = accent ? 'rgba(99,102,241,0.22)' : 'rgba(255,255,255,0.08)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = accent ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.04)'; }}>
      {label}
    </button>
  );
}
