import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy, Mail, MessageSquare, Phone, User, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

// Contact data - hidden from main page, only shown in modal
const CONTACTS = [
  {
    id: "nicholas",
    name: "Nicholas Pardon",
    email: "nkpardon8@gmail.com",
    phone: "4252293497",
    phoneFormatted: "(425) 229-3497",
    avatar: "/nicholas.png",
  },
  {
    id: "omid",
    name: "Omid Zahrai",
    email: "zomid717@gmail.com",
    phone: "4254421742",
    phoneFormatted: "(425) 442-1742",
    avatar: "/omid.png",
  },
];

// Contact Modal Component
interface ContactModalProps {
  person: typeof CONTACTS[0] | null;
  open: boolean;
  onClose: () => void;
}

function ContactModal({ person, open, onClose }: ContactModalProps) {
  const { toast } = useToast();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
  }, []);

  const copyToClipboard = useCallback((text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard.`,
    });
  }, [toast]);

  if (!person) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        hideCloseButton
        className="max-w-sm p-0 gap-0 overflow-hidden border-0 shadow-2xl bg-white"
        style={{
          animation: reducedMotion ? "none" : undefined,
        }}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#007AFF] to-[#5856D6] p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-white" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <DialogHeader className="p-0">
                <DialogTitle className="text-xl font-bold text-white">
                  Contact {person.name.split(" ")[0]}
                </DialogTitle>
              </DialogHeader>
              <p className="text-white/80 text-sm">{person.name}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Email</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 font-mono">
                {person.email}
              </div>
              <button
                onClick={() => copyToClipboard(person.email, "Email")}
                className="p-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                aria-label="Copy email"
              >
                <Copy className="w-4 h-4 text-slate-600" />
              </button>
            </div>
            <a
              href={`mailto:${person.email}`}
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#007AFF] hover:bg-[#0062CC] text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
            >
              <Mail className="w-4 h-4" />
              Send Email
            </a>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Phone</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 font-mono">
                {person.phoneFormatted}
              </div>
              <button
                onClick={() => copyToClipboard(person.phone, "Phone number")}
                className="p-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                aria-label="Copy phone number"
              >
                <Copy className="w-4 h-4 text-slate-600" />
              </button>
            </div>
            <div className="flex gap-2">
              <a
                href={`sms:${person.phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                Text
              </a>
              <a
                href={`tel:${person.phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Person Card Component
interface PersonCardProps {
  person: typeof CONTACTS[0];
  onContact: (person: typeof CONTACTS[0]) => void;
}

function PersonCard({ person, onContact }: PersonCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-5 mb-6">
        {person.avatar ? (
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm shrink-0">
            <img
              src={person.avatar}
              alt={person.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center border-2 border-white shadow-sm shrink-0">
            <User className="w-8 h-8 text-white" />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-slate-800">{person.name}</h3>
          <p className="text-sm text-slate-500">Co-founder</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onContact(person)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#007AFF] hover:bg-[#0062CC] text-white text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-md"
        >
          <Mail className="w-4 h-4" />
          Email
        </button>
        <button
          onClick={() => onContact(person)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-md"
        >
          <MessageSquare className="w-4 h-4" />
          Text
        </button>
        <button
          onClick={() => onContact(person)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-md"
        >
          <Phone className="w-4 h-4" />
          Call
        </button>
      </div>
    </div>
  );
}

export default function Contact() {
  const [selectedPerson, setSelectedPerson] = useState<typeof CONTACTS[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContactClick = useCallback((person: typeof CONTACTS[0]) => {
    setSelectedPerson(person);
    setModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-20"
      >
        <section className="py-10 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold font-heading text-primary mb-4">Contact Us</h1>
            <p className="text-slate-600">Let's discuss your operational challenges.</p>
          </div>
        </section>

        {/* Contact Us Directly Section */}
        <section className="py-12 border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl font-bold font-heading text-primary text-center mb-8">
              Contact us directly
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CONTACTS.map((person) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  onContact={handleContactClick}
                />
              ))}
            </div>
          </div>
        </section>
      </motion.main>
      <Footer />

      {/* Contact Modal */}
      <ContactModal
        person={selectedPerson}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
