// ─── App: preloader, nav, hero, footer, root ─────────────────────────────
// sections.jsx already claimed the bare React hook names in the shared
// scope, so this file uses aliases and reaches FX through the global.
const { useState: uS, useEffect: uE, useRef: uR } = React;
const FX = window.FX;

const NAV_ITEMS = (t) => [
  { id: "sobre-mi",        num: "01", label: t.nav.about },
  { id: "educacion",       num: "02", label: t.nav.education },
  { id: "experiencia",     num: "03", label: t.nav.experience },
  { id: "proyectos",       num: "04", label: t.nav.projects },
  { id: "skills",          num: "05", label: t.nav.skills },
  { id: "certificaciones", num: "06", label: t.nav.certs },
  { id: "idiomas",         num: "07", label: t.nav.languages },
  { id: "contacto",        num: "08", label: t.nav.contact },
];
const DESKTOP_NAV = ["sobre-mi", "experiencia", "proyectos", "certificaciones", "contacto"];

// ─── Preloader: one greeting per language he speaks, once per session ────
const GREETINGS = ["Azul", "السلام", "Hola", "Hello", "Bonjour"];

const Preloader = ({ onDone }) => {
  const [i, setI] = uS(0);
  const [done, setDone] = uS(false);
  uE(() => {
    if (i < GREETINGS.length - 1) {
      const id = setTimeout(() => setI(i + 1), i === 0 ? 400 : 240);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => { setDone(true); onDone(); }, 380);
    return () => clearTimeout(id);
  }, [i]);
  return (
    <div className={`preloader ${done ? "done" : ""}`} aria-hidden="true">
      <span className="word" dir="auto">{GREETINGS[i]}</span>
    </div>
  );
};

