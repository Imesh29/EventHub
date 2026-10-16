import { useState } from 'react';
import { AppState, Page } from '../../App';
import Navbar from '../../components/layout/Navbar';
import { Category } from '../../utils/mockData';

interface Props {
  state: AppState;
  navigate: (page: Page, patch?: Partial<AppState>) => void;
  logout: () => void;
}

interface TicketDraft {
  id: string;
  name: string;
  price: string;
  capacity: string;
  description: string;
}

const CATEGORIES: Category[] = ['Music', 'Tech', 'Sports', 'Arts', 'Business', 'Food'];

export default function CreateEventPage({ state, navigate, logout }: Props) {
  const isEdit = !!state.editEventId;

  const [eventName, setEventName] = useState(isEdit ? 'Neon Nights Music Festival' : '');
  const [description, setDescription] = useState(isEdit ? 'Three nights of underground electronic and indie acts across four stages.' : '');
  const [category, setCategory] = useState<Category>('Music');
  const [tags, setTags] = useState(isEdit ? 'Electronic, Indie, Multi-stage' : '');
  const [startDate, setStartDate] = useState(isEdit ? '2026-10-18' : '');
  const [startTime, setStartTime] = useState(isEdit ? '19:00' : '');
  const [endDate, setEndDate] = useState(isEdit ? '2026-10-20' : '');
  const [endTime, setEndTime] = useState(isEdit ? '02:00' : '');
  const [venue, setVenue] = useState(isEdit ? 'Skyline Arena' : '');
  const [address, setAddress] = useState(isEdit ? '123 Arena Blvd' : '');
  const [city, setCity] = useState(isEdit ? 'New York' : '');
  const [country, setCountry] = useState(isEdit ? 'United States' : '');
  const [tickets, setTickets] = useState<TicketDraft[]>(
    isEdit
      ? [
          { id: 't1', name: 'General Admission', price: '85', capacity: '2000', description: 'Floor access to all four stages' },
          { id: 't2', name: 'VIP Lounge', price: '220', capacity: '200', description: 'Elevated deck, open bar, meet & greet' },
        ]
      : [{ id: 't1', name: 'General Admission', price: '50', capacity: '500', description: '' }]
  );
  const [saved, setSaved] = useState(false);

  const addTicket = () =>
    setTickets(t => [...t, { id: `t${Date.now()}`, name: '', price: '', capacity: '', description: '' }]);

  const removeTicket = (id: string) => setTickets(t => t.filter(x => x.id !== id));

  const updateTicket = (id: string, field: keyof TicketDraft, value: string) =>
    setTickets(t => t.map(x => x.id === id ? { ...x, [field]: value } : x));

  const handlePublish = (action: 'draft' | 'publish') => {
    setSaved(true);
    setTimeout(() => {
      navigate('manage-events');
    }, 1200);
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar state={state} navigate={navigate} logout={logout} />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <button onClick={() => navigate('manage-events')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px', padding: 0 }}
            onMouseEnter={e => (e.currentTarget.style.color = '#0f172a')}
            onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}>
            ← Back to My Events
          </button>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Organizer</span>
          </div>
          <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2.25rem', fontWeight: 400, color: '#0f172a', letterSpacing: '-0.02em' }}>
            {isEdit ? 'Edit Event' : 'Create New Event'}
          </h1>
          <p style={{ color: '#64748b', marginTop: '6px' }}>Fill in the details below to {isEdit ? 'update your' : 'publish a new'} event.</p>
        </div>

        {saved && (
          <div style={{ padding: '14px 20px', borderRadius: '14px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1rem' }}>✓</span>
            <span style={{ color: '#10b981', fontWeight: 500, fontSize: '0.9375rem' }}>Event saved! Redirecting to your events...</span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Basic Information */}
          <Section title="Basic Information" icon="📋">
            <EField label="Event Name" value={eventName} onChange={setEventName} placeholder="e.g. Neon Nights Music Festival" />
            <div>
              <label style={labelStyle}>Event Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your event..."
                rows={4}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', fontSize: '0.9375rem', outline: 'none', transition: 'all 0.15s', background: '#f8fafc', border: '1px solid rgba(16,24,40,0.09)', color: '#0f172a', resize: 'vertical', fontFamily: 'inherit' }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(16,24,40,0.09)'; e.currentTarget.style.boxShadow = 'none'; }} />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value as Category)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', fontSize: '0.9375rem', outline: 'none', background: '#f8fafc', border: '1px solid rgba(16,24,40,0.09)', color: '#0f172a', cursor: 'pointer', appearance: 'none' }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ padding: '20px', borderRadius: '14px', background: '#f8fafc', border: '2px dashed rgba(255,255,255,0.1)', textAlign: 'center', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
              <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🖼</div>
              <div style={{ color: '#475569', fontSize: '0.9375rem', fontWeight: 500 }}>Event Banner / Cover Image</div>
              <div style={{ color: '#64748b', fontSize: '0.8125rem', marginTop: '4px' }}>Click to upload · PNG, JPG up to 5MB · Recommended 1920×1080</div>
              {isEdit && <div style={{ marginTop: '10px', fontSize: '0.8125rem', color: '#2563eb' }}>Current banner on file</div>}
            </div>
            <EField label="Tags" value={tags} onChange={setTags} placeholder="e.g. Electronic, Indie, Multi-stage (comma-separated)" />
          </Section>

          {/* Date & Time */}
          <Section title="Date & Time" icon="📅">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <EField label="Start Date" type="date" value={startDate} onChange={setStartDate} />
              <EField label="Start Time" type="time" value={startTime} onChange={setStartTime} />
              <EField label="End Date" type="date" value={endDate} onChange={setEndDate} />
              <EField label="End Time" type="time" value={endTime} onChange={setEndTime} />
            </div>
          </Section>

          {/* Location */}
          <Section title="Location" icon="📍">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <EField label="Venue Name" value={venue} onChange={setVenue} placeholder="e.g. Skyline Arena" />
              <EField label="Address" value={address} onChange={setAddress} placeholder="Street address" />
              <EField label="City" value={city} onChange={setCity} placeholder="e.g. New York" />
              <EField label="Country" value={country} onChange={setCountry} placeholder="e.g. United States" />
            </div>
          </Section>

          {/* Ticket Types */}
          <Section title="Ticket Types" icon="🎟">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {tickets.map((t, idx) => (
                <div key={t.id} style={{ padding: '18px', borderRadius: '14px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ticket Type {idx + 1}</span>
                    {tickets.length > 1 && (
                      <button onClick={() => removeTicket(t.id)}
                        style={{ fontSize: '0.8125rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}>
                        Remove
                      </button>
                    )}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', marginBottom: '10px' }}>
                    <EField label="Ticket Name" value={t.name} onChange={v => updateTicket(t.id, 'name', v)} placeholder="e.g. General Admission" />
                    <EField label="Price ($)" type="number" value={t.price} onChange={v => updateTicket(t.id, 'price', v)} placeholder="50" />
                    <EField label="Capacity" type="number" value={t.capacity} onChange={v => updateTicket(t.id, 'capacity', v)} placeholder="500" />
                  </div>
                  <EField label="Description" value={t.description} onChange={v => updateTicket(t.id, 'description', v)} placeholder="Brief description of this ticket tier" />
                </div>
              ))}
            </div>
            <button onClick={addTicket}
              style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 500, color: '#3b82f6', background: 'rgba(99,102,241,0.08)', border: '1px dashed rgba(99,102,241,0.3)', cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.14)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; }}>
              + Add Ticket Type
            </button>
          </Section>

          {/* Publishing */}
          <div style={{ padding: '24px', borderRadius: '18px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)' }}>
            <h3 style={{ fontWeight: 600, color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📢</span> Publishing
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '20px' }}>
              Save as draft to continue editing, or publish to make your event live. Published events go through a quick review.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={() => handlePublish('draft')}
                style={{ padding: '12px 24px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 500, color: '#475569', background: '#f8fafc', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#0f172a'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                Save Draft
              </button>
              <button
                style={{ padding: '12px 24px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 500, color: '#475569', background: '#f8fafc', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#0f172a'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#475569'; }}>
                Preview
              </button>
              <button onClick={() => handlePublish('publish')}
                style={{ padding: '12px 28px', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0 4px 16px rgba(99,102,241,0.35)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.35)'; }}>
                {isEdit ? 'Save Changes' : 'Publish Event'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: '#475569', marginBottom: '8px' };

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '24px', borderRadius: '18px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontSize: '1rem' }}>
        <span>{icon}</span> {title}
      </h3>
      {children}
    </div>
  );
}

function EField({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', padding: '12px 16px', borderRadius: '12px', fontSize: '0.9375rem', outline: 'none', transition: 'all 0.15s',
          background: '#f8fafc', border: `1px solid ${focused ? 'rgba(99,102,241,0.5)' : 'rgba(16,24,40,0.09)'}`,
          color: '#0f172a', boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none',
        }} />
    </div>
  );
}
