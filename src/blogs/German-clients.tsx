import { useState, useEffect } from "react";

/* ─── Types ─────────────────────────────────────────── */
interface ChecklistItem {
  id: number;
  label: string;
}

interface RequirementCard {
  num: string;
  title: string;
  body: string;
  bullets?: string[];
}

interface PrincipleCard {
  icon: string;
  name: string;
  desc: string;
}

interface MistakeCard {
  num: string;
  title: string;
  desc: string;
  wide?: boolean;
}

interface AdvantageCard {
  icon: string;
  title: string;
  text: string;
}

/* ─── Data ───────────────────────────────────────────── */
const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: 1,  label: "HTTPS / SSL certificate installed and active" },
  { id: 2,  label: "Cookie consent management tool implemented" },
  { id: 3,  label: "Cookie banner does not pre-tick optional cookies" },
  { id: 4,  label: "Datenschutzerklärung (Privacy Policy) in German — covers all processing" },
  { id: 5,  label: "Impressum page with full legal details" },
  { id: 6,  label: "Google Analytics IP anonymisation enabled or consent-based loading" },
  { id: 7,  label: "Google Fonts self-hosted (not loaded from Google CDN)" },
  { id: 8,  label: "YouTube embeds use youtube-nocookie.com" },
  { id: 9,  label: "Contact forms include privacy consent checkbox" },
  { id: 10, label: "Data Processing Agreement (AVV) signed with client" },
  { id: 11, label: "Right to deletion mechanism in place for user accounts" },
  { id: 12, label: "Third-party services listed in privacy policy" },
];

const PRINCIPLES: PrincipleCard[] = [
  { icon: "⚖️", name: "Lawfulness & Transparency",  desc: "Users must know what data you collect and why. No hidden processing." },
  { icon: "🎯", name: "Purpose Limitation",           desc: "Data collected for one reason cannot be repurposed for another use." },
  { icon: "📦", name: "Data Minimisation",            desc: "Collect only what you actually need. No excess data gathering." },
  { icon: "✅", name: "Accuracy",                     desc: "Keep personal data accurate and up to date at all times." },
  { icon: "⏱️", name: "Storage Limitation",           desc: "Do not keep data longer than necessary for its stated purpose." },
  { icon: "🔒", name: "Integrity & Accountability",  desc: "Protect data against breaches and prove you follow all principles." },
];

const REQUIREMENTS: RequirementCard[] = [
  {
    num: "01", title: "Cookie Consent Banner",
    body: "Every website must ask users for explicit consent before placing non-essential cookies. The banner must:",
    bullets: [
      "Be displayed before any cookies are set",
      "Allow users to accept or reject individual cookie categories",
      "Provide an easy way to withdraw consent at any time",
      "Not use pre-ticked boxes or deceptive 'dark patterns'",
    ],
  },
  {
    num: "02", title: "Datenschutzerklärung (Privacy Policy)",
    body: "A German-language privacy policy is mandatory. It must include:",
    bullets: [
      "What personal data is collected and why",
      "Legal basis for processing (consent, contract, legitimate interest)",
      "Third-party services used (Google Analytics, YouTube, etc.)",
      "Data retention periods and user rights",
    ],
  },
  {
    num: "03", title: "Impressum (Legal Notice Page)",
    body: "Germany's unique mandatory imprint page for all commercial websites. Must include full business name, address, contact details, and VAT ID. This surprises many Indian developers — it's separate from the privacy policy entirely.",
  },
  {
    num: "04", title: "Secure Forms & Data Handling",
    body: "Any contact or registration form must:",
    bullets: [
      "Use SSL/HTTPS encryption",
      "Not store unnecessary data",
      "Include a privacy checkbox with active user consent",
      "Clearly state what happens to submitted data",
    ],
  },
  {
    num: "05", title: "Google Analytics & Third-Party Tools",
    body: "Special attention required for external services:",
    bullets: [
      "Google Analytics must have IP anonymisation enabled",
      "Google Fonts must be self-hosted — loading from CDN is a DSGVO violation",
      "YouTube videos must use youtube-nocookie.com URLs",
      "All third-party services listed in the privacy policy",
    ],
  },
  {
    num: "06", title: "Right to Deletion",
    body: "Websites with user accounts must provide users the ability to request complete deletion of their data. This must be technically implemented, not just promised in the privacy policy.",
  },
];