// ─── Top nav ─────────────────────────────────────────────────────────────
const TopNav = ({ t, lang, onLang, theme, onTheme, scrolled, current, onOpenMenu }) => {
  const items = NAV_ITEMS(t).filter(it => DESKTOP_NAV.includes(it.id));
  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        <a href="#top" className="brand" data-cursor>
          Zakaria Abouhammadi<span className="brand-role"> — AI &amp; ML</span>
        </a>

        <div className="nav-center no-scrollbar" style={{ display: "flex", gap: 2, overflowX: "auto" }}>
          {items.map(it => (
            <a key={it.id} href={`#${it.id}`} className={`nav-link ${current === it.id ? "on" : ""}`}>
              <span className="n">{it.num}</span>
              <span>{it.label}</span>
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div className="lang-switch" role="group" aria-label="Idioma / Language">
            {["es", "en"].map(l => (
              <button key={l} onClick={() => onLang(l)} className={lang === l ? "on" : ""}
                aria-pressed={lang === l}
                aria-label={l === "es" ? "Español" : "English"}
                title={lang === "es" ? "Idioma · tecla L" : "Language · key L"}>{l}</button>
            ))}
          </div>
          <button className="icon-btn" onClick={onTheme}
            aria-label={t.keys.theme}
            title={`${t.keys.theme} · ${lang === "es" ? "tecla T" : "key T"}`}>
            <Icon name={theme === "dark" ? "sun" : "moon"} size={15}/>
          </button>
          <button className="icon-btn only-mobile" onClick={onOpenMenu} aria-label={t.nav.menu}>
            <Icon name="menu" size={17}/>
          </button>
        </div>
      </div>
    </nav>
  );
};

// ─── Mobile menu ─────────────────────────────────────────────────────────
const MobileMenu = ({ t, open, onClose }) => (
  <div className={`mobile-overlay ${open ? "open" : ""}`} aria-hidden={!open}>
    <button onClick={onClose} className="icon-btn" aria-label={t.nav.close}
      style={{ position: "absolute", top: 18, right: 20, color: "var(--text-1)" }}>
      <Icon name="x" size={22}/>
    </button>
    {NAV_ITEMS(t).map((it, i) => (
      <a key={it.id} href={`#${it.id}`} onClick={onClose} className="mobile-link" style={{ "--i": i }}>
        <span className="num">{it.num}</span>
        <span>{it.label}</span>
      </a>
    ))}
  </div>
);

// ─── Hero ────────────────────────────────────────────────────────────────
const Hero = ({ t, lang, data, baseDelay }) => {
  const d = (ms) => ({ animationDelay: `${baseDelay + ms}ms` });
  const cvHref = lang === "es" ? data.CONTACT.cvEs : data.CONTACT.cvEn;
  const contentRef = uR(null);

  // The hero settles back and dims as the first section takes over.
  FX.useScrollSub(() => {
    const el = contentRef.current;
    if (!el || FX.reducedMotion()) return;
    const p = Math.min(1, window.scrollY / (innerHeight * 0.9));
    el.style.setProperty("--hero-p", p.toFixed(3));
  }, []);

  return (
    <section id="top" className="section" style={{ paddingTop: 148, paddingBottom: 104, overflow: "visible" }}>
      <div className="orb-stage" aria-hidden="true">
        <div className="orb-glow"/>
        <div className="orb-ring r1"/>
        <div className="orb-ring r2"/>
      </div>

      <div ref={contentRef} className="container hero-content">
        <div className="rise" style={{ ...d(0), marginBottom: 30 }}>
          <span className="pill">
            <span className="pulse-dot"/>
            <span>{t.hero.pill}</span>
          </span>
        </div>

        <h1 className="display-1" aria-label={`${t.hero.name} ${t.hero.surname}`}>
          <span className="mask-sleeve">
            <span aria-hidden="true" className="name-gradient" style={d(80)}>
              <FX.SplitLetters text={t.hero.name}/>
            </span>
          </span>
          <br/>
          <span className="mask-sleeve">
            <span aria-hidden="true" className="name-gradient" style={d(190)}>
              <FX.SplitLetters text={t.hero.surname}/>
            </span>
          </span>
        </h1>

        <div className="rise" style={{ ...d(340), marginTop: 34, fontSize: "clamp(19px, 2.6vw, 27px)", lineHeight: 1.35, letterSpacing: "-0.02em", color: "var(--text-1)" }}>
          <div>{t.hero.tagline[0]}</div>
          <div className="serif-accent" style={{ color: "var(--text-2)", fontSize: "1.06em" }}>{t.hero.tagline[1]}</div>
        </div>

        <p className="rise" style={{ ...d(440), marginTop: 22, fontSize: 16.5, lineHeight: 1.6, color: "var(--text-3)", maxWidth: "58ch" }}>
          {t.hero.bio}
        </p>

        <div className="rise" style={{ ...d(540), display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap", alignItems: "center" }}>
          <FX.Magnetic as="a" href="#proyectos" className="btn-primary">
            <span>{t.hero.ctaPrimary}</span>
            <Icon name="arrow-right" size={14} className="btn-ic"/>
          </FX.Magnetic>
          <a href={cvHref} download className="btn-ghost">
            <Icon name="download" size={14}/>
            <span>{t.hero.ctaSecondary}</span>
          </a>
        </div>

        <div className="rise mono" style={{
          ...d(640), display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap",
          marginTop: 46, fontSize: 12, color: "var(--text-4)",
        }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <Icon name="map-pin" size={12}/>{t.hero.location}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <Icon name="clock" size={12}/><FX.LocalTime/>
          </span>
          <a href={data.CONTACT.github} target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "inherit" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--text-1)"}
            onMouseLeave={e => e.currentTarget.style.color = "inherit"}>
            <Icon name="github" size={12}/>github.com/Zakariajava
          </a>
        </div>

        <a href="#sobre-mi" className="scroll-cue rise" style={d(760)}>
          <span className="scroll-rail" aria-hidden="true"><span/></span>
          <span className="mono">{t.hero.scroll}</span>
        </a>
      </div>
    </section>
  );
};

// ─── Footer ──────────────────────────────────────────────────────────────
const Footer = ({ t, data, actions }) => (
  <footer style={{ borderTop: "1px solid var(--border-soft)", padding: "80px 0 36px", position: "relative", overflow: "hidden" }}>
    <div className="container">
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <a href="#top" className="giant-name" data-cursor-label={t.cursor.top}
          aria-label="Zakaria Abouhammadi" title={t.footer.backToTop}
          style={{ fontSize: "clamp(28px, 6.5vw, 102px)", display: "inline-block" }}>
          <FX.SplitLetters text="Zakaria Abouhammadi"/>
        </a>
      </div>

      <div className="g-cards" style={{
        display: "grid", gridTemplateColumns: "repeat(4, auto)", justifyContent: "space-between",
        gap: 28, paddingTop: 28, borderTop: "1px solid var(--border-soft)",
      }}>
        <div className="meta-col">
          <span className="meta-label">{t.footer.version}</span>
          <span className="meta-value">{t.footer.versionValue}</span>
        </div>
        <div className="meta-col">
          <span className="meta-label">{t.footer.localTime}</span>
          <span className="meta-value mono" style={{ fontSize: 13 }}><FX.LocalTime/> · Valencia</span>
        </div>
        <div className="meta-col">
          <span className="meta-label">{t.footer.socials}</span>
          <span style={{ display: "flex", gap: 14 }}>
            <a href={data.CONTACT.github} target="_blank" rel="noreferrer" title="GitHub" style={{ color: "var(--text-2)" }}><Icon name="github" size={15}/></a>
            <a href={data.CONTACT.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" style={{ color: "var(--text-2)" }}><Icon name="linkedin" size={15}/></a>
            <a href={`mailto:${data.CONTACT.email}`} title="Email" style={{ color: "var(--text-2)" }}><Icon name="mail" size={15}/></a>
          </span>
        </div>
        <div className="meta-col" style={{ alignItems: "flex-end" }}>
          <span className="meta-label">{t.footer.copy}</span>
          <a href="#top" className="meta-value" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            {t.footer.backToTop}<Icon name="arrow-up" size={12}/>
          </a>
        </div>
      </div>

      <div style={{
        marginTop: 34, display: "flex", alignItems: "center", justifyContent: "center",
        gap: 18, flexWrap: "wrap",
      }}>
        <span className="mono" style={{ fontSize: 10, color: "var(--text-4)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
          {t.keys.hint}
        </span>
        {[["T", t.keys.theme, actions.theme], ["L", t.keys.lang, actions.lang], ["M", t.keys.mono, actions.mono]].map(([k, labelText, run]) => (
          <button key={k} onClick={run} className="key-hint">
            <span className="kbd">{k}</span>
            <span>{labelText}</span>
          </button>
        ))}
      </div>

      <div className="mono" style={{ marginTop: 26, fontSize: 10.5, color: "var(--text-4)", letterSpacing: "0.02em", textAlign: "center" }}>
        {t.footer.colophon}
      </div>
    </div>
  </footer>
);

// ─── App root ────────────────────────────────────────────────────────────
function App() {
  const data = window.PORTFOLIO_DATA;

  const initialLang = (() => {
    try { return localStorage.getItem("za.lang") || ((navigator.language || "es").startsWith("en") ? "en" : "es"); }
    catch { return "es"; }
  })();
  const initialTheme = (() => {
    try { return localStorage.getItem("za.theme") || "dark"; }
    catch { return "dark"; }
  })();
  const initialIntro = (() => {
    if (FX.reducedMotion()) return false;
    try { return !sessionStorage.getItem("za.intro"); } catch { return true; }
  })();

  const initialMono = (() => {
    try { return localStorage.getItem("za.mono") === "1"; } catch { return false; }
  })();

  const [lang, setLang]         = uS(initialLang);
  const [theme, setTheme]       = uS(initialTheme);
  const [mono, setMono]         = uS(initialMono);
  const [scrolled, setScrolled] = uS(false);
  const [menuOpen, setMenuOpen] = uS(false);
  const [current, setCurrent]   = uS("top");
  const [intro, setIntro]       = uS(initialIntro);
  const t = data.i18n[lang];

  // The hero choreography is keyed off the value the page loaded with, so the
  // delays never change underneath a running animation when the intro unmounts.
  const baseDelayRef = uR(initialIntro ? 1350 : 80);

  const introDone = () => {
    try { sessionStorage.setItem("za.intro", "1"); } catch {}
    // Let the wipe finish, then drop the full-screen layer entirely.
    setTimeout(() => setIntro(false), 800);
  };

  // Theme: flip the class inside the mutation so view transitions snapshot it.
  const changeTheme = (e) => {
    const next = theme === "dark" ? "light" : "dark";
    FX.themeRipple(e, () => {
      document.documentElement.classList.toggle("light", next === "light");
      setTheme(next);
    });
  };
  const changeLang = (l) => {
    if (l === lang) return;
    FX.withViewTransition(() => setLang(l));
  };
  const changeMono = () => {
    const next = !mono;
    FX.withViewTransition(() => {
      document.documentElement.classList.toggle("mono", next);
      setMono(next);
    });
  };

  // Keep refs fresh for the keyboard shortcuts.
  const themeRef = uR(theme); themeRef.current = theme;
  const langRef = uR(lang); langRef.current = lang;
  const monoRef = uR(mono); monoRef.current = mono;

  uE(() => {
    FX.startBus();
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  uE(() => {
    document.documentElement.classList.toggle("mono", mono);
    try { localStorage.setItem("za.mono", mono ? "1" : "0"); } catch {}
  }, [mono]);

  uE(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    try { localStorage.setItem("za.theme", theme); } catch {}
  }, [theme]);

  uE(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("za.lang", lang); } catch {}
  }, [lang]);

  // Keyboard shortcuts: T = theme, L = language (Harry Atkins pattern).
  uE(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || e.target.isContentEditable) return;
      const k = e.key.toLowerCase();
      if (k === "t") {
        const next = themeRef.current === "dark" ? "light" : "dark";
        FX.themeRipple({ clientX: innerWidth - 60, clientY: 40 }, () => {
          document.documentElement.classList.toggle("light", next === "light");
          setTheme(next);
        });
      } else if (k === "l") {
        const next = langRef.current === "es" ? "en" : "es";
        FX.withViewTransition(() => setLang(next));
      } else if (k === "m") {
        const next = !monoRef.current;
        FX.withViewTransition(() => {
          document.documentElement.classList.toggle("mono", next);
          setMono(next);
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Active section tracking.
  uE(() => {
    const ids = ["top", ...NAV_ITEMS(t).map(it => it.id)];
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) setCurrent(en.target.id); });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  const S = window.Sections;
  const baseDelay = baseDelayRef.current;

  return (
    <React.Fragment>
      {intro && <Preloader onDone={introDone}/>}
      <FX.ScrollProgress/>
      <FX.Cursor/>
      <TopNav t={t} lang={lang} onLang={changeLang} theme={theme} onTheme={changeTheme}
        scrolled={scrolled} current={current} onOpenMenu={() => setMenuOpen(true)}/>
      <MobileMenu t={t} open={menuOpen} onClose={() => setMenuOpen(false)}/>
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero t={t} lang={lang} data={data} baseDelay={baseDelay}/>
        <S.SectionAbout t={t} lang={lang} data={data}/>
        <S.SectionEducation t={t} data={data}/>
        <S.SectionExperience t={t} lang={lang} data={data}/>
        <S.SectionProjects t={t} lang={lang} data={data}/>
        <S.SectionSkills t={t} lang={lang} data={data}/>
        <S.SectionCerts t={t} lang={lang} data={data}/>
        <S.SectionLangs t={t} lang={lang} data={data}/>
        <S.SectionContact t={t} data={data}/>
      </main>
      <Footer t={t} data={data} actions={{
        theme: (e) => changeTheme(e),
        lang: () => changeLang(lang === "es" ? "en" : "es"),
        mono: changeMono,
      }}/>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
