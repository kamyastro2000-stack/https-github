import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, HeartPulse, Search, ShieldCheck, Stethoscope } from "lucide-react";
import { diseases } from "@/data/diseases";
import { DiseaseCard } from "@/components/site";
import { Button } from "@/components/ui/button";
import { MotionDemo } from "@/components/motion-demo";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Santé.Afrique | Comprendre les maladies et prévenir les risques" },
    { name: "description", content: "Un guide simple pour reconnaître les signes, savoir quand consulter et prévenir six maladies qui concernent l’Afrique." },
    { property: "og:title", content: "Santé.Afrique | Comprendre les maladies et prévenir les risques" },
    { property: "og:description", content: "Un guide simple pour reconnaître les signes, savoir quand consulter et prévenir six maladies qui concernent l’Afrique." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  return <main>
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-14 md:pb-20 md:pt-20">
        <div className="max-w-4xl animate-enter-soft">
          <p className="flex items-center gap-2 text-sm font-bold uppercase text-primary"><HeartPulse className="size-5" /> Santé.Afrique · Information et prévention</p>
          <h1 className="mt-6 font-display text-5xl leading-[1.09] font-semibold sm:text-6xl md:text-7xl">Comprendre une maladie.<br/><span className="text-primary">Savoir quoi faire.</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">Vous cherchez à comprendre un signe ou une maladie ? Ici, découvrez des informations simples sur six maladies en Afrique : leurs signes, quand consulter et comment réduire les risques.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="min-h-13 text-base"><Link to="/recherche"><Search /> Chercher une maladie ou un signe <ArrowRight /></Link></Button>
            <Button asChild variant="outline" size="lg" className="min-h-13 text-base"><Link to="/maladies"><BookOpen /> Voir les six maladies</Link></Button>
          </div>
        </div>
        <p className="mt-12 flex max-w-3xl items-start gap-3 border-l-4 border-accent bg-secondary px-5 py-4 text-sm leading-6 text-foreground"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary"/><span><strong>Un guide, pas un diagnostic.</strong> Ces informations ne remplacent pas l’avis d’un professionnel de santé. En cas d’urgence ou de doute, consultez rapidement.</span></p>
      </div>
    </section>
    <MotionDemo />
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="text-sm font-bold uppercase text-primary">Un exemple concret</p><h2 className="mt-3 font-display text-4xl font-semibold">À quoi sert une fiche santé ?</h2></div>
          <Button asChild variant="outline"><Link to="/maladies/$slug" params={{ slug: "paludisme" }}>Voir la fiche Paludisme <ArrowRight /></Link></Button>
        </div>
        <div className="mt-8 grid gap-px border bg-border md:grid-cols-3">
          <div className="bg-background p-6"><span className="text-sm font-bold text-primary">01 · RECONNAÎTRE</span><h3 className="mt-3 font-display text-2xl">Les signes</h3><p className="mt-2 text-muted-foreground">Fièvre, frissons, maux de tête et grande fatigue.</p></div>
          <div className="bg-background p-6"><span className="text-sm font-bold text-destructive">02 · RÉAGIR</span><h3 className="mt-3 font-display text-2xl">Quand consulter vite</h3><p className="mt-2 text-muted-foreground">Convulsions, confusion ou vomissements répétés.</p></div>
          <div className="bg-background p-6"><span className="text-sm font-bold text-primary">03 · PRÉVENIR</span><h3 className="mt-3 font-display text-2xl">Les gestes utiles</h3><p className="mt-2 text-muted-foreground">Dormir sous moustiquaire imprégnée et supprimer les eaux stagnantes.</p></div>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><Stethoscope className="size-8 text-primary"/><h2 className="mt-4 font-display text-4xl font-semibold">Les six maladies expliquées simplement</h2></div><Link to="/pays" className="text-sm font-semibold text-primary underline underline-offset-4">Consulter par pays <ArrowRight className="inline size-4"/></Link></div>
      <div className="mt-9 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">{diseases.map(d => <DiseaseCard key={d.slug} d={d}/>)}</div>
    </section>
  </main>;
}