const MISTAKES: MistakeCard[] = [
  { num: "01", title: "Google Fonts from CDN",    desc: "Loading Google Fonts from Google's CDN sends IP addresses to Google servers — a DSGVO violation. Always self-host fonts." },
  { num: "02", title: "No Cookie Consent",        desc: "Installing Google Analytics without any consent management mechanism in place." },
  { num: "03", title: "Missing Impressum",        desc: "Forgetting Germany's specific legal notice page entirely — a uniquely German requirement." },
  { num: "04", title: "Generic Privacy Policy",   desc: "Using an English-only template that doesn't cover all German legal requirements." },
  { num: "05", title: "No Signed DPA / AVV",      desc: "Handling German client data without a formal Auftragsverarbeitungsvertrag — puts both you and your client at serious legal risk.", wide: true },
];

const ADVANTAGES: AdvantageCard[] = [
  { icon: "🇩🇪", title: "Germany-Registered",       text: "We understand German regulations not just from documents, but from operating under them daily." },
  { icon: "🛡️", title: "End-to-End Compliance",    text: "Cookie consent, Datenschutzerklärung, Impressum, self-hosted fonts, AVV — all included from day one." },
  { icon: "🗣️", title: "German Language Support",  text: "We produce German-language legal pages and privacy policies — a need most Indian IT companies cannot fulfil." },
  { icon: "💰", title: "Cost-Effective Quality",   text: "India-based development team means competitive pricing without sacrificing compliance or quality." },
  { icon: "🕐", title: "Dual Time Zone Coverage",  text: "Team members in India (IST) and Germany (CET) ensure overlapping working hours and no delays." },
  { icon: "✅", title: "Guaranteed Compliance",    text: "When your German clients ask 'Is your company DSGVO compliant?' — the answer is always yes." },
];

const TOC = [
  { href: "#intro",        label: "Introduction" },
  { href: "#applicability",label: "Does It Apply to You?" },
  { href: "#overview",     label: "Core Principles" },
  { href: "#requirements", label: "Key Requirements" },
  { href: "#dpa",          label: "Data Processing Agreement" },
  { href: "#mistakes",     label: "Common Mistakes" },
  { href: "#unbound",      label: "Why Unbound Solutions" },
  { href: "#checklist",    label: "Compliance Checklist" },
  { href: "#conclusion",   label: "Conclusion" },
];

/* ─── Inline styles (design-system tokens) ───────────── */
const S = {
  /* layout */
  page: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    backgroundColor: "hsl(218,55%,9%)",
    backgroundImage: [
      "radial-gradient(ellipse at 15% 10%,  hsl(200 100% 74% / 0.18) 0px, transparent 55%)",
      "radial-gradient(ellipse at 85% 0%,   hsl(215 67% 50% / 0.14) 0px, transparent 50%)",
      "radial-gradient(ellipse at 50% 90%,  hsl(200 100% 74% / 0.10) 0px, transparent 55%)",
      "radial-gradient(ellipse at 0%  60%,  hsl(215 67% 36% / 0.08) 0px, transparent 45%)",
    ].join(", "),
    backgroundAttachment: "fixed",
    color: "hsl(210,30%,95%)",
    minHeight: "100vh",
    overflowX: "hidden" as const,
  },

  gradientText: {
    background: "linear-gradient(135deg, hsl(200,100%,80%) 0%, hsl(215,67%,50%) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  } as React.CSSProperties,

  card: {
    borderRadius: "1rem",
    padding: "1.5rem",
    background: "linear-gradient(160deg, hsl(218,48%,13%) 0%, hsl(218,52%,10%) 100%)",
    border: "1px solid hsl(218,35%,20%)",
  },
};

/* ─── Sub-components ─────────────────────────────────── */

