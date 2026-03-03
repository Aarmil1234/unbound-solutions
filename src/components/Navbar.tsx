import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import logoFull from "@/assets/logo-full.png";

const navLinks = [
{ href: "#home", label: "Home" },
{ href: "#divisions", label: "Divisions" },
{ href: "#services", label: "Services" },
{ href: "#about", label: "About Us" },
{ href: "#contact", label: "Contact" }];


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);

    // Add transition class for smooth theme change
    document.documentElement.classList.add("theme-transition");
    document.documentElement.classList.toggle("dark", newDark);

    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 300);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      style={{ contain: "layout" }}>

      {/* Floating center-aligned navbar */}
      <div
        className={`flex items-center gap-2 transition-all duration-500 ${
        isScrolled ?
        "bg-background/80 backdrop-blur-2xl border border-border/50 shadow-lg rounded-full px-3 py-2 border border-white/50" :
        "bg-background/40 backdrop-blur-xl border border-border/30 rounded-full px-3 py-2 border border-white/50"}`
        }>

        {/* Logo */}
        <a
  href="#home"
  className="flex items-center px-3"
>
  <img
    src={logoFull}
    alt="Unbound Solutions Logo"
    className="h-10 w-auto"
  />
</a>

        {/* Desktop Navigation - Center Links */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center bg-muted/50 rounded-full px-1 py-1">
            {navLinks.map((link) =>
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all duration-300 text-sm font-medium px-4 py-2 rounded-full relative group">

                {link.label}
              </a>
            )}
          </div>
        </div>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-2 ml-2">
      

          <a href="#contact" className="btn-primary text-sm !py-2 !px-4">
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground p-2 rounded-full hover:bg-muted transition-colors">

            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen &&
      <div className="md:hidden fixed top-20 left-4 right-4 bg-background/95 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-xl animate-fade-in overflow-hidden">
          <div className="p-4 flex flex-col gap-2">
            {navLinks.map((link) =>
          <a
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 text-sm font-medium py-3 px-4 rounded-xl">

                {link.label}
              </a>
          )}
            <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="btn-primary text-center mt-2">

              Get Started
            </a>
          </div>
        </div>
      }
    </nav>);

};

export default Navbar;