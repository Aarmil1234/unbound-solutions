import { useState, useEffect, useRef } from "react";

/* ─── Types ──────────────────────────────────────────── */
interface PillarCard {
  num: string;
  title: string;
  body: string;
  bullets?: string[];
}

interface FailureCard {
  num: string;
  title: string;
  desc: string;
}

interface AudienceCard {
  flag: string;
  title: string;
  desc: string;
  bullets: string[];
}

interface ComparisonRow {
  capability: string;
  offshore: string;
  unbound: string;
  offshoreOk: boolean;
}

interface StatItem {
  value: string;
  label: string;
}

/* ─── Data ───────────────────────────────────────────── */
const STATS: StatItem[] = [
  { value: "2", label: "Countries" },
  { value: "100%", label: "DSGVO Built-In" },
  { value: "DE+IN", label: "Time Zone Cover" },
  { value: "1", label: "Seamless Team" },
];

const PILLARS: PillarCard[] = [
  {
    num: "01",
    title: "Genuine Dual-Market Presence",
    body: "Our Germany presence is not a registered address or a phone number — it is an operational reality. We have people in Germany who understand the local market, can meet clients face-to-face, and carry the same professional expectations German businesses have of local agencies.This gives our clients in Germany the reassurance of working with a locally accountable partner, while benefiting from the cost efficiency of our India-based development team.",
  },
  {
    num: "02",
    title: "Built-In DSGVO & Legal Compliance",
    body: "Every website we build for German clients is delivered with full compliance built in — not bolted on at the end.",
    bullets: [
      "Proper cookie consent management from day one",
      "German-language Datenschutzerklärung and Impressum",
      "DSGVO-safe Google Analytics, self-hosted fonts, third-party tools",
      "Data Processing Agreements (AVV) signed as standard",
    ],
  },
  {
    num: "03",
    title: "German-Language Capability",
    body: "We produce German-language content, legal pages, and client communications — essential for businesses targeting German-speaking audiences or operating in sectors with strict documentation requirements.",
  },
  {
    num: "04",
    title: "Structured, Documentation-Driven Development",
    body: "We have deliberately built our delivery process around the thoroughness German clients expect: detailed project scopes, clear milestone sign-offs, structured testing phases, and complete handover documentation.",
  },
  {
    num: "05",
    title: "Time Zone Synergy",
    body: "IST and CET have a working hour overlap that, when managed well, enables faster feedback loops than many purely European or purely offshore arrangements. Clients typically receive responses within the same business day.",
  },
];

const FAILURES: FailureCard[] = [
  {
    num: "01",
    title: "The Compliance Blind Spot",
    desc: "Germany has some of the world's strictest data privacy and website compliance laws — including the DSGVO (GDPR), mandatory Impressum pages, and cookie consent requirements. Most Indian development teams are simply not trained in these requirements. A technically brilliant website can still expose a German client to significant legal fines if compliance is overlooked.",
  },
  {
    num: "02",
    title: "The Communication Gap",
    desc: "German business culture values precision, thoroughness, and clear documentation. Indian development culture — especially in fast-moving agency environments — often prioritises speed and flexibility. Without careful alignment, these different styles create misunderstandings, scope creep, and frustration on both sides.",
  },
  {
    num: "03",
    title: "The Language Barrier",
    desc: "Many German businesses — especially Mittelstand companies (small and medium enterprises that form the backbone of the German economy) — operate primarily in German. English-only development teams cannot write German legal pages, communicate with end users, or understand German-language briefs without introducing errors and delays.",
  },
  {
    num: "04",
    title: "The Trust Deficit",
    desc: "German clients who have worked with offshore teams before often carry scepticism into new engagements. They have experienced the cycle: enthusiastic proposals, smooth starts, then deteriorating communication, missed deadlines, and quality that falls short of what was promised. Rebuilding that trust requires more than a good portfolio — it requires structural reassurance.",
  },
];

