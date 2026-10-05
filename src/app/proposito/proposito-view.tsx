"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Check,
  Flame,
} from "lucide-react";

// Ampla coleção de versículos sobre amor, paciência, aliança, fidelidade e o tempo de Deus
const BIBLE_VERSES = [
  {
    ref: "1 Coríntios 13:4-8",
    text: "O amor é paciente, é benigno; o amor não arde em ciúmes, não se ufana, não se ensoberbe... Tudo sofre, tudo crê, tudo espera, tudo suporta. O amor jamais acaba.",
    context: "O amor verdadeiro edificado sobre o caráter de Cristo.",
  },
  {
    ref: "Eclesiastes 3:1, 11",
    text: "Tudo tem o seu tempo determinado, e há tempo para todo o propósito debaixo do céu... Tudo fez Deus formoso no seu devido tempo.",
    context: "Descanso e confiança no tempo perfeito de Deus.",
  },
  {
    ref: "Lamentações 3:25-26",
    text: "Bom é o Senhor para os que esperam por ele, para a alma que o busca. Bom é ter esperança, e aguardar em silêncio a salvação do Senhor.",
    context: "O valor da espera santa e do silêncio no altar.",
  },
  {
    ref: "Salmos 37:5, 7",
    text: "Entrega o teu caminho ao Senhor; confia nele, e o mais ele fará... Descansa no Senhor e espera nele pacientemente.",
    context: "A paz que vem de confiar plenamente a história nas mãos de Deus.",
  },
  {
    ref: "Isaías 40:31",
    text: "Mas os que esperam no Senhor renovarão as suas forças e subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão.",
    context: "Renovo espiritual para o tempo de deserto e oração.",
  },
  {
    ref: "Filipenses 1:6",
    text: "Tendo por certo isto mesmo: que aquele que em vós começou a boa obra a aperfeiçoará até ao Dia de Jesus Cristo.",
    context: "Deus é quem começou esta história e Ele é fiel para completá-la.",
  },
  {
    ref: "Provérbios 3:5-6",
    text: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.",
    context: "Direção e sabedoria que vêm do Senhor.",
  },
  {
    ref: "Eclesiastes 4:9-10, 12",
    text: "Melhor é serem dois do que um... Se um cair, o outro levanta o seu companheiro. E o cordão de três dobras não se quebra tão depressa.",
    context: "A aliança sustentada pelo elo inabalável de Jesus.",
  },
  {
    ref: "Salmos 27:14",
    text: "Espera no Senhor, anima-te, e ele fortalecerá o teu coração; espera, pois, no Senhor.",
    context: "Ânimo e coragem para o coração enquanto Deus opera.",
  },
  {
    ref: "Salmos 46:10",
    text: "Aquietai-vos e sabei que eu sou Deus; sou exaltado entre as nações, sou exaltado na terra.",
    context: "Silêncio que reverencia a soberania do Pai.",
  },
  {
    ref: "Romanos 8:28",
    text: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados por seu decreto.",
    context: "Cada momento deste propósito produzirá frutos eternos.",
  },
  {
    ref: "Romanos 12:12",
    text: "Alegrai-vos na esperança, sede pacientes na tribulação, perseverai na oração.",
    context: "A postura espiritual de quem confia na promessa.",
  },
  {
    ref: "Cânticos 8:7",
    text: "As muitas águas não poderiam apagar este amor, nem os rios afogá-lo.",
    context: "Um amor firmado em Deus vence qualquer tempestade passageira.",
  },
  {
    ref: "Colossenses 3:14",
    text: "E, sobre tudo isto, revesti-vos de amor, que é o vínculo da perfeição.",
    context: "A pureza e a maturidade da aliança em Cristo.",
  },
  {
    ref: "1 João 4:18",
    text: "No amor não há temor; antes, o perfeito amor lança fora o temor.",
    context: "A segurança que brota do amor de Deus.",
  },
  {
    ref: "Jeremias 29:11",
    text: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar um fim e uma esperança.",
    context: "O plano de Deus é de vida, edificação e futuro.",
  },
  {
    ref: "Habacuque 2:3",
    text: "Porque a visão é ainda para o tempo determinado... se tardar, espera-o, porque certamente virá, não tardará.",
    context: "O cumprimento das promessas divinas no tempo certo.",
  },
  {
    ref: "Isaías 60:22",
    text: "O menor virá a ser mil, e o mínimo uma nação forte; eu, o Senhor, ao seu tempo o farei prontamente.",
    context: "Quando chega a hora de Deus, Ele faz cumprir a Sua vontade.",
  },
  {
    ref: "Tiago 1:3-4",
    text: "Sabendo que a prova da vossa fé opera a paciência. Tenha, porém, a paciência a sua obra perfeita, para que sejais perfeitos e completos, sem faltar em coisa alguma.",
    context: "Maturidade e aperfeiçoamento da fé.",
  },
  {
    ref: "1 Tessalonicenses 5:24",
    text: "Fiel é o que vos chama, o qual também o fará.",
    context: "A fidelidade incondicional do Criador.",
  },
  {
    ref: "Efésios 4:2-3",
    text: "Com toda a humildade e mansidão, com longanimidade, suportando-vos uns aos outros em amor, procurando guardar a unidade do Espírito pelo vínculo da paz.",
    context: "Corações mansos forjados no amor de Jesus.",
  },
  {
    ref: "Salmos 127:1",
    text: "Se o Senhor não edificar a casa, em vão trabalham os que a edificam; se o Senhor não guardar a cidade, em vão vigia a sentinela.",
    context: "A casa e a aliança são construídas pelas mãos de Deus.",
  },
  {
    ref: "Filipenses 4:6-7",
    text: "Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas diante de Deus as vossas petições, pela oração e pela súplica, com ações de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus.",
    context: "Paz que dissipa toda ansiedade.",
  },
  {
    ref: "1 Pedro 5:7",
    text: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.",
    context: "Descanso total no cuidado amoroso de Deus.",
  },
];

