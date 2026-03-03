import { useEffect, useRef, useState } from "react";
import { Code, Palette, Shield, ArrowUpRight } from "lucide-react";

const divisions = [
  {
    id: "solutions",
    name: "Unbound Solutions",
    tagline: "Build. Deploy. Scale.",
    description:
      "Expert web development services tailored for startups and enterprises. We build custom websites, Shopify stores, and e-commerce platforms that generate leads and increase revenue.",
    icon: Code,
    /* brand sky→navy */
    gradientStyle: "linear-gradient(135deg, hsl(200 100% 78%) 0%, hsl(215 67% 48%) 100%)",
    glowColor: "hsl(200 100% 74% / 0.22)",
    services: ["Custom Web Development", "Shopify Store Setup", "Website Maintenance", "IT Consulting"],
  },
  {
    id: "studios",
    name: "Unbound Studios",
    tagline: "Design. Inspire. Transform.",
    description:
      "Award-winning UI/UX design agency creating memorable brand experiences. From logo design to complete brand identity systems, we help you stand out in competitive markets.",
    icon: Palette,
    gradientStyle: "linear-gradient(135deg, hsl(270 70% 70%) 0%, hsl(320 60% 55%) 100%)",
    glowColor: "hsl(290 65% 65% / 0.22)",
    services: ["Logo Design", "Brand Identity", "UI/UX Design", "Design Systems"],
  },
  {
    id: "services",
    name: "Unbound Services",
    tagline: "Protect. Certify. Empower.",
    description:
      "Enterprise-grade IT solutions and cybersecurity services. We protect your digital assets, optimize your infrastructure, and provide industry-recognized training programs.",
    icon: Shield,
    gradientStyle: "linear-gradient(135deg, hsl(195 80% 60%) 0%, hsl(210 90% 45%) 100%)",
    glowColor: "hsl(200 85% 60% / 0.22)",
    services: ["Cybersecurity Audits", "IT Infrastructure", "Security Training", "Enterprise Solutions"],
  },
];

