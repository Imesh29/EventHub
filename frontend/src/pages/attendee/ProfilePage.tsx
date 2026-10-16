import { useState } from 'react';
import { AppState, Page } from '../../App';
import Navbar from '../../components/layout/Navbar';

interface Props {
  state: AppState;
  navigate: (page: Page, patch?: Partial<AppState>) => void;
  logout: () => void;
}

type SettingsTab = 'account' | 'security' | 'notifications';

export default function ProfilePage({ state, navigate, logout }: Props) {
  const [tab, setTab] = useState<SettingsTab>('account');
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Alex Chen');
  const [email, setEmail] = useState('alex.chen@example.com');
  const [phone, setPhone] = useState('+1 (555) 321-0000');
  const [saved, setSaved] = useState(false);

  const [notifs, setNotifs] = useState({
    email: true,
    bookingUpdates: true,
    eventReminders: true,
    marketing: false,
  });

  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const roleColor = state.role === 'organizer' ? '#f59e0b' : state.role === 'admin' ? '#ef4444' : '#2563eb';
  const roleLabel = state.role === 'organizer' ? 'Organizer' : state.role === 'admin' ? 'Administrator' : 'Attendee';

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar state={state} navigate={navigate} logout={logout} />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2.25rem', fontWeight: 400, color: '#0f172a', marginBottom: '36px', letterSpacing: '-0.02em' }}>
          My Profile
        </h1>

        {saved && (
          <div style={{ padding: '12px 20px', borderRadius: '12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#10b981' }}>✓</span>
            <span style={{ color: '#10b981', fontWeight: 500, fontSize: '0.9375rem' }}>Changes saved successfully</span>
          </div>
        )}

        <div style={{ display: 'grid', gap: '20px' }} className="profile-grid">
          {/* Profile card */}
          <div style={{ padding: '28px', borderRadius: '20px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: `linear-gradient(135deg, ${roleColor}, ${roleColor}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, color: '#fff', boxShadow: `0 0 30px ${roleColor}40` }}>
                  {initials}
                </div>
                <button style={{ position: 'absolute', bottom: 0, right: 0, width: '26px', height: '26px', borderRadius: '50%', background: '#f1f5f9', border: '2px solid #ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '0.75rem' }}>
                  ✎
                </button>
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.5rem', fontWeight: 400, color: '#0f172a', marginBottom: '4px' }}>{name}</h2>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 10px', borderRadius: '99px', background: `${roleColor}18`, border: `1px solid ${roleColor}30`, marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: roleColor }}>{roleLabel}</span>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{email}</div>
              </div>
              <button onClick={() => setEditing(!editing)}
                style={{ padding: '9px 18px', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)', background: editing ? 'rgba(99,102,241,0.1)' : 'transparent', color: editing ? '#3b82f6' : '#475569', transition: 'all 0.15s' }}>
                {editing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <PField label="Full Name" value={name} onChange={setName} editing={editing} />
              <PField label="Email Address" value={email} onChange={setEmail} editing={editing} type="email" />
              <PField label="Phone" value={phone} onChange={setPhone} editing={editing} type="tel" />
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: '#64748b', marginBottom: '8px' }}>Member Since</label>
                <div style={{ padding: '11px 14px', borderRadius: '10px', background: '#f8fafc', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9375rem', color: '#475569' }}>
                  August 2026
                </div>
              </div>
            </div>

            {editing && (
              <button onClick={handleSave}
                style={{ marginTop: '20px', padding: '12px 28px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(99,102,241,0.35)', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
                Save Changes
              </button>
            )}
          </div>

          {/* Settings */}
          <div style={{ padding: '24px', borderRadius: '20px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)' }}>
            <h3 style={{ fontWeight: 600, color: '#0f172a', marginBottom: '20px', fontSize: '1.0625rem' }}>Settings</h3>

            {/* Settings tabs */}
            <div style={{ display: 'flex', gap: '4px', padding: '4px', borderRadius: '12px', background: '#f8fafc', border: '1px solid rgba(16,24,40,0.07)', marginBottom: '24px', width: 'fit-content' }}>
              {(['account', 'security', 'notifications'] as SettingsTab[]).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  style={{ padding: '7px 18px', borderRadius: '8px', fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer', border: 'none', transition: 'all 0.15s', textTransform: 'capitalize',
                    background: tab === t ? '#f1f5f9' : 'transparent',
                    color: tab === t ? '#0f172a' : '#64748b',
                  }}>
                  {t}
                </button>
              ))}
            </div>

            {tab === 'account' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <SettingRow label="Display Language" value="English (US)" />
                <SettingRow label="Timezone" value="Eastern Time (ET)" />
                <SettingRow label="Currency" value="USD ($)" />
                <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', marginTop: '8px' }}>
                  <div style={{ fontWeight: 500, color: '#f87171', marginBottom: '4px', fontSize: '0.9375rem' }}>Danger Zone</div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '12px' }}>Permanently delete your account and all data.</div>
                  <button style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '0.8125rem', fontWeight: 500, color: '#f87171', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer' }}>
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {tab === 'security' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ padding: '18px', borderRadius: '14px', background: '#f8fafc', border: '1px solid rgba(16,24,40,0.07)' }}>
                  <div style={{ fontWeight: 500, color: '#0f172a', marginBottom: '4px' }}>Change Password</div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '14px' }}>Update your password regularly to keep your account secure.</div>
                  <button style={{ padding: '9px 20px', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 500, color: '#3b82f6', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', cursor: 'pointer' }}>
                    Change Password
                  </button>
                </div>
                <div style={{ padding: '18px', borderRadius: '14px', background: '#f8fafc', border: '1px solid rgba(16,24,40,0.07)' }}>
                  <div style={{ fontWeight: 500, color: '#0f172a', marginBottom: '4px' }}>Two-Factor Authentication</div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '14px' }}>Add an extra layer of security to your account.</div>
                  <button style={{ padding: '9px 20px', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 500, color: '#f59e0b', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', cursor: 'pointer' }}>
                    Enable 2FA
                  </button>
                </div>
              </div>
            )}

            {tab === 'notifications' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '16px' }}>Choose which notifications you'd like to receive.</p>
                {[
                  { key: 'email' as const, label: 'Email notifications', desc: 'Receive updates via email' },
                  { key: 'bookingUpdates' as const, label: 'Booking updates', desc: 'Confirmations, cancellations, and changes' },
                  { key: 'eventReminders' as const, label: 'Event reminders', desc: '24h reminder before events you\'re attending' },
                  { key: 'marketing' as const, label: 'Marketing notifications', desc: 'Deals, featured events, and promotions' },
                ].map(item => (
                  <div key={item.key}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '12px', background: '#f8fafc', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 500, color: '#0f172a', fontSize: '0.9375rem', marginBottom: '2px' }}>{item.label}</div>
                      <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{item.desc}</div>
                    </div>
                    <button onClick={() => setNotifs(n => ({ ...n, [item.key]: !n[item.key] }))}
                      style={{ width: '44px', height: '24px', borderRadius: '99px', border: 'none', cursor: 'pointer', transition: 'all 0.2s', position: 'relative', flexShrink: 0,
                        background: notifs[item.key] ? '#2563eb' : '#f1f5f9',
                        boxShadow: notifs[item.key] ? '0 0 12px rgba(99,102,241,0.4)' : 'none',
                      }}>
                      <div style={{ position: 'absolute', top: '3px', left: notifs[item.key] ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }} />
                    </button>
                  </div>
                ))}
                <button style={{ marginTop: '8px', padding: '12px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(99,102,241,0.35)' }}>
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .profile-grid { grid-template-columns: 3fr 2fr; align-items: start; }
        }
      `}</style>
    </div>
  );
}

function PField({ label, value, onChange, editing, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; editing: boolean; type?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: '#64748b', marginBottom: '8px' }}>{label}</label>
      {editing ? (
        <input type={type} value={value} onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', fontSize: '0.9375rem', outline: 'none', transition: 'all 0.15s', background: '#f8fafc', border: `1px solid ${focused ? 'rgba(99,102,241,0.5)' : 'rgba(16,24,40,0.09)'}`, color: '#0f172a', boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none' }} />
      ) : (
        <div style={{ padding: '11px 14px', borderRadius: '10px', background: '#f8fafc', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9375rem', color: '#475569' }}>
          {value}
        </div>
      )}
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '12px', background: '#f8fafc' }}>
      <span style={{ fontSize: '0.9375rem', color: '#475569' }}>{label}</span>
      <span style={{ fontSize: '0.875rem', color: '#0f172a', fontWeight: 500 }}>{value}</span>
    </div>
  );
}
