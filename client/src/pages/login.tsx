import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    alert("This is a demo login page.");
    setLocation("/");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-slate-50 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
      >
        <div className="p-8">
           <Link href="/">
             <a className="inline-flex items-center text-sm text-slate-500 hover:text-primary mb-8 transition-colors">
               <ArrowLeft size={16} className="mr-2" /> Back to Home
             </a>
           </Link>
           
           <h1 className="text-2xl font-bold font-heading text-primary mb-2">Welcome back</h1>
           <p className="text-slate-500 mb-8">Sign in to your dashboard</p>
           
           <form onSubmit={handleLogin} className="space-y-4">
             <div className="space-y-2">
               <Label htmlFor="email">Email</Label>
               <Input id="email" type="email" placeholder="you@company.com" />
             </div>
             <div className="space-y-2">
               <Label htmlFor="password">Password</Label>
               <Input id="password" type="password" />
             </div>
             <Button type="submit" className="w-full mt-4">Sign In</Button>
           </form>
        </div>
        <div className="bg-slate-50 p-6 text-center text-sm text-slate-500 border-t border-slate-100">
           Don't have an account? <Link href="/contact"><a className="text-accent hover:underline">Contact us</a></Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
