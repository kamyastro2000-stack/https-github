import { Search, FileText, MapPin } from "lucide-react";

const steps = [
  { icon: Search, title: "Chercher", text: "Tapez une maladie ou un symptôme." },
  { icon: FileText, title: "Comprendre", text: "Signes, urgences et prévention sur une fiche." },
  { icon: MapPin, title: "Situer", text: "Voir les pays où elle est la plus présente." },
];

export function MotionDemo() {
  return (
    <section className="border-b bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-primary">Comment ça marche</p>
          <h2 className="mt-4 font-display text-4xl font-semibold">De la question à l’information utile en trois gestes</h2>
          <ol className="mt-8 space-y-5">
            {steps.map((s, i) => (
              <li key={s.title} className="md-step flex gap-4" style={{ animationDelay: `${i * 3}s` }}>
                <s.icon className="mt-1 size-5 shrink-0 text-primary" />
                <div><p className="font-semibold">{s.title}</p><p className="text-muted-foreground">{s.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <div aria-hidden className="relative h-80 overflow-hidden rounded-md border bg-background p-6">
          <div className="md-search flex items-center gap-3 rounded-sm border px-4 py-3">
            <Search className="size-4 text-muted-foreground" />
            <span className="md-type overflow-hidden whitespace-nowrap border-r-2 border-primary text-sm">paludisme</span>
          </div>
          <div className="md-card mt-5 rounded-sm border p-5">
            <p className="font-display text-xl font-semibold">Paludisme</p>
            <div className="mt-3 space-y-2">
              <div className="md-line h-2 w-full bg-muted" />
              <div className="md-line h-2 w-4/5 bg-muted" style={{ animationDelay: ".2s" }} />
              <div className="md-line h-2 w-3/5 bg-accent" style={{ animationDelay: ".4s" }} />
            </div>
          </div>
          <div className="md-map mt-5 flex gap-2">
            {["Nigeria", "RD Congo", "Côte d’Ivoire"].map((p, i) => (
              <span key={p} className="md-pin flex items-center gap-1 rounded-sm border px-2 py-1 text-xs" style={{ animationDelay: `${6.2 + i * 0.3}s` }}>
                <MapPin className="size-3 text-primary" />{p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
