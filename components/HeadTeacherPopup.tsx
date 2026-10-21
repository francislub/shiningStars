'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/* ───────────── Settings ───────────── */
const SHOW_FOR_MS = 60_000;          // open for 1 minute
const HIDDEN_FOR_MS = 60_000;        // minimised for 1 minute, then opens again
const REOPEN_ON_NAVIGATION = true;   // open again whenever the visitor changes page
const IDLE_BEFORE_COUNTDOWN_MS = 5_000; // countdown pauses while the visitor is reading/scrolling
const TICK_MS = 250;
const IMAGE_SRC = "/images/head.jpg";

/* ───────────── Message content ───────────── */
type Block = { id?: string; body: ReactNode; strong?: boolean };

const BLOCKS: Block[] = [
  {
    body: (
      <>
        It is with great joy, gratitude, and a deep sense of accomplishment that I congratulate{" "}
        <strong>Shining Stars Nursery and Primary School, Vvumba, upon celebrating five remarkable years of growth, service, and excellence.</strong>{" "}
        This milestone is a testament to God’s faithfulness, the dedication of our staff, the support of our parents and guardians, and the trust our community has placed in us.
      </>
    ),
  },
  {
    body: (
      <>
        Over the past five years, our journey has been one of vision, commitment, perseverance, and steady progress. What began as a dream has continued to grow into a centre of learning where children are nurtured academically, morally, spiritually, and socially. We are proud of the progress we have made and remain committed to building a school where every child is valued, every talent is nurtured, and every learner is given an opportunity to shine.
      </>
    ),
  },
  {
    id: "staff",
    body: (
      <>
        One of our greatest achievements has been building a <strong>wonderful team of dedicated, hardworking, and professional staff</strong> who share a common vision of transforming the lives of our learners. Their commitment, teamwork, and passion for teaching have been instrumental in shaping the character and academic journey of our children. I sincerely appreciate each member of staff for the invaluable contribution they continue to make towards the success of our school.
      </>
    ),
  },
  {
    id: "environment",
    body: (
      <>
        We have also continued to provide a <strong>conducive learning environment</strong> that promotes discipline, creativity, confidence, and the holistic development of every child. At Shining Stars, education goes beyond books and examinations. We are intentional about building Christ-like character by instilling values such as honesty, love, humility, respect, responsibility, obedience, and compassion. Our desire is to raise children who not only excel academically but also become responsible citizens and positive role models in society.
      </>
    ),
  },
  {
    id: "academics",
    body: (
      <>
        Academically, we celebrate the steady progress we have made in pursuing <strong>classic performance and academic excellence</strong>. The attainment of our UNEB examination centre number was a significant milestone in our history, and we are equally delighted to have been recognised as a <strong>UNEB Primary Leaving Examination (PLE) examination seating centre.</strong>{" "}
        These achievements reflect the confidence placed in our institution and the continued growth of our school. We recognise that these milestones come with greater responsibility, and we remain committed to upholding the standards, discipline, and integrity expected of us.
      </>
    ),
  },
  {
    id: "growth",
    body: (
      <>
        Another encouraging sign of our progress is the growth in our enrolment. The increasing number of learners entrusted to our care is a great source of motivation and a reminder of the confidence parents have in our vision and work. We do not take this trust for granted. We pledge to continue providing quality education, nurturing individual potential, and preparing our children to face the future with knowledge, confidence, faith, and purpose.
      </>
    ),
  },
  {
    body: (
      <>
        As we celebrate this fifth anniversary, our vision extends beyond the school gates. We aspire to produce children who will make a positive impact in their families, the church, the workplace, and the wider community. We want our learners to grow into responsible leaders, innovative thinkers, compassionate citizens, and agents of positive change wherever life takes them.
      </>
    ),
  },
  {
    id: "thanks",
    body: (
      <>
        I extend my heartfelt appreciation to our parents and guardians for their unwavering support and partnership; to our staff for their dedication and sacrifice; to our directors and school management for their guidance and commitment; and to our learners, whose enthusiasm and achievements give meaning to everything we do. I also thank our friends, well-wishers, and the entire Vvumba community for walking this journey with us.
      </>
    ),
  },
  {
    body: (
      <>
        As we look back with gratitude and forward with renewed determination, let us remember that our fifth anniversary is not merely a celebration of how far we have come, but also a call to greater responsibility and greater achievements. The journey ahead demands innovation, unity, hard work, and an unwavering commitment to excellence.
      </>
    ),
  },
  {
    body: (
      <>
        May God continue to guide our school, strengthen our team, bless our learners, and enable us to fulfil the purpose for which Shining Stars Nursery and Primary School was established.
      </>
    ),
  },
  {
    strong: true,
    body: (
      <>
        Congratulations to Shining Stars Nursery and Primary School, Vvumba, on five years of growth, impact, and excellence! May the years ahead bring greater achievements, stronger partnerships, improved performance, and an even greater contribution to our community.
      </>
    ),
  },
  {
    body: (
      <>
        Together, let us continue nurturing young minds, building Christ-like character, and creating opportunities for every child to fulfil their God-given potential.
      </>
    ),
  },
];