const AUDIENCES: AudienceCard[] = [
  {
    flag: "🇩🇪",
    title: "German Businesses",
    desc: "Quality and compliance of a local agency at a fraction of the cost.",
    bullets: [
      "Professional, DSGVO-compliant website development",
      "E-commerce with German payment gateway integration",
      "Custom web applications and portals",
      "Website maintenance with German-language communication",
    ],
  },
  {
    flag: "🇮🇳",
    title: "Indian Companies Expanding to Germany",
    desc: "Your digital presence needs to meet German standards from day one.",
    bullets: [
      "Germany-ready website builds with proper legal pages",
      "Guidance on business registration and digital compliance",
      "Positioning and content strategy for the German market",
    ],
  },
  {
    flag: "🌐",
    title: "International Companies in Both Markets",
    desc: "Consistent branding while adapting to each market's requirements.",
    bullets: [
      "Dual-market web presence from a single team",
      "Localised content and compliance for each market",
      "Unified account management across both regions",
    ],
  },
];

const COMPARISON: ComparisonRow[] = [
  { capability: "DSGVO / Legal Compliance",  offshore: "Often overlooked",        unbound: "Built into every project",         offshoreOk: false },
  { capability: "German Language Support",    offshore: "Rarely available",         unbound: "Available as standard",            offshoreOk: false },
  { capability: "Local Germany Presence",     offshore: "No",                       unbound: "Yes — registered & operational",   offshoreOk: false },
  { capability: "Cost Efficiency",            offshore: "Yes",                      unbound: "Yes — India-based development",     offshoreOk: true  },
  { capability: "Documentation & Process",    offshore: "Variable",                 unbound: "Structured & thorough",            offshoreOk: false },
  { capability: "Time Zone Overlap",          offshore: "Limited or none",          unbound: "IST + CET covered",                offshoreOk: false },
  { capability: "Cultural Understanding",     offshore: "India only",               unbound: "Both India & Germany",             offshoreOk: false },
];

const TOC = [
  { href: "#gap",        label: "The Gap" },
  { href: "#who",        label: "Who We Are" },
  { href: "#problems",   label: "Why Partnerships Fail" },
  { href: "#pillars",    label: "How We Bridge the Gap" },
  { href: "#serve",      label: "Who We Serve" },
  { href: "#comparison", label: "Side-by-Side View" },
  { href: "#story",      label: "Our Story" },
];

/* ─── Shared style tokens ────────────────────────────── */
const gradientText: React.CSSProperties = {
  background: "linear-gradient(135deg, hsl(200,100%,80%) 0%, hsl(215,67%,50%) 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const cardBase: React.CSSProperties = {
  borderRadius: "1rem",
  background: "linear-gradient(160deg, hsl(218,48%,13%) 0%, hsl(218,52%,10%) 100%)",
  border: "1px solid hsl(218,35%,20%)",
};

/* ─── Tiny reusable pieces ───────────────────────────── */
const SectionLabel = ({ label }: { label: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
    <span style={{
      fontFamily: "'Outfit',sans-serif", fontSize: "0.65rem", fontWeight: 700,
      letterSpacing: "0.15em", color: "hsl(200,100%,74%)", padding: "0.2rem 0.6rem",
      borderRadius: "4px", background: "hsl(200,100%,74%,0.1)", border: "1px solid hsl(200,100%,74%,0.2)",
    }}>{label}</span>
    <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, hsl(200,100%,74%,0.25), transparent)" }} />
  </div>
);

const ProseH2 = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, marginBottom: "1.25rem", color: "hsl(210,30%,95%)", lineHeight: 1.2, ...style }}>{children}</h2>
);

const ProseP = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color: "hsl(210,20%,78%)", lineHeight: 1.85, marginBottom: "1.25rem", fontSize: "1rem" }}>{children}</p>
);

