import { useState } from 'react';
import { AppState, Page, UserRole } from '../../App';
import { NOTIFICATIONS } from '../../utils/mockData';

interface NavbarProps {
  state: AppState;
  navigate: (page: Page) => void;
  logout: () => void;
}

export default function Navbar({ state, navigate, logout }: NavbarProps) {
  const { role, page } = state;
  const [notifOpen, setNotifOpen] = useState(false);

  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  const navLinks = role === 'organizer'
    ? [
        { label: 'Dashboard', page: 'organizer' as Page },
        { label: 'My Events', page: 'manage-events' as Page },
        { label: 'Analytics', page: 'analytics' as Page },
      ]
    : role === 'admin'
      ? [{ label: 'Admin Panel', page: 'admin' as Page }]
      : [
          { label: 'Discover', page: 'landing' as Page },
          { label: 'Events', page: 'events' as Page },
          ...(role ? [{ label: 'My Tickets', page: 'bookings' as Page }] : []),
        ];

  const NOTIF_ICONS: Record<string, string> = {
    BOOKING_CONFIRMED: '✓',
    PAYMENT_SUCCESS: '💳',
    PAYMENT_FAILED: '✕',
    TICKET_ISSUED: '🎟',
    EVENT_REMINDER: '⏰',
    EVENT_CANCELLED: '✕',
  };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(6,6,15,0.85)',
      backdropFilter: 'blur(20px) saturate(150%)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
        {/* Logo */}
        <button onClick={() => navigate(role === 'organizer' ? 'organizer' : role === 'admin' ? 'admin' : 'landing')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
            boxShadow: '0 0 20px rgba(99,102,241,0.4)',
          }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L17 7V18H13V13H7V18H3V7L10 2Z" fill="white" fillOpacity="0.9"/>
              <circle cx="10" cy="10" r="2" fill="white" fillOpacity="0.5"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '1.0625rem', color: '#0f172a', letterSpacing: '-0.02em' }}>
            Event<span style={{ color: '#3b82f6' }}>Hub</span>
          </span>
        </button>

        {/* Center links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1, justifyContent: 'center' }}>
          {navLinks.map(link => (
            <NavLink key={link.page} label={link.label} active={page === link.page}
              onClick={() => navigate(link.page)} />
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {!role ? (
            <>
              <button onClick={() => navigate('login')}
                style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 500, color: '#475569', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#0f172a')}
                onMouseLeave={e => (e.currentTarget.style.color = '#475569')}>
                Sign in
              </button>
              <button onClick={() => navigate('register')}
                style={{ padding: '8px 18px', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0 2px 12px rgba(99,102,241,0.35)' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1d4ed8'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(99,102,241,0.35)'; }}>
                Get started
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Notification Bell */}
              <div style={{ position: 'relative' }}>
                <button onClick={() => setNotifOpen(o => !o)}
                  style={{ width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: notifOpen ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${notifOpen ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer', position: 'relative', transition: 'all 0.15s', color: '#475569' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.12)'; e.currentTarget.style.color = '#0f172a'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = notifOpen ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#475569'; }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                  {unread > 0 && (
                    <span style={{ position: 'absolute', top: '4px', right: '4px', width: '16px', height: '16px', borderRadius: '50%', background: '#ef4444', fontSize: '0.6rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, border: '2px solid #ffffff' }}>
                      {unread}
                    </span>
                  )}
                </button>

                {/* Notification dropdown */}
                {notifOpen && (
                  <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 10px)', width: '340px', borderRadius: '16px', background: '#ffffff', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)', zIndex: 100, overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.9375rem' }}>Notifications</span>
                      {unread > 0 && <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 500 }}>{unread} unread</span>}
                    </div>
                    <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                      {NOTIFICATIONS.slice(0, 4).map((n, i) => (
                        <div key={n.id} style={{ padding: '14px 20px', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none', background: n.read ? 'transparent' : 'rgba(99,102,241,0.04)', cursor: 'pointer', transition: 'background 0.15s' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                          onMouseLeave={e => (e.currentTarget.style.background = n.read ? 'transparent' : 'rgba(99,102,241,0.04)')}>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: n.read ? 'rgba(255,255,255,0.05)' : 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', flexShrink: 0 }}>
                              {NOTIF_ICONS[n.type]}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: n.read ? '#475569' : '#0f172a' }}>{n.title}</span>
                                {!n.read && <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2563eb', flexShrink: 0, marginTop: '4px' }} />}
                              </div>
                              <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '2px', lineHeight: 1.4 }}>{n.message}</div>
                              <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '4px' }}>{n.time}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <button onClick={() => { navigate('notifications'); setNotifOpen(false); }}
                        style={{ width: '100%', padding: '8px', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 500, color: '#3b82f6', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', cursor: 'pointer' }}>
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <button onClick={() => navigate('profile')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <RolePill role={role} />
              </button>
              <button onClick={logout}
                style={{ padding: '7px 14px', borderRadius: '10px', fontSize: '0.8125rem', fontWeight: 500, color: '#64748b', background: 'transparent', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Close dropdown on outside click */}
      {notifOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 49 }} onClick={() => setNotifOpen(false)} />
      )}
    </nav>
  );
}

function NavLink({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{
        padding: '6px 14px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'all 0.15s',
        color: active ? '#0f172a' : '#64748b',
        background: active ? 'rgba(255,255,255,0.07)' : 'transparent',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#475569'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#64748b'; }}>
      {label}
    </button>
  );
}

function RolePill({ role }: { role: UserRole }) {
  const config: Record<string, { label: string; initials: string; color: string }> = {
    user: { label: 'Alex Chen', initials: 'AC', color: '#2563eb' },
    organizer: { label: 'Pulse Events', initials: 'PE', color: '#f59e0b' },
    admin: { label: 'Admin', initials: 'AD', color: '#ef4444' },
  };
  const c = config[role!];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px 4px 4px', borderRadius: '99px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.15s' }}>
      <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6875rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
        {c.initials}
      </div>
      <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#0f172a' }}>{c.label}</span>
    </div>
  );
}