const CHIPS = [
  { id: "staff", label: "Our staff" },
  { id: "environment", label: "Learning environment" },
  { id: "academics", label: "UNEB milestones" },
  { id: "growth", label: "Growing enrolment" },
  { id: "thanks", label: "Thank you" },
];

const TEXT_SIZES = ["text-[14px]", "text-[15.5px]", "text-[17px]"];

/* ───────────── Component ───────────── */
export default function HeadTeacherPopup() {
  const pathname = usePathname();

  const [open, setOpen] = useState(true);
  const [remaining, setRemaining] = useState(SHOW_FOR_MS);
  const [holding, setHolding] = useState(false); // countdown paused because the visitor is reading
  const [readPct, setReadPct] = useState(0);
  const [sizeIdx, setSizeIdx] = useState(1);
  const [copied, setCopied] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLButtonElement>(null);
  const hoverRef = useRef(false);
  const lastTouchRef = useRef(0);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);
  const firstRender = useRef(true);

  const show = useCallback(() => {
    setOpen(true);
    setRemaining(SHOW_FOR_MS);
    lastTouchRef.current = Date.now();
    scrollRef.current?.scrollTo({ top: 0 });
  }, []);

  const minimise = useCallback(() => {
    setOpen(false);
    setRemaining(HIDDEN_FOR_MS);
    setHolding(false);
  }, []);

  /* Countdown engine: pauses while reading, or while the browser tab is hidden */
  useEffect(() => {
    const id = setInterval(() => {
      if (document.hidden) return;
      if (open) {
        const reading = hoverRef.current || Date.now() - lastTouchRef.current < IDLE_BEFORE_COUNTDOWN_MS;
        setHolding(reading);
        if (reading) return;
      }
      setRemaining((r) => Math.max(0, r - TICK_MS));
    }, TICK_MS);
    return () => clearInterval(id);
  }, [open]);

  useEffect(() => {
    if (remaining > 0) return;
    if (open) minimise();
    else show();
  }, [remaining, open, minimise, show]);

  /* Re-open on each page change */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (REOPEN_ON_NAVIGATION) show();
  }, [pathname, show]);

  /* Lock page scroll while open + move focus into the dialog */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => dialogRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = previous;
      clearTimeout(t);
    };
  }, [open]);

  /* Keyboard: Esc minimises, Tab stays inside the dialog */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return minimise();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])");
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, minimise]);

  const onScroll = () => {
    lastTouchRef.current = Date.now();
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setReadPct(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 100);
  };

  const jumpTo = (id: string) => {
    lastTouchRef.current = Date.now();
    scrollRef.current?.querySelector(`[data-block="${id}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const shareText = encodeURIComponent(
    "Read the Head Teacher’s message as Shining Stars Nursery and Primary School, Vvumba, celebrates 5 years of excellence. Arise and Shine! " +
      (typeof window !== "undefined" ? window.location.origin : "")
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  /* Swipe right on the card to minimise (mobile) */
  const onTouchStart = (e: React.TouchEvent) => {
    lastTouchRef.current = Date.now();
    swipeRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = swipeRef.current;
    swipeRef.current = null;
    if (!s) return;
    const dx = e.changedTouches[0].clientX - s.x;
    const dy = Math.abs(e.changedTouches[0].clientY - s.y);
    if (dx > 110 && dy < 50) minimise();
  };

  /* Progress values */
  const ringR = 26;
  const ringC = 2 * Math.PI * ringR;
  const ringOffset = ringC * (1 - remaining / HIDDEN_FOR_MS);
  const secs = Math.ceil(remaining / 1000);
  const barPct = (remaining / SHOW_FOR_MS) * 100;

  return (
    <>
      <style>{`
        @keyframes hts-twinkle { 0%,100% { opacity:.25; transform:scale(.8) } 50% { opacity:1; transform:scale(1.15) } }
        @keyframes hts-ping { 0% { transform:scale(1); opacity:.7 } 100% { transform:scale(2.1); opacity:0 } }
        .hts-star { animation: hts-twinkle 3.2s ease-in-out infinite; }
        .hts-ping { animation: hts-ping 2.2s ease-out infinite; }
        .hts-noscroll::-webkit-scrollbar { display:none }
        .hts-serif { font-family: Georgia, 'Times New Roman', serif; }
        @media (prefers-reduced-motion: reduce) { .hts-star, .hts-ping { animation:none } }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={minimise}
        aria-hidden="true"
        className={`fixed inset-0 z-[9998] bg-slate-950/60 backdrop-blur-[3px] transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Dialog */}
      <div
        className={`pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
          open ? "visible translate-x-0 scale-100 opacity-100" : "invisible translate-x-[42vw] scale-[.08] opacity-0"
        }`}
        style={{ transformOrigin: "100% 50%" }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="hts-title"
          tabIndex={-1}
          onPointerEnter={(e) => (hoverRef.current = e.pointerType === "mouse")}
          onPointerLeave={() => (hoverRef.current = false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="pointer-events-auto relative grid max-h-[92vh] w-full max-w-5xl grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[28px] bg-white text-slate-700 shadow-[0_30px_90px_-20px_rgba(2,12,40,.7)] outline-none ring-1 ring-black/10 dark:bg-slate-900 dark:text-slate-300 dark:ring-white/10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:grid-rows-1"
        >
          {/* ── Image panel ── */}
          <div className="relative h-40 overflow-hidden bg-[#0B2A5B] sm:h-52 md:h-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGE_SRC} alt="Head Teacher of Shining Stars Nursery and Primary School, Vvumba" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A5B] via-[#0B2A5B]/40 to-[#0B2A5B]/10" />

            {[
              "left-[12%] top-[14%] text-lg",
              "left-[72%] top-[10%] text-sm [animation-delay:.8s]",
              "left-[86%] top-[34%] text-xl [animation-delay:1.6s]",
              "left-[8%] top-[42%] text-xs [animation-delay:2.2s]",
            ].map((c, i) => (
              <span key={i} aria-hidden="true" className={`hts-star absolute text-[#F2B632] ${c}`}>✦</span>
            ))}

            <div className="absolute inset-x-0 bottom-0 flex items-end gap-4 p-5 md:flex-col md:items-start md:gap-1 md:p-7">
              <span className="hts-serif text-7xl font-bold leading-[.8] text-[#F2B632] md:text-[9.5rem]">5</span>
              <div className="pb-1 text-white">
                <p className="hts-serif text-xl font-semibold leading-tight md:text-2xl">years of growth, service and excellence</p>
                <p className="mt-1 text-xs text-white/80">Shining Stars Nursery and Primary School, Vvumba</p>
                <p className="mt-3 hidden text-sm italic text-[#F2B632] md:block">“Arise and Shine” – Isaiah 60:1</p>
              </div>
            </div>
          </div>

          {/* ── Message panel ── */}
          <div className="relative flex min-h-0 flex-col">
            {/* Header */}
            <div className="relative shrink-0 border-b border-slate-200 px-5 pb-3 pt-5 dark:border-slate-700/70 md:px-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 id="hts-title" className="hts-serif text-2xl font-bold leading-tight text-[#0B2A5B] dark:text-white md:text-[28px]">
                    Head Teacher’s Message
                  </h2>
                  <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                    Celebrating 5 years of excellence at Shining Stars Nursery and Primary School, Vvumba
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    onClick={() => setSizeIdx((i) => Math.max(0, i - 1))}
                    disabled={sizeIdx === 0}
                    aria-label="Smaller text"
                    className="hidden h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-slate-600 transition hover:bg-slate-100 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-800 sm:flex"
                  >
                    A
                  </button>
                  <button
                    onClick={() => setSizeIdx((i) => Math.min(TEXT_SIZES.length - 1, i + 1))}
                    disabled={sizeIdx === TEXT_SIZES.length - 1}
                    aria-label="Larger text"
                    className="hidden h-8 w-8 items-center justify-center rounded-full text-base font-bold text-slate-600 transition hover:bg-slate-100 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-800 sm:flex"
                  >
                    A
                  </button>
                  <button
                    onClick={minimise}
                    aria-label="Close message"
                    title="Close (Esc)"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B632] dark:bg-slate-800 dark:text-slate-200"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                  </button>
                </div>
              </div>

              {/* Jump chips */}
              <div className="hts-noscroll -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1" role="navigation" aria-label="Jump to a section">
                {CHIPS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => jumpTo(c.id)}
                    className="shrink-0 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-[#F2B632] hover:bg-[#F2B632]/15 hover:text-[#0B2A5B] dark:border-slate-700 dark:text-slate-300 dark:hover:text-white"
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Reading progress */}
              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-transparent" aria-hidden="true">
                <div className="h-full bg-[#F2B632] transition-[width] duration-150" style={{ width: `${readPct}%` }} />
              </div>
            </div>

            {/* Scrollable message */}
            <div ref={scrollRef} onScroll={onScroll} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 md:px-8">
              <p className="hts-serif mb-4 text-lg italic text-[#0B2A5B] dark:text-[#F2B632]">“Arise and Shine” – Isaiah 60:1</p>
              <div className={`space-y-4 leading-[1.75] ${TEXT_SIZES[sizeIdx]}`}>
                {BLOCKS.map((b, i) => (
                  <p
                    key={i}
                    data-block={b.id}
                    className={`scroll-mt-2 [&_strong]:font-semibold [&_strong]:text-slate-900 dark:[&_strong]:text-white ${
                      b.strong ? "rounded-xl border-l-4 border-[#F2B632] bg-[#F2B632]/10 p-4 font-semibold text-slate-900 dark:text-white" : ""
                    }`}
                  >
                    {b.body}
                  </p>
                ))}
              </div>
              <p className="hts-serif mt-6 text-2xl font-bold tracking-wide text-[#0B2A5B] dark:text-[#F2B632]">ARISE AND SHINE!</p>
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-700/70 dark:bg-slate-800/50 md:px-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400" aria-live="off">
                  <span className={`h-2 w-2 rounded-full ${holding ? "bg-slate-400" : "bg-emerald-500"}`} />
                  {holding ? "Timer paused while you read" : `Minimises in ${secs}s`}
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/?text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-slate-300 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-white dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Share on WhatsApp
                  </a>
                  <button
                    onClick={copyLink}
                    className="rounded-full border border-slate-300 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-white dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    {copied ? "Link copied" : "Copy link"}
                  </button>
                  <button
                    onClick={minimise}
                    className="rounded-full bg-[#0B2A5B] px-5 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-[#123a7d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B632] dark:bg-[#F2B632] dark:text-[#0B2A5B] dark:hover:bg-[#ffc94d]"
                  >
                    Close message
                  </button>
                </div>
              </div>
            </div>

            {/* Time-left bar (bottom of card) */}
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-transparent" aria-hidden="true">
              <div className="h-full bg-[#0B2A5B]/70 transition-[width] duration-300 ease-linear dark:bg-[#F2B632]/80" style={{ width: `${barPct}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Minimised side tab */}
      <button
        ref={tabRef}
        onClick={show}
        aria-label={`Open Head Teacher’s message. Opens again automatically in ${secs} seconds.`}
        className={`group fixed right-0 top-1/2 z-[9997] flex -translate-y-1/2 items-center rounded-l-full bg-[#0B2A5B] py-1.5 pl-1.5 pr-1 text-white shadow-[0_10px_30px_-8px_rgba(2,12,40,.8)] ring-1 ring-white/20 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
          open ? "pointer-events-none translate-x-full opacity-0" : "translate-x-[calc(100%-62px)] opacity-100 hover:translate-x-0 focus-visible:translate-x-0"
        }`}
      >
        <span className="relative flex h-[56px] w-[56px] shrink-0 items-center justify-center">
          <span aria-hidden="true" className="hts-ping absolute inset-1 rounded-full bg-[#F2B632]/60" />
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 60 60" aria-hidden="true">
            <circle cx="30" cy="30" r={ringR} fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="3" />
            <circle
              cx="30" cy="30" r={ringR} fill="none" stroke="#F2B632" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={ringC} strokeDashoffset={ringOffset}
              style={{ transition: `stroke-dashoffset ${TICK_MS}ms linear` }}
            />
          </svg>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMAGE_SRC} alt="" className="relative h-[40px] w-[40px] rounded-full border border-white/70 object-cover" />
        </span>
        <span className="mx-3 whitespace-nowrap text-left">
          <span className="block text-sm font-semibold leading-tight">Head Teacher’s Message</span>
          <span className="block text-[11px] text-white/70">Opens again in {secs}s · click to read</span>
        </span>
      </button>
    </>
  );
}