// Data de início: 05 de Outubro de 2026 às 00:00:00
const START_DATE_STR = "2026-10-05T00:00:00-03:00";
// Data de término: 05 de Novembro de 2026 às 00:00:00
const END_DATE_STR = "2026-11-05T00:00:00-03:00";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function PropositoView() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Cálculos do tempo de contagem
  const { timeLeft, isFinished, progressPercent, currentDay, totalDays } = useMemo(() => {
    const start = new Date(START_DATE_STR).getTime();
    const end = new Date(END_DATE_STR).getTime();
    const now = currentTime ? currentTime.getTime() : start;

    const totalDuration = Math.max(1, end - start);
    const elapsed = Math.max(0, now - start);
    const remaining = Math.max(0, end - now);

    const totalDaysCount = Math.round(totalDuration / (1000 * 60 * 60 * 24)) || 31;
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
      } as TimeLeft,
      isFinished: remaining <= 0,
      progressPercent: percent,
      currentDay: currentDayNum,
      totalDays: totalDaysCount,
    };
  }, [currentTime]);

  const handleRandomVerse = () => {
    const randomIndex = Math.floor(Math.random() * BIBLE_VERSES.length);
    setActiveVerseIndex(randomIndex);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#fdfcfb] text-stone-800 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900 font-sans antialiased overflow-x-hidden">
      {/* Luz ambiente suave e translúcida (estética leve e pura) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Brilho solar sutil superior */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[650px] rounded-full bg-radial from-amber-200/25 via-amber-100/15 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -left-32 h-[450px] w-[450px] rounded-full bg-radial from-orange-100/20 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[450px] w-[500px] rounded-full bg-radial from-amber-100/20 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Topo Limpo & Minimalista */}
      <header className="relative z-10 w-full border-b border-stone-200/60 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-center px-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
            <span className="font-mono text-xs uppercase tracking-widest text-stone-600 font-medium">
              Propósito no Senhor • Aliança em Oração
            </span>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="relative z-10 flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex flex-col items-center justify-center space-y-10 sm:space-y-12">
        {/* Cabeçalho do Propósito */}
        <div className="text-center space-y-3.5 max-w-xl mx-auto">
          {/* Símbolo sagrado: Cruz delicada */}
          <div className="mx-auto flex items-center justify-center gap-1.5 text-amber-700/80 mb-1">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M7 8h10" />
            </svg>
            <span className="text-[11px] font-mono tracking-widest text-amber-800/80 uppercase font-semibold">
              Aliança Eterna em Jesus
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-stone-900 leading-[1.18]">
            O tempo de Deus <br />
            <span className="italic text-amber-800 font-serif">
              fortalece o que Ele uniu.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-md mx-auto">
            Um tempo de consagração e oração individual diante do Pai. Onde o silêncio se torna altar,
            o Espírito Santo forja paciência, maturidade e restauração.
          </p>
        </div>

        {/* Bloco Central da Contagem Regressiva (Design Light Puro) */}
        <div className="w-full">
          {mounted ? (
            <div className="relative rounded-2xl border border-stone-200/80 bg-white/90 p-6 sm:p-9 shadow-[0_8px_30px_rgba(0,0,0,0.03)] backdrop-blur-sm space-y-7">
              {/* Barra de Progresso Suave */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                  <span className="flex items-center gap-1.5 text-amber-800 font-medium">
                    <Flame className="h-3.5 w-3.5 text-amber-600" />
                    Dia {currentDay} de {totalDays}
                  </span>
                  <span>{progressPercent.toFixed(1)}% percorrido</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-stone-100 border border-stone-200/60">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Blocos de Contagem (Dias, Horas, Minutos, Segundos) */}
              {!isFinished ? (
                <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center">
                  {/* Dias */}
                  <div className="flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-xl border border-stone-200/70 bg-stone-50/60 shadow-xs">
                    <span className="font-mono text-3xl sm:text-5xl font-bold tracking-tight text-amber-800">
                      {String(timeLeft.days).padStart(2, "0")}
                    </span>
                    <span className="mt-1 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-stone-500 font-medium">
                      Dias
                    </span>
                  </div>

                  {/* Horas */}
                  <div className="flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-xl border border-stone-200/70 bg-stone-50/60 shadow-xs">
                    <span className="font-mono text-3xl sm:text-5xl font-bold tracking-tight text-stone-800">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="mt-1 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-stone-500 font-medium">
                      Horas
                    </span>
                  </div>

                  {/* Minutos */}
                  <div className="flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-xl border border-stone-200/70 bg-stone-50/60 shadow-xs">
                    <span className="font-mono text-3xl sm:text-5xl font-bold tracking-tight text-stone-800">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="mt-1 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-stone-500 font-medium">
                      Minutos
                    </span>
                  </div>

                  {/* Segundos */}
                  <div className="flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-xl border border-stone-200/70 bg-stone-50/60 shadow-xs">
                    <span className="font-mono text-3xl sm:text-5xl font-bold tracking-tight text-amber-600">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="mt-1 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-stone-500 font-medium">
                      Segundos
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center space-y-3 rounded-xl border border-emerald-300 bg-emerald-50/70">
                  <div className="mx-auto p-3 w-fit rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-emerald-900">
                    O Tempo Determinado se Cumpriu
                  </h3>
                  <p className="text-sm text-stone-700 max-w-md mx-auto leading-relaxed">
                    Louvado seja o Senhor Jesus Cristo. Que os frutos desta consagração transbordem
                    em sabedoria, paz, amor e uma aliança renovada para sempre.
                  </p>
                </div>
              )}

              {/* Informações das Datas */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-4 border-t border-stone-200/60 text-xs font-mono text-stone-500">
                <div className="flex items-center gap-1.5">
                  <span className="text-stone-400">Início:</span>
                  <span className="text-stone-700 font-medium">05 de outubro de 2026</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-stone-400">Término:</span>
                  <span className="text-amber-800 font-semibold">05 de novembro de 2026</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-60 w-full rounded-2xl border border-stone-200 bg-white/60 animate-pulse" />
          )}
        </div>

        {/* Jornada Visual dos Dias */}
        <div className="w-full rounded-2xl border border-stone-200/80 bg-white/80 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-2 text-stone-700 font-semibold uppercase tracking-wider">
              <Calendar className="h-3.5 w-3.5 text-amber-600" />
              Jornada dos {totalDays} Dias
            </span>
            <span className="text-stone-500">
              {currentDay > totalDays ? "Concluído" : `${Math.max(0, totalDays - currentDay)} dias restantes`}
            </span>
          </div>

          <div className="grid grid-cols-7 sm:grid-cols-11 gap-1.5 sm:gap-2 pt-1">
            {Array.from({ length: totalDays }).map((_, index) => {
              const dayNum = index + 1;
              const isPast = dayNum < currentDay;
              const isCurrent = dayNum === currentDay;
              const isFuture = dayNum > currentDay;

              return (
                <div
                  key={dayNum}
                  title={`Dia ${dayNum}`}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-mono border transition-all ${
                    isCurrent
                      ? "border-amber-400 bg-amber-50 text-amber-900 font-bold shadow-xs scale-105"
                      : isPast
                      ? "border-stone-200 bg-stone-100/70 text-stone-500"
                      : "border-stone-150 bg-white text-stone-400"
                  }`}
                >
                  <span>{dayNum}</span>
                  {isPast && <span className="h-1 w-1 rounded-full bg-emerald-500 mt-1" />}
                  {isCurrent && (
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1" />
                  )}
                  {isFuture && <span className="h-1 w-1 rounded-full bg-stone-200 mt-1" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Coleção Completa de Versículos para Meditação */}
        <div className="w-full rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-9 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-5">
          <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
            <span className="inline-flex items-center gap-2 text-xs font-mono text-amber-800 uppercase tracking-widest font-semibold">
              Palavra para o Coração
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleRandomVerse}
                title="Sortear outro versículo"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors border border-stone-200/80 mr-1"
              >
                <Sparkles className="h-3 w-3 text-amber-600" />
                <span>Sortear</span>
              </button>

              <button
                onClick={() =>
                  setActiveVerseIndex((prev) =>
                    prev === 0 ? BIBLE_VERSES.length - 1 : prev - 1
                  )
                }
                className="p-1.5 rounded-md text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
                aria-label="Versículo anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <span className="text-[11px] font-mono text-stone-400 px-1">
                {activeVerseIndex + 1}/{BIBLE_VERSES.length}
              </span>

              <button
                onClick={() =>
                  setActiveVerseIndex((prev) => (prev + 1) % BIBLE_VERSES.length)
                }
                className="p-1.5 rounded-md text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
                aria-label="Próximo versículo"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="min-h-[120px] flex flex-col justify-center space-y-3">
            <p className="text-base sm:text-xl font-serif italic text-stone-800 leading-relaxed">
              &ldquo;{BIBLE_VERSES[activeVerseIndex].text}&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 text-xs pt-1">
              <span className="font-mono font-semibold text-amber-800 text-sm">
                — {BIBLE_VERSES[activeVerseIndex].ref}
              </span>
              <span className="text-stone-500 text-[11px]">
                {BIBLE_VERSES[activeVerseIndex].context}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Rodapé Leve e Sereno */}
      <footer className="relative z-10 w-full border-t border-stone-200/60 py-8 text-center text-xs text-stone-500 font-mono">
        <div className="max-w-2xl mx-auto px-4 space-y-1.5">
          <p className="text-stone-600 font-serif italic text-sm">
            &ldquo;O amor jamais acaba.&rdquo; — 1 Coríntios 13:8
          </p>
          <p className="text-stone-400 text-[11px]">
            Tempo de consagração e oração no Senhor Jesus Cristo.
          </p>
        </div>
      </footer>
    </div>
  );
}
