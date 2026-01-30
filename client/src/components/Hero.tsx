import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link as ScrollLink } from "react-scroll";
import { ChevronRight, Shield, Eye, Activity } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      
      {/* Dynamic Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Night traffic highway */}
        <img 
          src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2000&auto=format&fit=crop"
          alt="Night time traffic blurred lights"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      <div className="container relative z-10 px-4 md:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Next Gen Traffic Enforcement
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-none"
        >
          <span className="block text-white">AI-POWERED</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-200 to-primary text-glow">
            NIGHT VISION
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-muted-foreground max-w-3xl mb-10 font-light"
        >
          Restoring road safety when visibility is lowest. 
          Advanced edge AI for detecting traffic violations in low-light conditions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <ScrollLink to="problem" smooth={true} duration={500} offset={-80}>
            <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-primary text-background hover:bg-white hover:text-background font-bold tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              Discover The Solution
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={500} offset={-80}>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-primary/50 text-primary hover:bg-primary/10">
              Request Demo
            </Button>
          </ScrollLink>
        </motion.div>

        {/* Floating Stats / Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
        >
          {[
            { icon: Eye, title: "Low Light Vision", desc: "Crystal clear capture at <0.1 lux" },
            { icon: Activity, title: "Real-time Edge AI", desc: "Processing <100ms latency" },
            { icon: Shield, title: "Tamper Proof", desc: "Encrypted evidence chain" },
          ].map((item, i) => (
            <div key={i} className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 flex items-start gap-4 hover:border-primary/50 transition-colors group">
              <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
