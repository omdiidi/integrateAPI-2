export function LogoWall() {
  const clients = [
    "Northside Dental",
    "Elmwood Auto",
    "Lakeshore HVAC",
    "Riverbend Logistics",
    "Apex Construction",
    "Summit Legal",
    "Metro Properties",
    "Valley Health"
  ];

  return (
    <section className="py-12 border-b border-slate-100 bg-white snap-start">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-medium text-slate-400 mb-8 uppercase tracking-widest">
          Trusted by operations teams at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
          {clients.map((client) => (
            <span
              key={client}
              className="text-xl md:text-2xl font-bold font-heading text-slate-300 hover:text-slate-500 transition-colors cursor-default select-none"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
