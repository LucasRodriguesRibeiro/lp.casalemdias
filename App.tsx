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
  X,
  CreditCard,
  DollarSign,
  Heart
} from 'lucide-react';

// --- Shared Components ---

// Barra de Urgência Fixa
const UrgencyBanner = () => (
  <div className="sticky top-0 z-50 bg-gradient-to-r from-green-600 to-green-800 text-white text-center py-3 px-4 shadow-lg flex items-center justify-center gap-2 font-bold text-xs md:text-sm tracking-wide uppercase">
    <Zap size={16} className="text-yellow-300 animate-pulse" fill="currentColor" />
    <span>✨ O PRIMEIRO PASSO PARA UM CASAL SÁBIO</span>
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
        <p className="text-green-400 text-xs font-medium">acabou de garantir seu acesso!</p>
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
      <div className="text-center w-full bg-gradient-to-r from-green-500/10 via-green-500/5 to-green-500/10 p-6 rounded-3xl border border-green-500/20">
        <p className="text-gray-500 line-through text-sm mb-2 uppercase tracking-wider font-bold">De R$ 197,00 por apenas</p>
        <div className="flex items-baseline justify-center gap-3 mb-2">
          <span className="text-5xl md:text-6xl font-black bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">R$ 67,00</span>
        </div>
        <p className="text-lg text-green-400 font-bold">ou até 9x no cartão</p>
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-green-300/80">
          <Sparkles size={14} />
          <span className="font-semibold">Oferta por tempo limitado</span>
        </div>
      </div>
    )}
    <a
      href="https://pay.hotmart.com/Q104137511T"
      className="relative group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg md:text-xl py-5 px-10 rounded-full w-full text-center flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(34,197,94,0.4)] hover:shadow-[0_15px_40px_rgba(34,197,94,0.6)] transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98]"
    >
      <span className="relative z-10">QUERO ORGANIZAR MEU DINHEIRO AGORA</span>
      <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={24} />
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
    </a>
    <div className="flex flex-wrap justify-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">
      <span className="flex items-center gap-1.5"><Lock size={14} className="text-green-500" /> Compra 100% Segura</span>
      <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-500" /> Garantia de 7 Dias</span>
      <span className="flex items-center gap-1.5"><Zap size={14} className="text-green-500" /> Acesso Imediato</span>
    </div>
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
      const name = buyers[Math.floor(Math.random() * buyers.length)];
      setNotification({ name, visible: true });

      setTimeout(() => {
        setNotification(prev => ({ ...prev, visible: false }));
      }, 3500);

      const nextTime = Math.random() * 12000 + 8000;
      timeoutId = setTimeout(showNotification, nextTime);
    };

    timeoutId = setTimeout(showNotification, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-green-500 selection:text-white antialiased">
      <UrgencyBanner />
      <SocialProofToast name={notification.name} visible={notification.visible} />

      {/* DOBRA 1: Promessa Principal */}
      <Section id="dobra-1" className="text-center pt-20 md:pt-32 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-500 opacity-[0.08] blur-[150px] pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-6 py-3 rounded-full text-green-400 text-xs md:text-sm font-black uppercase tracking-[0.3em] mb-8 shadow-lg shadow-green-500/10">
          <Star size={18} className="animate-pulse" /> Sistema Financeiro para Casal
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
          A plataforma mais simples para vocês terem <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">clareza total</span> das contas e pararem de brigar por dinheiro.
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
          Sem planilhas complexas de Excel. Um sistema online, simples e intuitivo para acessar do celular ou computador.
        </p>

        {/* Mockup Placeholder */}
        <div className="relative mx-auto w-full max-w-4xl group cursor-default mb-8">
          <div className="absolute -inset-6 bg-gradient-to-r from-green-500 to-green-600 rounded-[32px] blur-[60px] opacity-15 group-hover:opacity-25 transition duration-1000"></div>
          <div className="relative bg-transparent rounded-3xl overflow-hidden flex items-center justify-center transform group-hover:scale-[1.005] transition-transform duration-500">
            <img
              src="/images/hero-mockup.png"
              alt="Dashboard da Planilha Financeira Casal em Dias"
              className="w-full h-auto object-contain rounded-xl relative z-10 drop-shadow-2xl"
            />
          </div>
        </div>
      </Section>

      {/* DOBRA 2: Prova Social */}
      <Section id="dobra-2" dark={false}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black">Quem usa, parou de <span className="text-green-500">brigar por dinheiro</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            "Amor, finalmente sobrou dinheiro no fim do mês! Nem acredito.",
            "A gente nem sabia onde estava gastando tanto com besteira. Agora tá tudo claro na tela.",
            "Em 3 dias a gente já sabia exatamente o que cortar. Recomendo demais pra qualquer casal.",
            "Salvou meu casamento. A gente só brigava por causa de cartão de crédito."
          ].map((text, i) => (
            <div key={i} className="bg-white text-slate-900 p-6 rounded-2xl rounded-tl-none shadow-xl border border-slate-200">
              <p className="font-medium">"{text}"</p>
            </div>
          ))}
        </div>
      </Section>

      {/* DOBRA 3: Pedra no Sapato */}
      <Section id="dobra-3">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-20 tracking-tight leading-tight">
          Você já se pegou <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">pensando isso?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            '"Para onde foi todo o nosso dinheiro esse mês?"',
            '"A gente trabalha tanto, ganha bem, mas nunca sobra nada."',
            '"Será que ele(a) está gastando escondido de mim?"',
            '"Não aguento mais esse clima pesado toda vez que chega um boleto."',
            '"Desse jeito nunca vamos conseguir viajar ou trocar de carro."'
          ].map((voice, i) => (
            <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border-l-4 border-green-500 shadow-2xl shadow-green-500/5 hover:shadow-green-500/10 transition-shadow duration-300">
              <p className="italic text-gray-200 font-medium text-lg md:text-xl leading-relaxed">{voice}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* DOBRA 4: Diagnóstico (Alívio da Culpa) */}
      <Section id="dobra-4" dark={false}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-12 leading-tight">
            A culpa <span className="text-green-500">não é</span> de vocês.
          </h2>
          <p className="text-gray-300 text-xl leading-relaxed mb-6">
            Organizar as finanças a dois é difícil porque <strong>ninguém ensina isso na escola</strong>.
          </p>
          <p className="text-gray-300 text-xl leading-relaxed mb-6">
            Vocês tentam usar aplicativos cheios de funções inúteis ou anotações perdidas no bloco de notas, mas a verdade é que falta uma ferramenta visual e feita especificamente para a rotina de um casal.
          </p>
          <div className="bg-green-500/10 p-8 rounded-3xl border border-green-500/30 mt-10">
            <p className="text-green-400 font-bold text-xl">
              A bagunça financeira não é falta de amor ou de vontade. É apenas falta da ferramenta certa para colocar tudo no lugar de forma simples.
            </p>
          </div>
        </div>
      </Section>

      {/* DOBRA 5: Passo a Passo */}
      <Section id="dobra-5" className="text-center relative">
        <h2 className="text-4xl md:text-6xl font-black mb-24 uppercase tracking-tight">Simples <span className="text-green-500">Assim:</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 relative max-w-5xl mx-auto">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-gradient-to-r from-transparent via-green-500/40 to-transparent"></div>
          {[
            { step: "01", title: "Crie seu Acesso", desc: "Receba o link por e-mail, crie seu cadastro seguro e entre no sistema imediatamente." },
            { step: "02", title: "Organize Rápido", desc: "Preencha suas informações de forma intuitiva. O sistema faz os cálculos sozinho." },
            { step: "03", title: "Acesse de Qualquer Lugar", desc: "Acompanhe seus gastos pelo celular, tablet ou computador, sem instalar nada." }
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center group relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 text-white font-black text-4xl flex items-center justify-center rounded-3xl mb-10 shadow-[0_20px_50px_-15px_rgba(34,197,94,0.5)] transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                {s.step}
              </div>
              <h4 className="text-2xl md:text-3xl font-black mb-5 text-gray-100">{s.title}</h4>
              <p className="text-gray-400 font-medium text-base md:text-lg leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* DOBRA 6: Tudo que vai receber */}
      <Section id="dobra-6" dark={false}>
        <h2 className="text-4xl md:text-7xl font-black text-center mb-24 tracking-tight">
          O que vocês <span className="text-green-500">levam hoje:</span>
        </h2>
        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-slate-700/50 flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-green-500/20 p-6 rounded-2xl text-green-500"><FileText size={40} /></div>
            <div>
              <h3 className="font-black text-2xl text-white mb-2">✅ Sistema Financeiro Casal em Dias</h3>
              <p className="text-gray-300">Acesso vitalício à plataforma online. Não é Excel. Funciona no navegador do seu celular ou computador.</p>
            </div>
          </div>

          {[
            { title: "🎁 BÔNUS 1: Passo a passo prático de como usar", desc: "Um vídeo rápido mostrando exatamente como usar o sistema para organizar tudo em minutos." },
            { title: "🎁 BÔNUS 2: Ebook Conversas Financeiras Sem Briga", desc: "O guia completo em PDF para alinhar as finanças com seu parceiro sem gerar conflitos." },
            { title: "🎁 BÔNUS 3: Desafio 7 Dias de Organização Financeira a Dois", desc: "Um plano prático dia-a-dia para vocês colocarem a casa em ordem em apenas uma semana." }
          ].map((bonus, i) => (
            <div key={i} className="bg-slate-900/50 p-6 rounded-3xl border border-slate-700/50 hover:border-green-500/30 transition-colors">
              <h3 className="font-bold text-xl text-green-400 mb-2">{bonus.title}</h3>
              <p className="text-gray-400">{bonus.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* DOBRA 7: Pra quem é */}
      <Section id="dobra-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-green-900/20 to-slate-900 p-12 rounded-[48px] border-2 border-green-500/30 shadow-2xl shadow-green-500/10">
            <h3 className="text-green-400 font-black text-4xl mb-12 flex items-center gap-3">
              <CircleCheck size={36} className="text-green-500" /> É pra você que:
            </h3>
            <ul className="space-y-7">
              {[
                "Quer paz financeira dentro de casa.",
                "Não tem paciência para planilhas complicadas de Excel.",
                "Precisa organizar a vida financeira \"para ontem\".",
                "Quer transparência total com seu parceiro(a)."
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start">
                  <CircleCheck className="text-green-500 shrink-0 mt-1" size={24} />
                  <span className="text-gray-200 font-semibold text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-12 rounded-[48px] border border-slate-700/50 hover:border-red-500/30 transition-colors">
            <h3 className="text-red-500 font-black text-4xl mb-12 italic">NÃO é pra você se:</h3>
            <ul className="space-y-7">
              {[
                "Procura uma \"fórmula mágica\" para ficar rico sem trabalho.",
                "Não está disposto a tirar 5 minutos por semana para anotar os gastos.",
                "Prefere continuar no escuro sem saber para onde vai o salário."
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
      <Section id="dobra-8" dark={false} className="text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-10">Vamos <span className="text-green-500">recapitular...</span></h2>
        <div className="max-w-4xl mx-auto bg-slate-900 p-10 rounded-3xl border border-slate-700">
          <div className="text-left space-y-8">
            <h4 className="text-4xl font-black italic text-gray-100">O que você leva:</h4>
            <ul className="space-y-4 text-gray-300 font-semibold text-lg">
              <li className="flex justify-between border-b border-slate-700 pb-4">
                <span>• Sistema Online Casal em Dias</span> <div className="flex items-center gap-2"><span className="text-gray-400 line-through decoration-red-500 decoration-2">R$ 197,00</span> <X className="text-red-500" size={20} strokeWidth={3} /></div>
              </li>
              <li className="flex justify-between border-b border-slate-700 pb-4">
                <span className="text-green-400 font-bold text-base md:text-lg">🎁 Bônus: Conversas Financeiras Sem Briga</span> <div className="flex items-center gap-2 shrink-0"><span className="text-gray-400 line-through decoration-red-500 decoration-2 text-sm md:text-base">R$ 47,00</span> <X className="text-red-500" size={20} strokeWidth={3} /></div>
              </li>
              <li className="flex justify-between border-b border-slate-700 pb-4">
                <span className="text-green-400 font-bold text-base md:text-lg">🎁 Bônus: Desafio 7 Dias de Organização</span> <div className="flex items-center gap-2 shrink-0"><span className="text-gray-400 line-through decoration-red-500 decoration-2 text-sm md:text-base">R$ 47,00</span> <X className="text-red-500" size={20} strokeWidth={3} /></div>
              </li>
            </ul>
            <div className="pt-8 border-t border-slate-700">
              <p className="text-gray-500 font-black line-through text-2xl">VALOR TOTAL: R$ 291,00</p>
              <p className="text-white font-black text-4xl mt-3 italic">Apenas hoje por <span className="text-green-500">R$ 67,00</span></p>
            </div>
          </div>
        </div>
      </Section>

      {/* DOBRA 9: Preço + CTA */}
      <Section id="dobra-9" className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none"></div>
        <div className="text-center relative z-10">
          {/* Price displayed in BuyButton */}
        </div>
        <BuyButton showPrice={true} />
      </Section>

      {/* DOBRA 10: Conversa Séria */}
      <Section id="dobra-10" dark={false} className="text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-12">Quanto custa <span className="text-red-500">continuar do jeito que está?</span></h2>
        <div className="max-w-3xl mx-auto text-xl text-gray-300 space-y-8">
          <p>O dinheiro entrando e saindo sem controle. As discussões desgastando o amor dia após dia. O futuro dos sonhos ficando cada vez mais longe.</p>
          <p className="text-2xl font-bold text-white">R$ 67,00 é menos do que uma pizza que vocês pedem no fim de semana.</p>
          <p>Troque essa pizza momentânea pela paz financeira de vocês.</p>
        </div>
      </Section>

      {/* DOBRA 11: Autoridade */}
      <Section id="dobra-11">
        <div className="max-w-4xl mx-auto bg-slate-900 p-12 rounded-3xl border border-slate-700 flex flex-col md:flex-row items-center gap-10">
          {/* Creator Image */}
          <div className="w-48 h-48 md:w-64 md:h-64 bg-slate-800 rounded-3xl flex items-center justify-center shrink-0 border-4 border-slate-700 overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <img src="/images/lucas-layla.jpg" alt="Lucas e Layla" className="w-full h-full object-cover object-top" />
          </div>
          <div>
            <h3 className="text-3xl font-black text-white mb-4">Quem somos?</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Nós somos <strong>Lucas e Layla</strong>, casados há 4 anos.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mt-4">
              Criamos o <strong>Casal em Dias</strong> porque sentimos na pele a dificuldade de organizar o dinheiro a dois. Depois de testar dezenas de planilhas complicadas, o Lucas (que é programador) decidiu criar um sistema próprio, focado na nossa realidade.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mt-4">
              Hoje, nossa missão é ajudar outros casais a terem a mesma paz financeira que conquistamos.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <BuyButton showPrice={false} />
        </div>
      </Section>

      {/* DOBRA 12: FAQ + Footer */}
      <Section id="dobra-12" dark={false} className="pb-16">
        <h2 className="text-4xl md:text-7xl font-black text-center mb-24 tracking-tight">Dúvidas <span className="text-green-500">Frequentes</span></h2>
        <div className="max-w-4xl mx-auto space-y-6 mb-32">
          {[
            { q: "Preciso ter Excel ou computador?", a: "Não! O sistema é 100% online. Você acessa direto pelo navegador do seu celular ou computador, como se fosse um site." },
            { q: "Funciona em qualquer celular?", a: "Sim, funciona em qualquer smartphone (Android ou iPhone) com acesso à internet." },
            { q: "E se eu tiver dificuldades?", a: "Você terá acesso ao vídeo passo a passo mostrando exatamente onde clicar. É super intuitivo." },
            { q: "Tenho que pagar mensalidade?", a: "Não. O pagamento é único e você tem acesso vitalício ao sistema e aos bônus." },
            { q: "Como acesso o sistema?", a: "Após o pagamento, você recebe um e-mail para criar seu cadastro (login e senha) e acessar sua área exclusiva imediatamente." }
          ].map((faq, i) => (
            <details key={i} className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 overflow-hidden transition-all duration-300 hover:border-green-500/50">
              <summary className="flex items-center justify-between p-8 md:p-10 cursor-pointer hover:bg-slate-800/50 transition-colors font-black text-xl md:text-2xl list-none select-none text-gray-100">
                {faq.q} <ChevronDown className="group-open:rotate-180 transition-transform text-green-500" size={28} />
              </summary>
              <div className="px-8 md:px-10 pb-8 md:pb-10 text-gray-300 font-medium text-lg md:text-xl leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        <div className="pt-24 border-t border-slate-800">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-2xl font-bold text-white mb-6">A decisão é de vocês.</p>
            <p className="text-gray-300 mb-10">Continuar nas brigas e no descontrole ou pagar o preço de uma pizza para ter paz financeira?</p>
            <BuyButton showPrice={false} />
          </div>

          <footer className="mt-20 text-center opacity-50 text-xs">
            <p>© {new Date().getFullYear()} Finanças de Casal. Todos os direitos reservados.</p>
          </footer>
        </div>
      </Section>

    </div>
  );
};

export default App;
