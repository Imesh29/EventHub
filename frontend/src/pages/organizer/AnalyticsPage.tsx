import { useState } from 'react';
import { AppState, Page } from '../../App';
import Navbar from '../../components/layout/Navbar';

interface Props {
  state: AppState;
  navigate: (page: Page, patch?: Partial<AppState>) => void;
  logout: () => void;
}

type Range = '7d' | '30d' | '3m' | 'custom';

const RANGE_LABELS: Record<Range, string> = {
  '7d': '7 Days',
  '30d': '30 Days',
  '3m': '3 Months',
  custom: 'Custom Range',
};

const REVENUE_OVER_TIME = [42, 61, 38, 85, 73, 92, 65, 110, 88, 124, 98, 135, 115, 148];
const TICKET_TYPES = [
  { name: 'General', value: 1240, pct: 65 },
  { name: 'VIP', value: 420, pct: 22 },
  { name: 'Early Bird', value: 187, pct: 10 },
  { name: 'Workshop', value: 0, pct: 3 },
];
const REVENUE_BY_EVENT = [
  { name: 'Neon Nights', value: 212540, pct: 85 },
  { name: 'Pulse DJ Night', value: 24000, pct: 32 },
  { name: 'Ambient Sessions', value: 16000, pct: 22 },
  { name: 'AI Summit', value: 0, pct: 0 },
];

export default function AnalyticsPage({ state, navigate, logout }: Props) {
  const [range, setRange] = useState<Range>('30d');

  const kpis = [
    { label: 'Revenue', value: '$124,850', change: '+18.4%', up: true, color: '#f59e0b' },
    { label: 'Tickets Sold', value: '1,847', change: '+12.1%', up: true, color: '#2563eb' },
    { label: 'Average Order', value: '$127', change: '+3.2%', up: true, color: '#10b981' },
    { label: 'Conversion', value: '6.8%', change: '-0.4%', up: false, color: '#3b82f6' },
  ];

  const maxRevenue = Math.max(...REVENUE_OVER_TIME);

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
              Analytics
            </h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Performance overview for your events</p>
          </div>

          {/* Date range */}
          <div style={{ display: 'flex', gap: '4px', padding: '4px', borderRadius: '12px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)', flexWrap: 'wrap' }}>
            {(Object.entries(RANGE_LABELS) as [Range, string][]).map(([key, label]) => (
              <button key={key} onClick={() => setRange(key)}
                style={{ padding: '8px 16px', borderRadius: '9px', fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer', border: 'none', transition: 'all 0.15s',
                  background: range === key ? '#f1f5f9' : 'transparent',
                  color: range === key ? '#0f172a' : '#64748b',
                  boxShadow: range === key ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '28px' }} className="analytics-kpi-grid">
          {kpis.map(k => (
            <div key={k.label} style={{ padding: '24px', borderRadius: '18px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', borderRadius: '50%', background: `${k.color}10`, filter: 'blur(24px)', transform: 'translate(30%, -30%)' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>{k.label}</div>
              <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2.25rem', color: k.color, lineHeight: 1, marginBottom: '8px' }}>{k.value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '0.875rem', color: k.up ? '#10b981' : '#f87171', fontWeight: 600 }}>
                  {k.up ? '↑' : '↓'} {k.change}
                </span>
                <span style={{ fontSize: '0.8125rem', color: '#cbd5e1' }}>vs prev period</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }} className="analytics-charts-grid">

          {/* Revenue over time */}
          <div style={{ padding: '24px', borderRadius: '18px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontWeight: 600, color: '#0f172a', fontSize: '1rem', margin: 0 }}>Revenue Over Time</h3>
              <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>Daily · {RANGE_LABELS[range]}</span>
            </div>
            <div style={{ height: '160px', display: 'flex', alignItems: 'flex-end', gap: '6px', padding: '0 4px' }}>
              {REVENUE_OVER_TIME.map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                  <div
                    style={{ width: '100%', borderRadius: '5px 5px 0 0', transition: 'height 0.3s ease', cursor: 'pointer',
                      height: `${(v / maxRevenue) * 100}%`,
                      background: i === REVENUE_OVER_TIME.length - 1
                        ? 'linear-gradient(180deg, #f59e0b, #d97706)'
                        : 'linear-gradient(180deg, #2563eb, #1d4ed8)',
                      opacity: i < REVENUE_OVER_TIME.length - 4 ? 0.5 + (i / REVENUE_OVER_TIME.length) * 0.5 : 1,
                    }}
                    title={`$${(v * 1000).toLocaleString()}`}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = String(i < REVENUE_OVER_TIME.length - 4 ? 0.5 + (i / REVENUE_OVER_TIME.length) * 0.5 : 1))}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Sep 1</span>
              <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Sep 25</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="analytics-bottom-grid">
            {/* Ticket Sales by Type */}
            <div style={{ padding: '24px', borderRadius: '18px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)' }}>
              <h3 style={{ fontWeight: 600, color: '#0f172a', fontSize: '1rem', margin: '0 0 20px' }}>Ticket Sales by Type</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {TICKET_TYPES.map((t, i) => {
                  const colors = ['#2563eb', '#f59e0b', '#10b981', '#3b82f6'];
                  return (
                    <div key={t.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#475569' }}>{t.name}</span>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>{t.value.toLocaleString()}</span>
                      </div>
                      <div style={{ height: '8px', borderRadius: '99px', background: '#f8fafc', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${t.pct}%`, borderRadius: '99px', background: colors[i], transition: 'width 0.6s ease' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Revenue by Event */}
            <div style={{ padding: '24px', borderRadius: '18px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)' }}>
              <h3 style={{ fontWeight: 600, color: '#0f172a', fontSize: '1rem', margin: '0 0 20px' }}>Revenue by Event</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {REVENUE_BY_EVENT.map((e, i) => {
                  const colors = ['#f59e0b', '#2563eb', '#10b981', '#64748b'];
                  return (
                    <div key={e.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#475569' }}>{e.name}</span>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: e.value > 0 ? '#0f172a' : '#cbd5e1' }}>
                          {e.value > 0 ? `$${(e.value / 1000).toFixed(0)}K` : '–'}
                        </span>
                      </div>
                      <div style={{ height: '8px', borderRadius: '99px', background: '#f8fafc', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${e.pct}%`, borderRadius: '99px', background: colors[i], transition: 'width 0.6s ease' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .analytics-kpi-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .analytics-charts-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .analytics-bottom-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
