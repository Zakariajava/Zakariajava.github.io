// ─── Mini SVG thumbnails for the icon row ───
// Each thumb is an 80x80 stylized mockup of the section.

const ThumbWrap = ({ children, bg = "linear-gradient(160deg, #16161B, #0E0E12)" }) => (
  <div className="thumb-wrap" style={{
    width: 72, height: 72, borderRadius: 14,
    background: bg,
    border: "1px solid var(--border-soft)",
    display: "grid", placeItems: "center",
    overflow: "hidden", position: "relative",
    transition: "transform 300ms cubic-bezier(0.32,0.72,0,1), border-color 300ms cubic-bezier(0.32,0.72,0,1), box-shadow 300ms cubic-bezier(0.32,0.72,0,1)",
  }}>
    {children}
  </div>
);

const Thumbs = {
  about: (
    <ThumbWrap bg="linear-gradient(160deg, #1a1530 0%, #0E0E12 100%)">
      <svg viewBox="0 0 60 60" width="56" height="56">
        <defs>
          <linearGradient id="ava" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C5CFF"/>
            <stop offset="100%" stopColor="#5EE7DF"/>
          </linearGradient>
        </defs>
        <circle cx="30" cy="22" r="11" fill="url(#ava)"/>
        <path d="M10 54c2-10 10-15 20-15s18 5 20 15" fill="url(#ava)" opacity="0.9"/>
      </svg>
    </ThumbWrap>
  ),
  experience: (
    <ThumbWrap bg="linear-gradient(160deg, #0f1620 0%, #0a0a0e 100%)">
      <svg viewBox="0 0 60 60" width="58" height="58">
        <rect x="10" y="18" width="40" height="32" rx="3" fill="none" stroke="#A1A1AA" strokeWidth="1.4"/>
        <path d="M22 18v-4a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4" fill="none" stroke="#A1A1AA" strokeWidth="1.4"/>
        <rect x="14" y="24" width="32" height="2" fill="#7C5CFF" opacity="0.7"/>
        <rect x="14" y="30" width="22" height="2" fill="#5EE7DF" opacity="0.7"/>
        <rect x="14" y="36" width="28" height="2" fill="#A1A1AA" opacity="0.5"/>
        <rect x="14" y="42" width="18" height="2" fill="#A1A1AA" opacity="0.5"/>
      </svg>
    </ThumbWrap>
  ),
  education: (
    <ThumbWrap bg="linear-gradient(160deg, #1a1208 0%, #0E0E12 100%)">
      <svg viewBox="0 0 60 60" width="56" height="56">
        <path d="M6 24 30 14l24 10-24 10z" fill="none" stroke="#FBBF24" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M16 30v10c0 3 6 6 14 6s14-3 14-6V30" fill="none" stroke="#A1A1AA" strokeWidth="1.4"/>
        <line x1="50" y1="24" x2="50" y2="38" stroke="#FBBF24" strokeWidth="1.6"/>
      </svg>
    </ThumbWrap>
  ),
  projects: (
    <ThumbWrap bg="linear-gradient(160deg, #1b0f25 0%, #07070A 100%)">
      <svg viewBox="0 0 60 60" width="58" height="58">
        <rect x="6" y="14" width="22" height="14" rx="2" fill="#7C5CFF" opacity="0.85"/>
        <rect x="32" y="14" width="22" height="14" rx="2" fill="#5EE7DF" opacity="0.7"/>
        <rect x="6" y="32" width="22" height="14" rx="2" fill="#FF7AC6" opacity="0.7"/>
        <rect x="32" y="32" width="22" height="14" rx="2" fill="none" stroke="#A1A1AA" strokeWidth="1.4"/>
      </svg>
    </ThumbWrap>
  ),
  skills: (
    <ThumbWrap bg="linear-gradient(160deg, #051c1a 0%, #07070A 100%)">
      <svg viewBox="0 0 60 60" width="58" height="58">
        <circle cx="30" cy="30" r="6" fill="#5EE7DF"/>
        <circle cx="14" cy="14" r="3" fill="#7C5CFF"/>
        <circle cx="46" cy="14" r="3" fill="#FF7AC6"/>
        <circle cx="14" cy="46" r="3" fill="#FBBF24"/>
        <circle cx="46" cy="46" r="3" fill="#34D399"/>
        <line x1="30" y1="30" x2="14" y2="14" stroke="#A1A1AA" strokeWidth="1" opacity="0.6"/>
        <line x1="30" y1="30" x2="46" y2="14" stroke="#A1A1AA" strokeWidth="1" opacity="0.6"/>
        <line x1="30" y1="30" x2="14" y2="46" stroke="#A1A1AA" strokeWidth="1" opacity="0.6"/>
        <line x1="30" y1="30" x2="46" y2="46" stroke="#A1A1AA" strokeWidth="1" opacity="0.6"/>
      </svg>
    </ThumbWrap>
  ),
  certs: (
    <ThumbWrap bg="linear-gradient(160deg, #1a1530 0%, #07070A 100%)">
      <svg viewBox="0 0 60 60" width="56" height="56">
        <circle cx="30" cy="26" r="12" fill="none" stroke="#7C5CFF" strokeWidth="1.6"/>
        <circle cx="30" cy="26" r="6" fill="#7C5CFF" opacity="0.5"/>
        <path d="M22 36 18 50l12-6 12 6-4-14" fill="none" stroke="#FBBF24" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    </ThumbWrap>
  ),
  languages: (
    <ThumbWrap bg="linear-gradient(160deg, #0a1f1d 0%, #07070A 100%)">
      <svg viewBox="0 0 60 60" width="58" height="58">
        <circle cx="30" cy="30" r="20" fill="none" stroke="#5EE7DF" strokeWidth="1.4"/>
        <ellipse cx="30" cy="30" rx="8" ry="20" fill="none" stroke="#A1A1AA" strokeWidth="1"/>
        <line x1="10" y1="30" x2="50" y2="30" stroke="#A1A1AA" strokeWidth="1"/>
        <line x1="30" y1="10" x2="30" y2="50" stroke="#A1A1AA" strokeWidth="1"/>
      </svg>
    </ThumbWrap>
  ),
  contact: (
    <ThumbWrap bg="linear-gradient(160deg, #28101e 0%, #07070A 100%)">
      <svg viewBox="0 0 60 60" width="58" height="58">
        <rect x="8" y="16" width="44" height="28" rx="3" fill="none" stroke="#FF7AC6" strokeWidth="1.6"/>
        <path d="M8 18 30 34 52 18" fill="none" stroke="#FF7AC6" strokeWidth="1.6"/>
      </svg>
    </ThumbWrap>
  ),
};

window.Thumbs = Thumbs;
