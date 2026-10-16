import { useState } from 'react';
import { AppState, Page } from '../../App';
import Navbar from '../../components/layout/Navbar';
import { NOTIFICATIONS, Notification } from '../../utils/mockData';

interface Props {
  state: AppState;
  navigate: (page: Page, patch?: Partial<AppState>) => void;
  logout: () => void;
}

const TYPE_CONFIG: Record<Notification['type'], { icon: string; color: string; bg: string }> = {
  BOOKING_CONFIRMED: { icon: '✓', color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
  PAYMENT_SUCCESS: { icon: '💳', color: '#2563eb', bg: 'rgba(99,102,241,0.15)' },
  PAYMENT_FAILED: { icon: '✕', color: '#f87171', bg: 'rgba(239,68,68,0.15)' },
  TICKET_ISSUED: { icon: '🎟', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  EVENT_REMINDER: { icon: '⏰', color: '#3b82f6', bg: 'rgba(129,140,248,0.15)' },
  EVENT_CANCELLED: { icon: '✕', color: '#f87171', bg: 'rgba(239,68,68,0.15)' },
};

const TYPE_LABELS: Record<Notification['type'], string> = {
  BOOKING_CONFIRMED: 'BOOKING_CONFIRMED',
  PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  TICKET_ISSUED: 'TICKET_ISSUED',
  EVENT_REMINDER: 'EVENT_REMINDER',
  EVENT_CANCELLED: 'EVENT_CANCELLED',
};

export default function NotificationsPage({ state, navigate, logout }: Props) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })));
  const markRead = (id: string) => setNotifications(n => n.map(x => x.id === id ? { ...x, read: true } : x));

  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar state={state} navigate={navigate} logout={logout} />

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2.25rem', fontWeight: 400, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Notifications
            </h1>
            {unreadCount > 0 && (
              <p style={{ color: '#64748b', marginTop: '4px' }}>{unreadCount} unread notification{unreadCount > 1 ? 's' : ''}</p>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '4px', padding: '4px', borderRadius: '10px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)' }}>
              {(['all', 'unread'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{ padding: '6px 16px', borderRadius: '7px', fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer', border: 'none', transition: 'all 0.15s', textTransform: 'capitalize',
                    background: filter === f ? '#f1f5f9' : 'transparent',
                    color: filter === f ? '#0f172a' : '#64748b',
                  }}>
                  {f === 'unread' ? `Unread (${unreadCount})` : 'All'}
                </button>
              ))}
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllRead}
                style={{ fontSize: '0.8125rem', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#a5b4fc')}
                onMouseLeave={e => (e.currentTarget.style.color = '#3b82f6')}>
                Mark all read
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🔔</div>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>No {filter === 'unread' ? 'unread' : ''} notifications</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', borderRadius: '18px', overflow: 'hidden', border: filtered.length > 0 ? '1px solid rgba(16,24,40,0.09)' : 'none' }}>
          {filtered.map((n, i) => {
            const cfg = TYPE_CONFIG[n.type];
            return (
              <div key={n.id}
                style={{ padding: '18px 20px', background: n.read ? (i % 2 === 0 ? '#ffffff' : '#f8fafc') : 'rgba(99,102,241,0.04)', borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', cursor: 'pointer', transition: 'background 0.15s' }}
                onClick={() => markRead(n.id)}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                onMouseLeave={e => (e.currentTarget.style.background = n.read ? (i % 2 === 0 ? '#ffffff' : '#f8fafc') : 'rgba(99,102,241,0.04)')}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0, color: cfg.color, fontWeight: 700 }}>
                    {cfg.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: n.read ? '#475569' : '#0f172a' }}>{n.title}</span>
                        <span style={{ fontSize: '0.625rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, padding: '2px 6px', borderRadius: '4px', background: cfg.bg, color: cfg.color, letterSpacing: '0.04em' }}>
                          {TYPE_LABELS[n.type]}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        {!n.read && <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2563eb', flexShrink: 0 }} />}
                        <span style={{ fontSize: '0.75rem', color: '#cbd5e1', whiteSpace: 'nowrap' }}>{n.time}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>{n.message}</p>
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
