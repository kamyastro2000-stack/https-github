import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { diseases } from "@/data/diseases";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fade-up reveal for any element with [data-reveal] */
export function useReveal() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reduced()) { els.forEach((e) => e.classList.add("is-in")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("is-in"), io.unobserve(e.target))), { threshold: 0.15 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [path]);
}

/** Top loading bar during navigation */
export function LoadingBar() {
  const loading = useRouterState({ select: (s) => s.status === "pending" });
  return <div aria-hidden className={`fixed left-0 top-0 z-50 h-0.5 bg-primary transition-all duration-500 ${loading ? "w-2/3 opacity-100" : "w-full opacity-0"}`} />;
}

/** Card that tilts in 3D under the pointer */
export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current; if (!el || reduced()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`); el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  };
  return <div ref={ref} onPointerMove={move} onPointerLeave={() => ref.current && (ref.current.style.transform = "")} className={`fx-tilt ${className}`}>{children}</div>;
}

/** Real counter: counts up to a true value when visible */
export function Counter({ to, label }: { to: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null); const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (reduced()) { setN(to); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => { const p = Math.min((t - t0) / 1200, 1); setN(Math.round(to * (1 - (1 - p) ** 3))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <div><span ref={ref} className="font-display text-5xl font-semibold text-primary">{n}</span><p className="mt-1 text-sm text-muted-foreground">{label}</p></div>;
}

/** Drifting red blood cells (particles) with soft light, parallax on scroll */
export function Cells() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!; const ctx = c.getContext("2d")!; let raf = 0;
    const col = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "red";
    const size = () => { c.width = c.offsetWidth * devicePixelRatio; c.height = c.offsetHeight * devicePixelRatio; };
    size(); addEventListener("resize", size);
    const ps = Array.from({ length: 28 }, () => ({ x: Math.random(), y: Math.random(), r: 6 + Math.random() * 16, v: 0.0003 + Math.random() * 0.0008, a: Math.random() * 6 }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const p of ps) {
        p.x += p.v; if (p.x > 1.1) p.x = -0.1; p.a += 0.01;
        const x = p.x * c.width, y = (p.y + Math.sin(p.a) * 0.02) * c.height, r = p.r * devicePixelRatio;
        ctx.globalAlpha = 0.18; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.8, p.a, 0, 7); ctx.fill();
        ctx.globalAlpha = 0.25; ctx.fillStyle = "white"; ctx.beginPath(); ctx.ellipse(x - r * 0.3, y - r * 0.3, r * 0.3, r * 0.2, 0, 0, 7); ctx.fill();
      }
      if (!reduced()) raf = requestAnimationFrame(draw);
    };
    draw();
    const onScroll = () => (c.style.transform = `translateY(${scrollY * 0.3}px)`);
    addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("scroll", onScroll); };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />;
}

/** Animated medical illustration: heart that morphs + ECG line */
export function HeartBeat() {
  return (
    <svg viewBox="0 0 200 120" className="w-full max-w-sm" aria-hidden>
      <path className="fx-heart fill-primary" d="M100 100 C40 60 40 20 70 20 C85 20 95 30 100 40 C105 30 115 20 130 20 C160 20 160 60 100 100Z">
        <animate attributeName="d" dur="1.2s" repeatCount="indefinite"
          values="M100 100 C40 60 40 20 70 20 C85 20 95 30 100 40 C105 30 115 20 130 20 C160 20 160 60 100 100Z;M100 106 C32 62 34 14 70 14 C86 14 95 26 100 36 C105 26 114 14 130 14 C166 14 168 62 100 106Z;M100 100 C40 60 40 20 70 20 C85 20 95 30 100 40 C105 30 115 20 130 20 C160 20 160 60 100 100Z" />
      </path>
      <polyline className="fx-ecg stroke-accent" fill="none" strokeWidth="3" points="0,60 60,60 72,60 80,30 90,90 100,50 108,60 200,60" />
    </svg>
  );
}

/** Interactive chart: number of warning signs / prevention actions per disease */
export function SignsChart() {
  const [mode, setMode] = useState<"signs" | "urgent" | "prevent">("signs");
  const [hover, setHover] = useState<string | null>(null);
  const labels = { signs: "Signes", urgent: "Urgences", prevent: "Prévention" };
  const max = Math.max(...diseases.map((d) => d[mode].length));
  return (
    <div>
      <div className="flex gap-2">{(Object.keys(labels) as (keyof typeof labels)[]).map((k) => (
        <button key={k} onClick={() => setMode(k)} className={`rounded-sm border px-3 py-1.5 text-sm transition-colors ${mode === k ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}>{labels[k]}</button>
      ))}</div>
      <div className="mt-6 space-y-3">{diseases.map((d) => (
        <div key={d.slug} onMouseEnter={() => setHover(d.slug)} onMouseLeave={() => setHover(null)} className="grid grid-cols-[8rem_1fr] items-center gap-3 text-sm">
          <span className={hover === d.slug ? "font-semibold text-primary" : ""}>{d.name}</span>
          <div className="relative h-7 bg-muted">
            <div className="h-full bg-primary transition-all duration-700" style={{ width: `${(d[mode].length / max) * 100}%` }} />
            <span className="absolute inset-y-0 left-2 flex items-center text-xs text-primary-foreground">{d[mode].length}</span>
          </div>
          {hover === d.slug && <p className="col-span-2 animate-fade-in text-xs text-muted-foreground">{d[mode].join(", ")}</p>}
        </div>
      ))}</div>
    </div>
  );
}