const SectionLabel = ({ label }: { label: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
    <span style={{
      fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", fontWeight: 700,
      letterSpacing: "0.15em", color: "hsl(200,100%,74%)", padding: "0.2rem 0.6rem",
      borderRadius: "4px", background: "hsl(200,100%,74%,0.1)", border: "1px solid hsl(200,100%,74%,0.2)",
    }}>{label}</span>
    <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, hsl(200,100%,74%,0.25), transparent)" }} />
  </div>
);

const Callout = ({ type, title, children }: { type: "warning" | "info"; title: string; children: React.ReactNode }) => {
  const isWarn = type === "warning";
  return (
    <div style={{
      borderRadius: "1rem", padding: "1.5rem 1.75rem", margin: "2rem 0", position: "relative",
      background: isWarn
        ? "linear-gradient(135deg, hsl(35,100%,60%,0.08) 0%, hsl(35,100%,50%,0.04) 100%)"
        : "linear-gradient(135deg, hsl(200,100%,74%,0.08) 0%, hsl(215,67%,50%,0.04) 100%)",
      border: isWarn ? "1px solid hsl(35,100%,60%,0.25)" : "1px solid hsl(200,100%,74%,0.2)",
      borderLeft: isWarn ? "3px solid hsl(35,100%,60%)" : "3px solid hsl(200,100%,74%)",
    }}>
      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "0.5rem", color: isWarn ? "hsl(35,100%,65%)" : "hsl(200,100%,74%)" }}>{title}</div>
      <div style={{ fontSize: "0.95rem", lineHeight: 1.7, color: isWarn ? "hsl(35,50%,85%)" : "hsl(210,20%,85%)" }}>{children}</div>
    </div>
  );
};

const ProseH2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, marginBottom: "1.25rem", color: "hsl(210,30%,95%)", lineHeight: 1.2 }}>{children}</h2>
);

const ProseP = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color: "hsl(210,20%,80%)", lineHeight: 1.85, marginBottom: "1.25rem", fontSize: "1rem" }}>{children}</p>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul style={{ listStyle: "none", margin: "0.75rem 0 0", display: "flex", flexDirection: "column" as const, gap: "0.35rem" }}>
    {items.map((item, i) => (
      <li key={i} style={{ fontSize: "0.875rem", color: "hsl(210,20%,72%)", display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
        <span style={{ color: "hsl(200,100%,74%)", fontSize: "0.75rem", marginTop: "0.15em", flexShrink: 0 }}>→</span>
        {item}
      </li>
    ))}
  </ul>
);

const ReqCard = ({ card }: { card: RequirementCard }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...S.card,
        position: "relative", overflow: "hidden", cursor: "default",
        transition: "all 0.4s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 24px 56px -16px hsl(218,60%,4%,0.65), 0 0 56px hsl(200,100%,74%,0.24)" : "none",
        outline: hovered ? "1.5px solid hsl(200,100%,74%,0.45)" : "1.5px solid transparent",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Outfit',sans-serif", fontSize: "0.8rem", fontWeight: 700,
          background: "linear-gradient(135deg, hsl(200,100%,80%) 0%, hsl(215,67%,50%) 100%)",
          color: "hsl(218,55%,9%)", flexShrink: 0,
        }}>{card.num}</div>
        <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "hsl(210,30%,95%)" }}>{card.title}</span>
      </div>
      <p style={{ fontSize: "0.9rem", color: "hsl(214,18%,60%)", lineHeight: 1.7, margin: 0 }}>{card.body}</p>
      {card.bullets && <BulletList items={card.bullets} />}
    </div>
  );
};

