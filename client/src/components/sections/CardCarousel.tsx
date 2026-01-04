import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ArrowRight, Stethoscope, Briefcase, ShoppingBag, Truck, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CardCarousel() {
  const industries = [
    {
      title: "Private Clinics",
      description: "Automate patient intake, appointment reminders, and follow-ups. Connect your EMR to your scheduling software seamlessly.",
      icon: <Stethoscope className="text-accent" size={24} />,
      tools: ["EMR", "Scheduling", "Billing"]
    },
    {
      title: "Specialist Contractors",
      description: "From quote to invoice without the paperwork. Track field crews, material usage, and project milestones in real-time.",
      icon: <Briefcase className="text-accent" size={24} />,
      tools: ["Estimating", "Field Ops", "Accounting"]
    },
    {
      title: "Niche Retail",
      description: "Sync your physical POS with your online store inventory. Automate restocking orders and customer loyalty tracking.",
      icon: <ShoppingBag className="text-accent" size={24} />,
      tools: ["POS", "E-commerce", "Inventory"]
    },
    {
      title: "Local Logistics",
      description: "Dispatch faster and track every delivery. Give your customers automated updates and keep your drivers efficient.",
      icon: <Truck className="text-accent" size={24} />,
      tools: ["Dispatch", "GPS", "Notifications"]
    },
    {
      title: "Property Management",
      description: "Handle maintenance requests, lease renewals, and tenant communications on autopilot. Keep owners happy with transparent reporting.",
      icon: <Building2 className="text-accent" size={24} />,
      tools: ["Leasing", "Maintenance", "Portals"]
    }
  ];

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-primary mb-3">
              Solutions for every operator.
            </h2>
            <p className="text-base text-slate-600">
              We specialize in service-based businesses with complex workflows and lean teams.
            </p>
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {industries.map((item, index) => (
              <CarouselItem key={index} className="pl-3 md:basis-1/2 lg:basis-1/3">
                <div className="h-full bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all group relative overflow-hidden flex flex-col">
                  {/* Top Accent Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-accent/20 group-hover:bg-accent transition-colors" />

                  <div className="mb-4 p-2 bg-slate-50 rounded-lg w-fit group-hover:bg-accent/10 transition-colors">
                    {item.icon}
                  </div>

                  <h3 className="text-lg font-bold text-primary mb-2 font-heading">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">
                    {item.description}
                  </p>

                  <div className="border-t border-slate-50 pt-4">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tools.map((tool) => (
                        <span key={tool} className="text-xs font-medium text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded">
                          {tool}
                        </span>
                      ))}
                    </div>

                    <a href="#" className="inline-flex items-center text-xs font-semibold text-primary hover:text-accent transition-colors">
                      Learn more <ArrowRight className="ml-2 w-3 h-3" />
                    </a>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center gap-2 mt-6 justify-end">
            <CarouselPrevious className="static transform-none translate-y-0 h-9 w-9 border-slate-200 hover:bg-slate-50 hover:text-primary" />
            <CarouselNext className="static transform-none translate-y-0 h-9 w-9 border-slate-200 hover:bg-slate-50 hover:text-primary" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
