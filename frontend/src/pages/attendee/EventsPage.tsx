import { useState } from 'react';
import { AppState, Page } from '../../App';
import Navbar from '../../components/layout/Navbar';
import { EVENTS, Category, CAT_COLORS } from '../../utils/mockData';

interface Props {
  state: AppState;
  navigate: (page: Page, patch?: Partial<AppState>) => void;
  logout: () => void;
}

const CATS: (Category | 'All')[] = ['All', 'Music', 'Tech', 'Sports', 'Arts', 'Business', 'Food'];
const CITIES = ['All Cities', 'New York', 'San Francisco', 'Los Angeles', 'Chicago', 'Boston'];

export default function EventsPage({ state, navigate, logout }: Props) {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState<Category | 'All'>('All');
  const [city, setCity] = useState('All Cities');

  const filtered = EVENTS.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.venue.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === 'All' || e.category === cat;
    const matchCity = city === 'All Cities' || e.city === city;
    return matchSearch && matchCat && matchCity;
  });

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar state={state} navigate={navigate} logout={logout} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2.5rem', fontWeight: 400, color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.02em' }}>
            Upcoming Events
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>{filtered.length} events found</p>
        </div>

        {/* Search + city filter */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events or venues…"
              style={{ width: '100%', padding: '11px 16px 11px 42px', borderRadius: '12px', fontSize: '0.9375rem', outline: 'none', transition: 'all 0.15s', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)', color: '#0f172a' }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(16,24,40,0.09)'; e.currentTarget.style.boxShadow = 'none'; }} />
          </div>
          <select value={city} onChange={e => setCity(e.target.value)}
            style={{ padding: '11px 16px', borderRadius: '12px', fontSize: '0.9375rem', outline: 'none', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)', color: '#0f172a', minWidth: '160px', cursor: 'pointer' }}>
            {CITIES.map(c => <option key={c} style={{ background: '#ffffff' }}>{c}</option>)}
          </select>
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {CATS.map(c => {
            const active = cat === c;
            const colors = c !== 'All' ? CAT_COLORS[c] : null;
            return (
              <button key={c} onClick={() => setCat(c)}
                style={{
                  padding: '7px 16px', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s', border: '1px solid',
                  background: active ? (colors ? colors.bg : 'rgba(99,102,241,0.15)') : '#ffffff',
                  color: active ? (colors ? colors.text : '#3b82f6') : '#64748b',
                  borderColor: active ? (colors ? `${colors.text}44` : 'rgba(99,102,241,0.4)') : 'rgba(16,24,40,0.09)',
                }}>
                {c}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#64748b' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
            <p style={{ fontSize: '1rem' }}>No events match your filters.</p>
            <button onClick={() => { setSearch(''); setCat('All'); setCity('All Cities'); }}
              style={{ marginTop: '16px', padding: '8px 20px', borderRadius: '10px', fontSize: '0.875rem', color: '#3b82f6', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', cursor: 'pointer' }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {filtered.map(event => {
              const minPrice = Math.min(...event.ticketTypes.map(t => t.price));
              const totalAvail = event.ticketTypes.reduce((s, t) => s + t.available, 0);
              const colors = CAT_COLORS[event.category] || { bg: 'rgba(99,102,241,0.15)', text: '#3b82f6' };

              return (
                <div key={event.id}
                  onClick={() => navigate('event-detail', { selectedEvent: event })}
                  style={{ borderRadius: '18px', overflow: 'hidden', cursor: 'pointer', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.5)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,24,40,0.07)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                  <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                    <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(6,6,15,0.8) 100%)' }} />
                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, background: colors.bg, color: colors.text }}>{event.category}</span>
                    </div>
                    {totalAvail === 0 && (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(6,6,15,0.65)' }}>
                        <span style={{ padding: '6px 18px', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 600, background: '#ef4444', color: '#fff' }}>Sold Out</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '18px' }}>
                    <h3 style={{ fontWeight: 600, fontSize: '1rem', color: '#0f172a', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.title}</h3>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '3px' }}>📅 {event.date} · {event.time}</p>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '16px' }}>📍 {event.venue}, {event.city}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontWeight: 700, fontSize: '1rem', color: '#f59e0b' }}>From ${minPrice}</span>
                      <span style={{ fontSize: '0.75rem', padding: '3px 10px', borderRadius: '99px',
                        background: totalAvail > 100 ? 'rgba(16,185,129,0.12)' : totalAvail > 0 ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)',
                        color: totalAvail > 100 ? '#10b981' : totalAvail > 0 ? '#f59e0b' : '#ef4444',
                      }}>
                        {totalAvail > 0 ? `${totalAvail} available` : 'Sold out'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
