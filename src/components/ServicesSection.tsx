import { useEffect, useRef, useState } from "react";
import {
  Globe,
  ShoppingCart,
  Layers,
  Lock,
  GraduationCap,
  MessageCircle,
  Search,
  BarChart3,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Custom Web Development",
    description:
      "High-performance, responsive websites built with React, Next.js, and modern technologies optimized for speed, scalability, and SEO.",
  },
  {
    icon: ShoppingCart,
    title: "WordPress & Shopify Development",
    description:
      "Professional WordPress and Shopify website development, custom themes, plugin integration, and fully optimized e-commerce solutions.",
  },
  {
    icon: Layers,
    title: "UI/UX & Graphics Designing",
    description:
      "Creative UI/UX design and graphic solutions including website design, mobile interfaces, branding, and marketing visuals.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Complete SEO services including technical SEO, on-page optimization, keyword strategy, and performance tracking to boost rankings.",
  },
  {
    icon: BarChart3,
    title: "Digital Marketing",
    description:
      "Results-driven digital marketing including social media marketing, paid ads, content strategy, and lead generation campaigns.",
  },
  {
    icon: Lock,
    title: "Cyber Security Services",
    description:
      "Advanced cybersecurity solutions including security audits, penetration testing, website protection, and threat prevention.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Automation",
    description:
      "Automate customer communication with WhatsApp bots, bulk messaging, lead automation, and CRM integrations.",
  },
  {
    icon: GraduationCap,
    title: "Professional Training",
    description:
      "Industry-focused training programs in web development, cybersecurity, and IT skills with practical real-world experience.",
  },
];

