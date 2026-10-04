import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X, ArrowRight, AlertTriangle } from "lucide-react";
import { diseases } from "@/data/diseases";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/recherche")({
  head: () => ({ meta: [
    { title: "Chercher une maladie ou un signe | Santé.Afrique" },
    { name: "description", content: "Cherchez parmi six fiches santé par nom de maladie ou par signe observé." },
    { property: "og:title", content: "Chercher une maladie ou un signe | Santé.Afrique" },
    { property: "og:description", content: "Cherchez parmi six fiches santé par nom de maladie ou par signe observé." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: SearchPage,
});
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const allSigns = [...new Set(diseases.flatMap(d => d.signs))].sort();
function SearchPage() {
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (s: string) => setPicked(p => p.includes(s) ? p.filter(x => x !== s) : [...p,s]);
  const results = useMemo(() => {
    const nq = norm(q.trim());
    return diseases.map(d => {
      const text = norm([d.name,d.summary,...d.signs,...d.prevent,...d.urgent].join(" "));
      const matched = d.signs.filter(s => picked.includes(s));
      return {d, matched, ok: (!nq || text.includes(nq)) && (picked.length === 0 || matched.length > 0)};
    }).filter(r => r.ok).sort((a,b) => b.matched.length - a.matched.length);
  },[q,picked]);
  return <main className="mx-auto max-w-6xl px-5 py-12 md:py-16">
    <p className="text-sm font-bold uppercase text-primary">Trouver une fiche</p>
    <h1 className="mt-3 font-display text-5xl font-semibold">Que souhaitez-vous chercher ?</h1>
    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Écrivez un nom de maladie ou un signe, comme « fièvre ». Vous pouvez aussi choisir un signe ci-dessous.</p>
    <div className="mt-8 flex max-w-2xl items-center gap-3 border bg-card px-4 focus-within:border-primary"><Search className="size-5 shrink-0 text-primary"/><input aria-label="Nom de maladie ou signe" value={q} onChange={e=>setQ(e.target.value)} placeholder="Ex. fièvre, diabète, moustique" className="min-h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"/>{q && <Button variant="ghost" size="icon" aria-label="Effacer la recherche" title="Effacer la recherche" onClick={()=>setQ("")}><X/></Button>}</div>
    <div className="mt-8"><h2 className="font-display text-2xl font-semibold">Ou choisir un signe</h2><div className="mt-4 flex flex-wrap gap-2">{allSigns.map(s=><Button key={s} variant={picked.includes(s)?"default":"outline"} aria-pressed={picked.includes(s)} onClick={()=>toggle(s)} className="min-h-11 whitespace-normal px-4 text-left">{s}</Button>)}</div>{picked.length>0 && <Button variant="link" onClick={()=>setPicked([])} className="mt-3 px-0">Effacer les signes choisis</Button>}</div>
    <p className="mt-10 text-sm font-semibold text-muted-foreground" aria-live="polite">{results.length} fiche{results.length>1?"s":""} trouvée{results.length>1?"s":""}</p>
    {results.length>0?<div className="mt-3 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">{results.map(({d,matched})=><Link key={d.slug} to="/maladies/$slug" params={{slug:d.slug}} className="group block min-h-48 bg-card p-6 transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary"><h2 className="font-display text-2xl font-semibold">{d.name}</h2><p className="mt-2 leading-6 text-muted-foreground">{d.summary}</p>{picked.length>0 && <p className="mt-4 text-sm text-primary">Signe{matched.length>1?"s":""} présent{matched.length>1?"s":""} dans cette fiche : {matched.join(", ")}</p>}<span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">Lire la fiche <ArrowRight className="size-4 transition-transform group-hover:translate-x-1"/></span></Link>)}</div>:<div className="mt-3 border-l-4 border-accent bg-secondary p-6"><h2 className="font-semibold">Aucune fiche trouvée</h2><p className="mt-2 text-muted-foreground">Essayez un autre mot ou effacez les signes choisis. Ce guide présente seulement six maladies.</p><Button variant="outline" className="mt-4" onClick={()=>{setQ("");setPicked([])}}>Voir toutes les fiches</Button></div>}
    <p className="mt-10 flex max-w-3xl gap-3 border-l-4 border-accent bg-secondary p-5 text-sm leading-6"><AlertTriangle className="size-5 shrink-0 text-primary"/><span>Un signe peut avoir plusieurs causes. Cette recherche aide à trouver une fiche, mais ne pose pas de diagnostic. En cas de doute, consultez un professionnel de santé.</span></p>
  </main>;
}
