import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Problem", to: "problem" },
    { name: "Solution", to: "solution" },
    { name: "Technology", to: "technology" },
    { name: "Strategic Fit", to: "strategy" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <ScrollLink to="hero" smooth={true} duration={500} className="cursor-pointer flex items-center gap-2 group">
          <div className="relative">
            <ShieldCheck className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
            <div className="absolute inset-0 bg-primary blur-lg opacity-20 group-hover:opacity-50 transition-opacity" />
          </div>
          <span className="text-2xl font-display font-bold tracking-widest text-white">
            DIGI<span className="text-primary">-COP</span>
          </span>
        </ScrollLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              offset={-80}
              className="text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer transition-colors uppercase tracking-widest font-mono hover:text-glow"
            >
              {link.name}
            </ScrollLink>
          ))}
          <ScrollLink to="contact" smooth={true} duration={500} offset={-80}>
            <Button className="bg-primary text-background font-bold hover:bg-white hover:text-background hover:scale-105 transition-all shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              Contact Us
            </Button>
          </ScrollLink>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="text-lg font-medium text-white/80 hover:text-primary py-2 border-b border-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </ScrollLink>
              ))}
              <ScrollLink to="contact" smooth={true} duration={500} offset={-80} onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mt-4 bg-primary text-background font-bold">
                  Contact Us
                </Button>
              </ScrollLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
