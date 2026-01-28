
import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Users,
  Target,
  MessageCircle,
  ChevronDown,
  ArrowRight,
  Lock,
  AlertTriangle,
  Award,
  CircleCheck,
  TrendingDown,
  Mail,
  MapPin,
  FileText,
  Star,
  Sparkles,
  X
} from 'lucide-react';

// --- Shared Components ---

// Barra de Urgência Fixa
const UrgencyBanner = () => (
  <div className="sticky top-0 z-50 bg-gradient-to-r from-red-600 to-red-800 text-white text-center py-3 px-4 shadow-lg flex items-center justify-center gap-2 font-bold text-xs md:text-sm tracking-wide uppercase">
    <Zap size={16} className="text-yellow-300 animate-pulse" fill="currentColor" />
    <span>Oferta Especial: Acesso Imediato + Garantia de 7 Dias</span>
  </div>
);

// Notificação de Prova Social
const SocialProofToast = ({ name, visible }: { name: string; visible: boolean }) => {
  if (!visible) return null;
  return (
    <div className={`fixed bottom-4 left-4 z-50 flex items-center gap-3 bg-slate-900 border border-slate-700/50 p-4 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] max-w-[300px] ${visible ? 'animate-slide-in-left' : 'animate-slide-out-left'}`}>
      <div className="bg-green-500/10 p-2 rounded-full border border-green-500/20 shrink-0">
        <CircleCheck size={20} className="text-green-500" />
      </div>
      <div>
        <p className="text-gray-100 font-bold text-sm">{name}</p>
        <p className="text-green-400 text-xs font-medium">acabou de comprar o manual!</p>
      </div>
    </div>
  );
};

const Section = ({ id, children, className = "", dark = true }: { id: string, children?: React.ReactNode, className?: string, dark?: boolean }) => (
  <section id={id} className={`py-12 px-6 md:py-16 ${dark ? 'bg-gradient-to-b from-slate-950 to-slate-900' : 'bg-gradient-to-b from-slate-900 to-slate-950'} ${className}`}>
    <div className="max-w-[1000px] mx-auto">
      {children}
    </div>
  </section>
);

const BuyButton = ({ showPrice = false }: { showPrice?: boolean }) => (
  <div className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto">
    {showPrice && (
      <div className="text-center w-full bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-orange-500/10 p-6 rounded-3xl border border-orange-500/20">
        <p className="text-gray-500 line-through text-sm mb-2 uppercase tracking-wider font-bold">De R$ 502,00 por apenas</p>
        <div className="flex items-baseline justify-center gap-3 mb-2">
          <span className="text-2xl font-black text-gray-400">12x de</span>
          <span className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">R$ 6,73</span>
        </div>
        <p className="text-lg text-orange-400 font-bold">Ou R$ 67,00 à vista no PIX</p>
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-orange-300/80">
          <Sparkles size={14} />
          <span className="font-semibold">Oferta por tempo limitado</span>
        </div>
      </div>
    )}
    <a
      href="https://pay.hotmart.com/C104133503E"
      className="relative group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg md:text-xl py-5 px-10 rounded-full w-full text-center flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(249,115,22,0.4)] hover:shadow-[0_15px_40px_rgba(249,115,22,0.6)] transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98]"
    >
      <span className="relative z-10">QUERO MEU MANUAL AGORA</span>
      <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={24} />
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
    </a>
    <div className="flex flex-wrap justify-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">
      <span className="flex items-center gap-1.5"><Lock size={14} className="text-green-500" /> Compra 100% Segura</span>
      <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-500" /> Garantia de 7 Dias</span>
      <span className="flex items-center gap-1.5"><Zap size={14} className="text-orange-500" /> Acesso Imediato</span>
    </div>
  </div>
);

const WhatsAppBubble = ({ text }: { text: string }) => (
  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl rounded-tl-none border border-slate-700/50 shadow-2xl relative hover:scale-[1.02] transition-transform duration-300">
    <div className="absolute top-0 -left-3 w-0 h-0 border-t-[16px] border-t-slate-800 border-l-[16px] border-l-transparent"></div>
    <p className="text-gray-200 text-base md:text-lg leading-relaxed font-medium">{text}</p>
  </div>
);

// --- App Principal ---

