import { useState } from 'react';
import { AppState, Page } from '../../App';
import Navbar from '../../components/layout/Navbar';

interface Props {
  state: AppState;
  navigate: (page: Page, patch?: Partial<AppState>) => void;
  logout: () => void;
}

export default function CheckoutPage({ state, navigate, logout }: Props) {
  const { selectedEvent, checkoutItems } = state;
  const [cardName, setCardName] = useState('Alex Chen');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<'details' | 'payment'>('details');

  if (!selectedEvent || checkoutItems.length === 0) { navigate('events'); return null; }

  const subtotal = checkoutItems.reduce((s, i) => s + i.ticket.price * i.qty, 0);
  const fee = Math.round(subtotal * 0.05);
  const total = subtotal + fee;

  const pay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => navigate('payment-result', { paymentSuccess: true }), 2000);
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar state={state} navigate={navigate} logout={logout} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px' }}>
        <button onClick={() => navigate('event-detail')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '32px', padding: 0 }}
          onMouseEnter={e => (e.currentTarget.style.color = '#0f172a')}
          onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}>
          ← Back to event
        </button>

        <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2.25rem', fontWeight: 400, color: '#0f172a', marginBottom: '36px', letterSpacing: '-0.02em' }}>
          Complete your booking
        </h1>

        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
          {['Contact details', 'Payment'].map((label, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8125rem', fontWeight: 700, transition: 'all 0.2s',
                background: i === 0 || step === 'payment' ? '#2563eb' : '#f1f5f9',
                color: i === 0 || step === 'payment' ? '#fff' : '#64748b',
                border: i === 1 && step !== 'payment' ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}>{i + 1}</div>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: i === 0 || step === 'payment' ? '#0f172a' : '#64748b' }}>{label}</span>
              {i === 0 && <div style={{ width: '32px', height: '1px', background: step === 'payment' ? '#2563eb' : 'rgba(255,255,255,0.1)' }} />}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gap: '24px' }} className="checkout-grid">
          {/* Form */}
          <div style={{ minWidth: 0 }}>
            <form onSubmit={pay} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Contact */}
              <FormSection title="Contact information" icon="👤">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <CField label="Email" value="alex.chen@example.com" onChange={() => {}} type="email" />
                  <CField label="Phone" value="+1 (555) 321-0000" onChange={() => {}} type="tel" />
                </div>
                <CField label="Full name" value="Alex Chen" onChange={() => {}} type="text" />
              </FormSection>

              {/* Payment */}
              <FormSection title="Payment details" icon="💳">
                <CField label="Name on card" value={cardName} onChange={setCardName} type="text" />
                <div style={{ position: 'relative' }}>
                  <CField label="Card number" value={cardNumber} onChange={setCardNumber} type="text" />
                  <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(4px)', display: 'flex', gap: '4px' }}>
                    {['💳', '🏦'].map(i => <span key={i} style={{ fontSize: '1rem', opacity: 0.4 }}>{i}</span>)}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <CField label="Expiry date" value={expiry} onChange={setExpiry} type="text" placeholder="MM/YY" />
                  <CField label="CVV" value={cvv} onChange={setCvv} type="text" placeholder="•••" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '10px', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.15)' }}>
                  <span style={{ fontSize: '0.875rem' }}>🔒</span>
                  <span style={{ fontSize: '0.8125rem', color: '#10b981' }}>Simulated payment — no real charge will be made</span>
                </div>
              </FormSection>

              <button type="submit" disabled={processing}
                style={{
                  width: '100%', padding: '15px', borderRadius: '14px', fontSize: '1rem', fontWeight: 600, color: '#fff', border: 'none', cursor: processing ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
                  background: processing ? '#f1f5f9' : '#2563eb',
                  boxShadow: processing ? 'none' : '0 4px 20px rgba(99,102,241,0.4)',
                }}
                onMouseEnter={e => { if (!processing) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(99,102,241,0.55)'; } }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; if (!processing) e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.4)'; }}>
                {processing ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <span style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.2)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                    Processing payment…
                  </span>
                ) : `Pay $${total} →`}
              </button>
            </form>
          </div>

          {/* Order summary */}
          <div style={{ minWidth: 0 }}>
            <div style={{ padding: '24px', borderRadius: '20px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)', position: 'sticky', top: '80px' }}>
              <h3 style={{ fontWeight: 600, color: '#0f172a', marginBottom: '18px' }}>Order Summary</h3>

              <div style={{ display: 'flex', gap: '14px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(16,24,40,0.07)' }}>
                <img src={selectedEvent.image} alt={selectedEvent.title}
                  style={{ width: '68px', height: '68px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#0f172a', marginBottom: '4px' }}>{selectedEvent.title}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{selectedEvent.date}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{selectedEvent.venue}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {checkoutItems.map(item => (
                  <div key={item.ticket.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem' }}>
                    <span style={{ color: '#475569' }}>{item.ticket.name} × {item.qty}</span>
                    <span style={{ color: '#0f172a', fontWeight: 500 }}>${item.ticket.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '16px', borderTop: '1px solid rgba(16,24,40,0.07)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: '#64748b' }}>Subtotal</span>
                  <span style={{ color: '#0f172a' }}>${subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: '#64748b' }}>Service fee (5%)</span>
                  <span style={{ color: '#0f172a' }}>${fee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(16,24,40,0.07)' }}>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>Total</span>
                  <span style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.5rem', color: '#0f172a' }}>${total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .checkout-grid { grid-template-columns: 1fr; }
        @media (min-width: 768px) { .checkout-grid { grid-template-columns: 3fr 2fr; } }
      `}</style>
    </div>
  );
}

function FormSection({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '24px', borderRadius: '18px', background: '#ffffff', border: '1px solid rgba(16,24,40,0.07)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
        <span>{icon}</span> {title}
      </h3>
      {children}
    </div>
  );
}

function CField({ label, value, onChange, type, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type: string; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: '#475569', marginBottom: '6px' }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', padding: '11px 14px', borderRadius: '10px', fontSize: '0.9375rem', outline: 'none', transition: 'all 0.15s',
          background: '#f8fafc', border: `1px solid ${focused ? 'rgba(99,102,241,0.5)' : 'rgba(16,24,40,0.09)'}`,
          color: '#0f172a', boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none',
        }} />
    </div>
  );
}