/* ── useInView hook ───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [state, setState] = useState("hidden");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setState("visible");
        else setState((p) => (p === "visible" ? "exiting" : "hidden"));
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, state];
}

/* ── Division Card ────────────────────────────────────────────── */
const DivisionCard = ({ division, index, sectionState }) => {
  const [hovered, setHovered] = useState(false);
  const delay = index * 120;
  const exitDelay = (divisions.length - 1 - index) * 80;

  let animClass = "div-card-hidden";
  if (sectionState === "visible") animClass = "div-card-enter";
  else if (sectionState === "exiting") animClass = "div-card-exit";

  return (
    <div
      className={`div-card ${animClass}`}
      style={{
        animationDelay:
          sectionState === "visible" ? `${delay}ms` : `${exitDelay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ongoing: ambient glow behind card on hover */}
      <span
        className="card-ambient-glow"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${division.glowColor} 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* ongoing: top gradient border line */}
      <span
        className="card-top-line"
        style={{
          background: division.gradientStyle,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
        }}
      />

      {/* Icon */}
      <div
        className="div-icon-wrap"
        style={{ background: division.gradientStyle }}
      >
        <division.icon className="w-7 h-7 text-white" style={{ position: "relative", zIndex: 2 }} />
        {/* ongoing: icon inner spin ring on hover */}
        {hovered && <span className="icon-orbit" style={{ borderTopColor: "hsl(0 0% 100% / 0.50)" }} />}
      </div>

      {/* Name */}
      <h3 className="div-name">{division.name}</h3>

      {/* Tagline */}
      <p
        className="div-tagline"
        style={{
          background: division.gradientStyle,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {division.tagline}
      </p>

      {/* Description */}
      <p className="div-desc">{division.description}</p>

      {/* Service tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {division.services.map((svc, i) => (
          <span
            key={svc}
            className="div-tag"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {svc}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a href="#contact" className="div-cta">
        <span
          style={{
            background: division.gradientStyle,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Learn More
        </span>
        <ArrowUpRight
          className="div-cta-arrow"
          style={{ color: `hsl(200 100% 74%)`, transform: hovered ? "translate(3px,-3px)" : "translate(0,0)" }}
        />
      </a>

      {/* ongoing: bottom shimmer sweep on hover */}
      <span className={`div-shimmer ${hovered ? "shimmer-run" : ""}`} />
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════════════════════ */
const DivisionsSection = () => {
  const [headerRef, headerState] = useInView(0.35);
  const [gridRef, gridState] = useInView(0.10);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

        /* ── KEYFRAMES ─────────────────────────────────── */
        @keyframes div-hdr-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes div-hdr-out {
          from { opacity: 1; transform: translateY(0);     }
          to   { opacity: 0; transform: translateY(-20px); }
        }
        @keyframes div-card-in {
          from { opacity: 0; transform: translateY(50px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)     scale(1);   }
        }
        @keyframes div-card-out {
          from { opacity: 1; transform: translateY(0)     scale(1);   }
          to   { opacity: 0; transform: translateY(36px)  scale(0.96); }
        }
        @keyframes orb-pulse {
          0%,100% { transform: translate(-50%,-50%) scale(1);    opacity: 0.6; }
          50%      { transform: translate(-50%,-50%) scale(1.15); opacity: 1;   }
        }
        @keyframes icon-orbit-spin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes shimmer-slide {
          from { left: -80%; }
          to   { left: 120%; }
        }
        @keyframes tag-pop {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1);    }
        }

        /* ── SECTION ────────────────────────────────────── */
        .divisions-section {
          position: relative;
          padding: 6rem 0;
          overflow: hidden;
          background: hsl(218 55% 9%);
        }

        /* ongoing: center orb */
        .div-center-orb {
          position: absolute;
          top: 50%; left: 50%;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, hsl(215 67% 36% / 0.12) 0%, transparent 65%);
          filter: blur(80px);
          animation: orb-pulse 10s ease-in-out infinite;
          pointer-events: none;
        }

        /* ── HEADER ─────────────────────────────────────── */
        .div-badge { opacity: 0; }
        .div-badge.visible { animation: div-hdr-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.05s forwards; }

        .div-h2 { opacity: 0; }
        .div-h2.visible { animation: div-hdr-up 0.60s cubic-bezier(0.22,1,0.36,1) 0.18s forwards; }
        .div-h2.exiting { animation: div-hdr-out 0.35s ease forwards; }

        .div-sub { opacity: 0; }
        .div-sub.visible { animation: div-hdr-up 0.60s cubic-bezier(0.22,1,0.36,1) 0.30s forwards; }
        .div-sub.exiting { animation: div-hdr-out 0.35s ease 0.05s forwards; }

        /* ── CARD ───────────────────────────────────────── */
        .div-card {
          position: relative;
          background: hsl(218 48% 13%);
          border: 1px solid hsl(218 35% 20%);
          border-radius: 1.25rem;
          padding: 2rem;
          overflow: hidden;
          transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
        }
        .div-card:hover {
          border-color: hsl(218 35% 28%);
          box-shadow: 0 20px 50px hsl(218 60% 4% / 0.55);
          transform: translateY(-6px);
        }

        .div-card-hidden { opacity: 0; transform: translateY(50px) scale(0.95); }
        .div-card-enter  { animation: div-card-in  0.60s cubic-bezier(0.22,1,0.36,1) both; }
        .div-card-exit   { animation: div-card-out 0.40s ease both; }

        /* ambient glow */
        .card-ambient-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          transition: opacity 0.5s ease;
          z-index: 0;
        }

        /* top border line */
        .card-top-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          border-radius: 9999px 9999px 0 0;
          transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
        }

        /* ── ICON ───────────────────────────────────────── */
        .div-icon-wrap {
          position: relative;
          width: 56px; height: 56px;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.5rem;
          z-index: 1;
          overflow: visible;
          box-shadow: 0 4px 20px hsl(218 60% 4% / 0.30);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .div-card:hover .div-icon-wrap {
          transform: scale(1.08);
          box-shadow: 0 8px 28px hsl(218 60% 4% / 0.45);
        }

        .icon-orbit {
          position: absolute;
          inset: -5px;
          border-radius: 20px;
          border: 1.5px solid transparent;
          border-right-color: hsl(0 0% 100% / 0.20);
          animation: icon-orbit-spin 1.8s linear infinite;
          pointer-events: none;
        }

        /* ── TEXT ───────────────────────────────────────── */
        .div-name {
          font-family: 'Outfit', sans-serif;
          font-size: 1.125rem;
          font-weight: 700;
          color: hsl(210 25% 90%);
          margin-bottom: 0.35rem;
          position: relative; z-index: 1;
          transition: color 0.3s ease;
        }
        .div-card:hover .div-name { color: hsl(0 0% 100%); }

        .div-tagline {
          font-family: 'Outfit', sans-serif;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          margin-bottom: 1rem;
          position: relative; z-index: 1;
        }

        .div-desc {
          font-size: 0.8125rem;
          color: hsl(214 18% 52%);
          line-height: 1.7;
          margin-bottom: 1.25rem;
          position: relative; z-index: 1;
          transition: color 0.3s ease;
        }
        .div-card:hover .div-desc { color: hsl(214 18% 60%); }

        /* ── TAGS ───────────────────────────────────────── */
        .div-tag {
          display: inline-block;
          padding: 0.3rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          background: hsl(218 38% 17%);
          color: hsl(214 18% 58%);
          border: 1px solid hsl(218 35% 22%);
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
          position: relative; z-index: 1;
        }
        .div-card:hover .div-tag {
          background: hsl(218 42% 20%);
          color: hsl(200 100% 80%);
          border-color: hsl(200 100% 74% / 0.18);
        }

        /* ── CTA ────────────────────────────────────────── */
        .div-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-family: 'Outfit', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          position: relative; z-index: 1;
          transition: gap 0.25s ease;
        }
        .div-card:hover .div-cta { gap: 0.6rem; }

        .div-cta-arrow {
          width: 16px; height: 16px;
          transition: transform 0.30s cubic-bezier(0.22,1,0.36,1);
        }

        /* ── SHIMMER ────────────────────────────────────── */
        .div-shimmer {
          position: absolute;
          bottom: 0; left: -80%;
          width: 55%; height: 1px;
          background: linear-gradient(90deg, transparent, hsl(200 100% 74% / 0.50), transparent);
          pointer-events: none;
          opacity: 0;
        }
        .div-shimmer.shimmer-run {
          opacity: 1;
          animation: shimmer-slide 1s ease forwards;
        }

        /* ── GRADIENT TEXT ──────────────────────────────── */
        .gradient-text-brand {
          background: linear-gradient(135deg, hsl(200 100% 80%) 0%, hsl(215 67% 60%) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <section id="divisions" className="divisions-section">
        <div className="div-center-orb" />

        <div className="container mx-auto px-6 relative z-10">

          {/* Header */}
          <div ref={headerRef} className="text-center mb-16">
            <span className={`section-badge mb-4 inline-flex div-badge ${headerState === "visible" ? "visible" : ""}`}>
              Specialized Expertise
            </span>

            <h2
              className={`text-3xl md:text-5xl font-bold mt-4 mb-6 div-h2 ${
                headerState === "visible" ? "visible" : headerState === "exiting" ? "exiting" : ""
              }`}
            >
              One Stop Destination To{" "}
              <span className="gradient-text-brand">All Services</span>
            </h2>

            <p
              className={`text-muted-foreground max-w-2xl mx-auto div-sub ${
                headerState === "visible" ? "visible" : headerState === "exiting" ? "exiting" : ""
              }`}
            >
              Three specialized divisions working together to deliver comprehensive
              digital solutions. From development to design to security — we handle
              everything your business needs to succeed online.
            </p>
          </div>

          {/* Grid */}
          <div
            ref={gridRef}
            className="grid md:grid-cols-3 gap-8"
          >
            {divisions.map((division, i) => (
              <DivisionCard
                key={division.id}
                division={division}
                index={i}
                sectionState={gridState}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DivisionsSection;