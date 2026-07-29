// ─── Section components ───────────────────────────────────────────────────
// Uses the globals defined earlier in the load order:
//   window.PORTFOLIO_DATA (data.jsx) · Icon (icons.jsx) · window.FX (effects.jsx)
//   ProjectArt / FeatureArt (mockups.jsx)
const { useState, useEffect, useRef, useMemo } = React;
const { Reveal, SplitWords, SplitLetters, Scramble, Counter, Marquee, SpotlightGrid,
        TimelineProgress, TimelineDot, Magnetic, useTilt, useParallax,
        finePointer, reducedMotion } = window.FX;

// Editorial section header: stroked numeral in the margin, decoding eyebrow,
// masked headline, description. Collapses to one column below 900px.
const SectionHeader = ({ num, label, h2, desc, children }) => (
  <div className="g-2col" style={{
    display: "grid", gridTemplateColumns: "150px 1fr", gap: 32,
    alignItems: "start", marginBottom: 56,
  }}>
    <Reveal className="sticky-head" variant="from-left">
      <div className="section-num" aria-hidden="true">{num}</div>
    </Reveal>
    <div>
      <Reveal as="div" style={{ marginBottom: 18 }}>
        <span className="eyebrow"><Scramble text={label}/></span>
      </Reveal>
      <Reveal as="h2" className="display-2" aria-label={h2} style={{ maxWidth: "22ch" }}>
        <SplitWords text={h2} labelled={false}/>
      </Reveal>
      {desc && (
        <Reveal as="p" delay={140} style={{
          color: "var(--text-2)", fontSize: 17, lineHeight: 1.6,
          maxWidth: "56ch", marginTop: 18,
        }}>{desc}</Reveal>
      )}
      {children}
    </div>
  </div>
);

// ─── 01 · Sobre mí ───────────────────────────────────────────────────────
const PhotoCard = ({ t, data }) => {
  const tiltRef = useTilt(4);
  return (
    <div className="photo-tilt">
      <div ref={tiltRef} className="card tilt lift edge-light" style={{ padding: 22, borderRadius: 20 }}>
        <div className="glare" aria-hidden="true"/>
        <img src={data.CONTACT.photo} alt="Zakaria Abouhammadi" loading="lazy" style={{
          width: "100%", aspectRatio: "1 / 1.05", objectFit: "cover",
          borderRadius: 12, display: "block",
        }}/>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 16 }}>
          <div>
            <div style={{ fontWeight: 560, fontSize: 16, letterSpacing: "-0.01em" }}>Zakaria Abouhammadi</div>
            <div style={{ color: "var(--text-3)", fontSize: 13, marginTop: 2 }}>{t.hero.role}</div>
          </div>
          <div className="mono" style={{ fontSize: 10.5, color: "var(--text-4)", letterSpacing: "0.06em" }}>VLC · ES</div>
        </div>
      </div>
    </div>
  );
};

// The photo column drifts a touch slower than the text as you scroll.
const PhotoDrift = ({ t, data }) => {
  const ref = useParallax(0.055);
  return <div ref={ref}><PhotoCard t={t} data={data}/></div>;
};