const ChecklistRow = ({ item, checked, onToggle }: { item: ChecklistItem; checked: boolean; onToggle: () => void }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: "1rem",
        padding: "0.75rem 1.75rem", cursor: "pointer",
        background: hovered ? "hsl(218,48%,15%)" : "transparent",
        transition: "background 0.2s ease",
      }}
    >
      <div style={{
        width: 20, height: 20, borderRadius: 6, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.25s ease",
        background: checked ? "linear-gradient(135deg, hsl(200,100%,80%) 0%, hsl(215,67%,50%) 100%)" : "transparent",
        border: checked ? "none" : "2px solid hsl(218,35%,28%)",
      }}>
        {checked && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsl(218,55%,9%)" strokeWidth="3.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <span style={{
        fontSize: "0.9rem", userSelect: "none",
        color: checked ? "hsl(210,20%,50%)" : "hsl(210,20%,75%)",
        textDecoration: checked ? "line-through" : "none",
        textDecorationColor: "hsl(210,20%,45%)",
        transition: "color 0.25s ease",
      }}>{item.label}</span>
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────── */
export default function DSGVOBlog() {
  const [scrollPct, setScrollPct] = useState(0);
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

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

  const toggleCheck = (id: number) => {
    setCheckedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div style={S.page}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } ::selection { background: hsl(200,100%,74%,0.25); }`}</style>

      {/* Progress bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, height: 2, zIndex: 200,
        width: `${scrollPct}%`, transition: "width 0.1s linear", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, hsl(200,100%,80%) 0%, hsl(215,67%,50%) 100%)",
        boxShadow: "0 0 8px hsl(200,100%,74%,0.6)",
      }} />

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between",
        backdropFilter: "blur(20px)", background: "hsl(218,55%,9%,0.7)",
        borderBottom: "1px solid hsl(218,35%,20%,0.5)",
      }}>
        <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.25rem", fontWeight: 800, ...S.gradientText }}>
          Unbound Solutions
        </span>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          padding: "0.4rem 1rem", borderRadius: 999,
          fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.1em",
          background: "linear-gradient(135deg, hsl(200,100%,74%,0.12) 0%, hsl(215,67%,50%,0.08) 100%)",
          color: "hsl(200,100%,74%)", border: "1px solid hsl(200,100%,74%,0.22)",
          fontFamily: "'Outfit',sans-serif",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(200,100%,74%)", animation: "pulse 2s infinite" }} />
          Web Development &amp; Compliance
        </span>
      </nav>

      {/* Hero */}
      <section id="hero" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column" as const,
        justifyContent: "flex-end", padding: "2rem 6rem", position: "relative", overflow: "hidden", alignItems: "center",
      }}>
        {/* Orbs */}
        <div style={{ position: "absolute", width: 600, height: 600, top: -200, right: -100, borderRadius: "50%", filter: "blur(100px)", background: "hsl(200,100%,74%,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 400, height: 400, bottom: 0, left: -100, borderRadius: "50%", filter: "blur(100px)", background: "hsl(215,67%,50%,0.1)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1.2rem",
            borderRadius: 999, fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase" as const,
            letterSpacing: "0.12em", background: "linear-gradient(135deg, hsl(200,100%,74%,0.12) 0%, hsl(215,67%,50%,0.08) 100%)",
            color: "hsl(200,100%,74%)", border: "1px solid hsl(200,100%,74%,0.22)",
            fontFamily: "'Outfit',sans-serif", marginBottom: "2rem",
          }}>
            Expert Blog <span style={{ opacity: 0.4 }}>·</span> ~7 min read
          </div>

          <h1 style={{
            fontFamily: "'Outfit',sans-serif", fontSize: "clamp(2.5rem,6vw,5.5rem)",
            fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "1.5rem",
          }}>
            DSGVO-Compliant<br />
            Websites: <span style={S.gradientText}>What Indian IT</span><br />
            <span style={S.gradientText}>Companies Must Know</span>
          </h1>

          <p style={{ fontSize: "1.15rem", color: "hsl(214,18%,55%)", maxWidth: 640, lineHeight: 1.7, marginBottom: "2.5rem" }}>
            Working with German clients? Everything you need to implement DSGVO (GDPR) compliance — from cookie banners to data processing agreements.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" as const }}>
            {[
              { icon: "👤", text: "Unbound Solutions" },
              { icon: "📍", text: "India & Germany" },
              { icon: "🌐", text: "unboundsolutions.in" },
            ].map(m => (
              <span key={m.text} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "hsl(214,18%,55%)", fontFamily: "'Outfit',sans-serif" }}>
                {m.icon} {m.text}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "4rem", height: 1, background: "linear-gradient(90deg, transparent, hsl(200,100%,74%,0.35), hsl(215,67%,50%,0.25), transparent)" }} />
      </section>

      {/* Article + Sidebar */}
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "5rem 2rem",
        display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 320px", gap: "4rem", alignItems: "start",
      }}>
        {/* ─── ARTICLE BODY ──────────────────────────────── */}
        <main>

          {/* INTRO */}
          <section id="intro" style={{ marginBottom: "4rem" }}>
            <SectionLabel label="INTRO" />
            <ProseH2>Why DSGVO Matters More Than You Think</ProseH2>
            <ProseP>If your Indian IT company is building websites for German businesses — or even thinking about it — there's one regulation you cannot afford to ignore: the <strong style={{ color: "hsl(210,30%,95%)" }}>DSGVO</strong>.</ProseP>
            <ProseP>DSGVO stands for <em>Datenschutz-Grundverordnung</em>, the German name for the General Data Protection Regulation (GDPR). It applies to any website that collects, stores, or processes data from people in Germany or the EU — <strong style={{ color: "hsl(210,30%,95%)" }}>regardless of where the website or developer is based</strong>.</ProseP>
            <Callout type="warning" title="⚠ Financial Risk">
              Non-compliance can result in fines of up to <strong>€20 million</strong> or <strong>4% of global annual turnover</strong> — whichever is higher. Even small websites have been fined for violations.
            </Callout>
          </section>

          {/* APPLICABILITY */}
          <section id="applicability" style={{ marginBottom: "4rem" }}>
            <SectionLabel label="01" />
            <ProseH2>Does DSGVO Apply to Your Indian IT Company?</ProseH2>
            <ProseP><strong style={{ color: "hsl(210,30%,95%)" }}>Yes</strong> — if any of the following are true:</ProseP>
            <BulletList items={[
              "You are building a website for a German or EU-based business.",
              "Your client's website will be accessed by users in Germany or the EU.",
              "The website collects any personal data from EU users (forms, cookies, analytics, logins).",
              "You are hosting, maintaining, or processing data on behalf of a German client.",
            ]} />
            <Callout type="info" title="🌍 Critical Point">
              The DSGVO applies based on where the <strong>data subjects (users) are located</strong>, not where the company or developer is based. This is the most critical point many Indian IT firms miss.
            </Callout>
          </section>

          {/* PRINCIPLES */}
          <section id="overview" style={{ marginBottom: "4rem" }}>
            <SectionLabel label="02" />
            <ProseH2>DSGVO Core Principles</ProseH2>
            <ProseP>The regulation is built on seven foundational principles that govern how personal data must be handled.</ProseP>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem", marginTop: "2rem" }}>
              {PRINCIPLES.map((p) => (
                <PrincipleCardComp key={p.name} card={p} />
              ))}
            </div>
          </section>

          {/* REQUIREMENTS */}
          <section id="requirements" style={{ marginBottom: "4rem" }}>
            <SectionLabel label="03" />
            <ProseH2>Key DSGVO Requirements for Websites</ProseH2>
            <ProseP>Here is a practical breakdown of what a DSGVO-compliant website must have:</ProseP>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "1.25rem", marginTop: "2rem" }}>
              {REQUIREMENTS.map(card => <ReqCard key={card.num} card={card} />)}
            </div>
          </section>

          {/* DPA */}
          <section id="dpa" style={{ marginBottom: "4rem" }}>
            <SectionLabel label="04" />
            <ProseH2>The Data Processing Agreement (DPA / AVV)</ProseH2>
            <div style={{
              borderRadius: "1.25rem", padding: "2rem", margin: "2rem 0", position: "relative",
              background: "linear-gradient(160deg, hsl(215,67%,16%) 0%, hsl(218,52%,10%) 100%)",
              border: "1px solid hsl(215,67%,35%,0.35)",
              borderTop: "2px solid transparent",
              backgroundClip: "padding-box",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(135deg, hsl(200,100%,80%) 0%, hsl(215,67%,50%) 100%)", borderRadius: "1.25rem 1.25rem 0 0" }} />
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.15em", color: "hsl(200,100%,74%)", marginBottom: "0.75rem" }}>Auftragsverarbeitungsvertrag · Legally Binding</div>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.25rem", fontWeight: 800, color: "hsl(210,30%,95%)", marginBottom: "0.75rem" }}>The Agreement Most Indian IT Companies Miss</div>
              <p style={{ fontSize: "0.9rem", color: "hsl(210,20%,72%)", lineHeight: 1.75, marginBottom: "1rem" }}>
                When an Indian IT company builds or maintains a website handling German user data, both parties must sign a Data Processing Agreement. This defines what data you have access to and why, how you'll protect it, who else may access it, and what happens in a breach.
              </p>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.5rem 1rem", borderRadius: "0.5rem",
                background: "hsl(200,100%,74%,0.08)", border: "1px solid hsl(200,100%,74%,0.2)",
                fontSize: "0.825rem", color: "hsl(200,100%,74%)", fontFamily: "'Outfit',sans-serif", fontWeight: 500,
              }}>
                ✦ Unbound Solutions can sign AVV agreements directly under German law — full legal certainty for your clients.
              </div>
            </div>
          </section>

          {/* MISTAKES */}
          <section id="mistakes" style={{ marginBottom: "4rem" }}>
            <SectionLabel label="05" />
            <ProseH2>5 Common Mistakes Indian IT Companies Make</ProseH2>
            <ProseP>Based on experience reviewing work by Indian development teams, these are the most frequent compliance failures:</ProseP>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem", marginTop: "2rem" }}>
              {MISTAKES.map(m => <MistakeCardComp key={m.num} card={m} isMobile={isMobile} />)}
            </div>
          </section>

          {/* WHY UNBOUND */}
          <section id="unbound" style={{ marginBottom: "4rem" }}>
            <SectionLabel label="06" />
            <ProseH2>Why Choose Unbound Solutions</ProseH2>
            <ProseP>Uniquely positioned to bridge the gap between Indian IT expertise and German legal standards.</ProseP>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem", marginTop: "2rem" }}>
              {ADVANTAGES.map(a => <AdvantageCardComp key={a.title} card={a} />)}
            </div>
          </section>

          {/* CHECKLIST */}
          <section id="checklist" style={{ marginBottom: "4rem" }}>
            <SectionLabel label="07" />
            <ProseH2>DSGVO Compliance Checklist</ProseH2>
            <ProseP>Use this before launching any website for a German client. Click items to mark them complete.</ProseP>
            <div style={{ borderRadius: "1.25rem", background: "linear-gradient(160deg, hsl(218,48%,13%) 0%, hsl(218,52%,10%) 100%)", border: "1px solid hsl(218,35%,22%)", overflow: "hidden", marginTop: "2rem" }}>
              <div style={{ padding: "1.5rem 1.75rem", background: "hsl(218,48%,15%)", borderBottom: "1px solid hsl(218,35%,20%)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(200,100%,74%)" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", fontWeight: 700, color: "hsl(210,30%,95%)" }}>Pre-Launch Compliance Checklist</span>
                <span style={{ marginLeft: "auto", fontSize: "0.7rem", fontFamily: "'Outfit',sans-serif", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: 4, background: "hsl(200,100%,74%,0.1)", color: "hsl(200,100%,74%)", border: "1px solid hsl(200,100%,74%,0.2)" }}>
                  {checkedIds.size} / {CHECKLIST_ITEMS.length}
                </span>
              </div>
              <div>
                {CHECKLIST_ITEMS.map((item, i) => (
                  <div key={item.id}>
                    <ChecklistRow item={item} checked={checkedIds.has(item.id)} onToggle={() => toggleCheck(item.id)} />
                    {i < CHECKLIST_ITEMS.length - 1 && (
                      <div style={{ height: 1, margin: "0 1.75rem", background: "linear-gradient(90deg, transparent, hsl(200,100%,74%,0.12), transparent)" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONCLUSION */}
          <section id="conclusion" style={{ marginBottom: "4rem" }}>
            <SectionLabel label="END" />
            <ProseH2>DSGVO Compliance is a <span style={S.gradientText}>Competitive Advantage</span></ProseH2>
            <ProseP>For Indian IT companies looking to grow in Germany and Europe, DSGVO compliance is not a bureaucratic hurdle — it is a competitive differentiator.</ProseP>
            <ProseP>German businesses are actively looking for web development partners who understand their legal environment. An Indian IT company that delivers a fully DSGVO-compliant website earns trust, repeat business, and referrals.</ProseP>
            <ProseP>At Unbound Solutions, DSGVO compliance is built into every project we deliver for our German clients — from day one, not as an afterthought.</ProseP>
          </section>
        </main>

        {/* ─── SIDEBAR ────────────────────────────────────── */}
        {!isMobile && (
         <aside style={{
  position: "sticky",
  top: 100,
  alignSelf: "start",        // ✅ FIX 1 (MOST IMPORTANT)
  height: "fit-content",     // ✅ FIX 2 (stabilizes behavior)
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem"
}}>
            {/* TOC */}
            <div style={{ ...S.card, padding: "1.5rem" }}>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "hsl(200,100%,74%)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                Table of Contents
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, hsl(200,100%,74%,0.25), transparent)" }} />
              </div>
              <ul style={{ listStyle: "none" }}>
                {TOC.map(t => (
                  <li key={t.href}>
                    <a href={t.href} style={{ display: "block", padding: "0.45rem 0.75rem", borderRadius: "0.5rem", fontSize: "0.825rem", color: "hsl(214,18%,58%)", textDecoration: "none", transition: "all 0.2s ease" }}
                      onMouseEnter={e => { (e.target as HTMLElement).style.color = "hsl(210,30%,95%)"; (e.target as HTMLElement).style.background = "hsl(200,100%,74%,0.06)"; (e.target as HTMLElement).style.paddingLeft = "1rem"; (e.target as HTMLElement).style.borderLeft = "2px solid hsl(200,100%,74%,0.4)"; }}
                      onMouseLeave={e => { (e.target as HTMLElement).style.color = "hsl(214,18%,58%)"; (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.paddingLeft = "0.75rem"; (e.target as HTMLElement).style.borderLeft = "none"; }}
                    >{t.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Meta */}
            <div style={{ ...S.card, padding: "1.5rem" }}>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "hsl(200,100%,74%)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                Article Details
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, hsl(200,100%,74%,0.25), transparent)" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
                {[
                  ["Category",     "Web Dev & Compliance"],
                  ["Reading Time", "~7 minutes"],
                  ["Regulation",   "DSGVO / GDPR"],
                  ["In force since","25 May 2018"],
                  ["Max Fine",     "€20M or 4%", "hsl(35,100%,65%)"],
                ].map(([label, value, color]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.825rem" }}>
                    <span style={{ color: "hsl(214,18%,50%)", fontFamily: "'Outfit',sans-serif" }}>{label}</span>
                    <span style={{ color: color || "hsl(210,20%,80%)", fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{
              borderRadius: "1.25rem", padding: "1.75rem", textAlign: "center" as const,
              background: "linear-gradient(160deg, hsl(215,67%,20%) 0%, hsl(218,52%,13%) 100%)",
              border: "1px solid hsl(215,67%,35%,0.4)", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(135deg, hsl(200,100%,80%) 0%, hsl(215,67%,50%) 100%)", opacity: 0.5 }} />
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, hsl(200,100%,80%) 0%, hsl(215,67%,50%) 100%)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: "1.25rem" }}>🤝</div>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", fontWeight: 700, color: "hsl(210,30%,95%)", marginBottom: "0.5rem" }}>Ready to Build Compliant?</div>
              <p style={{ fontSize: "0.825rem", color: "hsl(214,18%,55%)", lineHeight: 1.6, marginBottom: "1.25rem" }}>Let Unbound Solutions be your trusted DSGVO partner for German client projects.</p>
              <CtaButton />
            </div>
          </aside>
        )}
      </div>

      {/* Footer */}
      <footer style={{ marginTop: "6rem", padding: "2rem", borderTop: "1px solid hsl(218,35%,18%)", textAlign: "center" as const }}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.1rem", fontWeight: 800, ...S.gradientText, marginBottom: "0.5rem" }}>Unbound Solutions</div>
        <div style={{ fontSize: "0.8rem", color: "hsl(214,18%,40%)" }}>India & Germany · Web Development · IT Solutions · DSGVO Compliance · unboundsolutions.in</div>
      </footer>
    </div>
  );
}

/* ─── Extra sub-components (defined after main to avoid hoisting issues) ── */

function PrincipleCardComp({ card }: { card: PrincipleCard }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      borderRadius: "0.875rem", padding: "1.25rem",
      background: "linear-gradient(160deg, hsl(218,48%,13%) 0%, hsl(218,52%,10%) 100%)",
      border: `1px solid ${hovered ? "hsl(200,100%,74%,0.25)" : "hsl(218,35%,22%)"}`,
      transition: "all 0.3s ease",
      boxShadow: hovered ? "0 4px 20px hsl(200,100%,74%,0.08)" : "none",
    }}>
      <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{card.icon}</div>
      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "hsl(200,100%,74%)", marginBottom: "0.35rem", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>{card.name}</div>
      <div style={{ fontSize: "0.825rem", color: "hsl(214,18%,58%)", lineHeight: 1.6 }}>{card.desc}</div>
    </div>
  );
}

function MistakeCardComp({ card, isMobile }: { card: MistakeCard; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      borderRadius: "0.875rem", padding: "1.25rem",
      background: "hsl(218,48%,13%)",
      border: `1px solid ${hovered ? "hsl(4,72%,58%,0.4)" : "hsl(4,72%,58%,0.18)"}`,
      display: "flex", alignItems: "flex-start", gap: "0.875rem",
      transition: "all 0.3s ease",
      transform: hovered ? "translateY(-3px)" : "none",
      boxShadow: hovered ? "0 8px 24px hsl(4,72%,40%,0.15)" : "none",
      gridColumn: card.wide && !isMobile ? "span 2" : "span 1",
    }}>
      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.5rem", fontWeight: 900, color: "hsl(4,72%,58%,0.4)", lineHeight: 1, flexShrink: 0 }}>{card.num}</div>
      <div>
        <div style={{ fontWeight: 600, color: "hsl(210,25%,88%)", marginBottom: "0.25rem", fontFamily: "'Outfit',sans-serif", fontSize: "0.9rem" }}>{card.title}</div>
        <div style={{ fontSize: "0.875rem", color: "hsl(210,20%,75%)", lineHeight: 1.6 }}>{card.desc}</div>
      </div>
    </div>
  );
}

function AdvantageCardComp({ card }: { card: AdvantageCard }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      borderRadius: "1rem", padding: "1.5rem",
      background: "hsl(218,48%,13%)",
      border: `1px solid ${hovered ? "hsl(200,100%,74%,0.22)" : "hsl(218,35%,20%)"}`,
      transition: "all 0.35s ease",
      transform: hovered ? "translateY(-3px)" : "none",
    }}>
      <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{card.icon}</div>
      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "hsl(210,30%,95%)", marginBottom: "0.4rem" }}>{card.title}</div>
      <div style={{ fontSize: "0.825rem", color: "hsl(214,18%,56%)", lineHeight: 1.65 }}>{card.text}</div>
    </div>
  );
}

function CtaButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a href="https://unboundsolutions.in" target="_blank" rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block", width: "100%", padding: "0.75rem 1.5rem",
        borderRadius: 999, fontFamily: "'Outfit',sans-serif", fontSize: "0.875rem", fontWeight: 600,
        letterSpacing: "0.03em", textDecoration: "none", textAlign: "center" as const,
        background: "linear-gradient(135deg, hsl(200,100%,80%) 0%, hsl(215,67%,50%) 100%)",
        color: "hsl(218,55%,9%)", border: "none", cursor: "pointer",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered
          ? "0 0 56px hsl(200,100%,74%,0.24), 0 10px 28px hsl(215,67%,36%,0.5)"
          : "0 2px 8px hsl(218,60%,4%,0.35), 0 4px 18px hsl(215,67%,36%,0.35)",
      }}>
      Get in Touch →
    </a>
  );
}