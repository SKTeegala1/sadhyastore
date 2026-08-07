import { Leaf, Truck, ShieldCheck, Sparkles } from "lucide-react";

export default function Features() {
  const feats = [
    { icon: Leaf, title: "100% Natural", desc: "No preservatives, no additives — just pure goodness." },
    { icon: Truck, title: "Fresh Delivery", desc: "Vacuum-sealed & dispatched within 24 hours pan-India." },
    { icon: ShieldCheck, title: "Quality Assured", desc: "Hand-graded and lab-tested for freshness & purity." },
    { icon: Sparkles, title: "Festive Ready", desc: "Elegant gift boxes for every occasion & celebration." },
  ];
  return (
    <section id="why" className="py-20" style={{ background: "linear-gradient(135deg, oklch(0.36 0.11 30), oklch(0.28 0.08 25))" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-accent font-semibold uppercase tracking-widest text-xs">Why Sadhya</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-2">Every box tells a story of care.</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {feats.map((f) => (
            <div key={f.title} className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 text-primary-foreground">
              <div className="w-12 h-12 rounded-xl grid place-items-center mb-4" style={{ background: "var(--gradient-warm)" }}>
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-xl">{f.title}</h3>
              <p className="text-sm text-primary-foreground/70 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}