import { Link } from "@tanstack/react-router";
import { Search, FileText, MapPin, ArrowRight } from "lucide-react";
const steps = [
  { icon: Search, title: "Chercher", text: "Écrivez le nom d’une maladie ou un signe que vous avez remarqué.", to: "/recherche" as const, action: "Faire une recherche" },
  { icon: FileText, title: "Lire", text: "Découvrez les signes, les situations urgentes et les gestes de prévention.", to: "/maladies" as const, action: "Voir les fiches" },
  { icon: MapPin, title: "Choisir un pays", text: "Retrouvez une sélection de fiches classées par pays.", to: "/pays" as const, action: "Voir les pays" },
];
export function MotionDemo() {
  return <section className="border-b bg-secondary"><div className="mx-auto max-w-6xl px-5 py-16 md:py-20"><p className="text-sm font-bold uppercase text-primary">Comment utiliser ce guide</p><h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold">Trois façons simples de trouver l’information</h2><div className="mt-9 grid gap-px border bg-border md:grid-cols-3">{steps.map((s,i)=><Link key={s.title} to={s.to} className="group flex min-h-58 flex-col bg-background p-6 transition-colors duration-200 hover:bg-card focus-visible:outline-2 focus-visible:outline-primary"><span className="flex items-center justify-between"><s.icon className="size-7 text-primary"/><span className="font-display text-2xl text-muted-foreground">0{i+1}</span></span><h3 className="mt-6 font-display text-2xl font-semibold">{s.title}</h3><p className="mt-2 leading-6 text-muted-foreground">{s.text}</p><span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-primary">{s.action} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1"/></span></Link>)}</div></div></section>;
}
