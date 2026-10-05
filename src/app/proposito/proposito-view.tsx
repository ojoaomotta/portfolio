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

// Versículos oficiais na versão NVI (Nova Versão Internacional)
const BIBLE_VERSES_NVI = [
  {
    ref: "1 Coríntios 13:4-8",
    text: "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor. O amor não se alegra com a injustiça, mas se alegra com a verdade. Tudo sofre, tudo crê, tudo espera, tudo suporta. O amor nunca perece.",
    version: "NVI",
    context: "O amor edificado sobre o caráter inabalável de Cristo.",
  },
  {
    ref: "Eclesiastes 3:1, 11",
    text: "Para tudo há uma ocasião certa; há um tempo certo para cada propósito debaixo do céu... Ele fez tudo apropriado ao seu tempo.",
    version: "NVI",
    context: "Descanso e confiança plena na soberania do tempo de Deus.",
  },
  {
    ref: "Lamentações 3:25-26",
    text: "O Senhor é bom para com aqueles cuja esperança está nele, para com aqueles que o buscam; é bom esperar tranquilo pela salvação do Senhor.",
    version: "NVI",
    context: "O valor da espera serena e do silêncio no altar.",
  },
  {
    ref: "Salmos 37:5, 7",
    text: "Entregue o seu caminho ao Senhor; confie nele, e ele agirá... Descanse no Senhor e aguarde por ele com paciência.",
    version: "NVI",
    context: "A paz de quem entrega toda a história nas mãos de Deus.",
  },
  {
    ref: "Isaías 40:31",
    text: "Mas aqueles que esperam no Senhor renovam as suas forças. Voam alto como águias; correm e não ficam exaustos, andam e não se cansam.",
    version: "NVI",
    context: "Renovo espiritual para os dias de busca e oração.",
  },
  {
    ref: "Filipenses 1:6",
    text: "Estou convencido de que aquele que começou boa obra em vocês, vai completá-la até o dia de Cristo Jesus.",
    version: "NVI",
    context: "Deus iniciou esta história e Ele é fiel para aperfeiçoá-la.",
  },
  {
    ref: "Provérbios 3:5-6",
    text: "Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento; reconheça o Senhor em todos os seus caminhos, e ele endireitará as suas veredas.",
    version: "NVI",
    context: "Direção e sabedoria que emanam da presença do Pai.",
  },
  {
    ref: "Eclesiastes 4:9-10, 12",
    text: "É melhor ter companhia do que estar sozinho, porque maior é a recompensa do trabalho de duas pessoas. Se um cair, amigo pode ajudar a levantar-se... Um cordão de três dobras não se rompe com facilidade.",
    version: "NVI",
    context: "A aliança sustentada pelo elo perfeito que é Jesus.",
  },
  {
    ref: "Salmos 27:14",
    text: "Espere no Senhor. Seja forte! Coragem! Espere no Senhor.",
    version: "NVI",
    context: "Coragem e perseverança para o coração.",
  },
  {
    ref: "Salmos 46:10",
    text: "Aquietai-vos e sabei que eu sou Deus; sou exaltado entre as nações, sou exaltado na terra.",
    version: "NVI",
    context: "O silêncio reverente que reconhece a soberania divina.",
  },
  {
    ref: "Romanos 8:28",
    text: "Sabemos que Deus age em todas as coisas para o bem daqueles que o amam, dos que foram chamados de acordo com o seu propósito.",
    version: "NVI",
    context: "Cada detalhe deste tempo coopera para o bem eterno.",
  },
  {
    ref: "Romanos 12:12",
    text: "Alegrem-se na esperança, sejam pacientes na tribulação, perseverem na oração.",
    version: "NVI",
    context: "A firmeza de quem confia na promessa de Deus.",
  },
  {
    ref: "Cânticos 8:7",
    text: "Nem muitas águas conseguem apagar o amor; os rios não conseguem levá-lo na correnteza.",
    version: "NVI",
    context: "Um amor gerado em Deus supera qualquer tempestade passageira.",
  },
  {
    ref: "Colossenses 3:14",
    text: "Acima de tudo, porém, revistam-se do amor, que é o elo perfeito.",
    version: "NVI",
    context: "A maturidade e pureza da aliança em Cristo.",
  },
  {
    ref: "1 João 4:18",
    text: "No amor não há medo; pelo contrário o perfeito amor expulsa o medo.",
    version: "NVI",
    context: "A segurança e descanso que só o amor de Deus concede.",
  },
  {
    ref: "Jeremias 29:11",
    text: "Porque sou eu que conheço os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar e não de lhes causar dano, planos de dar-lhes esperança e um futuro.",
    version: "NVI",
    context: "Os planos do Senhor são de vida, paz e esperança viva.",
  },
  {
    ref: "Habacuque 2:3",
    text: "Pois a revelação aguarda um tempo designado; ela fala do fim e não falhará. Ainda que demore, espere-a; porque ela certamente virá e não se atrasará.",
    version: "NVI",
    context: "O cumprimento das promessas no tempo estabelecido por Deus.",
  },
  {
    ref: "Isaías 60:22",
    text: "O menor de vocês se tornará mil, o menorzinho, uma nação poderosa. Eu sou o Senhor; na hora certa farei que isso aconteça depressa.",
    version: "NVI",
    context: "No momento de Deus, Ele faz cumprir a Sua santa vontade.",
  },
  {
    ref: "Tiago 1:3-4",
    text: "Pois vocês sabem que a prova da sua fé produz perseverança. E a perseverança deve ter ação completa, a fim de que vocês sejam maduros e íntegros, sem lhes faltar coisa alguma.",
    version: "NVI",
    context: "Maturidade gerada pela oração e paciência.",
  },
  {
    ref: "1 Tessalonicenses 5:24",
    text: "Aquele que os chama é fiel, e fará isso.",
    version: "NVI",
    context: "A fidelidade incondicional do Senhor.",
  },
  {
    ref: "Efésios 4:2-3",
    text: "Sejam completamente humildes e dóceis, e sejam pacientes, suportando uns aos outros com amor. Façam todo o esforço para conservar a unidade do Espírito pelo vínculo da paz.",
    version: "NVI",
    context: "Corações mansos forjados no amor de Jesus.",
  },
  {
    ref: "Salmos 127:1",
    text: "Se não for o Senhor o construtor da casa, será inútil o trabalho dos construtores. Se não for o Senhor o protetor da cidade, será inútil a sentinela ficar de vigília.",
    version: "NVI",
    context: "A casa e a aliança são construídas e guardadas pelo Senhor.",
  },
  {
    ref: "Filipenses 4:6-7",
    text: "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará os seus corações e as suas mentes em Cristo Jesus.",
    version: "NVI",
    context: "A paz santa que dissipa toda ansiedade humana.",
  },
  {
    ref: "1 Pedro 5:7",
    text: "Lancem sobre ele toda a sua ansiedade, porque ele tem cuidado de vocês.",
    version: "NVI",
    context: "Descanso pleno no cuidado amoroso e paternal de Deus.",
  },
];

