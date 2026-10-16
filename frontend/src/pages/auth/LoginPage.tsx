import { useState, type FormEvent } from "react";
import type { AppState, Page, UserRole } from "../../App";

interface Props {
  state: AppState;
  navigate: (page: Page) => void;
  login: (role: UserRole) => void;
}

interface FieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete?: string;
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
}: FieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "0.8125rem",
          fontWeight: 500,
          color: "#475569",
          marginBottom: 8,
        }}
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "12px 16px",
          borderRadius: 12,
          fontSize: "0.9375rem",
          outline: "none",
          transition: "all 0.15s",
          background: "#f1f4f8",
          border: `1px solid ${focused ? "#93b4f7" : "#dce3ed"}`,
          color: "#0f172a",
          boxShadow: focused ? "0 0 0 3px rgba(37,99,235,0.10)" : "none",
        }}
      />
    </div>
  );
}

export default function LoginPage({ state, navigate, login }: Props) {
  const isRegister = state.page === "register";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"user" | "organizer">("user");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedRole: UserRole = isRegister
      ? role
      : email.toLowerCase().includes("admin")
        ? "admin"
        : email.toLowerCase().includes("organizer")
          ? "organizer"
          : "user";

    login(selectedRole);
  };

  return (
    <div className="eventhub-auth">
      {/* LEFT DECORATIVE PANEL */}
      <aside id="left-panel" className="eventhub-auth-left">
        {/* Background layers */}
        <div aria-hidden="true" className="eventhub-auth-gradient" />

        <div aria-hidden="true" className="eventhub-auth-glow" />

        <div aria-hidden="true" className="eventhub-auth-grid" />

        {/* Logo */}
        <div className="eventhub-auth-logo">
          <div className="eventhub-logo-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 2L17 7V18H13V13H7V18H3V7L10 2Z"
                fill="white"
                fillOpacity="0.95"
              />
            </svg>
          </div>

          <span className="eventhub-logo-name eventhub-logo-light">
            Event<span>Hub</span>
          </span>
        </div>

        {/* Main left content */}
        <div className="eventhub-auth-intro">
          <div className="eventhub-live-badge">
            <span className="eventhub-live-dot" />
            218 live events right now
          </div>

          <h1>
            The stage for
            <span>every experience.</span>
          </h1>

          <p className="eventhub-auth-description">
            From sold-out concerts to founder summits — discover, book, and
            attend the events that shape your world.
          </p>

          {/* Statistics */}
          <div className="eventhub-auth-stats">
            {[
              ["48K+", "Attendees"],
              ["1,847", "Events"],
              ["342", "Organizers"],
            ].map(([number, label]) => (
              <div key={label}>
                <strong>{number}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="eventhub-auth-categories">
          {["🎵 Music", "💻 Tech", "🎨 Arts", "🏃 Sports", "🍕 Food"].map(
            (category) => (
              <span key={category}>{category}</span>
            ),
          )}
        </div>
      </aside>

      {/* RIGHT LOGIN / REGISTRATION PANEL */}
      <main className="eventhub-auth-right">
        <div className="eventhub-auth-form-container">
          {/* Logo on smaller screens */}
          <div className="eventhub-auth-mobile-logo">
            <div className="eventhub-logo-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path d="M10 2L17 7V18H13V13H7V18H3V7L10 2Z" fill="white" />
              </svg>
            </div>

            <span className="eventhub-logo-name">
              Event<span>Hub</span>
            </span>
          </div>

          <div className="eventhub-auth-heading">
            <h2>{isRegister ? "Create your account" : "Welcome back"}</h2>

            <p>
              {isRegister
                ? "Join 48,000+ event-goers on EventHub."
                : "Sign in to access your tickets and bookings."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="eventhub-auth-form">
            {isRegister && (
              <Field
                label="Full name"
                type="text"
                value={name}
                onChange={setName}
                placeholder="Alex Chen"
                autoComplete="name"
              />
            )}

            <Field
              label="Email address"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              autoComplete="email"
            />

            <Field
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              autoComplete={isRegister ? "new-password" : "current-password"}
            />

            {/* Public registration: attendee/organizer only */}
            {isRegister && (
              <div>
                <label className="eventhub-role-label">Account type</label>

                <div className="eventhub-role-options">
                  {(["user", "organizer"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setRole(option)}
                      className={
                        role === option
                          ? "eventhub-role-option selected"
                          : "eventhub-role-option"
                      }
                    >
                      {option === "user" ? "🎟 Attendee" : "🎤 Organizer"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button type="submit" className="eventhub-auth-submit">
              {isRegister ? "Create account" : "Sign in"}
            </button>
          </form>

          <p className="eventhub-auth-switch">
            {isRegister
              ? "Already have an account? "
              : "Don't have an account? "}

            <button
              type="button"
              onClick={() => navigate(isRegister ? "login" : "register")}
            >
              {isRegister ? "Sign in" : "Create one"}
            </button>
          </p>
        </div>
      </main>

      <style>{`
        .eventhub-auth {
          min-height: 100dvh;
          display: flex;
          background: #ffffff;
        }

        .eventhub-auth-left {
          display: none;
          position: relative;
          width: 50%;
          height: 100dvh;
          box-sizing: border-box;
          overflow: hidden;
          flex-direction: column;
          justify-content: space-between;
          padding: 32px 56px;
          isolation: isolate;
        }

        .eventhub-auth-gradient,
        .eventhub-auth-glow,
        .eventhub-auth-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: -1;
        }

        .eventhub-auth-gradient {
          background: linear-gradient(
            145deg,
            #172842 0%,
            #101b2c 52%,
            #101821 100%
          );
        }

        .eventhub-auth-glow {
          background-image:
            radial-gradient(
              ellipse 100% 80% at 0% 20%,
              rgba(99,102,241,0.25),
              transparent 60%
            ),
            radial-gradient(
              ellipse 60% 60% at 100% 80%,
              rgba(245,158,11,0.12),
              transparent 50%
            );
        }

        .eventhub-auth-grid {
          opacity: 0.08;
          background-image:
            linear-gradient(
              rgba(255,255,255,0.3) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.3) 1px,
              transparent 1px
            );
          background-size: 60px 60px;
        }

        .eventhub-auth-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .eventhub-logo-icon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 13px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          box-shadow:
            0 4px 24px rgba(37,99,235,0.3);
        }

        .eventhub-logo-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.03em;
        }

        .eventhub-logo-name span {
          color: #3b82f6;
        }

        .eventhub-logo-light {
          color: #ffffff;
        }

        .eventhub-auth-intro {
          width: 100%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .eventhub-live-badge {
          display: inline-flex;
          align-items: center;
          align-self: flex-start;
          gap: 9px;
          padding: 8px 16px;
          margin-bottom: 30px;
          border-radius: 999px;
          border: 1px solid rgba(99,150,255,0.3);
          background: rgba(99,150,255,0.12);
          color: #89b2ff;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .eventhub-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #3b82f6;
        }

        .eventhub-auth-intro h1 {
          margin: 0 0 24px;
          color: #ffffff;
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(2.65rem, 3.4vw, 3.5rem);
          font-weight: 400;
          line-height: 1.12;
          letter-spacing: -0.02em;
        }

        .eventhub-auth-intro h1 span {
          display: block;
          color: #89b2ff;
          font-style: italic;
        }

        .eventhub-auth-description {
          max-width: 390px;
          margin: 0;
          color: #bfd0e7;
          font-size: 1rem;
          line-height: 1.8;
        }

        .eventhub-auth-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 32px;
          margin-top: 44px;
        }

        .eventhub-auth-stats > div {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .eventhub-auth-stats strong {
          color: #ffffff;
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 1.85rem;
          font-weight: 400;
        }

        .eventhub-auth-stats span {
          color: #bfd0e7;
          font-size: 0.85rem;
        }

        .eventhub-auth-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          flex-shrink: 0;
        }

        .eventhub-auth-categories span {
          padding: 7px 13px;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: #d3e0f4;
          font-size: 0.8rem;
          white-space: nowrap;
        }

        .eventhub-auth-right {
          flex: 1;
          min-width: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          box-sizing: border-box;
        }

        .eventhub-auth-form-container {
          width: 100%;
          max-width: 500px;
        }

        .eventhub-auth-mobile-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 28px;
        }

        .eventhub-auth-heading {
          margin-bottom: 28px;
        }

        .eventhub-auth-heading h2 {
          margin: 0 0 12px;
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 2.3rem;
          font-weight: 400;
          color: #0f172a;
        }

        .eventhub-auth-heading p {
          margin: 0;
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .eventhub-auth-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .eventhub-role-label {
          display: block;
          margin-bottom: 9px;
          color: #475569;
          font-size: 0.8125rem;
          font-weight: 500;
        }

        .eventhub-role-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .eventhub-role-option {
          padding: 13px;
          border-radius: 12px;
          border: 1px solid #dce3ed;
          background: #ffffff;
          color: #64748b;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .eventhub-role-option.selected {
          background: #eff5ff;
          border-color: #93b4f7;
          color: #2563eb;
        }

        .eventhub-auth-submit {
          width: 100%;
          margin-top: 6px;
          padding: 15px;
          border: 0;
          border-radius: 12px;
          color: #ffffff;
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          box-shadow:
            0 5px 20px rgba(37,99,235,0.25);
          transition:
            transform 0.15s,
            box-shadow 0.15s;
        }

        .eventhub-auth-submit:hover {
          transform: translateY(-1px);
          box-shadow:
            0 7px 24px rgba(37,99,235,0.35);
        }

        .eventhub-auth-switch {
          margin: 22px 0 0;
          text-align: center;
          color: #64748b;
          font-size: 0.875rem;
        }

        .eventhub-auth-switch button {
          border: 0;
          background: none;
          color: #2563eb;
          font: inherit;
          font-weight: 600;
          cursor: pointer;
        }

        .eventhub-auth-switch button:hover {
          text-decoration: underline;
        }

        @media (min-width: 1024px) {
          .eventhub-auth-left {
            display: flex;
          }

          .eventhub-auth-mobile-logo {
            display: none;
          }
        }

        @media (min-width: 1280px) {
          .eventhub-auth-left {
            padding-left: 68px;
            padding-right: 68px;
          }
        }

        @media (max-width: 1023px) {
          .eventhub-auth-right {
            min-height: 100dvh;
          }
        }

        @media (max-width: 640px) {
          .eventhub-auth-right {
            padding: 28px 22px;
          }

          .eventhub-auth-heading h2 {
            font-size: 2rem;
          }
        }

        @media (min-width: 1024px) and (max-height: 700px) {
          .eventhub-auth-left {
            padding-top: 20px;
            padding-bottom: 20px;
            overflow-y: auto;
          }

          .eventhub-auth-intro h1 {
            font-size: 2.65rem;
          }

          .eventhub-live-badge {
            margin-bottom: 16px;
          }

          .eventhub-auth-stats {
            margin-top: 24px;
          }

          .eventhub-auth-categories {
            margin-top: 18px;
          }
        }
      `}</style>
    </div>
  );
}
