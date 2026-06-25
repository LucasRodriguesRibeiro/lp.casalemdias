import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Zap,
  ChevronDown,
  ArrowRight,
  Lock,
  Sparkles,
  Target,
  Users,
  Heart,
  TrendingUp,
  FileText,
  CreditCard
} from 'lucide-react';

// --- Shared Components ---

// Barra de Urgência Fixa (Simplificada para Mobile)
const UrgencyBanner = () => (
  <div className="bg-emerald-600 text-white text-center py-2 px-4 flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-wide">
    <Zap size={12} className="text-amber-300 animate-pulse" fill="currentColor" />
    <span>Preço Promocional: Apenas R$ 47,00 hoje!</span>
  </div>
);

// Componente do Botão de Compra Primário (Otimizado para Mobile)
const BuyButton = ({ text = "QUERO ACESSAR O SISTEMA", className = "" }: { text?: string, className?: string }) => (
  <div className={`flex flex-col items-center gap-2.5 w-full ${className}`}>
    <a
      href="https://pay.hotmart.com/Q104137511T"
      className="bg-emerald-600 text-white font-black text-base py-4 px-6 rounded-xl w-full text-center flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(16,185,129,0.3)] active:scale-95 transition-transform"
    >
      <span className="uppercase tracking-wide">{text}</span>
      <ArrowRight size={18} />
    </a>
    <div className="flex justify-center gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
      <span className="flex items-center gap-1"><Lock size={12} className="text-emerald-500" /> Seguro</span>
      <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-emerald-500" /> 7 Dias Garantia</span>
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const showcaseData = [
    {
      icon: <Sparkles size={14} />,
      image: '/images/App1.png',
      badge: 'Dashboard',
      title: 'Visão Geral',
      description: 'Veja para onde vai cada centavo com gráficos fáceis de entender.'
    },
    {
      icon: <Target size={14} />,
      image: '/images/app2.png',
      badge: 'Orçamento',
      title: 'Planejamento Mensal',
      description: 'Defina limites de gastos no início do mês e evite surpresas.'
    },
    {
      icon: <FileText size={14} />,
      image: '/images/app3.png',
      badge: 'Lançamentos',
      title: 'Registro Rápido',
      description: 'Adicione despesas diárias rapidamente direto pelo celular.'
    },
    {
      icon: <Users size={14} />,
      image: '/images/app4.png',
      badge: 'Divisão',
      title: 'Divisão Justa',
      description: 'Calcule a contribuição de cada um com base nos salários.'
    },
    {
      icon: <Heart size={14} />,
      image: '/images/app5.png',
      badge: 'Metas',
      title: 'Sonhos do Casal',
      description: 'Acompanhe a poupança conjunta para a próxima viagem ou casa.'
    },
    {
      icon: <TrendingUp size={14} />,
      image: '/images/app6.png',
      badge: 'Análise',
      title: 'Relatórios',
      description: 'Compare receitas e despesas ao longo dos meses facilmente.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % showcaseData.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    // Wrapper restrito para emular layout Mobile mesmo no desktop
    <div className="bg-slate-100 min-h-screen font-sans antialiased text-slate-800">
      <div className="max-w-[480px] mx-auto bg-white min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
        
        <UrgencyBanner />

        {/* 1. DOBRA PRINCIPAL (HERO) - Muito mais enxuta */}
        <section className="pt-8 pb-10 px-5 text-center relative">
          <h1 className="text-3xl font-black text-slate-900 leading-[1.15] mb-3 tracking-tight">
            Organizem as finanças a dois em <span className="text-emerald-600 bg-emerald-50 px-1 rounded">10 minutos</span> por semana.
          </h1>
          <p className="text-sm text-slate-600 mb-6 font-medium leading-relaxed">
            O aplicativo online mais simples para o casal ter clareza das contas e alinhar os sonhos financeiros. Sem planilhas de Excel.
          </p>

          {/* Hero Mockup Image */}
          <div className="relative mx-auto mb-8 flex justify-center px-4">
            <img
              src="/images/hero-mockup.png"
              alt="App Casal em Dias"
              className="w-full h-auto object-contain scale-110 drop-shadow-2xl"
            />
          </div>

          <BuyButton />
        </section>

        {/* 2. SHOWCASE (TELA A TELA) */}
        <section className="py-10 bg-slate-50 border-y border-slate-200/60">
          <div className="px-5">
            <h2 className="text-xl font-black text-slate-900 leading-tight mb-5 text-center">
              Tudo que vocês precisam em um só lugar
            </h2>

            {/* Tab Display Panel (Carrossel Automático) */}
            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
              <div className="relative rounded-lg border border-slate-100 overflow-hidden bg-slate-950 aspect-[16/10] mb-4">
                <img
                  src={showcaseData[activeTab].image}
                  alt={showcaseData[activeTab].title}
                  className="w-full h-full object-cover animate-slide-in-right"
                  key={activeTab}
                />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">{showcaseData[activeTab].title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                {showcaseData[activeTab].description}
              </p>
            </div>
          </div>
        </section>

        {/* 3. ANTES E DEPOIS (O PORQUÊ) */}
        <section className="py-10 px-5 bg-white">
          <h2 className="text-xl font-black text-slate-900 text-center mb-6 leading-tight">
            Por que organizar juntos?
          </h2>

          <div className="flex flex-col gap-4">
            {/* Antes */}
            <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-5">
              <h3 className="text-rose-700 font-bold text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
                ❌ Sem o Sistema
              </h3>
              <ul className="space-y-2.5 text-slate-600 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Falta de controle claro sobre gastos e boletos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Sensação de que o dinheiro some no fim do mês.</span>
                </li>
              </ul>
            </div>

            {/* Depois */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-emerald-700 font-bold text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
                ✅ Com o Sistema
              </h3>
              <ul className="space-y-2.5 text-slate-700 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Finanças em harmonia e com divisão justa.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Planejamento claro para realizar os sonhos do casal.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. OFERTA ESPECIAL */}
        <section className="py-12 px-5 bg-slate-50 border-t border-slate-200/60">
          <div className="bg-white border-2 border-emerald-500 rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-emerald-600 text-white text-center py-1.5 font-bold text-[10px] uppercase tracking-widest">
              Acesso Vitalício + Bônus
            </div>

            <div className="p-6">
              <div className="space-y-3 mb-6">
                {[
                  "Acesso ao App Casal em Dias",
                  "Guia de Conversas (Bônus)",
                  "100% Seguro (Sem dados bancários)"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-5 text-center">
                <span className="text-slate-400 line-through text-xs font-semibold uppercase tracking-wider block mb-1">
                  De R$ 97,00 por apenas
                </span>
                
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-slate-900 text-xl font-black">R$</span>
                  <span className="text-slate-900 text-5xl font-black tracking-tight">47,00</span>
                </div>
                
                <p className="text-emerald-600 font-bold text-xs mt-1.5">
                  Pagamento único • Sem mensalidades
                </p>
              </div>

              <BuyButton text="Garantir Meu Acesso" className="mt-6" />
              
              <div className="mt-4 flex justify-center items-center gap-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                <CreditCard size={12} /> Aceita Pix, Boleto e Cartão
              </div>
            </div>
          </div>
        </section>

        {/* 5. FAQ */}
        <section className="py-10 px-5 bg-white border-t border-slate-200/60">
          <h2 className="text-xl font-black text-slate-900 text-center mb-6 leading-tight">
            Dúvidas Frequentes
          </h2>

          <div className="space-y-3">
            {[
              {
                q: "Preciso pagar mensalidade?",
                a: "Não. O pagamento de R$ 47,00 é único e o acesso é vitalício."
              },
              {
                q: "Preciso saber muito de Excel?",
                a: "Não! O Casal em Dias NÃO é uma planilha de Excel ou Google Sheets. É um aplicativo online extremamente simples, feito para qualquer pessoa usar."
              },
              {
                q: "Como recebo o acesso e uso?",
                a: "Logo após o pagamento, você recebe um link online no e-mail. Basta criar sua conta com e-mail e senha, e usar direto no navegador do celular ou computador."
              },
              {
                q: "Precisa de dados bancários?",
                a: "Nunca. Nosso aplicativo é 100% seguro. Nós não pedimos e nem conectamos nenhuma conta bancária sua."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-slate-900"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform ${
                      openFaq === index ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-200 ease-in-out ${
                    openFaq === index ? 'max-h-40 border-t border-slate-200 bg-white p-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="py-6 text-center border-t border-slate-200 bg-slate-50 text-[10px] text-slate-400">
          <p>© {new Date().getFullYear()} Casal em Dias. Todos os direitos reservados.</p>
        </footer>

      </div>
    </div>
  );
}