const App: React.FC = () => {
  const [notification, setNotification] = useState({ name: '', visible: false });

  useEffect(() => {
    const buyers = [
      "Carlos Silva", "Ana Paula", "Roberto Santos", "Maria Oliveira",
      "João Pedro", "Fernanda Costa", "Lucas Mendes", "Juliana Almeida",
      "Marcos Souza", "Patrícia Lima", "Rafael Oliveira", "Camila Santos",
      "Bruno Ferreira", "Amanda Rodrigues", "Felipe Martins", "Larissa Gomes",
      "Diego Nascimento", "Vanessa Pereira", "Thiago Costa", "Bianca Ribeiro"
    ];

    let timeoutId: ReturnType<typeof setTimeout>;

    const showNotification = () => {
      // Pick random name
      const name = buyers[Math.floor(Math.random() * buyers.length)];
      setNotification({ name, visible: true });

      // Hide after 3.5s
      setTimeout(() => {
        setNotification(prev => ({ ...prev, visible: false }));
      }, 3500);

      // Schedule next notification (random 8s - 20s)
      const nextTime = Math.random() * 12000 + 8000;
      timeoutId = setTimeout(showNotification, nextTime);
    };

    // First appearance after 5s
    timeoutId = setTimeout(showNotification, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-orange-500 selection:text-white antialiased">
      <UrgencyBanner />
      <SocialProofToast name={notification.name} visible={notification.visible} />

      {/* DOBRA 1: Headline */}
      <Section id="dobra-1" className="text-center pt-20 md:pt-32 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500 opacity-[0.08] blur-[150px] pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-6 py-3 rounded-full text-orange-400 text-xs md:text-sm font-black uppercase tracking-[0.3em] mb-8 shadow-lg shadow-orange-500/10">
          <Award size={18} className="animate-pulse" /> Manual de Cultura Comercial
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
          Organize, alinhe e faça<br />sua equipe <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">vender mais</span>.
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
          O manual de cultura comercial definitivo, pronto para aplicar e acabar com a bagunça <span className="text-orange-400 font-bold">em 48h</span>.
        </p>

        {/* Mockup */}
        <div className="relative mx-auto w-full max-w-4xl group cursor-default mb-8">
          <div className="absolute -inset-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-[32px] blur-[60px] opacity-15 group-hover:opacity-25 transition duration-1000"></div>
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl transform transition-transform group-hover:scale-[1.005]">
            <img
              src="/images/full-stack.png"
              alt="Manual de Cultura Comercial + Bônus"
              className="w-full h-auto object-cover"
            />


          </div>
        </div>
      </Section>



      {/* DOBRA 3: Vozes na Cabeça */}
      <Section id="dobra-3">
        <h2 className="text-4xl md:text-7xl font-black text-center mb-20 tracking-tight leading-tight">
          Você se sente um <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">escravo</span><br />da sua própria operação?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            '"Minha equipe até vende, mas cada um faz do seu jeito…"',
            '"Quando eu paro de cobrar, tudo desanda…"',
            '"Eu não tenho um padrão claro pra exigir nada…"',
            '"Eu sinto que estou apagando incêndio todo santo dia…"',
            '"Eu preciso de algo pronto e rápido, cansei de teoria…"',
            '"Se eu não estiver em cima, ninguém faz nada direito…"'
          ].map((voice, i) => (
            <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border-l-4 border-orange-500 shadow-2xl shadow-orange-500/5 hover:shadow-orange-500/10 transition-shadow duration-300">
              <p className="italic text-gray-200 font-medium text-lg md:text-xl leading-relaxed">{voice}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* DOBRA 4: Transição */}
      <Section id="dobra-4" dark={false}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-12 leading-tight">
            Pare de culpar seu time.<br />
            <span className="text-gray-500 italic">Eles só precisam de um mapa.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-16">
            O problema não é a falta de vontade deles, é a falta de <span className="text-orange-400 font-bold border-b-4 border-orange-500 pb-1">processos claros</span>. Se você não escreve as regras, cada um cria as próprias.
          </p>
          <div className="space-y-6">
            {[
              'O "bom senso" não é um processo de vendas confiável.',
              'Empresas que dependem de "vendedores estrelas" são frágeis.',
              'Você merece ter uma empresa que fatura enquanto você dorme.'
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-6 bg-gradient-to-r from-orange-500/5 to-transparent rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                <AlertTriangle className="text-orange-500 shrink-0 mt-1" size={28} />
                <p className="text-gray-200 font-semibold text-lg md:text-xl text-left">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* DOBRA 5: Passo a Passo */}
      <Section id="dobra-5" className="text-center relative">
        <h2 className="text-4xl md:text-6xl font-black mb-24 uppercase tracking-tight">O Caminho Mais <span className="text-orange-400">Curto</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 relative max-w-5xl mx-auto">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"></div>
          {[
            { step: "01", title: "Compre e Receba", desc: "Acesso imediato ao Manual e entregáveis no seu e-mail." },
            { step: "02", title: "Siga o Guia", desc: "Implementação guiada em 48h para não travar sua agenda." },
            { step: "03", title: "Aplique Hoje", desc: "Rotinas e padrões rodando com sua equipe imediatamente." }
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center group relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 text-white font-black text-4xl flex items-center justify-center rounded-3xl mb-10 shadow-[0_20px_50px_-15px_rgba(249,115,22,0.5)] transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                {s.step}
              </div>
              <h4 className="text-2xl md:text-3xl font-black mb-5 text-gray-100">{s.title}</h4>
              <p className="text-gray-400 font-medium text-base md:text-lg leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* DOBRA 6: Entregáveis */}
      <Section id="dobra-6" dark={false}>
        <h2 className="text-4xl md:text-7xl font-black text-center mb-24 tracking-tight">
          O que está <span className="text-orange-400">lá dentro:</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            { id: "01", title: "Regras de Ouro", desc: "Checklist prático para alinhar quem entra e quem já está na casa.", icon: <Award /> },
            { id: "02", title: "Rotina Mínima", desc: "O padrão exato de execução diária para que nada seja esquecido.", icon: <Clock /> },
            { id: "03", title: "Padrões de Conduta", desc: "O guia do que pode e o que não pode dentro da sua operação.", icon: <ShieldCheck /> },
            { id: "04", title: "Scripts-base", desc: "Modelos curtos e diretos para falar com a equipe sem rodeios.", icon: <MessageCircle /> },
            { id: "05", title: "Reunião de 15 Minutos", desc: "Pauta pronta para reuniões produtivas que não tomam tempo.", icon: <Users /> },
            { id: "06", title: "Quadro de Metas", desc: "Como visualizar o progresso de forma simples e visual.", icon: <Target /> },
            { id: "07", title: "Implementação 48h", desc: "O passo a passo para colocar o manual pra rodar agora.", icon: <Zap /> }
          ].map((d, i) => (
            <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-slate-700/50 flex gap-6 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 group">
              <div className="text-orange-500 shrink-0 mt-1 bg-orange-500/10 p-5 rounded-2xl group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-300">{d.icon}</div>
              <div>
                <span className="text-orange-400 text-xs font-black uppercase mb-2 block tracking-wider">Item {d.id}</span>
                <h3 className="font-black text-xl md:text-2xl mb-3 text-gray-100">{d.title}</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* DOBRA 7: Pra quem é */}
      <Section id="dobra-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-green-900/20 to-slate-900 p-12 rounded-[48px] border-2 border-green-500/30 shadow-2xl shadow-green-500/10">
            <h3 className="text-orange-400 font-black text-4xl mb-12 flex items-center gap-3">
              <CircleCheck size={36} className="text-green-500" /> Isso é para você:
            </h3>
            <ul className="space-y-7">
              {[
                "Cansado de repetir a mesma ordem 10x.",
                "Sente que a equipe só trabalha com você em cima.",
                "Quer delegar sem perder o controle da qualidade.",
                "Deseja crescer sem aumentar seu estresse."
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start">
                  <CircleCheck className="text-green-500 shrink-0 mt-1" size={24} />
                  <span className="text-gray-200 font-semibold text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-12 rounded-[48px] border border-slate-700/50 hover:border-red-500/30 transition-colors">
            <h3 className="text-red-500 font-black text-4xl mb-12 italic">Não é para você:</h3>
            <ul className="space-y-7">
              {[
                "Busca uma 'fórmula mágica' sem esforço.",
                "Não pretende abrir o manual e aplicar.",
                "Prefere continuar apagando incêndios.",
                "Acredita que processos engessam as pessoas."
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start text-gray-300">
                  <span className="shrink-0 mt-1 text-2xl">❌</span>
                  <span className="font-medium italic text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* DOBRA 8: Ancoragem */}
      <Section id="dobra-8" dark={false} className="text-center overflow-hidden">
        <h2 className="text-4xl md:text-6xl font-black mb-20 tracking-tight uppercase">
          Um verdadeiro <span className="text-orange-400">Ativo</span> para sua empresa.
        </h2>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-12 md:p-24 rounded-[56px] border border-slate-700/50 relative shadow-2xl max-w-6xl mx-auto">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500 opacity-[0.05] blur-[200px] pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative group mx-auto">
              <div className="absolute -inset-6 bg-gradient-to-r from-orange-500 to-orange-600 opacity-20 blur-3xl group-hover:opacity-30 transition duration-1000"></div>
              <img
                src="/images/full-stack.png"
                alt="Stack Completo: Manual + Bônus"
                className="w-full max-w-[480px] rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 relative z-10"
              />
            </div>

            <div className="text-left space-y-8">
              <h4 className="text-4xl font-black italic text-gray-100">O que você leva:</h4>
              <ul className="space-y-4 text-gray-300 font-semibold text-lg">
                <li className="flex justify-between border-b border-slate-700 pb-4">
                  <span>• Manual de Cultura (PDF)</span> <div className="flex items-center gap-2"><span className="text-gray-400 line-through decoration-red-500 decoration-2">R$ 197,00</span> <X className="text-red-500" size={20} strokeWidth={3} /></div>
                </li>
                <li className="flex justify-between border-b border-slate-700 pb-4">
                  <span className="text-orange-400 font-bold text-base md:text-lg">🎁 Bônus: Como construir uma equipe que confia no líder e compra a cultura</span> <div className="flex items-center gap-2 shrink-0"><span className="text-gray-400 line-through decoration-red-500 decoration-2 text-sm md:text-base">R$ 97,00</span> <X className="text-red-500" size={20} strokeWidth={3} /></div>
                </li>
                <li className="flex justify-between border-b border-slate-700 pb-4">
                  <span className="text-orange-400 font-bold text-base md:text-lg">🎁 Bônus: Como lidar com a saída de bons colaboradores</span> <div className="flex items-center gap-2 shrink-0"><span className="text-gray-400 line-through decoration-red-500 decoration-2 text-sm md:text-base">R$ 97,00</span> <X className="text-red-500" size={20} strokeWidth={3} /></div>
                </li>

              </ul>
              <div className="pt-8 border-t border-slate-700">
                <p className="text-gray-500 font-black line-through text-2xl">VALOR TOTAL: R$ 502,00</p>
                <p className="text-white font-black text-4xl mt-3 italic">Apenas hoje por <span className="text-orange-400">R$ 67,00</span></p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* DOBRA 9: Preço + Botão */}
      <Section id="dobra-9" className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none"></div>
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-5xl md:text-8xl font-black mb-8 uppercase tracking-tight leading-tight">
            É sua vez de <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">liderar</span>.
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-medium">Invista menos que o valor de um lanche para blindar sua operação comercial.</p>
        </div>
        <BuyButton showPrice={true} />
      </Section>

      {/* DOBRA 10: Custo da Inércia */}
      <Section id="dobra-10" dark={false} className="text-center">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 flex justify-center">
            <div className="bg-red-500/10 p-6 rounded-full border-4 border-red-500/30">
              <TrendingDown size={72} className="text-red-500 animate-bounce" />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-16 leading-tight">Quanto custa <span className="text-red-500">NÃO</span> agir agora?</h2>
          <div className="space-y-10 text-gray-300 text-xl md:text-2xl font-medium leading-relaxed">
            <p>Se a sua equipe perder apenas <span className="text-orange-400 font-bold">1 venda por semana</span> de R$ 500,00 por falta de padrão, você está jogando fora <span className="text-white font-black text-3xl">R$ 2.000,00</span> por mês.</p>
            <p>Em um ano, são <span className="text-red-500 font-black text-4xl">R$ 24.000,00 perdidos</span> por pura desorganização.</p>
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-white p-10 rounded-3xl border-2 border-orange-500/40 italic shadow-2xl shadow-orange-500/20 mt-12">
              <p className="text-2xl md:text-3xl font-bold leading-relaxed">
                Você vai continuar pagando esse pedágio ou vai investir <span className="text-orange-400 font-black text-4xl">R$ 67</span> para parar esse vazamento hoje?
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* DOBRA 11: Autoridade */}
      <Section id="dobra-11">
        <div className="flex flex-col md:flex-row items-center gap-16 bg-gradient-to-br from-slate-800 to-slate-900 p-12 md:p-24 rounded-[56px] border border-slate-700/50 mb-24 relative overflow-hidden shadow-2xl max-w-6xl mx-auto">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 opacity-[0.03] blur-[150px] pointer-events-none"></div>
          <div className="shrink-0 relative group">
            <div className="absolute -inset-6 bg-gradient-to-r from-orange-500 to-orange-600 opacity-20 blur-3xl rounded-full group-hover:opacity-40 transition"></div>
            <img
              src="/images/jairo-queiroz.jpg"
              alt="Jairo Queiroz"
              className="w-56 h-56 md:w-64 md:h-64 rounded-[48px] object-cover relative z-10 border-4 border-slate-700 shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-all duration-500"
            />
          </div>
          <div className="text-left relative z-10">
            <h3 className="text-5xl font-black mb-8 text-gray-100">Jairo Queiroz</h3>
            <p className="text-gray-300 text-xl md:text-2xl leading-relaxed font-medium mb-8">
              Empreendedor desde os 14 anos. Empresário há mais de 25 anos. Experiência prática em gestão, vendas e cultura de execução.
            </p>
            <div className="bg-slate-800/50 p-6 rounded-2xl border-l-4 border-orange-500">
              <p className="text-gray-400 italic font-medium text-lg md:text-xl leading-relaxed">
                "Eu não sou um guru. Sou um empresário que cansou de ver bons negócios quebrarem por falta de padrão. Este manual é o que eu uso."
              </p>
            </div>
          </div>
        </div>
        <BuyButton showPrice={true} />
      </Section>

      {/* DOBRA 12: FAQ + Footer */}
      <Section id="dobra-12" dark={false} className="pb-16">
        <h2 className="text-4xl md:text-7xl font-black text-center mb-24 tracking-tight">Perguntas <span className="text-orange-400">Comuns</span></h2>
        <div className="max-w-4xl mx-auto space-y-6 mb-32">
          {[
            { q: "O acesso é imediato?", a: "Sim. Assim que o pagamento for aprovado (Pix cai na hora), você recebe o link no e-mail cadastrado." },
            { q: "Preciso de algum programa pago?", a: "Não. O manual é focado em processos e condutas que você implementa com papel, caneta ou as ferramentas que já usa." },
            { q: "Funciona para equipes pequenas?", a: "Funciona para quem tem 1 vendedor ou 100. Padrão é padrão, independente do tamanho." },
            { q: "E se eu não gostar do conteúdo?", a: "Você tem 7 dias. Se ler e achar que não te ajudou em nada, basta enviar um único e-mail para o suporte e devolvemos 100% do seu dinheiro." }
          ].map((faq, i) => (
            <details key={i} className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 overflow-hidden transition-all duration-300 hover:border-orange-500/50">
              <summary className="flex items-center justify-between p-8 md:p-10 cursor-pointer hover:bg-slate-800/50 transition-colors font-black text-xl md:text-2xl list-none select-none text-gray-100">
                {faq.q} <ChevronDown className="group-open:rotate-180 transition-transform text-orange-500" size={28} />
              </summary>
              <div className="px-8 md:px-10 pb-8 md:pb-10 text-gray-300 font-medium text-lg md:text-xl leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        <div className="pt-24 border-t border-slate-800">
          <div className="text-center flex flex-col items-center gap-16">
            <BuyButton showPrice={true} />

            <footer className="space-y-12 w-full">
              <div className="flex justify-center gap-10 opacity-60 hover:opacity-100 transition-opacity">
                <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-10" alt="Visa" />
                <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-10" alt="Mastercard" />
                <img src="https://img.icons8.com/color/48/000000/pix.png" className="h-10" alt="Pix" />
              </div>



              <div className="flex justify-center gap-10 text-xs text-gray-600 underline font-bold">
                <a href="[LINK_TERMOS]" className="hover:text-orange-500 transition-colors">Termos de Uso</a>
                <a href="[LINK_PRIVACIDADE]" className="hover:text-orange-500 transition-colors">Políticas de Privacidade</a>
              </div>

              <div className="max-w-2xl mx-auto text-[10px] text-gray-700 leading-relaxed font-medium italic">
                Aviso Legal: Os resultados podem variar de empresa para empresa. O sucesso depende da implementação rigorosa dos processos sugeridos. Este site não é afiliado ao Google ou Facebook.
              </div>

              <p className="text-gray-700 text-xs pb-10">
                © {new Date().getFullYear()} Jairo Queiroz - Cultura Comercial de Elite.
              </p>
            </footer>
          </div>
        </div>
      </Section>

    </div>
  );
};

export default App;
