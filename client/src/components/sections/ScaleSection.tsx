import { motion } from "framer-motion";

export function ScaleSection() {
  return (
    <section className="bg-primary py-12 text-white relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" className="text-white" fill="currentColor" />
          </pattern>
          <rect width="400" height="400" fill="url(#dots)" />
          {/* Curved Lines */}
          <path d="M0,200 Q200,100 400,200" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" />
          <path d="M0,250 Q200,150 400,250" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="max-w-xl">
            <div className="text-accent font-semibold text-sm tracking-wide uppercase mb-4">
              Scale & Reliability
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 leading-tight">
              Built for operations that cannot stop.
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              We design systems that are robust, error-resistant, and scalable. When your business grows, your processes shouldn't break.
            </p>
          </div>
        </div>

        {/* Stats Band */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
          {[
            { value: "20+", label: "Hours saved weekly", sub: "per team member" },
            { value: "99.9%", label: "Uptime reliability", sub: "on automated flows" },
            { value: "0", label: "Missed handoffs", sub: "since implementation" },
            { value: "3x", label: "Faster turnaround", sub: "from lead to invoice" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-1"
            >
              <div className="text-4xl md:text-5xl font-bold text-white font-heading">{stat.value}</div>
              <div className="text-sm font-medium text-accent uppercase tracking-wider">{stat.label}</div>
              <div className="text-xs text-slate-400">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
