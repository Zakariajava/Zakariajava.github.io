// ─── Project artwork ──────────────────────────────────────────────────────
// One unique mini-illustration per project. ART[id] returns an inline SVG
// rendered on top of a dark gradient panel coloured by the project's accent.

const PALETTES = {
  violet: { from: "#1a1530", to: "#0E0E12", glow: "#7C5CFF" },
  blue:   { from: "#0f1d35", to: "#0a0f1a", glow: "#5B8DFF" },
  cyan:   { from: "#0a2624", to: "#07070A", glow: "#5EE7DF" },
  pink:   { from: "#2a0f23", to: "#07070A", glow: "#FF7AC6" },
  green:  { from: "#0a2218", to: "#07070A", glow: "#34D399" },
  lilac:  { from: "#20183a", to: "#0E0E12", glow: "#9F8AFF" },
  slate:  { from: "#18181d", to: "#0a0a0e", glow: "#A1A1AA" },
};

// SVG dispatcher. Each function gets (glow) and returns an SVG body.
const ART = {
  // ── Production / client tools ──────────────────────────────────────────
  "pptx-updater": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      {/* Excel range (source) */}
      <rect x="16" y="30" width="108" height="86" rx="8" fill="rgba(8,8,12,0.55)" stroke="rgba(255,255,255,0.1)"/>
      <text x="26" y="46" fontFamily="JetBrains Mono" fontSize="9" fill="#34D399">ventas.xlsx</text>
      {[0,1,2,3].map(r => [0,1,2].map(c => (
        <rect key={`${r}-${c}`} x={26 + c*30} y={54 + r*13} width="26" height="9" rx="2"
          fill={r === 0 ? "rgba(52,211,153,0.28)" : "rgba(255,255,255,0.05)"}
          stroke="rgba(255,255,255,0.07)"/>
      )))}
      <rect x="24" y="52" width="92" height="40" rx="3" fill="none" stroke="#34D399" strokeDasharray="4 3"/>
      <text x="26" y="112" fontFamily="JetBrains Mono" fontSize="8" fill="#6B6B73">B2:D5 → png</text>
      {/* arrow */}
      <line x1="130" y1="73" x2="168" y2="73" stroke={g} strokeWidth="1.4"/>
      <path d="M164 68 172 73 164 78" fill="none" stroke={g} strokeWidth="1.4"/>
      {/* PPTX slide (target) */}
      <rect x="178" y="22" width="126" height="102" rx="8" fill="rgba(8,8,12,0.55)" stroke="rgba(255,255,255,0.1)"/>
      <rect x="188" y="32" width="70" height="8" rx="2" fill="rgba(255,255,255,0.14)"/>
      {[0,1,2,3].map(i => (
        <rect key={i} x={190 + i*22} y={92 - [28,44,36,54][i]} width="15" height={[28,44,36,54][i]} rx="2"
          fill={g} fillOpacity={0.4 + i*0.14}/>
      ))}
      <rect x="186" y="46" width="88" height="52" rx="3" fill="none" stroke={g} strokeDasharray="4 3"/>
      <text x="188" y="114" fontFamily="JetBrains Mono" fontSize="8" fill="#6B6B73">deck_junio.pptx</text>
      {/* UUID marker tag */}
      <g className="pulse">
        <rect x="216" y="126" width="88" height="16" rx="8" fill={`${g}1f`} stroke={`${g}55`}/>
        <text x="224" y="137" fontFamily="JetBrains Mono" fontSize="8" fill="#F5F5F7">uuid:7f3a…e2</text>
      </g>
      <text x="16" y="164" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">xlwings · win32com · python-pptx · sharepoint</text>
    </svg>
  ),

  // ── LLMs / Agents / RAG ────────────────────────────────────────────────
  "asistente-uv": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      <rect x="20" y="20" width="280" height="140" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
      <text x="36" y="46" fontFamily="JetBrains Mono" fontSize="11" fill={g}>uv.es ▸ asistente-uv</text>
      <line x1="36" y1="56" x2="284" y2="56" stroke="rgba(255,255,255,0.08)"/>
      <rect x="36" y="68" width="170" height="22" rx="6" fill="rgba(255,255,255,0.05)"/>
      <text x="44" y="83" fontFamily="Inter" fontSize="11" fill="#A1A1AA">¿Plazos de matrícula?</text>
      <rect x="80" y="100" width="204" height="22" rx="6" fill={`${g}26`} stroke={`${g}66`}/>
      <text x="88" y="115" fontFamily="Inter" fontSize="11" fill="#F5F5F7">→ retrieval híbrido · BM25 + dense</text>
      <g className="pulse">
        <rect x="80" y="128" width="204" height="22" rx="6" fill={`${g}1f`} stroke={`${g}55`}/>
        <text x="88" y="143" fontFamily="Inter" fontSize="11" fill="#F5F5F7">✓ respuesta con cita oficial</text>
      </g>
    </svg>
  ),

  "codescribe": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      <rect x="20" y="20" width="280" height="140" rx="10" fill="rgba(8,8,12,0.6)" stroke="rgba(255,255,255,0.08)"/>
      <circle cx="34" cy="34" r="3" fill="#FF5F56"/><circle cx="46" cy="34" r="3" fill="#FFBD2E"/><circle cx="58" cy="34" r="3" fill="#27C93F"/>
      <text x="36" y="64" fontFamily="JetBrains Mono" fontSize="10" fill={g}>$ codescribe ./project</text>
      <text x="36" y="80" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">scan → classify → chunk → llm</text>
      <text x="36" y="96" fontFamily="JetBrains Mono" fontSize="9" fill="#A1A1AA">• 142 files · 38 .py · 12 .js</text>
      <text x="36" y="112" fontFamily="JetBrains Mono" fontSize="9" fill="#A1A1AA">• model: ollama / llama3</text>
      <text x="36" y="128" fontFamily="JetBrains Mono" fontSize="9" fill="#5EE7DF">✓ docs written · README.md</text>
      <text x="36" y="146" fontFamily="JetBrains Mono" fontSize="9" fill={g} className="pulse">▍</text>
    </svg>
  ),

  "chatbot": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      <rect x="24" y="24" width="160" height="22" rx="11" fill="rgba(255,255,255,0.06)"/>
      <text x="36" y="40" fontFamily="Inter" fontSize="11" fill="#A1A1AA">User · explain RRF</text>
      <rect x="136" y="56" width="160" height="22" rx="11" fill={`${g}30`} stroke={`${g}66`}/>
      <text x="148" y="72" fontFamily="Inter" fontSize="11" fill="#F5F5F7">Bot · reciprocal rank fusion…</text>
      <g fontFamily="JetBrains Mono" fontSize="10" fill={g}>
        <rect x="24" y="98" width="84" height="18" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)"/>
        <text x="32" y="111">bm25</text>
        <rect x="118" y="98" width="84" height="18" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)"/>
        <text x="126" y="111">dense</text>
        <rect x="212" y="98" width="84" height="18" rx="4" fill={`${g}26`} stroke={`${g}66`}/>
        <text x="220" y="111">rrf →</text>
      </g>
      <text x="24" y="148" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">langgraph · sqlite memory · multilingüe</text>
    </svg>
  ),

  "llama-4-scratch": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x="80" y={28 + i*22} width="160" height="16" rx="4" fill={`${g}${(20 + i*8).toString(16)}`} stroke="rgba(255,255,255,0.08)"/>
          <text x="92" y={40 + i*22} fontFamily="JetBrains Mono" fontSize="9" fill="#F5F5F7">
            {["embed", "attention", "MLA · multi-head latent", "feed-forward", "rms-norm"][i]}
          </text>
        </g>
      ))}
      <text x="80" y="156" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">tokenizer · scaled-dot · mla · pos-encoding</text>
    </svg>
  ),

  "multiquery-hyde-rag": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      <rect x="24" y="20" width="120" height="20" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)"/>
      <text x="32" y="34" fontFamily="Inter" fontSize="10" fill="#A1A1AA">user query</text>
      {[0,1,2].map(i => (
        <g key={i}>
          <line x1="144" y1="30" x2="180" y2={56 + i*32} stroke={g} strokeOpacity="0.5"/>
          <rect x="180" y={46 + i*32} width="120" height="20" rx="6" fill={`${g}1a`} stroke={`${g}55`}/>
          <text x="188" y={60 + i*32} fontFamily="JetBrains Mono" fontSize="9" fill="#F5F5F7">
            {["rewrite #1", "rewrite #2", "hyde doc"][i]}
          </text>
        </g>
      ))}
      <text x="24" y="156" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">multi-query · hyde · chroma cloud</text>
    </svg>
  ),

  "multiagent-debate": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      {[
        { x: 80, y: 56, label: "A1" },
        { x: 240, y: 56, label: "A2" },
        { x: 160, y: 132, label: "A3" },
      ].map(a => (
        <g key={a.label}>
          <circle cx={a.x} cy={a.y} r="18" fill={`${g}26`} stroke={`${g}77`}/>
          <text x={a.x} y={a.y + 4} textAnchor="middle" fontFamily="Inter" fontWeight="600" fontSize="12" fill="#F5F5F7">{a.label}</text>
        </g>
      ))}
      <line x1="98" y1="56" x2="222" y2="56" stroke={g} strokeOpacity="0.4"/>
      <line x1="92" y1="74" x2="148" y2="118" stroke={g} strokeOpacity="0.4"/>
      <line x1="228" y1="74" x2="172" y2="118" stroke={g} strokeOpacity="0.4"/>
      <rect x="124" y="86" width="72" height="20" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)"/>
      <text x="160" y="100" textAnchor="middle" fontFamily="Inter" fontSize="10" fill="#A1A1AA">Judge</text>
    </svg>
  ),

  "data-chat": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      <rect x="24" y="22" width="280" height="22" rx="6" fill="rgba(255,255,255,0.05)"/>
      <text x="36" y="38" fontFamily="Inter" fontSize="11" fill="#A1A1AA">¿Ventas por trimestre en 2025?</text>
      <rect x="24" y="56" width="280" height="22" rx="6" fill="rgba(8,8,12,0.6)" stroke={`${g}55`}/>
      <text x="36" y="72" fontFamily="JetBrains Mono" fontSize="10" fill={g}>SELECT quarter, sum(amount) …</text>
      <g>
        {[0,1,2,3].map(i => (
          <rect key={i} x={36 + i*64} y={100} width="48" height={30 + i*8} fill={g} fillOpacity={0.3 + i*0.15}/>
        ))}
      </g>
      <text x="24" y="160" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">text-to-sql · agent · summarize</text>
    </svg>
  ),

  "bm25-dense-retrieval": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      <text x="80" y="36" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#A1A1AA">BM25</text>
      <text x="240" y="36" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#A1A1AA">DENSE</text>
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x="40" y={48 + i*22} width="80" height="14" rx="3" fill={g} fillOpacity={0.7 - i*0.15}/>
          <rect x="200" y={48 + i*22} width="80" height="14" rx="3" fill="#5EE7DF" fillOpacity={0.6 - i*0.12}/>
        </g>
      ))}
      <line x1="120" y1="100" x2="200" y2="100" stroke={g} strokeOpacity="0.5" strokeDasharray="2 3"/>
      <rect x="100" y="138" width="120" height="22" rx="6" fill={`${g}26`} stroke={`${g}66`}/>
      <text x="160" y="153" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#F5F5F7">RRF · top-k</text>
    </svg>
  ),

  "advanced-hyde-rag": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      {["query", "rewrite", "hyde doc", "retrieve", "rerank"].map((step, i) => (
        <g key={step}>
          <rect x={20 + i*60} y="74" width="56" height="32" rx="6" fill={`${g}${(15 + i*8).toString(16)}`} stroke={`${g}55`}/>
          <text x={48 + i*60} y="94" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#F5F5F7">{step}</text>
          {i < 4 && <line x1={76 + i*60} y1="90" x2={80 + i*60} y2="90" stroke={g}/>}
        </g>
      ))}
      <text x="160" y="148" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">hypothetical doc embeddings · cross-encoder</text>
    </svg>
  ),

  "ranked-rag-pipeline": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <text x="40" y={48 + i*22} fontFamily="JetBrains Mono" fontSize="10" fill="#6B6B73">#{i+1}</text>
          <rect x="64" y={38 + i*22} width={220 - i*30} height="14" rx="3" fill={g} fillOpacity={0.85 - i*0.15}/>
        </g>
      ))}
      <text x="40" y="160" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">cross-encoder · sentence-transformers</text>
    </svg>
  ),

  // ── Deep Learning ──────────────────────────────────────────────────────
  "vision-transformer": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 8 }).map((__, c) => (
          <rect key={`${r}-${c}`} x={36 + c*32} y={20 + r*22} width="28" height="18" rx="3"
            fill={g} fillOpacity={0.05 + ((r*c) % 7) * 0.05} stroke={`${g}33`}/>
        ))
      )}
      <text x="36" y="156" fontFamily="JetBrains Mono" fontSize="10" fill="#6B6B73">16×16 patches · attention · class head</text>
    </svg>
  ),

  "yolo-v1": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      {/* 7×7 detection grid */}
      {Array.from({ length: 7 }).map((_, r) =>
        Array.from({ length: 7 }).map((__, c) => (
          <rect key={`${r}-${c}`} x={104 + c*16} y={20 + r*16} width="16" height="16"
            fill="none" stroke={`${g}26`}/>
        ))
      )}
      <rect x="104" y="20" width="112" height="112" fill="none" stroke={`${g}55`}/>
      {/* detected bounding boxes */}
      <rect x="118" y="40" width="58" height="64" fill="none" stroke={g} strokeWidth="2"/>
      <rect x="116" y="32" width="22" height="9" fill={g}/>
      <text x="120" y="39" fontFamily="JetBrains Mono" fontSize="7" fill="#0a0a0e">person</text>
      <rect x="158" y="78" width="44" height="38" fill="none" stroke="#5EE7DF" strokeWidth="2"/>
      <rect x="156" y="70" width="20" height="9" fill="#5EE7DF"/>
      <text x="160" y="77" fontFamily="JetBrains Mono" fontSize="7" fill="#0a0a0e">zebra</text>
      <text x="36" y="156" fontFamily="JetBrains Mono" fontSize="10" fill="#6B6B73">7×7 grid · 2 boxes/cell · COCO 2017</text>
    </svg>
  ),

  "poetry-transformer": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      {[
        "Mientras por competir con tu cabello,",
        "oro bruñido al sol relumbra en vano;",
        "mientras con menosprecio en medio el llano",
        "mira tu blanca frente el lilio bello;",
      ].map((line, i) => (
        <text key={i} x="32" y={42 + i*22} fontFamily="Inter" fontStyle="italic" fontSize="11" fill={i === 0 ? g : "#A1A1AA"} opacity={1 - i*0.2}>
          {line}
        </text>
      ))}
      <text x="32" y="158" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">char-level · temperature sampling</text>
    </svg>
  ),

  "brain-tumor": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="160" cy="92" rx="76" ry="58" fill="rgba(255,255,255,0.04)" stroke={`${g}66`} strokeWidth="1.4"/>
      <path d="M120 92 Q140 70 160 78 Q180 86 200 78 Q210 92 200 106 Q180 116 160 110 Q140 116 120 106 Q110 92 120 92Z" fill="none" stroke={g} strokeOpacity="0.5"/>
      <circle cx="148" cy="84" r="6" fill={g} fillOpacity="0.6"/>
      <circle cx="180" cy="100" r="4" fill="#FF7AC6" fillOpacity="0.7"/>
      <text x="160" y="160" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#6B6B73">glioma · meningioma · pituitary · healthy</text>
    </svg>
  ),

  "amazigh-ocr": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      {["ⵣ","ⴰ","ⴽ","ⴰ","ⵔ","ⵉ","ⴰ"].map((ch, i) => (
        <g key={i}>
          <rect x={28 + i*40} y="34" width="32" height="32" rx="6" fill="rgba(255,255,255,0.04)" stroke={`${g}55`}/>
          <text x={44 + i*40} y="58" textAnchor="middle" fontFamily="Inter" fontSize="20" fill={g}>{ch}</text>
        </g>
      ))}
      <text x="160" y="100" textAnchor="middle" fontFamily="Inter" fontSize="13" fill="#A1A1AA">Tifinagh ▸ CNN classifier</text>
      <rect x="60" y="118" width="200" height="6" rx="3" fill="rgba(255,255,255,0.06)"/>
      <rect x="60" y="118" width="186" height="6" rx="3" fill={g}/>
      <text x="60" y="148" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">test accuracy · 92.9% · data augmentation</text>
    </svg>
  ),

  "handwritten-alpha": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      <text x="100" y="120" fontFamily="cursive" fontSize="120" fontStyle="italic" fill={g} fillOpacity="0.85">A</text>
      <text x="180" y="100" fontFamily="cursive" fontSize="80" fontStyle="italic" fill="#A1A1AA" opacity="0.7">b</text>
      <text x="230" y="140" fontFamily="cursive" fontSize="60" fontStyle="italic" fill="#A1A1AA" opacity="0.5">c</text>
      <text x="100" y="160" fontFamily="JetBrains Mono" fontSize="10" fill="#6B6B73">CNN · keras · latin alphabet</text>
    </svg>
  ),

  "handwritten-digit": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={32 + i*26} y="24" width="22" height="22" rx="3"
          fill={i === 7 ? g : "rgba(255,255,255,0.04)"}
          stroke={i === 7 ? `${g}cc` : "rgba(255,255,255,0.1)"}/>
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <text key={i} x={43 + i*26} y="40" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10"
          fill={i === 7 ? "#0a0a0e" : "#6B6B73"}>{i}</text>
      ))}
      <text x="160" y="110" textAnchor="middle" fontFamily="cursive" fontSize="60" fill={g} fillOpacity="0.85">7</text>
      <text x="160" y="156" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#6B6B73">MNIST · CNN · softmax</text>
    </svg>
  ),

  // ── Machine Learning ───────────────────────────────────────────────────
  "givemecredit": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      <line x1="40" y1="140" x2="288" y2="140" stroke="rgba(255,255,255,0.15)"/>
      <line x1="40" y1="20" x2="40" y2="140" stroke="rgba(255,255,255,0.15)"/>
      <path d="M40 140 Q90 80 160 50 T288 30" fill="none" stroke={g} strokeWidth="2"/>
      <path d="M40 140 L288 30" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 4"/>
      <text x="50" y="40" fontFamily="JetBrains Mono" fontSize="11" fill={g}>AUC · 0.87</text>
      <text x="50" y="160" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">FPR</text>
      <text x="14" y="30" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">TPR</text>
    </svg>
  ),

  "ecommerce-fraud": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      <path d="M80 60h140l-12 60h-116z" fill="rgba(255,255,255,0.05)" stroke={`${g}66`}/>
      <circle cx="100" cy="138" r="8" fill="none" stroke="#A1A1AA"/>
      <circle cx="200" cy="138" r="8" fill="none" stroke="#A1A1AA"/>
      <path d="M70 50h10l8 10" stroke="#A1A1AA" fill="none"/>
      <circle cx="225" cy="55" r="14" fill={g} fillOpacity="0.3" stroke={g}/>
      <text x="225" y="60" textAnchor="middle" fontFamily="Inter" fontWeight="700" fontSize="14" fill={g}>!</text>
      <g fontFamily="JetBrains Mono" fontSize="9">
        <text x="40" y="160" fill="#6B6B73">imbalanced · ROC-AUC · PR-AUC</text>
      </g>
    </svg>
  ),

  "nyc-taxi": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      <path d="M40 30 L40 150 L150 150 L150 100 L260 100 L260 30 Z" fill="none" stroke="rgba(255,255,255,0.15)"/>
      {[0,1,2].map(i => <line key={i} x1="40" y1={50 + i*30} x2="260" y2={50 + i*30} stroke="rgba(255,255,255,0.06)"/>)}
      {[0,1,2,3].map(i => <line key={i} x1={80 + i*45} y1="30" x2={80 + i*45} y2="150" stroke="rgba(255,255,255,0.06)"/>)}
      <path d="M70 130 Q120 100 160 90 T230 50" fill="none" stroke={g} strokeWidth="2"/>
      <circle cx="70" cy="130" r="4" fill={g}/>
      <circle cx="230" cy="50" r="4" fill={g}/>
      <text x="40" y="170" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">geospatial · xgboost · trip duration</text>
    </svg>
  ),

  "heart-failure": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      <path d="M120 70 Q120 40 145 40 Q160 40 160 60 Q160 40 175 40 Q200 40 200 70 Q200 110 160 140 Q120 110 120 70Z" fill={`${g}33`} stroke={g} strokeWidth="1.4"/>
      <path d="M30 100 L80 100 L92 70 L108 130 L120 100 L160 100" fill="none" stroke={g} strokeWidth="1.6"/>
      <text x="40" y="160" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">clinical · boosting · feature select</text>
    </svg>
  ),

  "heart-disease": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      <path d="M180 60 Q180 36 205 36 Q220 36 220 56 Q220 36 235 36 Q260 36 260 60 Q260 100 220 130 Q180 100 180 60Z" fill="rgba(255,255,255,0.04)" stroke={g}/>
      {[0.2,0.35,0.5,0.65,0.8,0.9].map((v,i) => (
        <rect key={i} x={40 + i*16} y={140 - v*100} width="10" height={v*100} rx="2" fill={g} fillOpacity={0.4 + v*0.5}/>
      ))}
      <text x="40" y="160" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">UCI · interpretability · threshold</text>
    </svg>
  ),

  "housing-price": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      <path d="M60 90 L100 60 L140 90 L140 140 L60 140Z" fill="rgba(255,255,255,0.04)" stroke={g}/>
      <rect x="80" y="110" width="16" height="30" fill={`${g}55`}/>
      <rect x="108" y="100" width="16" height="16" fill={`${g}33`}/>
      {[40,60,80,100,120,80,90].map((h,i) => (
        <rect key={i} x={170 + i*16} y={150 - h*0.6} width="10" height={h*0.6} fill={g} fillOpacity={0.4 + i*0.08}/>
      ))}
      <text x="40" y="170" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">california · linear · trees · gbm</text>
    </svg>
  ),

  "recsys": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      {Array.from({ length: 3 }).map((_, r) =>
        Array.from({ length: 5 }).map((__, c) => {
          const liked = (r + c) % 3 === 0;
          return (
            <g key={`${r}-${c}`}>
              <rect x={40 + c*48} y={28 + r*44} width="40" height="32" rx="6"
                fill={liked ? `${g}40` : "rgba(255,255,255,0.04)"}
                stroke={liked ? `${g}aa` : "rgba(255,255,255,0.1)"}/>
              {liked && <text x={60 + c*48} y={49 + r*44} textAnchor="middle" fontSize="14" fill={g}>♥</text>}
            </g>
          );
        })
      )}
      <text x="40" y="170" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">collaborative filtering · matrix factor.</text>
    </svg>
  ),

  // ── Systems / Other ────────────────────────────────────────────────────
  "collab-sockets": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      {[
        { x: 60, y: 50, label: "C1" },
        { x: 260, y: 50, label: "C2" },
        { x: 60, y: 130, label: "C3" },
        { x: 260, y: 130, label: "C4" },
      ].map(c => (
        <g key={c.label}>
          <circle cx={c.x} cy={c.y} r="14" fill={`${g}26`} stroke={`${g}88`}/>
          <text x={c.x} y={c.y + 4} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#F5F5F7">{c.label}</text>
        </g>
      ))}
      <circle cx="160" cy="90" r="22" fill={`${g}40`} stroke={g}/>
      <text x="160" y="94" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#F5F5F7">srv</text>
      {[[60,50],[260,50],[60,130],[260,130]].map(([x,y],i) => (
        <line key={i} x1={x} y1={y} x2="160" y2="90" stroke={g} strokeOpacity="0.4" strokeDasharray="2 4"/>
      ))}
      <text x="40" y="170" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">java · tcp sockets · concurrency</text>
    </svg>
  ),

  "minilang": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      <g stroke={g} strokeOpacity="0.6">
        <line x1="160" y1="40" x2="100" y2="80"/>
        <line x1="160" y1="40" x2="220" y2="80"/>
        <line x1="100" y1="80" x2="70" y2="130"/>
        <line x1="100" y1="80" x2="130" y2="130"/>
        <line x1="220" y1="80" x2="190" y2="130"/>
        <line x1="220" y1="80" x2="250" y2="130"/>
      </g>
      {[
        { x: 160, y: 40, t: "+" },
        { x: 100, y: 80, t: "*" },
        { x: 220, y: 80, t: "-" },
        { x: 70,  y: 130, t: "2" },
        { x: 130, y: 130, t: "x" },
        { x: 190, y: 130, t: "5" },
        { x: 250, y: 130, t: "1" },
      ].map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="14" fill={`${g}33`} stroke={`${g}aa`}/>
          <text x={n.x} y={n.y + 4} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="#F5F5F7">{n.t}</text>
        </g>
      ))}
      <text x="40" y="170" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">lexer · parser · ast · interpreter</text>
    </svg>
  ),

  "tienda-web": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={32 + i*92} y="28" width="80" height="80" rx="8" fill="rgba(255,255,255,0.04)" stroke={`${g}55`}/>
          <rect x={40 + i*92} y="36" width="64" height="48" rx="4" fill={`${g}${(20 + i*15).toString(16)}`}/>
          <rect x={40 + i*92} y="90" width="40" height="6" rx="2" fill="rgba(255,255,255,0.2)"/>
        </g>
      ))}
      <path d="M40 130 L60 130 L80 156 L240 156 L260 130" fill="none" stroke={g}/>
      <circle cx="100" cy="166" r="6" fill={g} fillOpacity="0.6"/>
      <circle cx="220" cy="166" r="6" fill={g} fillOpacity="0.6"/>
      <text x="40" y="174" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">vanilla js · cart · checkout</text>
    </svg>
  ),

  "phong": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="phong-grad" cx="0.35" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#F5F5F7" stopOpacity="0.95"/>
          <stop offset="20%" stopColor={g} stopOpacity="0.8"/>
          <stop offset="100%" stopColor={g} stopOpacity="0.1"/>
        </radialGradient>
      </defs>
      <circle cx="160" cy="90" r="56" fill="url(#phong-grad)" stroke={`${g}55`}/>
      <circle cx="138" cy="70" r="6" fill="#fff" fillOpacity="0.85"/>
      <text x="40" y="170" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">ambient · diffuse · specular · OpenGL</text>
    </svg>
  ),

  "isii-hospitales": (g) => (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
      <rect x="100" y="40" width="120" height="100" rx="6" fill="rgba(255,255,255,0.04)" stroke={`${g}66`}/>
      {[0,1,2].map(r => [0,1,2,3].map(c => (
        <rect key={`${r}-${c}`} x={112 + c*24} y={52 + r*22} width="14" height="14" rx="2" fill={(r+c)%2 ? `${g}55` : "rgba(255,255,255,0.06)"}/>
      )))}
      <rect x="148" y="64" width="24" height="6" fill={g}/>
      <rect x="156" y="56" width="8" height="22" fill={g}/>
      <text x="40" y="170" fontFamily="JetBrains Mono" fontSize="9" fill="#6B6B73">Java · OOP · design patterns</text>
    </svg>
  ),
};

const ProjectArt = ({ id, accent = "violet", height = 180 }) => {
  const p = PALETTES[accent] || PALETTES.violet;
  const render = ART[id];
  const liveRef = window.FX.useArtLive();
  return (
    <div ref={liveRef} className="proj-art" style={{
      position: "relative", height, borderRadius: 14, overflow: "hidden",
      background: `linear-gradient(135deg, ${p.from} 0%, ${p.to} 100%)`,
      border: "1px solid var(--border-soft)",
    }}>
      <div style={{
        position: "absolute", inset: -40, pointerEvents: "none",
        background: `radial-gradient(circle at 75% 30%, ${p.glow}33, transparent 55%)`,
      }}/>
      <div style={{ position: "absolute", inset: 0 }}>
        {render ? render(p.glow) : (
          <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%" }}>
            <text x="50%" y="50%" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill={p.glow}>{id}</text>
          </svg>
        )}
      </div>
    </div>
  );
};

// FeatureArt = bigger frame, used in the "Selected work" lineup on the home.
const FeatureArt = ({ id, accent = "violet" }) => <ProjectArt id={id} accent={accent} height={240}/>;

window.ProjectArt = ProjectArt;
window.FeatureArt = FeatureArt;