const SectionAbout = ({ t, lang, data }) => (
  <section className="section" id="sobre-mi">
    <div className="container">
      <SectionHeader num="01" label={t.nav.about} h2={t.s_about.h2} desc={t.s_about.desc}/>

      <div className="g-2col-r" style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 48, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <Reveal as="p" style={{ fontSize: 19, lineHeight: 1.6, color: "var(--text-2)", maxWidth: "58ch" }}>
            {t.s_about.cardBio}
          </Reveal>
          <Reveal delay={100} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href={data.CONTACT.github} target="_blank" rel="noreferrer" className="btn-ghost">
              <Icon name="github" size={14}/><span>GitHub</span>
            </a>
            <a href={data.CONTACT.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
              <Icon name="linkedin" size={14}/><span>LinkedIn</span>
            </a>
            <a href={`mailto:${data.CONTACT.email}`} className="btn-ghost">
              <Icon name="mail" size={14}/><span>Email</span>
            </a>
          </Reveal>

          <Reveal delay={160} className="g-stats" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20,
            borderTop: "1px solid var(--border-soft)", paddingTop: 28, marginTop: 8,
          }}>
            {t.s_about.stats.map((s, i) => {
              const n = parseInt(s.n, 10);
              return (
                <div key={i}>
                  <div className="mono" style={{ fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 500, color: "var(--text-1)", lineHeight: 1 }}>
                    {isNaN(n) ? s.n : <Counter to={n}/>}
                  </div>
                  <div className="mono" style={{ fontSize: 10.5, color: "var(--text-4)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 8, lineHeight: 1.5 }}>{s.l}</div>
                </div>
              );
            })}
          </Reveal>
        </div>

        <Reveal variant="from-scale" delay={120}>
          <PhotoDrift t={t} data={data}/>
        </Reveal>
      </div>
    </div>
  </section>
);

// ─── 02 · Educación ──────────────────────────────────────────────────────
const SectionEducation = ({ t, data }) => (
  <section className="section" id="educacion">
    <div className="container">
      <SectionHeader num="02" label={t.nav.education} h2={t.s_edu.h2} desc={t.s_edu.desc}/>

      <Reveal className="card edge-light" style={{ padding: "32px 36px" }}>
        <div className="g-2col-r" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40 }}>
          <div>
            <div className="display-3" style={{ marginBottom: 8 }}>{t.s_edu.degree}</div>
            <div style={{ color: "var(--text-2)", fontSize: 14.5 }}>{t.s_edu.org}</div>
            <div className="mono" style={{ color: "var(--text-4)", fontSize: 12, marginTop: 6 }}>{t.s_edu.when}</div>

            <div style={{
              marginTop: 28, paddingTop: 24, borderTop: "1px solid var(--border-soft)",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap",
            }}>
              <div>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--text-4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{t.s_edu.tfgLabel}</div>
                <div style={{ fontSize: 15.5, fontWeight: 520 }}>{t.s_edu.tfgName}</div>
              </div>
              <a href="https://github.com/Zakariajava/asistente-uv" target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: "9px 16px", fontSize: 13 }}>
                <Icon name="github" size={13}/>
                <span>{t.s_proj.viewRepo}</span>
                <Icon name="arrow-up-right" size={12} className="btn-ic"/>
              </a>
            </div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--text-4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>{t.s_edu.highlights}</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {t.s_edu.subjects.map((s, i) => (
                <div key={s} style={{
                  display: "flex", alignItems: "baseline", gap: 12, fontSize: 14, color: "var(--text-2)",
                  padding: "9px 0", borderBottom: i < t.s_edu.subjects.length - 1 ? "1px solid var(--border-soft)" : "none",
                }}>
                  <span className="mono" style={{ fontSize: 10, color: "var(--text-4)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// ─── 03 · Experiencia ────────────────────────────────────────────────────
const ExperienceEntry = ({ job, t, lang, last }) => {
  const role = lang === "es" ? job.role_es : job.role_en;
  const where = lang === "es" ? job.where_es : job.where_en;
  const when = lang === "es" ? job.when_es : job.when_en;
  const type = lang === "es" ? job.type_es : job.type_en;
  const desc = lang === "es" ? job.desc_es : job.desc_en;
  const pipeline = lang === "es" ? job.pipeline_es : job.pipeline_en;

  const inner = (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
        <h3 className="display-3">{role}</h3>
        {job.current && (
          <span className="mono" style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            fontSize: 10.5, color: "var(--success)", textTransform: "uppercase", letterSpacing: "0.08em",
          }}>
            <span className="pulse-dot"/>{t.s_exp.activeLabel}
          </span>
        )}
      </div>
      <div style={{ color: "var(--text-2)", fontSize: 15, fontWeight: 480 }}>{job.org}</div>
      <div className="mono" style={{ color: "var(--text-4)", fontSize: 12, marginTop: 5 }}>
        {when} · {where} · {type}
      </div>
      <p style={{ color: "var(--text-2)", fontSize: 14.5, lineHeight: 1.7, marginTop: 18, maxWidth: "72ch" }}>{desc}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 20 }}>
        {job.stack.map(s => <span key={s} className="tech">{s}</span>)}
      </div>

      {pipeline && (
        <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border-soft)" }}>
          <div className="mono" style={{ fontSize: 10.5, color: "var(--text-4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>{t.s_exp.pipelineLabel}</div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
            {pipeline.map((step, i) => (
              <React.Fragment key={step}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-2)" }}>
                  <span className="mono" style={{
                    width: 18, height: 18, borderRadius: "50%",
                    background: "var(--accent-soft)", border: "1px solid rgba(139,124,255,0.4)",
                    display: "inline-grid", placeItems: "center",
                    fontSize: 9.5, color: "var(--accent)",
                  }}>{i + 1}</span>
                  {step}
                </span>
                {i < pipeline.length - 1 && <span style={{ color: "var(--text-4)", display: "inline-flex" }}><Icon name="arrow-right" size={11}/></span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ position: "relative", paddingBottom: last ? 0 : 56 }}>
      <TimelineDot/>
      <Reveal>
        {job.current
          ? <div className="liquid-glass" style={{ padding: "30px 34px" }}>{inner}</div>
          : <div style={{ padding: "4px 0" }}>{inner}</div>}
      </Reveal>
    </div>
  );
};

const SectionExperience = ({ t, lang, data }) => (
  <section className="section" id="experiencia">
    <div className="container">
      <SectionHeader num="03" label={t.nav.experience} h2={t.s_exp.h2} desc={t.s_exp.desc}/>
      <div className="tl-offset">
        <TimelineProgress>
          {data.EXPERIENCE.map((job, i) => (
            <ExperienceEntry key={job.id} job={job} t={t} lang={lang} last={i === data.EXPERIENCE.length - 1}/>
          ))}
        </TimelineProgress>
      </div>
    </div>
  </section>
);

// ─── 04 · Proyectos ──────────────────────────────────────────────────────
// Flagship case panel + editorial list rows with a cursor-chasing preview,
// plus a numbered archive. Rows link to the repo when public.
const FlagshipPanel = ({ p, t, lang }) => {
  const desc = lang === "es" ? p.desc_es : p.desc_en;
  return (
    <Reveal className="card edge-light" style={{ padding: 0, overflow: "hidden", marginBottom: 64 }}>
      <div className="g-2col-r" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 0, alignItems: "stretch" }}>
        <div style={{ padding: 14, minHeight: 280, display: "grid" }}>
          <ProjectArt id={p.id} accent={p.accent} height={"100%"}/>
        </div>
        <div style={{ padding: "32px 36px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="mono" style={{
            display: "inline-flex", alignItems: "center", gap: 8, alignSelf: "flex-start",
            fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase",
            color: "var(--success)",
          }}>
            <span className="pulse-dot"/>{t.s_proj.proprietaryLabel}
          </div>
          <h3 className="display-3">{p.name}</h3>
          <div className="mono" style={{ fontSize: 11, color: "var(--text-4)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: -8 }}>
            Food Delivery Brands (Telepizza)
          </div>
          <p style={{ color: "var(--text-2)", fontSize: 14, lineHeight: 1.65 }}>{desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto", paddingTop: 8 }}>
            {p.stack.slice(0, 9).map(s => <span key={s} className="tech">{s}</span>)}
            {p.stack.length > 9 && <span className="tech">+{p.stack.length - 9}</span>}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

// Most subtitles are language-neutral technical labels; a project may override
// per language when it isn't (e.g. the Spanish-only "TFG" acronym).
const subtitleOf = (p, lang) => (lang === "es" ? p.subtitle_es : p.subtitle_en) || p.subtitle;

const ProjectRow = ({ p, t, lang, idx, onEnter, onLeave }) => {
  const desc = lang === "es" ? p.desc_es : p.desc_en;
  const catLabel = t.s_proj.filterLabels[p.cat] || p.cat;
  const clickable = !!p.href;
  const Tag = clickable ? "a" : "div";
  return (
    <Tag
      href={p.href || undefined}
      target={clickable ? "_blank" : undefined}
      rel={clickable ? "noreferrer" : undefined}
      className="prow"
      data-cursor
      data-cursor-label={clickable ? t.cursor.view : undefined}
      onPointerEnter={() => onEnter(p)}
      onPointerLeave={onLeave}
      style={clickable ? undefined : { cursor: "default" }}
    >
      <span className="prow-line" aria-hidden="true"/>
      <span className="prow-num">{String(idx + 1).padStart(2, "0")}</span>
      <span style={{ minWidth: 0 }}>
        <span className="prow-name" style={{ display: "block" }}>{p.name}</span>
        <span className="prow-sub">
          {subtitleOf(p, lang)}
          {p.privateRepo ? ` · ${t.s_proj.privateRepo}` : ""}
        </span>
        <span style={{
          color: "var(--text-3)", fontSize: 13.5, lineHeight: 1.55,
          maxWidth: "62ch", marginTop: 8,
          overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
        }}>{desc}</span>
      </span>
      <span className="prow-meta">
        <span className="mono nav-center" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{catLabel}</span>
        <span className="prow-arrow">
          <Icon name={clickable ? "arrow-up-right" : "lock"} size={16}/>
        </span>
      </span>
    </Tag>
  );
};

const SectionProjects = ({ t, lang, data }) => {
  const [filter, setFilter] = useState("all");
  const [showArchive, setShowArchive] = useState(false);
  const previewRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const flagship = data.PROJECTS.find(p => p.proprietary);
  const featured = data.PROJECTS.filter(p => p.featured && !p.proprietary);
  const archive = data.PROJECTS.filter(p => !p.featured);

  // Counts describe the list the filters actually drive: the flagship sits
  // above it and is always on screen, so it is not part of the tally.
  const counts = useMemo(() => {
    const listed = data.PROJECTS.filter(p => !p.proprietary);
    const c = { all: listed.length, llm: 0, dl: 0, ml: 0, sys: 0 };
    listed.forEach(p => { c[p.cat] = (c[p.cat] || 0) + 1; });
    return c;
  }, [data]);

  const filteredFeat = featured.filter(p => filter === "all" || p.cat === filter);
  const filteredArch = archive.filter(p => filter === "all" || p.cat === filter);

  // Cursor-chasing preview panel (desktop only). Position is written
  // straight to the DOM from a lerp loop — React only swaps the artwork.
  useEffect(() => {
    if (!finePointer() || reducedMotion()) return;
    const el = previewRef.current;
    if (!el) return;
    let raf = 0, tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, rot = 0;
    const loop = () => {
      raf = 0;
      const dx = tx - x, dy = ty - y;
      x += dx * 0.13; y += dy * 0.13;
      // The panel banks into the direction it is being dragged — the lag
      // that makes a chased element feel like it has mass.
      const target = Math.max(-9, Math.min(9, dx * 0.09));
      rot += (target - rot) * 0.12;
      const px = Math.min(Math.max(x + 30, 12), innerWidth - 352);
      const py = Math.min(Math.max(y - 105, 12), innerHeight - 222);
      el.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg)`;
      if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3 || Math.abs(rot) > 0.05) wake();
    };
    const wake = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const move = (e) => { tx = e.clientX; ty = e.clientY; wake(); };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);

  const showPreview = preview && finePointer() && !reducedMotion();

  const filters = [
    { id: "all", label: t.s_proj.filterAll, count: counts.all },
    { id: "llm", label: t.s_proj.filterLabels.llm, count: counts.llm },
    { id: "dl",  label: t.s_proj.filterLabels.dl,  count: counts.dl },
    { id: "ml",  label: t.s_proj.filterLabels.ml,  count: counts.ml },
    { id: "sys", label: t.s_proj.filterLabels.sys, count: counts.sys },
  ];

  return (
    <section className="section" id="proyectos">
      <div className="container">
        <SectionHeader num="04" label={t.nav.projects} h2={t.s_proj.h2} desc={t.s_proj.desc}/>

        {flagship && <FlagshipPanel p={flagship} t={t} lang={lang}/>}

        <Reveal style={{ display: "flex", flexWrap: "wrap", gap: 22, marginBottom: 18 }}>
          {filters.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`filter-link ${filter === f.id ? "on" : ""}`}>
              {f.label} ({f.count})
            </button>
          ))}
        </Reveal>

        <div className="prows">
          {filteredFeat.map((p, i) => (
            <ProjectRow key={p.id} p={p} t={t} lang={lang} idx={i}
              onEnter={(proj) => setPreview(proj)} onLeave={() => setPreview(null)}/>
          ))}
        </div>

        {filteredArch.length > 0 && (
          <div style={{ marginTop: 44 }}>
            <button onClick={() => setShowArchive(!showArchive)} className="btn-ghost" style={{ fontFamily: "var(--mono)", fontSize: 13 }}>
              <span>{showArchive ? t.s_proj.seeLess : `${t.s_proj.seeMore} (${filteredArch.length})`}</span>
              <Icon name={showArchive ? "arrow-up" : "arrow-down"} size={13} className="btn-ic"/>
            </button>

            {showArchive && (
              <div className="rise" style={{ marginTop: 24 }}>
                {filteredArch.map((p, i) => (
                  <a key={p.id} href={p.href || undefined} target="_blank" rel="noreferrer"
                     className="arow" data-cursor data-cursor-label={t.cursor.open}>
                    <span className="arow-num">{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ minWidth: 0 }}>
                      <span className="arow-name" style={{ display: "inline-block" }}>{p.name}</span>
                      <span style={{ color: "var(--text-4)", fontSize: 12.5, marginLeft: 12 }}>{subtitleOf(p, lang)}</span>
                    </span>
                    <span className="arow-cat">{(t.s_proj.filterLabels[p.cat] || p.cat).split("·")[0].trim()}</span>
                    <span className="arow-arrow"><Icon name="arrow-up-right" size={14}/></span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating artwork preview for the hovered row. Portalled to <body>:
          this section sets content-visibility, which makes it a containing
          block for fixed positioning and would trap the panel inside it. */}
      {ReactDOM.createPortal(
        <div ref={previewRef} className={`preview-float ${showPreview ? "show" : ""}`} aria-hidden="true">
          <div className="preview-inner">
            {preview && <ProjectArt id={preview.id} accent={preview.accent} height={"100%"}/>}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

// ─── 05 · Skills ─────────────────────────────────────────────────────────
const SectionSkills = ({ t, lang, data }) => {
  const allItems = useMemo(() => {
    const seen = new Set();
    const out = [];
    data.SKILLS.forEach(g => g.items.forEach(it => { if (!seen.has(it)) { seen.add(it); out.push(it); } }));
    return out;
  }, [data]);

  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeader num="05" label={t.nav.skills} h2={t.s_skills.h2} desc={t.s_skills.desc}/>

        <Reveal>
          {data.SKILLS.map((g, gi) => (
            <div key={gi} className="g-2col-r" style={{
              display: "grid", gridTemplateColumns: "220px 1fr", gap: 24,
              padding: "20px 4px",
              borderBottom: "1px solid var(--border-soft)",
              borderTop: gi === 0 ? "1px solid var(--border-soft)" : "none",
              alignItems: "baseline",
            }}>
              <div style={{ fontWeight: 540, fontSize: 15, letterSpacing: "-0.01em" }}>
                {lang === "es" ? g.title_es : g.title_en}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {g.items.map(it => <span key={it} className="tech">{it}</span>)}
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      {/* Two full-bleed rows drifting in opposite directions, calm speed */}
      <div style={{ marginTop: 64, display: "flex", flexDirection: "column", gap: 14 }}>
        {[false, true].map((rev, r) => (
          <Marquee key={r} seconds={rev ? 64 : 55} gap={52} reverse={rev}>
            {(rev ? [...allItems].reverse() : allItems).map(s => (
              <span key={s} className="mono" style={{
                fontSize: 15, color: rev ? "var(--text-4)" : "var(--text-3)",
                display: "inline-flex", alignItems: "center", gap: 52,
              }}>
                {s}
                <span style={{ width: 4, height: 4, borderRadius: 999, background: "var(--border-strong)", display: "inline-block" }}/>
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
};

// ─── 06 · Certificaciones ────────────────────────────────────────────────
const SectionCerts = ({ t, lang, data }) => (
  <section className="section" id="certificaciones">
    <div className="container">
      <SectionHeader num="06" label={t.nav.certs} h2={t.s_certs.h2} desc={t.s_certs.desc}/>

      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {data.CERTS.map(group => (
          <Reveal key={group.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
              <h3 style={{ fontSize: 18, fontWeight: 560, letterSpacing: "-0.015em" }}>
                {lang === "es" ? group.title_es : group.title_en}
              </h3>
              <span className="mono" style={{ fontSize: 11, color: "var(--text-4)" }}>
                {String(group.items.length).padStart(2, "0")} · {t.s_certs.countLabel}
              </span>
            </div>
            <SpotlightGrid className="g-cards-sm" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: 8 }}>
              {group.items.map((c, i) => (
                <a key={i} href={c.url} target="_blank" rel="noreferrer" className="cert-row spot"
                   title={t.s_certs.verify} data-cursor-label={t.cursor.cert}>
                  <span style={{ minWidth: 0, flex: 1 }}>
                    <span style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-1)", lineHeight: 1.35 }}>{c.name}</span>
                    <span className="mono" style={{ display: "flex", gap: 8, fontSize: 10.5, color: "var(--text-4)", marginTop: 5 }}>
                      <span>{c.issuer}</span><span>·</span><span>{c.date}</span>
                    </span>
                  </span>
                  <span className="cert-arrow" style={{ color: "var(--text-3)", flexShrink: 0 }}>
                    <Icon name="arrow-up-right" size={14}/>
                  </span>
                </a>
              ))}
            </SpotlightGrid>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ─── 07 · Idiomas ────────────────────────────────────────────────────────
const SectionLangs = ({ t, lang, data }) => (
  <section className="section" id="idiomas">
    <div className="container">
      <SectionHeader num="07" label={t.nav.languages} h2={t.s_langs.h2} desc={t.s_langs.desc}/>
      <Reveal style={{ maxWidth: 760 }}>
        {data.LANGS.map((l, i) => (
          <div key={i} className="lang-row g-langs">
            <span className="lang-code">{l.code}</span>
            <span className="lang-name">{lang === "es" ? l.name_es : l.name_en}</span>
            <span className="lang-level">{lang === "es" ? l.level_es : l.level_en}</span>
          </div>
        ))}
      </Reveal>
    </div>
  </section>
);

// ─── 08 · Contacto ───────────────────────────────────────────────────────
const SectionContact = ({ t, data }) => {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };
  return (
    <section className="section" id="contacto" style={{ paddingBottom: 90 }}>
      <div className="container">
        <SectionHeader num="08" label={t.nav.contact} h2={t.s_contact.h2} desc={t.s_contact.desc}/>

        <div className="g-2col" style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 32 }}>
          <div/>
          <div>
            <Reveal>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--text-4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>{t.s_contact.emailLabel}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
                <a href={`mailto:${data.CONTACT.email}`} className="display-3" data-cursor-label={t.cursor.open} style={{
                  fontWeight: 520, letterSpacing: "-0.02em", wordBreak: "break-all",
                  borderBottom: "1px solid var(--border-default)", paddingBottom: 4,
                  transition: "border-color 300ms var(--ease-flect)",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-default)"; }}
                >{data.CONTACT.email}</a>
                <button onClick={onCopy} className="btn-ghost" data-cursor-label={t.cursor.copy}
                        style={{ padding: "9px 16px", fontSize: 13 }}>
                  <Icon name={copied ? "check" : "copy"} size={13}/>
                  <span>{copied ? t.s_contact.copied : t.s_contact.copy}</span>
                </button>
              </div>
            </Reveal>

            <Reveal delay={120} style={{ marginTop: 40, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href={data.CONTACT.cvEs} download className="btn-ghost">
                <Icon name="download" size={14}/><span>{t.s_contact.cvEs}</span>
              </a>
              <a href={data.CONTACT.cvEn} download className="btn-ghost">
                <Icon name="download" size={14}/><span>{t.s_contact.cvEn}</span>
              </a>
              <a href={data.CONTACT.github} target="_blank" rel="noreferrer" className="btn-ghost">
                <Icon name="github" size={14}/><span>GitHub</span>
              </a>
              <a href={data.CONTACT.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
                <Icon name="linkedin" size={14}/><span>LinkedIn</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

window.Sections = {
  SectionAbout, SectionEducation, SectionExperience, SectionProjects,
  SectionSkills, SectionCerts, SectionLangs, SectionContact,
};
