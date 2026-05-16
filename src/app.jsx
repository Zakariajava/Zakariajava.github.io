// ─── App: nav, hero, selected work, footer, root ─────────────────────────
const { useState: uS, useEffect: uE, useRef: uR } = React;

// Section ids used by both the navbar and the active-section observer.
// Adding/removing items here keeps everything in sync.
const NAV_ITEMS = (t) => [
  { id: "hero",            label: t.nav.home,       icon: "home" },
  { id: "sobre-mi",        label: t.nav.about,      icon: "user" },
  { id: "experiencia",     label: t.nav.experience, icon: "briefcase" },
  { id: "educacion",       label: t.nav.education,  icon: "graduation" },
  { id: "proyectos",       label: t.nav.projects,   icon: "folder" },
  { id: "skills",          label: t.nav.skills,     icon: "layers" },
  { id: "certificaciones", label: t.nav.certs,      icon: "award" },
  { id: "idiomas",         label: t.nav.languages,  icon: "languages" },
  { id: "contacto",        label: t.nav.contact,    icon: "message" },
];

// ─── Top nav (sticky, glass) ─────────────────────────────────────────────
const TopNav = ({ t, lang, setLang, theme, setTheme, scrolled, onOpenMenu, current, data }) => {
  const items = NAV_ITEMS(t);
  return (
    <nav className={`glass ${scrolled ? "scrolled" : ""}`} style={{
      position: "sticky", top: 0, zIndex: 50,
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 24px",
        height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
      }}>
        {/* Brand: photo + name → LinkedIn */}
        <a href={data.CONTACT.linkedin} target="_blank" rel="noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600, fontSize: 14, letterSpacing: "-0.02em", flexShrink: 0 }}
          title="LinkedIn">
          <span style={{
            width: 30, height: 30, borderRadius: "50%",
            padding: 2,
            background: "conic-gradient(from 220deg at 50% 50%, var(--accent-primary) 0%, var(--accent-cyan) 35%, var(--accent-pink) 70%, var(--accent-primary) 100%)",
            display: "block",
          }}>
            <img src={data.CONTACT.photo} alt="Zakaria" style={{
              width: "100%", height: "100%", borderRadius: "50%",
              objectFit: "cover", display: "block",
              border: "1.5px solid var(--bg-base)",
            }}/>
          </span>
          <span className="brand-name">Zakaria Abouhammadi</span>
        </a>

        {/* Center nav: icon + label, scrolls horizontally on tight screens */}
        <div className="nav-center no-scrollbar" style={{
          display: "flex", gap: 4, overflowX: "auto", flex: "1 1 auto",
          justifyContent: "center", padding: "0 8px",
        }}>
          {items.map(it => {
            const active = current === it.id;
            return (
              <a key={it.id} href={`#${it.id}`} title={it.label} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 12px", borderRadius: 10,
                fontSize: 13, color: active ? "var(--text-primary)" : "var(--text-secondary)",
                background: active ? "var(--bg-surface-2)" : "transparent",
                transition: "all 200ms var(--ease-apple)",
                whiteSpace: "nowrap", flexShrink: 0,
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = "var(--text-primary)"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = "var(--text-secondary)"; }}
              >
                <Icon name={it.icon} size={14}/>
                <span className="nav-label">{it.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right cluster */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="theme" style={{ color: "var(--text-secondary)", padding: 6 }}>
            <Icon name={theme === "dark" ? "sun" : "moon"} size={15}/>
          </button>

          <div style={{
            display: "flex", padding: 3, borderRadius: 999,
            background: "var(--bg-surface-2)", border: "1px solid var(--border-soft)",
          }}>
            {["es","en"].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600,
                background: lang === l ? "var(--text-primary)" : "transparent",
                color: lang === l ? "var(--bg-base)" : "var(--text-secondary)",
                fontFamily: "var(--mono)", textTransform: "uppercase",
                transition: "all 250ms var(--ease-apple)",
              }}>{l}</button>
            ))}
          </div>

          <button onClick={onOpenMenu} aria-label="menu" className="mobile-only" style={{ color: "var(--text-secondary)", padding: 6, display: "none" }}>
            <Icon name="menu" size={18}/>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .nav-label { display: none; }
        }
        @media (max-width: 720px) {
          .nav-center { display: none !important; }
          .mobile-only { display: inline-flex !important; }
          .brand-name { display: none; }
        }
      `}</style>
    </nav>
  );
};

// ─── Hero ────────────────────────────────────────────────────────────────
const Hero = ({ t, lang }) => (
  <section id="hero" className="section" style={{ paddingTop: 80, paddingBottom: 96, borderTop: "none" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
      <div className="hero-rise-1 pill" style={{ marginBottom: 32 }}>
        <span className="pulse-dot"/>
        <span>{t.hero.pill}</span>
      </div>

      <h1 className="display-1 hero-rise-2 name-gradient" style={{ marginBottom: 0 }}>{t.hero.name}</h1>
      <h1 className="display-1 hero-rise-3 name-gradient" style={{ marginBottom: 24 }}>{t.hero.surname}</h1>
      <div className="display-2 hero-rise-4" style={{ color: "var(--text-secondary)", marginBottom: 32, fontWeight: 400 }}>
        {t.hero.role}
      </div>

      <div className="hero-rise-5 hero-bio-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 48, alignItems: "end" }}>
        <p style={{ fontSize: 18, color: "var(--text-secondary)", maxWidth: "62ch", lineHeight: 1.55 }}>
          {t.hero.bio}
        </p>
      </div>

      <div className="hero-rise-5" style={{ display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
        <a href="#proyectos" className="btn-primary"><span>{t.hero.ctaPrimary}</span><Icon name="arrow-right" size={14}/></a>
        <a href={lang === "es" ? "assets/cv/CV_Español.pdf" : "assets/cv/CV_ingles.pdf"} download className="btn-secondary"><span>{t.hero.ctaSecondary}</span><Icon name="download" size={14}/></a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .display-1 { font-size: clamp(40px, 12vw, 60px) !important; }
          .hero-bio-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  </section>
);

// ─── Footer ──────────────────────────────────────────────────────────────
const Footer = ({ t, data }) => (
  <footer style={{
    borderTop: "1px solid var(--border-soft)",
    padding: "48px 0 64px",
    background: "var(--bg-surface)",
  }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
      <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>{t.footer.copy}</div>
      <div style={{ display: "flex", gap: 16 }}>
        <a href={data.CONTACT.github}   target="_blank" rel="noreferrer" style={{ color: "var(--text-secondary)" }} title="GitHub"><Icon name="github" size={16}/></a>
        <a href={data.CONTACT.linkedin} target="_blank" rel="noreferrer" style={{ color: "var(--text-secondary)" }} title="LinkedIn"><Icon name="linkedin" size={16}/></a>
        <a href={`mailto:${data.CONTACT.email}`}                          style={{ color: "var(--text-secondary)" }} title="Email"><Icon name="mail" size={16}/></a>
        <a href={data.CONTACT.web}      target="_blank" rel="noreferrer" style={{ color: "var(--text-secondary)" }} title="Web"><Icon name="globe" size={16}/></a>
      </div>
    </div>
  </footer>
);

// ─── Mobile menu overlay ─────────────────────────────────────────────────
const MobileMenu = ({ t, open, onClose }) => {
  const items = NAV_ITEMS(t);
  return (
    <div className={`mobile-overlay ${open ? "open" : ""}`}>
      <button onClick={onClose} style={{ position: "absolute", top: 24, right: 24, color: "var(--text-primary)" }}><Icon name="x" size={24}/></button>
      {items.map(it => (
        <a key={it.id} href={`#${it.id}`} onClick={onClose} style={{
          display: "inline-flex", alignItems: "center", gap: 14,
          fontSize: 24, fontWeight: 500, letterSpacing: "-0.02em",
        }}>
          <Icon name={it.icon} size={20}/>
          <span>{it.label}</span>
        </a>
      ))}
    </div>
  );
};

