import { useState } from 'react';
import { AppState, Page } from '../../App';
import Navbar from '../../components/layout/Navbar';
import { ADMIN_STATS, EVENTS } from '../../utils/mockData';

interface Props {
  state: AppState;
  navigate: (page: Page, patch?: Partial<AppState>) => void;
  logout: () => void;
}

const USERS = [
  { id: 'USR-001', name: 'Alex Chen', email: 'alex@example.com', role: 'USER', joined: 'Sep 1, 2026', status: 'active', bookings: 3 },
  { id: 'USR-002', name: 'Jordan Kim', email: 'jordan@example.com', role: 'USER', joined: 'Aug 14, 2026', status: 'active', bookings: 7 },
  { id: 'USR-003', name: 'Pulse Events', email: 'pulse@events.com', role: 'ORGANIZER', joined: 'Mar 5, 2026', status: 'active', bookings: 0 },
  { id: 'USR-004', name: 'Sam Reyes', email: 'sam@example.com', role: 'USER', joined: 'Sep 10, 2026', status: 'suspended', bookings: 1 },
  { id: 'USR-005', name: 'Form & Space', email: 'contact@formspace.art', role: 'ORGANIZER', joined: 'Jul 22, 2026', status: 'active', bookings: 0 },
];

const PENDING = [
  { id: 'EVT-P01', title: 'Jazz Under the Stars', organizer: 'Velvet Sound Co.', date: 'Nov 20, 2026', submitted: '1h ago', category: 'Music' },
  { id: 'EVT-P02', title: 'Startup Pitch Night', organizer: 'BuilderHub', date: 'Oct 30, 2026', submitted: '3h ago', category: 'Business' },
];

