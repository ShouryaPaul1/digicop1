import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useContact } from "@/hooks/use-contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SectionHeading } from "./SectionHeading";
import { Mail, Phone, MapPin } from "lucide-react";

// Matches API input schema
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function ContactSection() {
  const { mutate, isPending } = useContact();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values, {
      onSuccess: () => form.reset()
    });
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionHeading 
          title="Start the Conversation" 
          subtitle="Ready to enhance road safety in your jurisdiction? Contact our team for a demo or consultation."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
            
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email Us", value: "partnerships@digi-cop.ai" },
                { icon: Phone, label: "Call Us", value: "+1 (555) 123-4567" },
                { icon: MapPin, label: "HQ Location", value: "San Francisco, CA" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-mono uppercase tracking-wider">{item.label}</p>
                    <p className="text-lg font-semibold text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-white/10 mt-8">
              <h4 className="text-primary font-bold mb-2">Government & Municipality?</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We offer specialized pilot programs for city traffic departments. Ask about our <span className="text-white font-semibold">"Safe Night Pilot"</span> initiative in your message.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-background/50 border-white/10 focus:border-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} className="bg-background/50 border-white/10 focus:border-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Interested in pilot program..." {...field} className="bg-background/50 border-white/10 focus:border-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your requirements..." 
                          className="min-h-[120px] bg-background/50 border-white/10 focus:border-primary resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 text-background font-bold h-12 text-lg shadow-lg shadow-primary/20"
                >
                  {isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
