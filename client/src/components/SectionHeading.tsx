import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center" | "right";
}

export function SectionHeading({ title, subtitle, alignment = "center" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-20 ${alignment === "center" ? "text-center" : `text-${alignment}`}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary/50 mb-4 inline-block">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light tracking-wide">
            {subtitle}
          </p>
        )}
        <div className={`h-1 w-24 bg-primary mt-6 ${alignment === "center" ? "mx-auto" : ""} shadow-[0_0_10px_var(--primary)]`} />
      </motion.div>
    </div>
  );
}