/* ── hook: fire enter/exit based on IntersectionObserver ──────── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [state, setState] = useState("hidden"); // hidden | visible | exiting

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
        } else {
          // only trigger exit if it was already visible
          setState((prev) => (prev === "visible" ? "exiting" : "hidden"));
        }
      },
      { threshold: options.threshold ?? 0.12, ...options }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, state];
}

/* ── single card ─────────────────────────────────────────────── */
const ServiceCard = ({ service, index, sectionState }) => {
  const [hovered, setHovered] = useState(false);
  const col = index % 4;
  const row = Math.floor(index / 4);
  // stagger: each card delays by col + row offset
  const delay = col * 80 + row * 40;

  let cardAnim = "";
  if (sectionState === "visible") cardAnim = "card-enter";
  else if (sectionState === "exiting") cardAnim = "card-exit";
  else cardAnim = "card-hidden";

  return (
    <div
      className={`service-card ${cardAnim}`}
      style={{ animationDelay: sectionState === "visible" ? `${delay}ms` : `${(7 - index) * 40}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ongoing: animated border gradient */}
      <span className="card-border-glow" aria-hidden />

      {/* icon */}
      <div className={`icon-wrap ${hovered ? "icon-active" : ""}`}>
        <service.icon className="w-6 h-6 icon-svg" />
        {/* ongoing: rotating ring on hover */}
        {hovered && <span className="icon-ring" aria-hidden />}
      </div>

      <h3 className={`card-title ${hovered ? "title-active" : ""}`}>
        {service.title}
      </h3>

      <p className="card-desc">{service.description}</p>

      {/* ongoing: bottom shimmer line on hover */}
      <span className={`card-shimmer ${hovered ? "shimmer-active" : ""}`} aria-hidden />
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   MAIN SECTION
════════════════════════════════════════════════════════════════ */
const ServicesSection = () => {
  const [sectionRef, sectionState] = useInView({ threshold: 0.08 });
  const [headerRef, headerState] = useInView({ threshold: 0.3 });

  return (
    <>
      <style>{`
        /* ── KEYFRAMES ─────────────────────────────────────── */

        /* header */
        @keyframes hdr-in {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes hdr-out {
          from { opacity: 1; transform: translateY(0);    }
          to   { opacity: 0; transform: translateY(-24px);}
        }

        /* badge */
        @keyframes badge-in {
          from { opacity: 0; transform: scale(0.85) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }

        /* card enter */
        @keyframes card-in {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        /* card exit */
        @keyframes card-out {
          from { opacity: 1; transform: translateY(0)    scale(1);    }
          to   { opacity: 0; transform: translateY(30px) scale(0.95); }
        }

        /* ongoing: slow background orb drift */
        @keyframes orb-drift {
          0%,100% { transform: translate(0, 0)     scale(1);    }
          33%      { transform: translate(40px, -30px) scale(1.08); }
          66%      { transform: translate(-30px, 20px) scale(0.95); }
        }

        /* ongoing: border glow pulse */
        @keyframes border-pulse {
          0%,100% { opacity: 0.0; }
          50%      { opacity: 1.0; }
        }

        /* ongoing: icon ring spin */
        @keyframes ring-spin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }

        /* ongoing: shimmer sweep */
        @keyframes shimmer-sweep {
          from { left: -80%; }
          to   { left: 120%; }
        }

        /* ongoing: grid line scroll */
        @keyframes grid-scroll {
          from { background-position: 0 0; }
          to   { background-position: 40px 40px; }
        }

        /* ── SECTION ───────────────────────────────────────── */
        .services-section {
          position: relative;
          padding: 6rem 0;
          overflow: hidden;
          background: hsl(218 55% 9%);
        }

        /* drifting ambient orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          animation: orb-drift 14s ease-in-out infinite;
        }
        .orb-1 {
          width: 500px; height: 500px;
          top: -120px; left: -100px;
          background: radial-gradient(circle, hsl(215 67% 36% / 0.22) 0%, transparent 70%);
          animation-duration: 16s;
        }
        .orb-2 {
          width: 400px; height: 400px;
          bottom: -80px; right: -80px;
          background: radial-gradient(circle, hsl(200 100% 74% / 0.14) 0%, transparent 70%);
          animation-duration: 12s;
          animation-delay: -5s;
        }
        .orb-3 {
          width: 300px; height: 300px;
          top: 40%; left: 50%;
          background: radial-gradient(circle, hsl(215 67% 50% / 0.10) 0%, transparent 70%);
          animation-duration: 20s;
          animation-delay: -9s;
        }

        /* scrolling grid */
        .grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(hsl(200 100% 74% / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsl(200 100% 74% / 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: grid-scroll 8s linear infinite;
        }

        /* ── HEADER ────────────────────────────────────────── */
        .hdr-badge {
          opacity: 0;
        }
        .hdr-badge.in {
          animation: badge-in 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s forwards;
        }

        .hdr-title {
          opacity: 0;
        }
        .hdr-title.in {
          animation: hdr-in 0.6s cubic-bezier(0.22,1,0.36,1) 0.22s forwards;
        }
        .hdr-title.out {
          animation: hdr-out 0.4s ease forwards;
        }

        .hdr-sub {
          opacity: 0;
        }
        .hdr-sub.in {
          animation: hdr-in 0.6s cubic-bezier(0.22,1,0.36,1) 0.34s forwards;
        }
        .hdr-sub.out {
          animation: hdr-out 0.4s ease 0.05s forwards;
        }

        /* ── CARDS ─────────────────────────────────────────── */
        .service-card {
          position: relative;
          padding: 1.5rem;
          border-radius: 1rem;
          background: hsl(218 48% 13%);
          border: 1px solid hsl(218 35% 20%);
          overflow: hidden;
          cursor: default;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }

        .service-card:hover {
          border-color: hsl(200 100% 74% / 0.22);
          box-shadow: 0 12px 40px hsl(218 60% 4% / 0.50),
                      0 0 0 1px hsl(200 100% 74% / 0.08);
          transform: translateY(-4px);
        }

        /* enter */
        .card-hidden { opacity: 0; transform: translateY(40px) scale(0.96); }

        .card-enter {
          animation: card-in 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* exit */
        .card-exit {
          animation: card-out 0.4s ease both;
        }

        /* ongoing: animated gradient border on hover */
        .card-border-glow {
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: linear-gradient(135deg,
            hsl(200 100% 74% / 0),
            hsl(200 100% 74% / 0.20),
            hsl(215 67% 52% / 0.15),
            hsl(200 100% 74% / 0));
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 0;
          background-size: 300% 300%;
          animation: border-pulse 3s ease-in-out infinite;
        }

        .service-card:hover .card-border-glow {
          opacity: 1;
        }

        /* ── ICON ──────────────────────────────────────────── */
        .icon-wrap {
          position: relative;
          width: 48px; height: 48px;
          border-radius: 12px;
          background: hsl(215 67% 36% / 0.15);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem;
          transition: background 0.3s ease, box-shadow 0.3s ease;
          z-index: 1;
          flex-shrink: 0;
        }

        .icon-wrap.icon-active {
          background: linear-gradient(135deg, hsl(200 100% 74% / 0.20), hsl(215 67% 52% / 0.25));
          box-shadow: 0 0 20px hsl(200 100% 74% / 0.20);
        }

        .icon-svg {
          color: hsl(200 100% 74%);
          transition: transform 0.3s ease;
          position: relative; z-index: 2;
        }

        .service-card:hover .icon-svg {
          transform: scale(1.12);
        }

        /* ongoing: spinning ring */
        .icon-ring {
          position: absolute;
          inset: -4px;
          border-radius: 16px;
          border: 1.5px solid transparent;
          border-top-color: hsl(200 100% 74% / 0.60);
          border-right-color: hsl(215 67% 60% / 0.30);
          animation: ring-spin 1.6s linear infinite;
          pointer-events: none;
        }

        /* ── TEXT ──────────────────────────────────────────── */
        .card-title {
          font-family: 'Outfit', sans-serif;
          font-size: 0.9375rem;
          font-weight: 600;
          color: hsl(210 25% 88%);
          margin-bottom: 0.5rem;
          transition: color 0.3s ease;
          position: relative; z-index: 1;
          line-height: 1.3;
        }

        .card-title.title-active {
          color: hsl(200 100% 82%);
        }

        .card-desc {
          font-size: 0.8125rem;
          color: hsl(214 18% 52%);
          line-height: 1.65;
          position: relative; z-index: 1;
        }

        /* ── SHIMMER LINE ──────────────────────────────────── */
        .card-shimmer {
          position: absolute;
          bottom: 0; left: -80%;
          width: 60%; height: 1px;
          background: linear-gradient(90deg,
            transparent,
            hsl(200 100% 74% / 0.60),
            transparent);
          pointer-events: none;
          opacity: 0;
        }

        .card-shimmer.shimmer-active {
          opacity: 1;
          animation: shimmer-sweep 1.2s ease forwards;
        }

        /* ── GRADIENT TEXT ─────────────────────────────────── */
        .gradient-heading {
          background: linear-gradient(135deg, hsl(200 100% 80%) 0%, hsl(215 67% 60%) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <section id="services" className="services-section">
        {/* Ambient background */}
        <div className="grid-bg" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="container mx-auto px-6 relative z-10">

          {/* ── Section Header ─────────────────────────────── */}
          <div ref={headerRef} className="text-center mb-16">
            <span className={`section-badge mb-4 inline-flex hdr-badge ${headerState === "visible" ? "in" : ""}`}>
              Our Services
            </span>

            <h2
              className={`text-3xl md:text-5xl font-bold mt-4 mb-6 hdr-title ${
                headerState === "visible" ? "in" : headerState === "exiting" ? "out" : ""
              }`}
            >
              End-to-End{" "}
              <span className="gradient-heading">Digital Solutions</span>
            </h2>

            <p
              className={`text-muted-foreground max-w-2xl mx-auto hdr-sub ${
                headerState === "visible" ? "in" : headerState === "exiting" ? "out" : ""
              }`}
            >
              Whether you're a startup launching your first website or an
              enterprise scaling your digital presence, our expert team delivers
              solutions that drive measurable results.
            </p>
          </div>

          {/* ── Services Grid ───────────────────────────────── */}
          <div
            ref={sectionRef}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {services.map((service, i) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={i}
                sectionState={sectionState}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;