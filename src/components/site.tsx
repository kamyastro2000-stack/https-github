import { Search } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Activity, ArrowRight, HeartPulse } from "lucide-react";
import type { Disease } from "@/data/diseases";

export function Header() {
  return <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur"><nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"><Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold"><HeartPulse className="size-6 text-primary" />Santé.Afrique</Link><div className="flex items-center gap-4 text-sm font-medium"><Link to="/recherche" className="flex items-center gap-1 hover:text-primary"><Search className="size-4"/>Rechercher</Link><Link to="/maladies" className="hover:text-primary">Maladies</Link><Link to="/pays" className="hidden hover:text-primary sm:block">Par pays</Link></div></nav></header>;
}
export function Footer() { return <footer className="mt-20 border-t"><div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 text-sm text-muted-foreground md:grid-cols-2"><p>Information éducative uniquement. En cas de doute, consultez un professionnel de santé.</p><nav className="flex flex-wrap gap-5 md:justify-end"><Link to="/politique-confidentialite">Confidentialité</Link><Link to="/conditions-utilisation">Conditions d’utilisation</Link></nav></div></footer>; }
export function DiseaseCard({ d }: { d: Disease }) { return <Link to="/maladies/$slug" params={{slug:d.slug}} className="group block border bg-card p-6 transition-colors hover:border-primary"><Activity className="size-7 text-primary"/><h3 className="mt-5 font-display text-2xl font-semibold">{d.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{d.summary}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">Lire la fiche <ArrowRight className="size-4"/></span></Link>; }
