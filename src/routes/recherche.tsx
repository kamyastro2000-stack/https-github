import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X, ArrowRight, AlertTriangle } from "lucide-react";
import { diseases } from "@/data/diseases";

export const Route = createFileRoute("/recherche")({
  head: () => ({
    meta: [
      { title: "Rechercher une maladie ou un symptôme | Santé.Afrique" },
      { name: "description", content: "Cherchez par nom ou cochez vos symptômes pour trouver les fiches qui correspondent." },
      { property: "og:title", content: "Recherche | Santé.Afrique" },
      { property: "og:description", content: "Trouvez une fiche par nom de maladie ou par symptôme." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const allSigns = [...new Set(diseases.flatMap((d) => d.signs))].sort();

function SearchPage() {
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (s: string) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const results = useMemo(() => {
    const nq = norm(q.trim());
    return diseases
      .map((d) => {
        const text = norm([d.name, d.summary, ...d.signs, ...d.prevent, ...d.urgent].join(" "));
        const matched = d.signs.filter((s) => picked.includes(s));
        return { d, matched, ok: (!nq || text.includes(nq)) && (picked.length === 0 || matched.length > 0) };
      })
      .filter((r) => r.ok)
      .sort((a, b) => b.matched.length - a.matched.length);
  }, [q, picked]);

  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-display text-5xl font-semibold">Recherche</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">Tapez un nom ou cochez les symptômes observés. Les fiches les plus proches apparaissent en premier.</p>

      <label className="mt-8 flex items-center gap-3 rounded-md border bg-card px-4 py-3 focus-within:border-primary">
        <Search className="size-5 text-muted-foreground" />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ex. fièvre, diabète, moustique" className="w-full bg-transparent outline-none" />
        {q && <button onClick={() => setQ("")} aria-label="Effacer"><X className="size-4" /></button>}
      </label>

      <div className="mt-6">
        <p className="text-sm font-semibold">Symptômes</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {allSigns.map((s) => {
            const on = picked.includes(s);
            return (
              <button key={s} onClick={() => toggle(s)} aria-pressed={on}
                className={`rounded-sm border px-3 py-1.5 text-sm transition-colors ${on ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"}`}>
                {s}
              </button>
            );
          })}
          {picked.length > 0 && <button onClick={() => setPicked([])} className="px-3 py-1.5 text-sm text-primary underline">Tout décocher</button>}
        </div>
      </div>

      <p className="mt-10 text-sm text-muted-foreground" aria-live="polite">{results.length} fiche{results.length > 1 ? "s" : ""}</p>
      <div className="mt-3 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {results.map(({ d, matched }) => (
          <Link key={d.slug} to="/maladies/$slug" params={{ slug: d.slug }} className="animate-fade-in block border bg-card p-6 transition-colors hover:border-primary">
            <h2 className="font-display text-2xl font-semibold">{d.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{d.summary}</p>
            {picked.length > 0 && (
              <div className="mt-4">
                <div className="h-1.5 w-full bg-muted"><div className="h-full bg-primary transition-all duration-500" style={{ width: `${(matched.length / d.signs.length) * 100}%` }} /></div>
                <p className="mt-2 text-xs">{matched.length} sur {d.signs.length} signes : {matched.join(", ")}</p>
              </div>
            )}
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Lire la fiche <ArrowRight className="size-4" /></span>
          </Link>
        ))}
      </div>
      {results.length === 0 && <p className="mt-6">Aucune fiche ne correspond. Essayez un autre mot.</p>}

      <p className="mt-10 flex gap-3 border-l-4 border-accent bg-secondary p-5 text-sm">
        <AlertTriangle className="size-5 shrink-0 text-primary" />
        Cette recherche aide à trouver une fiche. Elle ne pose pas de diagnostic : consultez un professionnel de santé.
      </p>
    </main>
  );
}
