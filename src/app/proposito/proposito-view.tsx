"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Clock,
  Sparkles,
  BookOpen,
  Shield,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Flame,
  ArrowLeft,
  Settings,
  Check,
  RotateCcw,
} from "lucide-react";

// Versículos de edificação, amor, paciência e aliança
const BIBLE_VERSES = [
  {
    ref: "1 Coríntios 13:7-8",
    text: "O amor tudo sofre, tudo crê, tudo espera, tudo suporta. O amor jamais acaba.",
    context: "A essência da aliança eterna em Cristo.",
  },
  {
    ref: "Eclesiastes 3:1, 11",
    text: "Tudo tem o seu tempo determinado, e há tempo para todo o propósito debaixo do céu... Tudo fez Deus formoso no seu devido tempo.",
    context: "Descansar na soberania e no tempo de Deus.",
  },
  {
    ref: "Lamentações 3:25-26",
    text: "Bom é o Senhor para os que esperam por ele, para a alma que o busca. Bom é ter esperança, e aguardar em silêncio a salvação do Senhor.",
    context: "O valor espiritual do silêncio e da consagração.",
  },
  {
    ref: "Isaías 40:31",
    text: "Mas os que esperam no Senhor renovarão as suas forças e subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão.",
    context: "Força espiritual para os dias de deserto e espera.",
  },
  {
    ref: "Filipenses 1:6",
    text: "Tendo por certo isto mesmo: que aquele que em vós começou a boa obra a aperfeiçoará até ao Dia de Jesus Cristo.",
    context: "Deus começou esta história e Ele é fiel para completá-la.",
  },
  {
    ref: "Provérbios 3:5-6",
    text: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.",
    context: "Entrega total do futuro nas mãos do Pai.",
  },
  {
    ref: "Eclesiastes 4:12",
    text: "E, se alguém quiser prevalecer contra um, os dois lhe resistirão; e o cordão de três dobras não se quebra tão depressa.",
    context: "Nossa união é sustentada pelo terceiro elo: Jesus.",
  },
  {
    ref: "Salmos 27:14",
    text: "Espera no Senhor, anima-te, e ele fortalecerá o teu coração; espera, pois, no Senhor.",
    context: "Coragem e ânimo para o coração.",
  },
  {
    ref: "Romanos 8:28",
    text: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados por seu decreto.",
    context: "Cada detalhe deste tempo será transformado em bênção e maturidade.",
  },
  {
    ref: "Cânticos 8:7",
    text: "As muitas águas não poderiam apagar este amor, nem os rios afogá-lo.",
    context: "Um amor firmado em Deus não se abala com tempestades passageiras.",
  },
];

