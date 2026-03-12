import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let trailId = 0;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Add trail dot
      const newDot: TrailDot = {
        id: trailId++,
        x: e.clientX,
        y: e.clientY,
      };

      setTrail((prev) => [...prev.slice(-8), newDot]);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleHoverStart);
    window.addEventListener("mouseout", handleHoverEnd);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleHoverStart);
      window.removeEventListener("mouseout", handleHoverEnd);
    };
  }, []);

  // Hide on mobile/touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {trail.map((dot, index) => (
          <motion.div
            key={dot.id}
            className="pointer-events-none fixed z-[9998] rounded-full bg-primary/30"
            style={{
              left: dot.x,
              top: dot.y,
              width: 8 + index * 0.5,
              height: 8 + index * 0.5,
            }}
            initial={{ opacity: 0.6, scale: 1, x: "-50%", y: "-50%" }}
            animate={{ opacity: 0, scale: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full border-2 border-primary"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          x: "-50%",
          y: "-50%",
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
          width: isHovering ? 40 : 24,
          height: isHovering ? 40 : 24,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full bg-primary"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          x: "-50%",
          y: "-50%",
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
          width: 6,
          height: 6,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
        }}
      />
    </>
  );
};

export default CustomCursor;