// Início: 05 de outubro de 2026
const START_DATE_STR = "2026-10-05T00:00:00-03:00";
// Término: 05 de novembro de 2026
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
    const randomIndex = Math.floor(Math.random() * BIBLE_VERSES_NVI.length);
    setActiveVerseIndex(randomIndex);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f4efe6] text-[#1c1917] flex flex-col justify-between selection:bg-[#e6dccb] selection:text-[#5a3e1b] font-sans antialiased overflow-x-hidden">
      {/* Luz ambiente orgânica e textura de areia sutil (Apple Desert / Sandstone feel) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Orbe solar quente translúcido superior */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[550px] w-[700px] rounded-full bg-radial from-[#eadecc]/60 via-[#ede5d8]/40 to-transparent blur-3xl opacity-80" />
        <div className="absolute top-1/2 -left-40 h-[500px] w-[500px] rounded-full bg-radial from-[#e4dac9]/40 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[600px] rounded-full bg-radial from-[#e9e0cf]/50 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Conteúdo Principal — Espaçamento e Respiração Nível Apple */}
      <main className="relative z-10 flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 flex flex-col items-center justify-center space-y-10 sm:space-y-14">
        {/* Cabeçalho do Propósito — Tipografia Editorial Refinada */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#1c1917] leading-[1.12]">
            O tempo de Deus <br />
            <span className="italic text-[#925828] font-serif">
              fortalece o que Ele uniu.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#57534e] font-normal leading-relaxed max-w-md mx-auto">
            Um tempo de consagração e oração individual diante do Pai. Onde o silêncio se torna altar,
            o Espírito Santo forja paciência, maturidade e restauração.
          </p>
        </div>

        {/* Bloco Central da Contagem Regressiva — Cartão em Vidro Fosco Apple & Areia */}
        <div className="w-full">
          {mounted ? (
            <div className="relative rounded-3xl border border-[#e4ded3] bg-white/80 p-6 sm:p-10 shadow-[0_12px_40px_rgba(140,110,80,0.06)] backdrop-blur-2xl space-y-8">
              {/* Barra de Progresso em Tom Areia / Ouro Nobre */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-[#78716c]">
                  <span className="flex items-center gap-1.5 text-[#925828] font-medium">
                    <Flame className="h-3.5 w-3.5 text-[#a8652d]" />
                    Dia {currentDay} de {totalDays}
                  </span>
                  <span>{progressPercent.toFixed(1)}% percorrido</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#e8e2d5] border border-[#ded5c5]">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#b58550] via-[#9e6f3b] to-[#7f5127] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Blocos de Contagem com Módulos Areia & Tipografia Apple */}
              {!isFinished ? (
                <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center">
                  {/* Dias */}
                  <div className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border border-[#dfd6c7] bg-[#ede6da]/70 shadow-xs">
                    <span className="font-mono text-3xl sm:text-5xl font-semibold tracking-tight text-[#8c5324]">
                      {String(timeLeft.days).padStart(2, "0")}
                    </span>
                    <span className="mt-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#78716c] font-medium">
                      Dias
                    </span>
                  </div>

                  {/* Horas */}
                  <div className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border border-[#dfd6c7] bg-[#ede6da]/70 shadow-xs">
                    <span className="font-mono text-3xl sm:text-5xl font-semibold tracking-tight text-[#1c1917]">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="mt-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#78716c] font-medium">
                      Horas
                    </span>
                  </div>

                  {/* Minutos */}
                  <div className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border border-[#dfd6c7] bg-[#ede6da]/70 shadow-xs">
                    <span className="font-mono text-3xl sm:text-5xl font-semibold tracking-tight text-[#1c1917]">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="mt-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#78716c] font-medium">
                      Minutos
                    </span>
                  </div>

                  {/* Segundos */}
                  <div className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border border-[#dfd6c7] bg-[#ede6da]/70 shadow-xs">
                    <span className="font-mono text-3xl sm:text-5xl font-semibold tracking-tight text-[#925828]">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="mt-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#78716c] font-medium">
                      Segundos
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center space-y-3 rounded-2xl border border-[#a3c9a8] bg-[#f0f7f1]">
                  <div className="mx-auto p-3 w-fit rounded-full bg-[#dbeade] text-[#2d6a4f]">
                    <Check className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1b4332]">
                    O Tempo Determinado se Cumpriu
                  </h3>
                  <p className="text-sm text-[#40534c] max-w-md mx-auto leading-relaxed">
                    Louvado seja o Senhor Jesus Cristo. Que os frutos desta consagração transbordem
                    em sabedoria, paz, amor e uma aliança renovada para sempre.
                  </p>
                </div>
              )}

              {/* Informações das Datas */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-4 border-t border-[#e8e1d5] text-xs font-mono text-[#78716c]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#a8a29e]">Início:</span>
                  <span className="text-[#44403c] font-medium">05 de outubro de 2026</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#a8a29e]">Término:</span>
                  <span className="text-[#8c5324] font-semibold">05 de novembro de 2026</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 w-full rounded-3xl border border-[#e4ded3] bg-white/60 animate-pulse" />
          )}
        </div>

        {/* Jornada Visual dos 31 Dias — Módulos Areia & Apple Calendar Touch */}
        <div className="w-full rounded-3xl border border-[#e4ded3] bg-white/70 p-5 sm:p-7 shadow-[0_8px_30px_rgba(140,110,80,0.04)] backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-2 text-[#44403c] font-semibold uppercase tracking-wider">
              <Calendar className="h-3.5 w-3.5 text-[#925828]" />
              Jornada dos {totalDays} Dias
            </span>
            <span className="text-[#78716c]">
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
                  className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-mono border transition-all ${
                    isCurrent
                      ? "border-[#925828] bg-white text-[#8c5324] font-bold shadow-sm ring-2 ring-[#925828]/25 scale-105"
                      : isPast
                      ? "border-[#ded6c9] bg-[#ebe3d6]/70 text-[#78716c]"
                      : "border-[#e8e1d5] bg-white/50 text-[#a8a29e]"
                  }`}
                >
                  <span>{dayNum}</span>
                  {isPast && <span className="h-1 w-1 rounded-full bg-[#52796f] mt-1" />}
                  {isCurrent && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#925828] mt-1" />
                  )}
                  {isFuture && <span className="h-1 w-1 rounded-full bg-[#d6cebf] mt-1" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Acervo de Versículos (Versão NVI) — Tipografia Estilo Apple Books / Editorial */}
        <div className="w-full rounded-3xl border border-[#e4ded3] bg-white/90 p-6 sm:p-10 shadow-[0_12px_40px_rgba(140,110,80,0.05)] backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#ece5da] pb-3.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#925828] uppercase tracking-widest font-semibold">
              Palavra para o Coração
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRandomVerse}
                title="Sortear outro versículo"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[#57534e] hover:text-[#1c1917] hover:bg-[#ede5d8] transition-all border border-[#dfd6c7] bg-[#f5f0e6]/70 active:scale-95"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#925828]" />
                <span>Sortear</span>
              </button>

              <div className="flex items-center gap-1 border-l border-[#e4ded3] pl-2">
                <button
                  onClick={() =>
                    setActiveVerseIndex((prev) =>
                      prev === 0 ? BIBLE_VERSES_NVI.length - 1 : prev - 1
                    )
                  }
                  className="p-1.5 rounded-full text-[#78716c] hover:text-[#1c1917] hover:bg-[#ede5d8] transition-colors"
                  aria-label="Versículo anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <span className="text-[11px] font-mono text-[#a8a29e] px-1">
                  {activeVerseIndex + 1}/{BIBLE_VERSES_NVI.length}
                </span>

                <button
                  onClick={() =>
                    setActiveVerseIndex((prev) => (prev + 1) % BIBLE_VERSES_NVI.length)
                  }
                  className="p-1.5 rounded-full text-[#78716c] hover:text-[#1c1917] hover:bg-[#ede5d8] transition-colors"
                  aria-label="Próximo versículo"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="min-h-[130px] flex flex-col justify-center space-y-4">
            <p className="text-base sm:text-xl font-serif italic text-[#1c1917] leading-relaxed">
              &ldquo;{BIBLE_VERSES_NVI[activeVerseIndex].text}&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 text-xs pt-1">
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-semibold text-[#925828] text-sm">
                  — {BIBLE_VERSES_NVI[activeVerseIndex].ref}
                </span>
                <span className="text-[11px] font-mono text-[#a8a29e] bg-[#f0ebdff0] px-1.5 py-0.5 rounded border border-[#dfd6c7]">
                  {BIBLE_VERSES_NVI[activeVerseIndex].version}
                </span>
              </div>
              <span className="text-[#78716c] text-[11px]">
                {BIBLE_VERSES_NVI[activeVerseIndex].context}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Espaço de Respiro Inferior Limpo (Sem textos redundantes) */}
      <footer className="relative z-10 w-full py-8 text-center" />
    </div>
  );
}