// Data padrão de início: 05 de Outubro de 2026 às 00:00:00
const DEFAULT_START_DATE_STR = "2026-10-05T00:00:00-03:00";
// Data padrão de término: 30 dias depois (04 de Novembro de 2026 às 00:00:00)
const DEFAULT_END_DATE_STR = "2026-11-04T00:00:00-03:00";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export function PropositoView() {
  const [mounted, setMounted] = useState(false);
  const [startDateStr, setStartDateStr] = useState(DEFAULT_START_DATE_STR);
  const [endDateStr, setEndDateStr] = useState(DEFAULT_END_DATE_STR);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);
  const [showConfig, setShowConfig] = useState(false);
  const [customEndInput, setCustomEndInput] = useState("");

  // Carregar configurações locais salvas se houver
  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());

    const savedEnd = localStorage.getItem("proposito_end_date");
    if (savedEnd) {
      setEndDateStr(savedEnd);
      setCustomEndInput(savedEnd.slice(0, 16));
    } else {
      setCustomEndInput(DEFAULT_END_DATE_STR.slice(0, 16));
    }

    const savedStart = localStorage.getItem("proposito_start_date");
    if (savedStart) {
      setStartDateStr(savedStart);
    }
  }, []);

  // Intervalo de contagem segundo a segundo
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  // Cálculos do tempo
  const { timeLeft, isFinished, progressPercent, currentDay, totalDays } = useMemo(() => {
    const start = new Date(startDateStr).getTime();
    const end = new Date(endDateStr).getTime();
    const now = currentTime ? currentTime.getTime() : start;

    const totalDuration = Math.max(1, end - start);
    const elapsed = Math.max(0, now - start);
    const remaining = Math.max(0, end - now);

    const totalDaysCount = Math.round(totalDuration / (1000 * 60 * 60 * 24)) || 30;
    const currentDayNum = Math.min(
      totalDaysCount,
      Math.max(1, Math.floor(elapsed / (1000 * 60 * 60 * 24)) + 1)
    );

    const percent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return {
      timeLeft: {
        days,
        hours,
        minutes,
        seconds,
        totalSeconds: Math.floor(remaining / 1000),
      } as TimeLeft,
      isFinished: remaining <= 0,
      progressPercent: percent,
      currentDay: currentDayNum,
      totalDays: totalDaysCount,
    };
  }, [startDateStr, endDateStr, currentTime]);

  // Formatar datas para exibição
  const formattedDates = useMemo(() => {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    return {
      startText: start.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      endText: end.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }, [startDateStr, endDateStr]);

  const handleSaveCustomDate = () => {
    if (!customEndInput) return;
    const dateObj = new Date(customEndInput);
    if (!isNaN(dateObj.getTime())) {
      const iso = dateObj.toISOString();
      setEndDateStr(iso);
      localStorage.setItem("proposito_end_date", iso);
      setShowConfig(false);
    }
  };

  const handleResetDefaultDate = () => {
    setEndDateStr(DEFAULT_END_DATE_STR);
    setStartDateStr(DEFAULT_START_DATE_STR);
    localStorage.removeItem("proposito_end_date");
    localStorage.removeItem("proposito_start_date");
    setCustomEndInput(DEFAULT_END_DATE_STR.slice(0, 16));
    setShowConfig(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#08080a] text-zinc-100 flex flex-col justify-between selection:bg-amber-500/20 selection:text-amber-300 font-sans antialiased overflow-x-hidden">
      {/* Luz celestial de fundo sutil */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[550px] w-[700px] rounded-full bg-radial from-amber-500/10 via-amber-600/5 to-transparent blur-3xl opacity-80" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-radial from-amber-900/10 via-transparent to-transparent blur-3xl" />
        {/* Padrão geométrico suave */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Barra Superior Discreta */}
      <header className="relative z-10 w-full border-b border-zinc-800/60 bg-[#08080a]/60 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Início</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
            <span className="font-mono text-xs uppercase tracking-wider text-amber-300/90 font-medium">
              30 Dias em Oração & Consagração
            </span>
          </div>

          <button
            onClick={() => setShowConfig(!showConfig)}
            title="Ajustar data final"
            className="p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60 rounded-md transition-colors"
            aria-label="Ajustar configurações"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Painel Flutuante de Configuração (Discreto) */}
      <AnimatePresence>
        {showConfig && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="relative z-20 mx-auto max-w-md w-full px-4 pt-3"
          >
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/90 backdrop-blur-md shadow-xl text-xs space-y-3">
              <div className="flex items-center justify-between font-mono text-zinc-300">
                <span>Configurar Data de Término</span>
                <button
                  onClick={() => setShowConfig(false)}
                  className="text-zinc-500 hover:text-zinc-200"
                >
                  ✕
                </button>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Caso você e ela combinem um horário exato de término (ex: fim do dia, culto, etc.), você pode ajustar aqui:
              </p>
              <input
                type="datetime-local"
                value={customEndInput}
                onChange={(e) => setCustomEndInput(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-750 rounded-md px-3 py-2 text-zinc-100 font-mono text-xs focus:outline-none focus:border-amber-500"
              />
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  onClick={handleResetDefaultDate}
                  className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200 font-mono"
                >
                  <RotateCcw className="h-3 w-3" />
                  Restaurar 30 dias
                </button>
                <button
                  onClick={handleSaveCustomDate}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold font-mono rounded-md text-xs transition-colors"
                >
                  Salvar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conteúdo Central */}
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col items-center justify-center space-y-12">
        {/* Cabeçalho do Propósito */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          {/* Emblema Sagrado: Cruz Sutil & Coração */}
          <div className="mx-auto flex items-center justify-center gap-2 text-amber-400/80 mb-2">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M7 8h10" />
            </svg>
            <span className="text-xs font-mono tracking-widest text-amber-400/70 uppercase">
              Aliança Eterna em Jesus
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-50 leading-[1.15]">
            O tempo de Deus <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
              fortalece o que Ele uniu.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-xl mx-auto">
            30 dias consagrados em silêncio e oração individual. Onde as palavras humanas cessam,
            o Espírito Santo opera no secreto, forjando paciência, maturidade espiritual e cura para a nossa aliança.
          </p>
        </div>

        {/* Bloco Central da Contagem Regressiva */}
        <div className="w-full max-w-2xl">
          {mounted ? (
            <div className="relative rounded-2xl border border-amber-500/20 bg-gradient-to-b from-zinc-900/90 via-zinc-900/60 to-zinc-950/90 p-6 sm:p-10 shadow-2xl shadow-black/80 backdrop-blur-xl space-y-8">
              {/* Barra de Progresso do Propósito */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                    <Flame className="h-3.5 w-3.5 text-amber-400" />
                    Dia {currentDay} de {totalDays}
                  </span>
                  <span>{progressPercent.toFixed(1)}% concluído</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/80 border border-zinc-700/50">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Contadores (Dias, Horas, Minutos, Segundos) */}
              {!isFinished ? (
                <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                  {/* Dias */}
                  <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 shadow-inner">
                    <span className="font-mono text-3xl sm:text-5xl font-bold tracking-tight text-amber-300">
                      {String(timeLeft.days).padStart(2, "0")}
                    </span>
                    <span className="mt-1 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-zinc-500">
                      Dias
                    </span>
                  </div>

                  {/* Horas */}
                  <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 shadow-inner">
                    <span className="font-mono text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="mt-1 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-zinc-500">
                      Horas
                    </span>
                  </div>

                  {/* Minutos */}
                  <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 shadow-inner">
                    <span className="font-mono text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="mt-1 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-zinc-500">
                      Minutos
                    </span>
                  </div>

                  {/* Segundos */}
                  <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 shadow-inner">
                    <span className="font-mono text-3xl sm:text-5xl font-bold tracking-tight text-amber-400 animate-pulse">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="mt-1 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-zinc-500">
                      Segundos
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center space-y-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
                  <div className="mx-auto p-3 w-fit rounded-full bg-emerald-500/20 text-emerald-400">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-emerald-300">
                    O Tempo Determinado se Cumpriu!
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Louvado seja o Senhor Jesus Cristo. Que os frutos desta consagração transbordem
                    em sabedoria, paz, amor e uma aliança renovada para sempre.
                  </p>
                </div>
              )}

              {/* Marcadores de Datas */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-zinc-800/70 text-xs font-mono text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-600">Início:</span>
                  <span className="text-zinc-300">{formattedDates.startText}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-600">Término Previsto:</span>
                  <span className="text-amber-300 font-semibold">{formattedDates.endText}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 animate-pulse" />
          )}
        </div>

        {/* Grid Visual dos 30 Dias (Timeline de Jornada) */}
        <div className="w-full max-w-2xl rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-2 text-zinc-300 font-semibold uppercase tracking-wider">
              <Calendar className="h-3.5 w-3.5 text-amber-400" />
              Jornada dos 30 Dias
            </span>
            <span className="text-zinc-500">
              {currentDay > totalDays ? "Concluído" : `${totalDays - currentDay} dias restantes`}
            </span>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 pt-2">
            {Array.from({ length: totalDays }).map((_, index) => {
              const dayNum = index + 1;
              const isPast = dayNum < currentDay;
              const isCurrent = dayNum === currentDay;
              const isFuture = dayNum > currentDay;

              return (
                <div
                  key={dayNum}
                  title={`Dia ${dayNum}`}
                  className={`relative flex flex-col items-center justify-center p-2 rounded-lg text-xs font-mono border transition-all ${
                    isCurrent
                      ? "border-amber-400 bg-amber-500/20 text-amber-200 font-bold shadow-[0_0_12px_rgba(251,191,36,0.3)] scale-105"
                      : isPast
                      ? "border-zinc-800 bg-zinc-900/90 text-zinc-400"
                      : "border-zinc-850/60 bg-zinc-950/40 text-zinc-600"
                  }`}
                >
                  <span>{dayNum}</span>
                  {isPast && <span className="h-1 w-1 rounded-full bg-emerald-500 mt-1" />}
                  {isCurrent && (
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping mt-1" />
                  )}
                  {isFuture && <span className="h-1 w-1 rounded-full bg-zinc-800 mt-1" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Versículo para Meditação e Oração */}
        <div className="w-full max-w-2xl rounded-2xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
            <span className="inline-flex items-center gap-2 text-xs font-mono text-amber-400/90 uppercase tracking-wider font-semibold">
              <BookOpen className="h-3.5 w-3.5" />
              Palavra para o Altar
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  setActiveVerseIndex((prev) =>
                    prev === 0 ? BIBLE_VERSES.length - 1 : prev - 1
                  )
                }
                className="p-1 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                aria-label="Versículo anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-[11px] font-mono text-zinc-500 px-1">
                {activeVerseIndex + 1}/{BIBLE_VERSES.length}
              </span>
              <button
                onClick={() =>
                  setActiveVerseIndex((prev) => (prev + 1) % BIBLE_VERSES.length)
                }
                className="p-1 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                aria-label="Próximo versículo"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="min-h-[100px] flex flex-col justify-center space-y-2">
            <p className="text-base sm:text-lg font-serif italic text-zinc-200 leading-relaxed">
              &ldquo;{BIBLE_VERSES[activeVerseIndex].text}&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
              <span className="font-mono font-semibold text-amber-300">
                — {BIBLE_VERSES[activeVerseIndex].ref}
              </span>
              <span className="text-zinc-500 text-[11px]">
                {BIBLE_VERSES[activeVerseIndex].context}
              </span>
            </div>
          </div>
        </div>

        {/* Os 3 Pilares Espirituais deste Propósito */}
        <div className="w-full max-w-2xl space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold text-center">
            // OS TRÊS PILARES DA NOSSA CONSAGRAÇÃO
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Pilar 1 */}
            <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/50 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>01. Vida Pessoal</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Buscar o Senhor em secreto, renovar a mente na Palavra e permitir que o Espírito Santo cure e transforme o coração.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/50 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold">
                <Shield className="h-3.5 w-3.5 text-amber-400" />
                <span>02. Intercessão</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Guardar o coração dela em oração diária. Onde a voz humana se cala, a oração move a mão de Deus em favor dela.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/50 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold">
                <Heart className="h-3.5 w-3.5 text-amber-400" />
                <span>03. Aliança Eterna</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Descansar na certeza de que uma aliança selada em Cristo não depende de circunstâncias, mas da rocha inabalável.
              </p>
            </div>
          </div>
        </div>

        {/* Oração da Aliança */}
        <div className="w-full max-w-2xl rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 sm:p-8 space-y-3 text-center">
          <span className="font-mono text-xs text-amber-300 uppercase tracking-widest font-semibold">
            Oração Diária da Aliança
          </span>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic max-w-lg mx-auto font-serif">
            &ldquo;Senhor Jesus, entrego estes 30 dias em Tuas mãos. Que o silêncio entre nós seja preenchido
            pela Tua presença e pela Tua paz. Guarda a minha noiva, sara todas as feridas, dissipa qualquer
            ansiedade e nos prepara para cumprir o Teu propósito eterno. Que no fim deste tempo, o nosso amor seja
            ainda mais puro, paciente e inabalável em Ti. Amém.&rdquo;
          </p>
        </div>
      </main>

      {/* Rodapé Sereno */}
      <footer className="relative z-10 w-full border-t border-zinc-800/60 py-8 text-center text-xs text-zinc-600 font-mono">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <p className="text-zinc-500">
            &ldquo;O amor jamais acaba.&rdquo; — 1 Coríntios 13:8
          </p>
          <p className="text-zinc-600 text-[11px]">
            Página dedicada em fé, oração e aliança ao Senhor Jesus Cristo.
          </p>
        </div>
      </footer>
    </div>
  );
}
