// ─── Section components ───────────────────────────────────────────────────
const { useState, useEffect, useRef, useMemo } = React;

// Reveal-on-scroll hook
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { el.classList.add("is-in"); io.unobserve(el); } });
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// Section header — title + description.
const SectionHeader = ({ h2, desc }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start", marginBottom: 56 }}>
      <div>
        <h2 className="display-2" style={{ color: "var(--text-primary)", maxWidth: "16ch" }}>{h2}</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 12 }}>
        <p style={{ color: "var(--text-secondary)", fontSize: 18, lineHeight: 1.55, maxWidth: "44ch" }}>{desc}</p>
      </div>
    </div>
  );
};

// ─── Sobre mí ────────────────────────────────────────────────────────────
const SectionAbout = ({ t, lang, data }) => {
  const ref = useReveal();
  return (
    <section className="section" id="sobre-mi">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        <SectionHeader h2={t.s_about.h2} desc={t.s_about.desc}/>

        <div ref={ref} className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Photo + bio */}
          <div className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <a href={data.CONTACT.linkedin} target="_blank" rel="noreferrer"
                title="LinkedIn"
                style={{
                  width: 92, height: 92, borderRadius: "50%",
                  padding: 3,
                  background: "conic-gradient(from 220deg at 50% 50%, var(--accent-primary) 0%, var(--accent-cyan) 35%, var(--accent-pink) 70%, var(--accent-primary) 100%)",
                  display: "block", flexShrink: 0,
                  boxShadow: "0 0 40px -8px var(--accent-glow)",
                }}>
                <img src={data.CONTACT.photo} alt="Zakaria Abouhammadi" loading="lazy" style={{
                  width: "100%", height: "100%", borderRadius: "50%",
                  objectFit: "cover", display: "block",
                  border: "2px solid var(--bg-base)",
                }}/>
              </a>
              <div>
                <div style={{ fontWeight: 600, fontSize: 20 }}>Zakaria Abouhammadi</div>
                <div style={{ color: "var(--text-secondary)", fontSize: 14 }}>{t.hero.role}</div>
                <div className="mono" style={{ color: "var(--text-tertiary)", fontSize: 12, marginTop: 4 }}>Valencia · ES</div>
              </div>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>{t.s_about.cardBio}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <a href={data.CONTACT.github} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: "8px 14px", fontSize: 13 }}>
                <Icon name="github" size={14}/><span>GitHub</span>
              </a>
              <a href={data.CONTACT.linkedin} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: "8px 14px", fontSize: 13 }}>
                <Icon name="linkedin" size={14}/><span>LinkedIn</span>
              </a>
              <a href={`mailto:${data.CONTACT.email}`} className="btn-secondary" style={{ padding: "8px 14px", fontSize: 13 }}>
                <Icon name="mail" size={14}/><span>Email</span>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="card" style={{ padding: 32 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {t.s_about.stats.map((s, i) => (
                <div key={i} style={{ paddingBottom: 16, borderBottom: "1px solid var(--border-soft)" }}>
                  <div className="display-3" style={{ fontFamily: "var(--mono)", fontWeight: 500, color: "var(--text-primary)" }}>{s.n}</div>
                  <div className="mono" style={{ fontSize: 12, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Experiencia ─────────────────────────────────────────────────────────
const SectionExperience = ({ t }) => {
  const ref = useReveal();
  return (
    <section className="section" id="experiencia">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        <SectionHeader h2={t.s_exp.h2} desc={t.s_exp.desc}/>

        <div ref={ref} className="reveal card" style={{ padding: 32, display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span className="pulse-dot" style={{ background: "var(--success)", boxShadow: "0 0 0 0 rgba(52,211,153,0.55)" }}/>
              <span className="mono" style={{ fontSize: 11, color: "var(--success)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.s_exp.active}</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: 22, marginBottom: 4 }}>{t.s_exp.org}</div>
            <div style={{ color: "var(--text-secondary)", fontSize: 15, marginBottom: 6 }}>{t.s_exp.role}</div>
            <div className="mono" style={{ color: "var(--text-tertiary)", fontSize: 12, marginBottom: 24 }}>
              {t.s_exp.where} · {t.s_exp.when}
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7 }}>{t.s_exp.desc_long}</p>
          </div>

          <div style={{
            borderRadius: 16, padding: 20,
            background: "linear-gradient(160deg, rgba(124,92,255,0.08), rgba(94,231,223,0.04))",
            border: "1px solid var(--border-soft)",
          }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>{t.s_exp.stackLabel}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Python","LangGraph","RAG","python-docx","FastAPI","Docker","vLLM","Qwen3","Microsoft Graph","SharePoint"].map(s => (
                <span key={s} className="tech">{s}</span>
              ))}
            </div>
            <div style={{ marginTop: 24, padding: "16px 0 0", borderTop: "1px solid var(--border-soft)" }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 12 }}>{t.s_exp.pipelineLabel}</div>
              {t.s_exp.pipeline.map((step, i) => (
                <div key={step} style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0" }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: "50%",
                    background: "rgba(124,92,255,0.15)",
                    border: "1px solid rgba(124,92,255,0.4)",
                    display: "grid", placeItems: "center",
                    fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent-primary)",
                  }}>{i+1}</span>
                  <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{step}</span>
                  {i < t.s_exp.pipeline.length - 1 && <span style={{ flex: 1, height: 1, background: "var(--border-soft)" }}/>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Educación ───────────────────────────────────────────────────────────
const SectionEducation = ({ t }) => {
  const ref = useReveal();
  return (
    <section className="section" id="educacion">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        <SectionHeader h2={t.s_edu.h2} desc={t.s_edu.desc}/>

        <div ref={ref} className="reveal card" style={{ padding: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 22, marginBottom: 6 }}>{t.s_edu.degree}</div>
              <div style={{ color: "var(--text-secondary)", fontSize: 14 }}>{t.s_edu.org}</div>
              <div className="mono" style={{ color: "var(--text-tertiary)", fontSize: 12, marginTop: 4 }}>{t.s_edu.when}</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>{t.s_edu.highlights}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {t.s_edu.subjects.map(s => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-secondary)" }}>
                    <span style={{ width: 4, height: 4, borderRadius: 999, background: "var(--accent-cyan)" }}/>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Proyectos ───────────────────────────────────────────────────────────
const SectionProjects = ({ t, lang, data }) => {
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const ref = useReveal();

  const counts = useMemo(() => {
    const c = { all: data.PROJECTS.length, llm: 0, dl: 0, ml: 0, sys: 0 };
    data.PROJECTS.forEach(p => { c[p.cat] = (c[p.cat]||0) + 1; });
    return c;
  }, [data]);

  const featured = data.PROJECTS.filter(p => p.featured);
  const compact  = data.PROJECTS.filter(p => !p.featured);
  const filteredFeat    = featured.filter(p => filter === "all" || p.cat === filter);
  const filteredCompact = compact.filter(p  => filter === "all" || p.cat === filter);

  const filters = [
    { id: "all", label: t.s_proj.filterAll, count: counts.all },
    { id: "llm", label: t.s_proj.filterLabels.llm, count: counts.llm },
    { id: "dl",  label: t.s_proj.filterLabels.dl,  count: counts.dl },
    { id: "ml",  label: t.s_proj.filterLabels.ml,  count: counts.ml },
    { id: "sys", label: t.s_proj.filterLabels.sys, count: counts.sys },
  ];

  return (
    <section className="section" id="proyectos">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        <SectionHeader h2={t.s_proj.h2} desc={t.s_proj.desc}/>

        <div ref={ref} className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {filters.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: "8px 16px", borderRadius: 999,
              border: "1px solid " + (filter === f.id ? "var(--text-primary)" : "var(--border-default)"),
              background: filter === f.id ? "var(--text-primary)" : "transparent",
              color: filter === f.id ? "var(--bg-base)" : "var(--text-secondary)",
              fontSize: 13, fontWeight: 500,
              transition: "all 300ms var(--ease-apple)",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              <span>{f.label}</span>
              <span className="mono" style={{ opacity: 0.6, fontSize: 11 }}>({f.count})</span>
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
          {filteredFeat.map((p, i) => (
            <ProjectCard key={p.id} p={p} lang={lang} t={t} idx={i}/>
          ))}
        </div>

        {filteredCompact.length > 0 && (
          <>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
              <button onClick={() => setShowAll(!showAll)} className="btn-secondary">
                <span>{showAll ? t.s_proj.seeLess : t.s_proj.seeMore}</span>
                <Icon name={showAll ? "arrow-up-right" : "arrow-down"} size={14}/>
              </button>
            </div>

            {showAll && (
              <div style={{
                marginTop: 32,
                display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20,
              }}>
                {filteredCompact.map((p, i) => (
                  <ProjectCard key={p.id} p={p} lang={lang} t={t} idx={i}/>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

const ProjectCard = ({ p, lang, t, idx }) => {
  const ref = useReveal();
  const desc = lang === "es" ? p.desc_es : p.desc_en;
  const interactive = !!p.href;
  return (
    <a ref={ref} className="reveal card" href={p.href || undefined}
      target={interactive ? "_blank" : undefined}
      rel={interactive ? "noreferrer" : undefined}
      onClick={e => { if (!interactive) e.preventDefault(); }}
      style={{
        padding: 0, display: "flex", flexDirection: "column", overflow: "hidden",
        transitionDelay: `${(idx % 6) * 40}ms`,
        cursor: interactive ? "pointer" : "default",
      }}>
      <ProjectArt id={p.id} accent={p.accent}/>
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>{p.name}</h3>
            {p.subtitle && <div className="mono" style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 2 }}>{p.subtitle}</div>}
          </div>
          {p.privateRepo ? (
            <span title={t.s_proj.privateRepo} style={{ color: "var(--text-tertiary)", flexShrink: 0 }}><Icon name="lock" size={14}/></span>
          ) : interactive ? (
            <span title={t.s_proj.viewRepo} style={{ color: "var(--text-tertiary)", flexShrink: 0 }}><Icon name="arrow-up-right" size={14}/></span>
          ) : null}
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.5, flex: 1 }}>{desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {p.stack.slice(0, 5).map(s => <span key={s} className="tech">{s}</span>)}
          {p.stack.length > 5 && <span className="tech">+{p.stack.length - 5}</span>}
        </div>
      </div>
    </a>
  );
};

// ─── Skills ──────────────────────────────────────────────────────────────
const SectionSkills = ({ t, lang, data }) => {
  const ref = useReveal();
  return (
    <section className="section" id="skills">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        <SectionHeader h2={t.s_skills.h2} desc={t.s_skills.desc}/>

        <div ref={ref} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {data.SKILLS.map((g, i) => (
            <div key={i} className="card" style={{ padding: 24 }}>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 14, color: "var(--text-primary)" }}>
                {lang === "es" ? g.title_es : g.title_en}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {g.items.map(it => <span key={it} className="tech">{it}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Certificaciones ─────────────────────────────────────────────────────
const SectionCerts = ({ t, lang, data }) => {
  const ref = useReveal();
  return (
    <section className="section" id="certificaciones">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        <SectionHeader h2={t.s_certs.h2} desc={t.s_certs.desc}/>

        <div ref={ref} className="reveal" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {data.CERTS.map(group => (
            <div key={group.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>
                  {lang === "es" ? group.title_es : group.title_en}
                </h3>
                <span className="mono" style={{ fontSize: 11, color: "var(--text-tertiary)" }}>
                  {group.items.length} {lang === "es" ? "certificaciones" : "certifications"}
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 8 }}>
                {group.items.map((c, i) => (
                  <a key={i} href={c.url} target="_blank" rel="noreferrer" className="card" style={{
                    padding: "14px 16px",
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                    textDecoration: "none",
                  }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.35 }}>
                        {c.name}
                      </div>
                      <div className="mono" style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 4, display: "flex", gap: 8 }}>
                        <span>{c.issuer}</span>
                        <span>·</span>
                        <span>{c.date}</span>
                      </div>
                    </div>
                    <span style={{ color: "var(--text-tertiary)", flexShrink: 0 }}>
                      <Icon name="arrow-up-right" size={14}/>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Idiomas ─────────────────────────────────────────────────────────────
const SectionLangs = ({ t, lang, data }) => {
  const ref = useReveal();
  return (
    <section className="section" id="idiomas">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        <SectionHeader h2={t.s_langs.h2} desc={t.s_langs.desc}/>

        <div ref={ref} className="reveal card" style={{ padding: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {data.LANGS.map((l, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "180px 1fr 160px", gap: 24, alignItems: "center" }}>
                <div style={{ fontWeight: 500, fontSize: 16 }}>{lang === "es" ? l.name_es : l.name_en}</div>
                <div style={{ height: 2, background: "var(--bg-surface-2)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${l.pct}%`,
                    background: "linear-gradient(90deg, var(--accent-primary), var(--accent-cyan))",
                    borderRadius: 999,
                    transition: `width 1200ms ${i*120}ms var(--ease-apple)`,
                  }}/>
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--text-tertiary)", textAlign: "right", textTransform: "uppercase", letterSpacing: "0.05em" }}>{lang === "es" ? l.level_es : l.level_en}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Contacto ────────────────────────────────────────────────────────────
const SectionContact = ({ t, data }) => {
  const [copied, setCopied] = useState(false);
  const ref = useReveal();
  const onCopy = async () => {
    try { await navigator.clipboard.writeText(data.CONTACT.email); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };
  return (
    <section className="section" id="contacto" style={{ paddingBottom: 128 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        <SectionHeader h2={t.s_contact.h2} desc={t.s_contact.desc}/>

        <div ref={ref} className="reveal card" style={{ padding: 40, display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 40 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Email</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <a href={`mailto:${data.CONTACT.email}`} className="display-3" style={{ fontWeight: 500, color: "var(--text-primary)", letterSpacing: "-0.02em", wordBreak: "break-all" }}>
                  {data.CONTACT.email}
                </a>
                <button onClick={onCopy} className="btn-secondary" style={{ padding: "8px 14px", fontSize: 13 }}>
                  <Icon name={copied ? "check" : "copy"} size={14}/>
                  <span>{copied ? t.s_contact.copied : t.s_contact.copy}</span>
                </button>
              </div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>CV</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <a href={data.CONTACT.cvEs} download className="btn-secondary" style={{ justifyContent: "space-between" }}>
                  <span>{t.s_contact.cvEs}</span><Icon name="download" size={14}/>
                </a>
                <a href={data.CONTACT.cvEn} download className="btn-secondary" style={{ justifyContent: "space-between" }}>
                  <span>{t.s_contact.cvEn}</span><Icon name="download" size={14}/>
                </a>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 24, borderTop: "1px solid var(--border-soft)" }}>
            <a href={data.CONTACT.github}   target="_blank" rel="noreferrer" className="btn-secondary"><Icon name="github" size={14}/><span>GitHub</span></a>
            <a href={data.CONTACT.linkedin} target="_blank" rel="noreferrer" className="btn-secondary"><Icon name="linkedin" size={14}/><span>LinkedIn</span></a>
            <a href={data.CONTACT.web}      target="_blank" rel="noreferrer" className="btn-secondary"><Icon name="globe" size={14}/><span>zakariajava.github.io</span></a>
            <a href={`mailto:${data.CONTACT.email}`}                          className="btn-secondary"><Icon name="mail" size={14}/><span>Email</span></a>
          </div>
        </div>
      </div>
    </section>
  );
};

window.Sections = { SectionAbout, SectionExperience, SectionEducation, SectionProjects, SectionSkills, SectionCerts, SectionLangs, SectionContact };
