import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="py-12 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-6 tracking-tight">
            Stop drowning in admin work.
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            Let's build the systems your business deserves.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="h-14 px-10 text-lg bg-[#007AFF] text-white hover:bg-[#0062CC] shadow-lg hover:shadow-xl transition-all duration-300">
                  Contact us directly
                </Button>
              </motion.div>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="h-14 px-10 text-lg border-slate-200 hover:bg-slate-50">
                Email us directly
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