export default function AdminDashboard({ state, navigate, logout }: Props) {
  const [tab, setTab] = useState<'overview' | 'users' | 'events' | 'moderation'>('overview');

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar state={state} navigate={navigate} logout={logout} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', marginBottom: '10px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Admin</span>
            </div>
            <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2.5rem', fontWeight: 400, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Platform Overview
            </h1>
          </div>
          {ADMIN_STATS.pendingModeration > 0 && (
            <button onClick={() => setTab('moderation')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 2s infinite' }} />
              {ADMIN_STATS.pendingModeration} pending review
            </button>
          )}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '32px' }} className="admin-grid">
          {[
            { label: 'Total Users', value: ADMIN_STATS.totalUsers.toLocaleString(), color: '#2563eb', glow: 'rgba(99,102,241,0.07)' },
            { label: 'Organizers', value: String(ADMIN_STATS.totalOrganizers), color: '#f59e0b', glow: 'rgba(245,158,11,0.07)' },
            { label: 'Total Events', value: ADMIN_STATS.totalEvents.toLocaleString(), color: '#3b82f6', glow: 'rgba(129,140,248,0.07)' },
            { label: 'Active Events', value: String(ADMIN_STATS.activeEvents), color: '#10b981', glow: 'rgba(16,185,129,0.07)' },
            { label: 'Total Revenue', value: `$${(ADMIN_STATS.totalRevenue / 1_000_000).toFixed(2)}M`, color: '#f59e0b', glow: 'rgba(245,158,11,0.07)' },
            { label: 'Pending Review', value: String(ADMIN_STATS.pendingModeration), color: '#ef4444', glow: 'rgba(239,68,68,0.07)' },
          ].map(k => (
            <div key={k.label} style={{ padding: '20px', borderRadius: '18px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', borderRadius: '50%', background: k.glow, filter: 'blur(24px)', transform: 'translate(30%, -30%)' }} />
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>{k.label}</div>
              <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2rem', color: k.color, lineHeight: 1 }}>{k.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', padding: '4px', borderRadius: '14px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)', width: 'fit-content', marginBottom: '28px', flexWrap: 'wrap' }}>
          {(['overview', 'users', 'events', 'moderation'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding: '8px 18px', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', border: 'none', transition: 'all 0.15s', textTransform: 'capitalize', position: 'relative',
                background: tab === t ? '#f1f5f9' : 'transparent',
                color: tab === t ? '#0f172a' : '#64748b',
              }}>
              {t}
              {t === 'moderation' && ADMIN_STATS.pendingModeration > 0 && (
                <span style={{ position: 'absolute', top: '4px', right: '4px', width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }} />
              )}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }} className="ov-grid">
            <div style={{ padding: '24px', borderRadius: '18px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)' }}>
              <h3 style={{ fontWeight: 600, color: '#0f172a', marginBottom: '18px' }}>Recent Events</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {EVENTS.slice(0, 5).map(e => (
                  <div key={e.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#0f172a' }}>{e.title}</div>
                      <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{e.category} · {e.city}</div>
                    </div>
                    <span style={{ padding: '3px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(16,185,129,0.1)', color: '#10b981', flexShrink: 0 }}>Live</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '24px', borderRadius: '18px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)' }}>
              <h3 style={{ fontWeight: 600, color: '#0f172a', marginBottom: '18px' }}>Revenue by Category</h3>
              {[
                { label: 'Music', pct: 42, val: '$1.6M', color: '#3b82f6' },
                { label: 'Tech', pct: 28, val: '$1.07M', color: '#2563eb' },
                { label: 'Sports', pct: 15, val: '$573K', color: '#10b981' },
                { label: 'Business', pct: 10, val: '$382K', color: '#f59e0b' },
                { label: 'Other', pct: 5, val: '$191K', color: '#64748b' },
              ].map(row => (
                <div key={row.label} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '6px' }}>
                    <span style={{ color: '#475569' }}>{row.label}</span>
                    <span style={{ color: '#f59e0b', fontWeight: 500 }}>{row.val}</span>
                  </div>
                  <div style={{ height: '5px', borderRadius: '99px', background: '#f8fafc', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${row.pct}%`, borderRadius: '99px', background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'users' && (
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(16,24,40,0.09)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#ffffff', borderBottom: '1px solid rgba(16,24,40,0.09)' }}>
                  {['User', 'Role', 'Joined', 'Status', 'Bookings', 'Action'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {USERS.map((u, i) => (
                  <tr key={u.id} style={{ background: i % 2 === 0 ? '#ffffff' : '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#0f172a' }}>{u.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{u.email}</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600,
                        background: u.role === 'ORGANIZER' ? 'rgba(245,158,11,0.1)' : 'rgba(99,102,241,0.1)',
                        color: u.role === 'ORGANIZER' ? '#f59e0b' : '#3b82f6',
                      }}>{u.role}</span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '0.875rem', color: '#64748b' }}>{u.joined}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600,
                        background: u.status === 'active' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                        color: u.status === 'active' ? '#10b981' : '#ef4444',
                      }}>{u.status}</span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '0.875rem', color: '#475569' }}>{u.bookings}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <button style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer', border: '1px solid',
                        background: u.status === 'active' ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)',
                        color: u.status === 'active' ? '#ef4444' : '#10b981',
                        borderColor: u.status === 'active' ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)',
                      }}>
                        {u.status === 'active' ? 'Suspend' : 'Reinstate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'events' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {EVENTS.map(e => (
              <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', borderRadius: '14px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)', flexWrap: 'wrap' }}>
                <img src={e.image} alt={e.title} style={{ width: '52px', height: '52px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: '140px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#0f172a' }}>{e.title}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{e.organizer} · {e.date}</div>
                </div>
                <span style={{ padding: '3px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>Live</span>
                <button style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer', background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                  Unpublish
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'moderation' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ fontSize: '0.9375rem', color: '#64748b', marginBottom: '4px' }}>Events awaiting review before going live:</p>
            {PENDING.map(e => (
              <div key={e.id} style={{ padding: '22px', borderRadius: '18px', background: '#ffffff', border: '1px solid rgba(245,158,11,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1rem', color: '#0f172a', marginBottom: '4px' }}>{e.title}</div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '2px' }}>by {e.organizer} · {e.date}</div>
                    <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>Submitted {e.submitted} · Category: {e.category}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexShrink: 0, flexWrap: 'wrap' }}>
                    <button onClick={() => navigate('event-review', { reviewEventId: e.id })}
                      style={{ padding: '10px 18px', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', background: 'rgba(99,102,241,0.1)', color: '#3b82f6', border: '1px solid rgba(99,102,241,0.25)', transition: 'all 0.15s' }}
                      onMouseEnter={ev => { ev.currentTarget.style.background = 'rgba(99,102,241,0.2)'; }}
                      onMouseLeave={ev => { ev.currentTarget.style.background = 'rgba(99,102,241,0.1)'; }}>
                      👁 Review
                    </button>
                    <button style={{ padding: '10px 18px', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)', transition: 'all 0.15s' }}
                      onMouseEnter={ev => { ev.currentTarget.style.background = 'rgba(16,185,129,0.2)'; }}
                      onMouseLeave={ev => { ev.currentTarget.style.background = 'rgba(16,185,129,0.1)'; }}>
                      ✓ Approve
                    </button>
                    <button style={{ padding: '10px 18px', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.25)', transition: 'all 0.15s' }}
                      onMouseEnter={ev => { ev.currentTarget.style.background = 'rgba(239,68,68,0.2)'; }}
                      onMouseLeave={ev => { ev.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}>
                      ✕ Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (min-width: 1024px) {
          .admin-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .ov-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
