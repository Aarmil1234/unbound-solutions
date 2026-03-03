import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";

/* ── animated number counter ─────────────────────────────────── */
function useCounter(target, duration = 1800, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    const raf = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * numeric));
      if (progress < 1) requestAnimationFrame(raf);
      else setValue(numeric);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);

  const suffix = target.replace(/[0-9.]/g, "");
  return `${value}${suffix}`;
}

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "50+",  label: "Happy Clients"       },
  { value: "3",    label: "Expert Divisions"    },
  { value: "99%",  label: "Client Satisfaction" },
];

function StatItem({ value, label, active }) {
  const display = useCounter(value, 1600, active);
  return (
    <div className="stat-item text-center">
      <div className="text-4xl md:text-5xl font-bold gradient-text mb-3 tracking-tight">
        {display}
      </div>
      <div className="text-sm text-muted-foreground tracking-wide">{label}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   HERO SECTION
════════════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const [entered, setEntered] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  /* entrance — fire once after mount */
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* stats counter — trigger when stats row scrolls into view */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

        /* ── KEYFRAMES ─────────────────────────────────── */

        /* entrance */
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes hero-scale-in {
          from { opacity: 0; transform: scale(0.88) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        @keyframes cta-pop {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes stats-rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes scroll-dot {
          0%,100% { transform: translateY(0);   opacity: 1;   }
          60%      { transform: translateY(14px); opacity: 0.3; }
        }

        /* ongoing */
        @keyframes orb-float-1 {
          0%,100% { transform: translate(0,0)      scale(1);    }
          40%      { transform: translate(60px,-50px) scale(1.1); }
          70%      { transform: translate(-40px,30px) scale(0.92); }
        }
        @keyframes orb-float-2 {
          0%,100% { transform: translate(0,0)       scale(1);    }
          35%      { transform: translate(-50px,40px) scale(1.08); }
          70%      { transform: translate(40px,-20px) scale(0.95); }
        }
        @keyframes orb-float-3 {
          0%,100% { transform: translate(-50%,-50%) scale(1);    }
          50%      { transform: translate(-50%,-50%) scale(1.12); }
        }
        @keyframes grid-drift {
          from { background-position: 0 0;       }
          to   { background-position: 80px 80px; }
        }
        @keyframes badge-glow {
          0%,100% { box-shadow: 0 0 0 0 hsl(200 100% 74% / 0);    }
          50%      { box-shadow: 0 0 18px 4px hsl(200 100% 74% / 0.16); }
        }
        @keyframes btn-breathe {
          0%,100% { box-shadow: 0 2px 18px hsl(200 100% 74% / 0.25); }
          50%      { box-shadow: 0 4px 32px hsl(200 100% 74% / 0.45); }
        }
        @keyframes stat-line-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        /* ── SECTION ────────────────────────────────────── */
        .hero-section {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding-top: 6rem;
          background: hsl(218 55% 9%);
        }

        /* ── ORBS ───────────────────────────────────────── */
        .hero-orb-1 {
          position: absolute;
          top: -5%;
          left: 15%;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, hsl(215 67% 36% / 0.22) 0%, transparent 70%);
          filter: blur(100px);
          animation: orb-float-1 18s ease-in-out infinite;
          pointer-events: none;
        }
        .hero-orb-2 {
          position: absolute;
          bottom: -5%;
          right: 10%;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, hsl(200 100% 74% / 0.13) 0%, transparent 70%);
          filter: blur(90px);
          animation: orb-float-2 14s ease-in-out infinite;
          pointer-events: none;
        }
        .hero-orb-3 {
          position: absolute;
          top: 50%; left: 50%;
          width: 800px; height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, hsl(215 67% 50% / 0.07) 0%, transparent 65%);
          filter: blur(120px);
          animation: orb-float-3 22s ease-in-out infinite;
          pointer-events: none;
        }

        /* ongoing scrolling grid */
        .hero-grid {
          position: absolute;
          inset: 0;
          opacity: 0.018;
          background-image:
            linear-gradient(hsl(210 30% 95%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(210 30% 95%) 1px, transparent 1px);
          background-size: 80px 80px;
          animation: grid-drift 12s linear infinite;
          pointer-events: none;
        }

        /* ── BADGE ──────────────────────────────────────── */
        .hero-badge {
          opacity: 0;
          display: inline-flex;
        }
        .hero-badge.entered {
          animation:
            hero-scale-in 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s forwards,
            badge-glow     3s ease-in-out 1s infinite;
        }

        /* ── HEADING ────────────────────────────────────── */
        .hero-h1 {
          opacity: 0;
          font-family: 'Outfit', sans-serif;
        }
        .hero-h1.entered {
          animation: hero-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.26s forwards;
        }

        /* ── SUBHEADING ─────────────────────────────────── */
        .hero-sub {
          opacity: 0;
        }
        .hero-sub.entered {
          animation: hero-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.40s forwards;
        }

        /* ── CTA ROW ────────────────────────────────────── */
        .hero-cta-wrap {
          opacity: 0;
        }
        .hero-cta-wrap.entered {
          animation: cta-pop 0.6s cubic-bezier(0.22,1,0.36,1) 0.54s forwards;
        }

        /* primary CTA ongoing breathe */
        .hero-btn-primary {
          animation: btn-breathe 3s ease-in-out 1.2s infinite;
        }

        /* ── STATS ──────────────────────────────────────── */
        .hero-stats {
          opacity: 0;
        }
        .hero-stats.entered {
          animation: hero-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.68s forwards;
        }

        .stat-item {
          position: relative;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .stat-item.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .stat-item:nth-child(1) { transition-delay: 0.0s; }
        .stat-item:nth-child(2) { transition-delay: 0.1s; }
        .stat-item:nth-child(3) { transition-delay: 0.2s; }
        .stat-item:nth-child(4) { transition-delay: 0.3s; }

        /* ongoing: gradient underline on stat value hover */
        .stat-item .gradient-text {
          position: relative;
          display: inline-block;
        }
        .stat-item .gradient-text::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 100%; height: 2px;
          border-radius: 9999px;
          background: linear-gradient(90deg, hsl(200 100% 74%), hsl(215 67% 52%));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .stat-item:hover .gradient-text::after {
          transform: scaleX(1);
        }

        /* ── SCROLL INDICATOR ───────────────────────────── */
        .scroll-indicator {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .scroll-indicator.entered {
          opacity: 1;
          transition-delay: 1.1s;
        }
        .scroll-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: hsl(200 100% 74%);
          margin: 4px auto 0;
          animation: scroll-dot 1.8s ease-in-out infinite;
        }

        /* ── GRADIENT TEXT ──────────────────────────────── */
        .gradient-text {
          background: linear-gradient(135deg, hsl(200 100% 80%) 0%, hsl(215 67% 60%) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <section id="home" className="hero-section">
        {/* Background */}
        <div className="hero-grid" />
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />
        <div className="hero-orb-3" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            {/* Badge */}
            <div className={`section-badge mb-10 hero-badge ${entered ? "entered" : ""}`}>
              <span>Trusted Web Development Agency</span>
            </div>

            {/* Heading */}
            <h1
              className={`text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 tracking-tight hero-h1 ${entered ? "entered" : ""}`}
            >
              Web Development &{" "}
              <br className="hidden md:block" />
              <span className="gradient-text">IT Solutions</span> That Drive Growth
            </h1>

            {/* Subheading */}
            <p
              className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed hero-sub ${entered ? "entered" : ""}`}
            >
              From custom web development and Shopify stores to UI/UX design and
              IT consulting — we help startups and enterprises build digital
              experiences that convert.
            </p>

            {/* CTA */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-5 hero-cta-wrap ${entered ? "entered" : ""}`}>
              <a
                href="#contact"
                className="btn-primary hero-btn-primary group flex items-center gap-3 min-w-[220px] justify-center"
              >
                Get a Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="btn-secondary flex items-center gap-3 min-w-[180px] justify-center"
              >
                <Play className="w-4 h-4" />
                View Our Services
              </a>
            </div>

            {/* Stats */}
            <div
              className={`hero-stats ${entered ? "entered" : ""}`}
            >
              <div
                ref={statsRef}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-border/50"
              >
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className={`stat-item ${statsVisible ? "visible" : ""}`}
                  >
                    <StatItem value={stat.value} label={stat.label} active={statsVisible} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`scroll-indicator ${entered ? "entered" : ""}`}>
          <div
            className="w-6 h-10 rounded-full flex items-start justify-center p-2"
            style={{ border: "2px solid hsl(200 100% 74% / 0.30)" }}
          >
            <div className="scroll-dot" />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;