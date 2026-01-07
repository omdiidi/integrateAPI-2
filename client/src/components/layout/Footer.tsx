import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-6 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 mb-6 md:mb-12">
          <div className="md:col-span-1">
            <Link href="/">
              <a className="text-xl font-bold font-heading tracking-tight text-primary mb-2 md:mb-4 block">
                IntegrateAPI
              </a>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 md:mb-6">
              Modernizing operations for forward-thinking businesses. We connect your tools so you can focus on growth.
            </p>
            <div className="text-sm text-slate-400">
              © {new Date().getFullYear()} IntegrateAPI.
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-primary mb-2 md:mb-4">Company</h4>
            <ul className="space-y-1 md:space-y-2 text-sm text-slate-500">
              <li><Link href="/about"><a className="hover:text-accent transition-colors">About</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-accent transition-colors">Contact</a></Link></li>
              <li><Link href="/ai4u"><a className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#DC2626] text-white text-xs font-medium rounded hover:bg-[#B91C1C] transition-colors">AI4U</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary mb-2 md:mb-4">Services</h4>
            <ul className="space-y-1 md:space-y-2 text-sm text-slate-500">
              <li><Link href="/services"><a className="hover:text-accent transition-colors">Workflow Automation</a></Link></li>
              <li><Link href="/services"><a className="hover:text-accent transition-colors">System Integration</a></Link></li>
              <li><Link href="/services"><a className="hover:text-accent transition-colors">Data Dashboards</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary mb-2 md:mb-4">Contact</h4>
            <ul className="space-y-1 md:space-y-2 text-sm text-slate-500">
              <li><Link href="/contact"><a className="hover:text-accent transition-colors">Get in touch</a></Link></li>
              <li>Serving clients worldwide</li>
            </ul>
          </div>
        </div>

        <div className="pt-4 md:pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
          </div>
          <div className="flex items-center gap-6">
            <p>Made with calm precision.</p>
            <Link href="/login"><a className="text-slate-300 hover:text-slate-400 transition-colors">Log in</a></Link>
            <Link href="/demo"><a className="inline-flex items-center gap-2 px-4 py-2 bg-[#007AFF] text-white text-sm font-medium rounded-lg hover:bg-[#0062CC] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">View Demo</a></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
