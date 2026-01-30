import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactSection } from "@/components/ContactSection";
import { motion } from "framer-motion";
import { AlertTriangle, Moon, Target, Shield, Zap, Server, Database, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-background">
      <Navbar />
      
      <Hero />

      {/* PROBLEM SECTION */}
      <section id="problem" className="py-24 bg-gradient-to-b from-background to-card/20 relative">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeading 
            title="The Night-Time Crisis" 
            subtitle="Darkness hides danger. Current enforcement technology fails when the sun goes down."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Moon} 
              title="Limited Visibility" 
              description="Standard cameras are blind in low light, missing crucial evidence and license plates during peak violation hours."
              delay={0}
            />
            <FeatureCard 
              icon={AlertTriangle} 
              title="4x Fatality Rate" 
              description="Night driving is disproportionately dangerous. 50% of traffic deaths happen at night despite only 25% of traffic volume."
              delay={0.1}
              highlight
            />
            <FeatureCard 
              icon={Target} 
              title="Enforcement Gap" 
              description="Manual patrols cannot cover all areas. Violators know they are invisible to automated systems after dark."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section id="solution" className="py-24 relative overflow-hidden">
        {/* Background abstract element */}
        <div className="absolute top-1/2 left-0 w-full h-[500px] bg-primary/5 blur-[100px] -translate-y-1/2 rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <SectionHeading 
            title="Intelligent Enforcement" 
            subtitle="A complete end-to-end system for detection, processing, and enforcement."
          />

          <div className="relative mt-16">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Detect", desc: "Edge AI identifies violations in real-time" },
                { step: "02", title: "Capture", desc: "Low-light camera grabs evidential footage" },
                { step: "03", title: "Verify", desc: "Cloud AI double-checks for false positives" },
                { step: "04", title: "Enforce", desc: "Automatic citation generation for review" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative bg-card border border-white/10 p-6 rounded-xl hover:border-primary/50 transition-colors z-10 group"
                >
                  <div className="text-4xl font-display font-black text-white/5 mb-4 group-hover:text-primary/10 transition-colors">{item.step}</div>
                  <div className="w-3 h-3 bg-primary rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-[52px] hidden md:block shadow-[0_0_10px_var(--primary)]" />
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY SECTION */}
      <section id="technology" className="py-24 bg-card/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <SectionHeading 
                title="Edge AI Stack" 
                subtitle="Processing power where it matters."
                alignment="left"
              />
              <div className="space-y-6">
                <TechItem icon={Zap} title="Zero-Latency Edge Compute" desc="On-device processing eliminates bandwidth bottlenecks and ensures instant capture triggers." />
                <TechItem icon={Eye} title="Custom Night Vision Model" desc="Trained on millions of low-light scenarios to distinguish vehicles from shadows and reflections." />
                <TechItem icon={Shield} title="Military-Grade Security" desc="End-to-end encryption for all evidence data ensuring chain-of-custody integrity." />
                <TechItem icon={Server} title="Seamless Integration" desc="API-first design connects with existing municipal infrastructure and databases." />
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl rounded-full" />
              {/* Tech stack visual representation */}
              <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
                 {/* Decorative code/tech UI */}
                 <div className="font-mono text-xs text-primary/70 mb-4 border-b border-white/10 pb-4 flex justify-between">
                    <span>SYSTEM_STATUS: ONLINE</span>
                    <span>LATENCY: 12ms</span>
                 </div>
                 <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded border-l-2 border-primary">
                      <div className="text-white font-bold text-sm">Input Stream</div>
                      <div className="text-xs text-muted-foreground">4K Night Vision Sensor @ 60fps</div>
                    </div>
                    <div className="flex justify-center">
                      <div className="h-8 w-0.5 bg-white/20"></div>
                    </div>
                    <div className="bg-primary/20 p-4 rounded border border-primary/50 animate-pulse">
                      <div className="text-white font-bold text-sm flex justify-between">
                        <span>AI Inference Engine</span>
                        <span className="text-primary">PROCESSING</span>
                      </div>
                      <div className="text-xs text-primary/80">Vehicle Detection • LPR • Speed Estimation</div>
                    </div>
                    <div className="flex justify-center">
                      <div className="h-8 w-0.5 bg-white/20"></div>
                    </div>
                    <div className="bg-white/5 p-4 rounded border-l-2 border-green-500">
                      <div className="text-white font-bold text-sm">Secure Output</div>
                      <div className="text-xs text-muted-foreground">Encrypted Evidence Package &rarr; Cloud Upload</div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC FIT SECTION */}
      <section id="strategy" className="py-24 relative">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeading 
            title="Strategic Impact" 
            subtitle="Why municipalities are switching to Digi-Cop."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-card to-card/50 border-white/10 p-8 hover:border-primary/30 transition-all group">
              <div className="mb-6 bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Database className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Revenue Generation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Self-funding model through citation revenue. Our system catches 3x more violations during night hours than manual patrols, creating a sustainable revenue stream for road maintenance and safety programs.
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-card to-card/50 border-white/10 p-8 hover:border-primary/30 transition-all group">
              <div className="mb-6 bg-green-500/10 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Safety First</h3>
              <p className="text-muted-foreground leading-relaxed">
                The primary goal is saving lives. Visible enforcement technology changes driver behavior. Pilot cities saw a 40% reduction in night-time speeding incidents within 6 months of installation.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <ContactSection />
      
      <Footer />
    </div>
  );
}

// Helper Components
function FeatureCard({ icon: Icon, title, description, delay, highlight = false }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`p-6 rounded-xl border ${highlight ? 'bg-primary/5 border-primary/50 shadow-[0_0_30px_rgba(6,182,212,0.1)]' : 'bg-card border-white/5'} hover:border-primary/30 transition-all group`}
    >
      <div className={`w-12 h-12 rounded-lg ${highlight ? 'bg-primary text-background' : 'bg-white/5 text-primary'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function TechItem({ icon: Icon, title, desc }: any) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 mt-1">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      <div>
        <h4 className="text-white font-bold text-lg mb-1">{title}</h4>
        <p className="text-muted-foreground text-sm">{desc}</p>
      </div>
    </div>
  );
}