// ─── App root ────────────────────────────────────────────────────────────
function App() {
  const data = window.PORTFOLIO_DATA;

  // Persist theme + lang in localStorage; fall back to navigator.language.
  const initialLang = (() => {
    try { return localStorage.getItem("za.lang") || ((navigator.language || "es").startsWith("en") ? "en" : "es"); }
    catch { return "es"; }
  })();
  const initialTheme = (() => {
    try { return localStorage.getItem("za.theme") || "dark"; }
    catch { return "dark"; }
  })();

  const [lang,    setLang]    = uS(initialLang);
  const [theme,   setTheme]   = uS(initialTheme);
  const [scrolled,setScrolled]= uS(false);
  const [menuOpen,setMenuOpen]= uS(false);
  const [current, setCurrent] = uS("hero");
  const t = data.i18n[lang];

  uE(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  uE(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    try { localStorage.setItem("za.theme", theme); } catch {}
  }, [theme]);

  uE(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("za.lang", lang); } catch {}
  }, [lang]);

  uE(() => {
    const ids = ["hero","sobre-mi","experiencia","educacion","proyectos","skills","certificaciones","idiomas","contacto"];
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setCurrent(e.target.id); });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const S = window.Sections;

  return (
    <>
      <TopNav t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} scrolled={scrolled} onOpenMenu={() => setMenuOpen(true)} current={current} data={data}/>
      <MobileMenu t={t} open={menuOpen} onClose={() => setMenuOpen(false)}/>
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero t={t} lang={lang}/>
        <S.SectionAbout t={t} lang={lang} data={data}/>
        <S.SectionExperience t={t}/>
        <S.SectionEducation t={t}/>
        <S.SectionProjects t={t} lang={lang} data={data}/>
        <S.SectionSkills t={t} lang={lang} data={data}/>
        <S.SectionCerts t={t} lang={lang} data={data}/>
        <S.SectionLangs t={t} lang={lang} data={data}/>
        <S.SectionContact t={t} data={data}/>
      </main>
      <Footer t={t} data={data}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