const BulletList = ({ items, accent = "hsl(200,100%,74%)" }: { items: string[]; accent?: string }) => (
  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
    {items.map((item, i) => (
      <li key={i} style={{ fontSize: "0.875rem", color: "hsl(210,20%,72%)", display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
        <span style={{ color: accent, fontSize: "0.75rem", marginTop: "0.2em", flexShrink: 0 }}>→</span>
        {item}
      </li>
    ))}
  </ul>
);

/* ─── Animated counter ───────────────────────────────── */
function StatCard({ stat }: { stat: StatItem }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...cardBase,
        padding: "1.5rem",
        textAlign: "center",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-5px)" : "none",
        boxShadow: hovered ? "0 16px 40px hsl(200,100%,74%,0.12)" : "none",
        border: `1px solid ${hovered ? "hsl(200,100%,74%,0.3)" : "hsl(218,35%,20%)"}`,
      }}
    >
      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "2.25rem", fontWeight: 900, lineHeight: 1, marginBottom: "0.4rem", ...gradientText }}>{stat.value}</div>
      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "hsl(214,18%,52%)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{stat.label}</div>
    </div>
  );
}

/* ─── Pillar card ────────────────────────────────────── */
function PillarCard({ card, index }: { card: PillarCard; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...cardBase,
        padding: "1.75rem",
        display: "flex",
        gap: "1.25rem",
        transition: "all 0.4s ease",
        transform: hovered ? "translateX(6px)" : "none",
        boxShadow: hovered ? "0 8px 32px hsl(200,100%,74%,0.1)" : "none",
        border: `1px solid ${hovered ? "hsl(200,100%,74%,0.25)" : "hsl(218,35%,20%)"}`,
        animationDelay: `${index * 0.08}s`,
      }}
    >
      {/* Left accent */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Outfit',sans-serif", fontSize: "0.8rem", fontWeight: 800,
          background: "linear-gradient(135deg, hsl(200,100%,80%) 0%, hsl(215,67%,50%) 100%)",
          color: "hsl(218,55%,9%)", flexShrink: 0,
        }}>{card.num}</div>
        <div style={{ width: 1, flex: 1, background: "linear-gradient(180deg, hsl(200,100%,74%,0.3), transparent)" }} />
      </div>
      <div>
        <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "hsl(210,30%,95%)", marginBottom: "0.6rem", lineHeight: 1.3 }}>{card.title}</h3>
        <p style={{ fontSize: "0.9rem", color: "hsl(210,20%,68%)", lineHeight: 1.75, margin: 0 }}>{card.body}</p>
        {card.bullets && <div style={{ marginTop: "0.75rem" }}><BulletList items={card.bullets} /></div>}
      </div>
    </div>
  );
}

/* ─── Failure card ───────────────────────────────────── */
function FailureCard({ card }: { card: FailureCard }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "1rem",
        padding: "1.5rem",
        background: "hsl(218,48%,13%)",
        border: `1px solid ${hovered ? "hsl(4,72%,58%,0.35)" : "hsl(4,72%,58%,0.14)"}`,
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 12px 28px hsl(4,60%,40%,0.15)" : "none",
      }}
    >
      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "2rem", fontWeight: 900, color: "hsl(4,72%,58%,0.25)", lineHeight: 1, marginBottom: "0.5rem" }}>{card.num}</div>
      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "hsl(210,25%,88%)", marginBottom: "0.5rem" }}>{card.title}</div>
      <p style={{ fontSize: "0.875rem", color: "hsl(210,20%,62%)", lineHeight: 1.7, margin: 0 }}>{card.desc}</p>
    </div>
  );
}

/* ─── Audience card ──────────────────────────────────── */
function AudienceCard({ card }: { card: AudienceCard }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...cardBase,
        padding: "1.75rem",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-5px)" : "none",
        border: `1px solid ${hovered ? "hsl(200,100%,74%,0.25)" : "hsl(218,35%,20%)"}`,
        boxShadow: hovered ? "0 16px 40px hsl(200,100%,74%,0.08)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(135deg, hsl(200,100%,80%) 0%, hsl(215,67%,50%) 100%)", opacity: hovered ? 1 : 0, transition: "opacity 0.35s ease" }} />
      <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{card.flag}</div>
      <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.1rem", fontWeight: 800, color: "hsl(210,30%,95%)", marginBottom: "0.4rem" }}>{card.title}</h3>
      <p style={{ fontSize: "0.875rem", color: "hsl(214,18%,55%)", marginBottom: "1rem", lineHeight: 1.6 }}>{card.desc}</p>
      <BulletList items={card.bullets} />
    </div>
  );
}

