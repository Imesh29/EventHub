import { AppState, Page } from '../../App';
import Navbar from '../../components/layout/Navbar';
import { EVENTS, CAT_COLORS } from '../../utils/mockData';

interface Props {
  state: AppState;
  navigate: (page: Page, patch?: Partial<AppState>) => void;
  logout: () => void;
}

export default function LandingPage({ state, navigate, logout }: Props) {
  const featured = EVENTS.filter(e => e.featured);

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar state={state} navigate={navigate} logout={logout} />

      {/* Hero */}
      <section style={{ position: 'relative', padding: '100px 24px 80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(99,102,241,0.14) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '60px', left: '5%', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(99,102,241,0.04)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40px', right: '10%', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(245,158,11,0.04)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '99px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', marginBottom: '32px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563eb', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: '0.8125rem', color: '#3b82f6', fontWeight: 500 }}>218 events happening this month</span>
          </div>

          <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 'clamp(2.75rem, 7vw, 5rem)', fontWeight: 400, lineHeight: 1.05, color: '#0f172a', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Every great night<br />
            <em style={{ color: '#3b82f6' }}>starts here.</em>
          </h1>

          <p style={{ fontSize: '1.125rem', color: '#64748b', maxWidth: '520px', margin: '0 auto 40px', lineHeight: 1.75 }}>
            Discover concerts, conferences, art shows, and marathons. Book in seconds. Your next great experience is one click away.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('events')}
              style={{ padding: '13px 28px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0 4px 20px rgba(99,102,241,0.35)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(99,102,241,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.35)'; }}>
              Browse Events →
            </button>
            {!state.role && (
              <button onClick={() => navigate('register')}
                style={{ padding: '13px 28px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 500, color: '#475569', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#0f172a'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                Create account
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Categories strip */}
      <section style={{ padding: '0 24px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {Object.entries(CAT_COLORS).map(([cat, colors]) => (
              <button key={cat} onClick={() => navigate('events')}
                style={{ padding: '8px 18px', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s', background: colors.bg, color: colors.text, border: `1px solid ${colors.text}22` }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured events */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2rem', fontWeight: 400, color: '#0f172a', letterSpacing: '-0.01em' }}>Featured Events</h2>
              <p style={{ color: '#64748b', fontSize: '0.9375rem', marginTop: '4px' }}>Handpicked for this month</p>
            </div>
            <button onClick={() => navigate('events')}
              style={{ fontSize: '0.875rem', fontWeight: 500, color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#3b82f6')}
              onMouseLeave={e => (e.currentTarget.style.color = '#2563eb')}>
              View all →
            </button>
          </div>

          {/* Hero feature card */}
          <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', marginBottom: '20px', cursor: 'pointer', border: '1px solid rgba(16,24,40,0.07)' }}
            onClick={() => navigate('event-detail', { selectedEvent: EVENTS[0] })}>
            <div style={{ height: '340px', overflow: 'hidden' }}>
              <img src={EVENTS[0].image} alt={EVENTS[0].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
            </div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,6,15,0.95) 0%, rgba(6,6,15,0.3) 50%, transparent 100%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <CatBadge cat={EVENTS[0].category} />
                <span style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 500, background: 'rgba(245,158,11,0.15)', color: '#fcd34d', border: '1px solid rgba(245,158,11,0.25)' }}>
                  Featured
                </span>
              </div>
              <h3 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2.25rem', fontWeight: 400, color: '#0f172a', marginBottom: '10px', letterSpacing: '-0.01em' }}>
                {EVENTS[0].title}
              </h3>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <InfoChip icon="📅" text={`${EVENTS[0].date} · ${EVENTS[0].time}`} />
                <InfoChip icon="📍" text={`${EVENTS[0].venue}, ${EVENTS[0].city}`} />
                <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#f59e0b' }}>
                  From ${Math.min(...EVENTS[0].ticketTypes.map(t => t.price))}
                </span>
              </div>
            </div>
          </div>

          {/* Grid of 3 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {EVENTS.slice(1, 4).map(event => (
              <EventCard key={event.id} event={event} onClick={() => navigate('event-detail', { selectedEvent: event })} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ padding: '64px 24px', background: '#ffffff', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', textAlign: 'center' }}
          className="md:grid-cols-4">
          {[['48,320', 'Attendees served'], ['1,847', 'Events hosted'], ['342', 'Organizers'], ['$3.8M+', 'In ticket sales']].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2.25rem', fontWeight: 400, color: '#0f172a' }}>{n}</div>
              <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '4px' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Organizer CTA */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', padding: '4px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(245,158,11,0.1))', marginBottom: '32px' }}>
            <div style={{ padding: '28px 40px', borderRadius: '14px', background: '#ffffff' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🎤</div>
              <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2rem', fontWeight: 400, color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.01em' }}>
                Hosting an event?
              </h2>
              <p style={{ color: '#64748b', lineHeight: 1.75, marginBottom: '24px', fontSize: '0.9375rem' }}>
                List on EventHub and reach thousands of attendees. Manage tickets, track sales, and grow your audience — all in one place.
              </p>
              <button onClick={() => navigate('register')}
                style={{ padding: '12px 28px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0 4px 20px rgba(99,102,241,0.35)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(99,102,241,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.35)'; }}>
                Become an Organizer
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function EventCard({ event, onClick }: { event: typeof EVENTS[0]; onClick: () => void }) {
  const minPrice = Math.min(...event.ticketTypes.map(t => t.price));
  const totalAvail = event.ticketTypes.reduce((s, t) => s + t.available, 0);
  const colors = CAT_COLORS[event.category] || { bg: 'rgba(99,102,241,0.15)', text: '#3b82f6' };

  return (
    <div onClick={onClick}
      style={{ borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)', transition: 'all 0.2s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,24,40,0.07)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
      <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
        <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, background: colors.bg, color: colors.text }}>
            {event.category}
          </span>
        </div>
      </div>
      <div style={{ padding: '16px' }}>
        <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#0f172a', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {event.title}
        </h3>
        <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '4px' }}>📅 {event.date}</p>
        <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '14px' }}>📍 {event.city}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#f59e0b' }}>From ${minPrice}</span>
          <span style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '99px',
            background: totalAvail > 100 ? 'rgba(16,185,129,0.12)' : totalAvail > 0 ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)',
            color: totalAvail > 100 ? '#10b981' : totalAvail > 0 ? '#f59e0b' : '#ef4444',
          }}>
            {totalAvail > 0 ? `${totalAvail} left` : 'Sold out'}
          </span>
        </div>
      </div>
    </div>
  );
}

function CatBadge({ cat }: { cat: string }) {
  const c = CAT_COLORS[cat] || { bg: 'rgba(99,102,241,0.15)', text: '#3b82f6' };
  return <span style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, background: c.bg, color: c.text }}>{cat}</span>;
}

function InfoChip({ icon, text }: { icon: string; text: string }) {
  return <span style={{ fontSize: '0.875rem', color: '#475569' }}>{icon} {text}</span>;
}
