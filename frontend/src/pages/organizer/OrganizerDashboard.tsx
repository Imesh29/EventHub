import { useState } from 'react';
import { AppState, Page } from '../../App';
import Navbar from '../../components/layout/Navbar';
import { ORGANIZER_EVENTS } from '../../utils/mockData';

interface Props {
  state: AppState;
  navigate: (page: Page, patch?: Partial<AppState>) => void;
  logout: () => void;
}

const RECENT = [
  { id: 'BKG-10482', event: 'Neon Nights', buyer: 'Jordan Kim', type: 'VIP × 2', amount: 440, time: '2m ago', status: 'confirmed' },
  { id: 'BKG-10481', event: 'Neon Nights', buyer: 'Sam Reyes', type: 'GA × 3', amount: 255, time: '14m ago', status: 'confirmed' },
  { id: 'BKG-10480', event: 'Pulse DJ Night', buyer: 'Taylor Brooks', type: 'GA × 1', amount: 50, time: '41m ago', status: 'confirmed' },
  { id: 'BKG-10479', event: 'Neon Nights', buyer: 'Morgan Lee', type: 'VIP × 1', amount: 220, time: '1h ago', status: 'pending' },
  { id: 'BKG-10478', event: 'Ambient Sessions', buyer: 'Casey Park', type: 'GA × 2', amount: 100, time: '2h ago', status: 'confirmed' },
];

export default function OrganizerDashboard({ state, navigate, logout }: Props) {
  const [tab, setTab] = useState<'overview' | 'events' | 'bookings'>('overview');
  const totalRevenue = ORGANIZER_EVENTS.reduce((s, e) => s + e.revenue, 0);
  const totalSales = ORGANIZER_EVENTS.reduce((s, e) => s + e.sales, 0);

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar state={state} navigate={navigate} logout={logout} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Organizer</span>
            </div>
            <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2.5rem', fontWeight: 400, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Pulse Events
            </h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Dashboard · {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
          <button onClick={() => navigate('create-event', { editEventId: null })}
            style={{ padding: '11px 22px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(99,102,241,0.35)', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.35)'; }}>
            + Create Event
          </button>
        </div>

        {/* KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '32px' }} className="kpi-grid">
          {[
            { label: 'Total Revenue', value: `$${(totalRevenue / 1000).toFixed(0)}K`, change: '+18%', color: '#f59e0b', glow: 'rgba(245,158,11,0.08)' },
            { label: 'Tickets Sold', value: totalSales.toLocaleString(), change: '+12%', color: '#2563eb', glow: 'rgba(99,102,241,0.08)' },
            { label: 'Active Events', value: String(ORGANIZER_EVENTS.length), change: '3 live', color: '#10b981', glow: 'rgba(16,185,129,0.08)' },
            { label: 'Avg. Fill Rate', value: '68%', change: '+5pp MoM', color: '#3b82f6', glow: 'rgba(129,140,248,0.08)' },
          ].map(k => (
            <div key={k.label} style={{ padding: '22px', borderRadius: '18px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', borderRadius: '50%', background: k.glow, filter: 'blur(30px)', transform: 'translate(30%, -30%)' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>{k.label}</div>
              <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2.25rem', color: k.color, lineHeight: 1, marginBottom: '8px' }}>{k.value}</div>
              <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{k.change}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', padding: '4px', borderRadius: '14px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)', width: 'fit-content', marginBottom: '28px' }}>
          {(['overview', 'events', 'bookings'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding: '8px 20px', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', border: 'none', transition: 'all 0.15s', textTransform: 'capitalize',
                background: tab === t ? '#f1f5f9' : 'transparent',
                color: tab === t ? '#0f172a' : '#64748b',
                boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
              }}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }} className="overview-grid">
            {/* Recent bookings */}
            <Panel title="Recent Bookings">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                {RECENT.map((b, i) => (
                  <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none', gap: '12px' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.buyer}</div>
                      <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{b.event} · {b.type}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{b.time}</span>
                      <span style={{ fontWeight: 600, color: '#f59e0b', fontSize: '0.9375rem' }}>${b.amount}</span>
                      <span style={{ padding: '3px 8px', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 600,
                        background: b.status === 'confirmed' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                        color: b.status === 'confirmed' ? '#10b981' : '#f59e0b',
                      }}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
            {/* Event performance */}
            <Panel title="Event Performance">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {ORGANIZER_EVENTS.map(e => {
                  const pct = Math.round((e.sales / e.capacity) * 100);
                  return (
                    <div key={e.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#0f172a' }}>{e.title}</span>
                        <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>{pct}% sold</span>
                      </div>
                      <div style={{ height: '6px', borderRadius: '99px', background: '#f8fafc', overflow: 'hidden', marginBottom: '6px' }}>
                        <div style={{ height: '100%', width: `${pct}%`, borderRadius: '99px', background: `linear-gradient(90deg, #2563eb, #3b82f6)`, transition: 'width 0.6s ease' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{e.sales.toLocaleString()} / {e.capacity.toLocaleString()} tickets</span>
                        <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 500 }}>${(e.revenue / 1000).toFixed(0)}K revenue</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>
          </div>
        )}

        {tab === 'events' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {ORGANIZER_EVENTS.map(e => (
              <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', borderRadius: '16px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '160px' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '3px' }}>{e.title}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{e.date}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.5rem', color: '#f59e0b' }}>${(e.revenue / 1000).toFixed(0)}K</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>revenue</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.5rem', color: '#0f172a' }}>{e.sales}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>sold</div>
                </div>
                <span style={{ padding: '5px 12px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>Live</span>
                <button onClick={() => navigate('create-event', { editEventId: e.id })}
                  style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 500, background: '#f8fafc', color: '#475569', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={ev => { ev.currentTarget.style.color = '#0f172a'; ev.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                  onMouseLeave={ev => { ev.currentTarget.style.color = '#475569'; ev.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'bookings' && (
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(16,24,40,0.09)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#ffffff', borderBottom: '1px solid rgba(16,24,40,0.09)' }}>
                  {['Booking ID', 'Buyer', 'Event', 'Tickets', 'Amount', 'Time', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT.map((b, i) => (
                  <tr key={b.id} style={{ background: i % 2 === 0 ? '#ffffff' : '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8125rem', color: '#2563eb' }}>{b.id}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9375rem', color: '#0f172a', fontWeight: 500 }}>{b.buyer}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#475569' }}>{b.event}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#475569' }}>{b.type}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9375rem', fontWeight: 600, color: '#f59e0b' }}>${b.amount}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.8125rem', color: '#64748b' }}>{b.time}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600,
                        background: b.status === 'confirmed' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                        color: b.status === 'confirmed' ? '#10b981' : '#f59e0b',
                      }}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .kpi-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .overview-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '24px', borderRadius: '18px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)' }}>
      <h3 style={{ fontWeight: 600, color: '#0f172a', marginBottom: '20px', fontSize: '1rem' }}>{title}</h3>
      {children}
    </div>
  );
}