/* ─── Comparison table ───────────────────────────────── */
function ComparisonTable({ isMobile }: { isMobile: boolean }) {
  return (
    <div style={{ borderRadius: "1.25rem", overflow: "hidden", border: "1px solid hsl(218,35%,20%)", marginTop: "2rem" }}>
      {/* Header */}
      <div style={{
        display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1.5fr",
        background: "hsl(218,48%,15%)", borderBottom: "1px solid hsl(218,35%,20%)",
        padding: "1rem 1.5rem", gap: "1rem",
      }}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "hsl(214,18%,50%)" }}>Capability</div>
        {!isMobile && <>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "hsl(4,72%,65%)" }}>Typical Offshore</div>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", ...gradientText }}>Unbound Solutions</div>
        </>}
      </div>
      {/* Rows */}
      {COMPARISON.map((row, i) => (
        <ComparisonRow key={row.capability} row={row} i={i} isMobile={isMobile} />
      ))}
    </div>
  );
}

function ComparisonRow({ row, i, isMobile }: { row: ComparisonRow; i: number; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1.5fr",
        gap: "1rem",
        padding: "1rem 1.5rem",
        borderBottom: i < COMPARISON.length - 1 ? "1px solid hsl(218,35%,18%)" : "none",
        background: hovered ? "hsl(218,48%,15%)" : "transparent",
        transition: "background 0.2s ease",
      }}
    >
      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "hsl(210,25%,85%)", display: "flex", alignItems: "center" }}>{row.capability}</div>
      {!isMobile && <>
        <div style={{ fontSize: "0.85rem", color: row.offshoreOk ? "hsl(130,60%,55%)" : "hsl(4,72%,62%)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span>{row.offshoreOk ? "✓" : "✗"}</span> {row.offshore}
        </div>
        <div style={{ fontSize: "0.85rem", color: "hsl(200,100%,74%)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span>✓</span> {row.unbound}
        </div>
      </>}
      {isMobile && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "0.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "hsl(4,72%,62%)" }}>✗ {row.offshore}</div>
          <div style={{ fontSize: "0.78rem", color: "hsl(200,100%,74%)" }}>✓ {row.unbound}</div>
        </div>
      )}
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────── */
export default function AboutBridgePage() {
  const [scrollPct, setScrollPct] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setScrollPct(Math.min(pct, 100));
    };
    const onResize = () => setIsMobile(window.innerWidth < 900);
    onResize();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <div style={{
      fontFamily: "'DM Sans', system-ui, sans-serif",
      backgroundColor: "hsl(218,55%,9%)",
      backgroundImage: [
        "radial-gradient(ellipse at 20% 5%,  hsl(200,100%,74%,0.15) 0px, transparent 55%)",
        "radial-gradient(ellipse at 80% 0%,  hsl(215,67%,50%,0.12) 0px, transparent 50%)",
        "radial-gradient(ellipse at 55% 88%, hsl(200,100%,74%,0.09) 0px, transparent 55%)",
        "radial-gradient(ellipse at 5%  60%, hsl(215,67%,36%,0.07) 0px, transparent 45%)",
      ].join(", "),
      backgroundAttachment: "fixed",
      color: "hsl(210,30%,95%)",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: hsl(200,100%,74%,0.22); }
        html { scroll-behavior: smooth; }
        @keyframes floatUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes orbFloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-22px); } }
      `}</style>

      {/* Reading progress */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, zIndex: 200, width: `${scrollPct}%`, transition: "width 0.1s linear", background: "linear-gradient(135deg, hsl(200,100%,80%) 0%, hsl(215,67%,50%) 100%)", boxShadow: "0 0 10px hsl(200,100%,74%,0.55)" }} />

      {/* Navbar */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(20px)", background: "hsl(218,55%,9%,0.72)", borderBottom: "1px solid hsl(218,35%,20%,0.5)" }}>
        <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.25rem", fontWeight: 800, ...gradientText }}>Unbound Solutions</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", borderRadius: 999, fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", background: "linear-gradient(135deg, hsl(200,100%,74%,0.12) 0%, hsl(215,67%,50%,0.08) 100%)", color: "hsl(200,100%,74%)", border: "1px solid hsl(200,100%,74%,0.22)", fontFamily: "'Outfit',sans-serif" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(200,100%,74%)", display: "inline-block" }} />
          Company Story
        </span>
      </nav>

      {/* ─── HERO ─────────────────────────────────────── */}
      <section ref={heroRef} id="gap" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 2rem 5rem", position: "relative", overflow: "hidden" }}>
        {/* Orbs */}
        <div style={{ position: "absolute", width: 700, height: 700, top: -250, right: -150, borderRadius: "50%", filter: "blur(120px)", background: "hsl(200,100%,74%,0.07)", pointerEvents: "none", animation: "orbFloat 10s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 500, height: 500, bottom: -100, left: -80, borderRadius: "50%", filter: "blur(100px)", background: "hsl(215,67%,50%,0.09)", pointerEvents: "none", animation: "orbFloat 14s ease-in-out infinite reverse" }} />

        {/* India ↔ Germany bridge visual */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -55%)", display: "flex", alignItems: "center", gap: "2rem", opacity: 0.06, userSelect: "none", pointerEvents: "none", fontSize: "clamp(4rem,12vw,9rem)", fontFamily: "'Outfit',sans-serif", fontWeight: 900, letterSpacing: "-0.05em" }}>
          <span>🇮🇳</span>
          <span style={{ fontSize: "0.4em", color: "hsl(200,100%,74%)" }}>⟷</span>
          <span>🇩🇪</span>
        </div>

        <div style={{ position: "relative", zIndex: 1, animation: "floatUp 0.7s ease-out both", padding: "25px" , display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1.2rem", borderRadius: 999, fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", background: "linear-gradient(135deg, hsl(200,100%,74%,0.12) 0%, hsl(215,67%,50%,0.08) 100%)", color: "hsl(200,100%,74%)", border: "1px solid hsl(200,100%,74%,0.22)", fontFamily: "'Outfit',sans-serif", marginBottom: "2rem" }}>
            About Us · Brand Story · ~6 min read
          </div>

          <h1 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(2.75rem,6.5vw,5.75rem)", fontWeight: 900, lineHeight: 1.04, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
            How Unbound Solutions<br />
            <span style={gradientText}>Bridges the India-Germany</span><br />
            <span style={gradientText}>IT Gap</span>
          </h1>

          <p style={{ fontSize: "1.15rem", color: "hsl(214,18%,54%)", maxWidth: 660, lineHeight: 1.75, marginBottom: "3rem" }}>
            Germany's precision. India's capability. One seamlessly integrated team — built to close the gap that most IT companies don't even acknowledge.
          </p>

          {/* Stats bar */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: "1rem", maxWidth: 600 }}>
            {STATS.map(s => <StatCard key={s.label} stat={s} />)}
          </div>
        </div>

        <div style={{ marginTop: "4.5rem", height: 1, background: "linear-gradient(90deg, transparent, hsl(200,100%,74%,0.35), hsl(215,67%,50%,0.25), transparent)" }} />
      </section>

      {/* ─── ARTICLE + SIDEBAR ────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "5rem 2rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 300px", gap: "4rem", alignItems: "start" }}>

        <main>

          {/* WHO WE ARE */}
          <section id="who" style={{ marginBottom: "5rem" }}>
            <SectionLabel label="WHO WE ARE" />
            <ProseH2>India-Powered, Germany-Grounded</ProseH2>
            <ProseP>Unbound Solutions is a web development and IT solutions company with a dual presence in Hyderabad, India and Germany. We are not an Indian company that occasionally works with German clients, nor a German agency that outsources to India. <strong style={{ color: "hsl(210,30%,92%)" }}>We are genuinely both.</strong></ProseP>

            {/* Dual presence visual */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr auto 1fr", gap: "1rem", alignItems: "center", margin: "2.5rem 0" }}>
              <div style={{ ...cardBase, padding: "1.75rem", textAlign: "center", border: "1px solid hsl(215,67%,35%,0.35)", background: "linear-gradient(160deg, hsl(215,67%,16%) 0%, hsl(218,52%,10%) 100%)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🇮🇳</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", fontWeight: 800, color: "hsl(210,30%,95%)", marginBottom: "0.35rem" }}>Hyderabad, India</div>
                <div style={{ fontSize: "0.825rem", color: "hsl(214,18%,54%)", lineHeight: 1.6 }}>Skilled engineers · Full delivery capability · Competitive pricing</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
                <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, transparent, hsl(200,100%,74%,0.5))", display: isMobile ? "none" : "block" }} />
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: "1.1rem", ...gradientText, padding: "0.4rem 0.75rem", border: "1px solid hsl(200,100%,74%,0.25)", borderRadius: "0.5rem", background: "hsl(200,100%,74%,0.06)" }}>⟷</div>
                <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, hsl(200,100%,74%,0.5), transparent)", display: isMobile ? "none" : "block" }} />
              </div>

              <div style={{ ...cardBase, padding: "1.75rem", textAlign: "center", border: "1px solid hsl(215,67%,35%,0.35)", background: "linear-gradient(160deg, hsl(215,67%,16%) 0%, hsl(218,52%,10%) 100%)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🇩🇪</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", fontWeight: 800, color: "hsl(210,30%,95%)", marginBottom: "0.35rem" }}>Germany</div>
                <div style={{ fontSize: "0.825rem", color: "hsl(214,18%,54%)", lineHeight: 1.6 }}>Local compliance · German-language support · Client-facing operations</div>
              </div>
            </div>

            <ProseP>Our structure gives us something almost no other IT company in our space can offer: the ability to operate authentically in both markets simultaneously, understanding the expectations, legal requirements, and business culture of each.</ProseP>
          </section>

          {/* WHY PARTNERSHIPS FAIL */}
          <section id="problems" style={{ marginBottom: "5rem" }}>
            <SectionLabel label="02" />
            <ProseH2>Why India-Germany IT Partnerships <span style={gradientText}>Fail</span></ProseH2>
            <ProseP>Before explaining what we do differently, it helps to understand why most attempts at India-Germany IT collaboration break down.</ProseP>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem", marginTop: "2rem" }}>
              {FAILURES.map(f => <FailureCard key={f.num} card={f} />)}
            </div>

            <div style={{ borderRadius: "1rem", padding: "1.5rem 1.75rem", marginTop: "2rem", background: "linear-gradient(135deg, hsl(200,100%,74%,0.07) 0%, hsl(215,67%,50%,0.04) 100%)", border: "1px solid hsl(200,100%,74%,0.18)", borderLeft: "3px solid hsl(200,100%,74%)" }}>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "hsl(200,100%,74%)", marginBottom: "0.5rem" }}>The Result</div>
              <p style={{ fontSize: "0.95rem", color: "hsl(210,20%,80%)", lineHeight: 1.7, margin: 0 }}>German businesses either pay a premium for local German agencies, or accept the risk of offshore teams that don't fully understand their market. <strong style={{ color: "hsl(200,100%,74%)" }}>Neither option is ideal. Unbound Solutions is the third option.</strong></p>
            </div>
          </section>

          {/* HOW WE BRIDGE */}
          <section id="pillars" style={{ marginBottom: "5rem" }}>
            <SectionLabel label="03" />
            <ProseH2>How Unbound Solutions <span style={gradientText}>Bridges the Gap</span></ProseH2>
            <ProseP>Five structural pillars that make us genuinely different — not just in messaging, but in how we operate every day.</ProseP>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "2rem" }}>
              {PILLARS.map((p, i) => <PillarCard key={p.num} card={p} index={i} />)}
            </div>
          </section>

          {/* WHO WE SERVE */}
          <section id="serve" style={{ marginBottom: "5rem" }}>
            <SectionLabel label="04" />
            <ProseH2>Who We Serve</ProseH2>
            <ProseP>We are at our best when a client needs deep technical delivery <em>and</em> genuine understanding of the German or Indian market. That combination is rare — and it is what defines us.</ProseP>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "1rem", marginTop: "2rem" }}>
              {AUDIENCES.map(a => <AudienceCard key={a.title} card={a} />)}
            </div>
          </section>

          {/* COMPARISON */}
          <section id="comparison" style={{ marginBottom: "5rem" }}>
            <SectionLabel label="05" />
            <ProseH2>The Unbound Solutions Difference</ProseH2>
            <ProseP>A side-by-side view of what sets us apart from a typical offshore development team.</ProseP>
            <ComparisonTable isMobile={isMobile} />
          </section>

          {/* OUR STORY */}
          <section id="story" style={{ marginBottom: "5rem" }}>
            <SectionLabel label="OUR STORY" />
            <ProseH2>Why We Built This</ProseH2>
            <ProseP>Unbound Solutions was founded with a clear observation: the global IT industry had created two separate worlds — highly capable Indian development teams on one side, and sophisticated European clients with demanding standards on the other — with very few companies genuinely operating in both.</ProseP>
            <ProseP>The companies that tried to bridge this divide often did it superficially: an Indian agency with a European phone number, or a German agency with a subcontracting arrangement in India. Neither approach created the deep operational integration that serious clients need.</ProseP>

            <div style={{ borderRadius: "1.25rem", padding: "2rem", background: "linear-gradient(160deg, hsl(215,67%,16%) 0%, hsl(218,52%,10%) 100%)", border: "1px solid hsl(215,67%,35%,0.35)", position: "relative", overflow: "hidden", margin: "2rem 0" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(135deg, hsl(200,100%,80%) 0%, hsl(215,67%,50%) 100%)" }} />
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "hsl(200,100%,74%)", marginBottom: "0.75rem" }}>Our Name, Our Mission</div>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "hsl(210,30%,95%)", lineHeight: 1.5, margin: 0 }}>
                We are not bound to one market, one approach, or one way of doing things. The India-Germany corridor is our home ground — where we are most effective, most knowledgeable, and most confident.
              </p>
            </div>

            <ProseP>We built Unbound Solutions to be the genuine bridge — not just in geography, but in culture, language, compliance, and delivery standards.</ProseP>
          </section>

          {/* CONCLUSION */}
          <section style={{ marginBottom: "4rem" }}>
            <SectionLabel label="END" />
            <ProseH2>The Bridge Your Business <span style={gradientText}>Has Been Looking For</span></ProseH2>
            <ProseP>The India-Germany IT gap is real — but it is not insurmountable. What it requires is a partner who genuinely understands both sides: the technical capability and efficiency of Indian IT, and the compliance, communication, and quality standards of the German market.</ProseP>
            <ProseP>That is what Unbound Solutions offers. Not as a promise, but as a structural reality built into how we operate every day.</ProseP>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2.5rem" }}>
              <CtaBtn href="https://unboundsolutions.in">Work with Us →</CtaBtn>
              <CtaBtn href="https://unboundsolutions.in" secondary>Learn About DSGVO →</CtaBtn>
            </div>
          </section>

        </main>

        {/* ─── SIDEBAR ──────────────────────────────────── */}
        {!isMobile && (
          <aside style={{ position: "sticky", top: 100, display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* TOC */}
            <div style={{ ...cardBase, padding: "1.5rem" }}>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "hsl(200,100%,74%)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                Contents
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, hsl(200,100%,74%,0.25), transparent)" }} />
              </div>
              <ul style={{ listStyle: "none" }}>
                {TOC.map(t => (
                  <li key={t.href}>
                    <a href={t.href}
                      style={{ display: "block", padding: "0.45rem 0.75rem", borderRadius: "0.5rem", fontSize: "0.825rem", color: "hsl(214,18%,56%)", textDecoration: "none", transition: "all 0.2s ease" }}
                      onMouseEnter={e => { const el = e.currentTarget; el.style.color = "hsl(210,30%,92%)"; el.style.background = "hsl(200,100%,74%,0.07)"; el.style.paddingLeft = "1rem"; }}
                      onMouseLeave={e => { const el = e.currentTarget; el.style.color = "hsl(214,18%,56%)"; el.style.background = "transparent"; el.style.paddingLeft = "0.75rem"; }}
                    >{t.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick facts */}
            <div style={{ ...cardBase, padding: "1.5rem" }}>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "hsl(200,100%,74%)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                Quick Facts
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, hsl(200,100%,74%,0.25), transparent)" }} />
              </div>
              {[
                ["Type",         "Web Dev + IT Solutions"],
                ["Offices",      "Hyderabad · Germany"],
                ["Speciality",   "Indo-German IT Bridge"],
                ["Compliance",   "DSGVO Built-In"],
                ["Languages",    "English + Deutsch"],
                ["Time Zones",   "IST + CET"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.825rem", padding: "0.5rem 0", borderBottom: "1px solid hsl(218,35%,18%)" }}>
                  <span style={{ color: "hsl(214,18%,48%)", fontFamily: "'Outfit',sans-serif" }}>{k}</span>
                  <span style={{ color: "hsl(210,20%,80%)", fontWeight: 500, textAlign: "right", maxWidth: "55%" }}>{v}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ borderRadius: "1.25rem", padding: "1.75rem", textAlign: "center", background: "linear-gradient(160deg, hsl(215,67%,20%) 0%, hsl(218,52%,13%) 100%)", border: "1px solid hsl(215,67%,35%,0.4)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(135deg, hsl(200,100%,80%) 0%, hsl(215,67%,50%) 100%)", opacity: 0.5 }} />
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🤝</div>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", fontWeight: 700, color: "hsl(210,30%,95%)", marginBottom: "0.5rem" }}>Ready to Work Together?</div>
              <p style={{ fontSize: "0.825rem", color: "hsl(214,18%,54%)", lineHeight: 1.6, marginBottom: "1.25rem" }}>Whether you are in Germany, India, or both — let's build something great.</p>
              <CtaBtn href="https://unboundsolutions.in">Get in Touch →</CtaBtn>
            </div>

          </aside>
        )}
      </div>

      {/* Footer */}
      <footer style={{ marginTop: "4rem", padding: "2rem", borderTop: "1px solid hsl(218,35%,18%)", textAlign: "center" }}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.1rem", fontWeight: 800, ...gradientText, marginBottom: "0.5rem" }}>Unbound Solutions</div>
        <div style={{ fontSize: "0.8rem", color: "hsl(214,18%,38%)" }}>India &amp; Germany · Web Development · IT Solutions · DSGVO Compliance · unboundsolutions.in</div>
      </footer>
    </div>
  );
}

/* ─── CTA button ─────────────────────────────────────── */
function CtaBtn({ children, href, secondary }: { children: React.ReactNode; href: string; secondary?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-block", padding: "0.8rem 1.75rem", borderRadius: 999,
        fontFamily: "'Outfit',sans-serif", fontSize: "0.9rem", fontWeight: 600,
        letterSpacing: "0.03em", textDecoration: "none", cursor: "pointer",
        transition: "all 0.3s ease",
        ...(secondary ? {
          background: "transparent",
          color: "hsl(210,30%,88%)",
          border: `2px solid ${hov ? "hsl(200,100%,74%,0.6)" : "hsl(200,100%,74%,0.22)"}`,
          transform: hov ? "translateY(-2px)" : "none",
          boxShadow: hov ? "0 4px 16px hsl(200,100%,74%,0.15)" : "none",
        } : {
          background: "linear-gradient(135deg, hsl(200,100%,80%) 0%, hsl(215,67%,50%) 100%)",
          color: "hsl(218,55%,9%)",
          border: "none",
          transform: hov ? "translateY(-2px)" : "none",
          boxShadow: hov ? "0 0 40px hsl(200,100%,74%,0.3), 0 10px 28px hsl(215,67%,36%,0.45)" : "0 2px 8px hsl(218,60%,4%,0.35)",
        }),
      }}
    >{children}</a>
  );
}