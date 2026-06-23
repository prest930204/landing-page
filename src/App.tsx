import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, CalendarX, BarChartHorizontal, Brain, CalendarDays, LineChart, 
  Dumbbell, ChevronRight, ChevronDown, CheckCircle2, ShieldCheck, Activity, ClipboardX, X, Loader2,
  Gamepad2, Trophy, Target, MessageSquare, Users, Repeat, CircleDollarSign, TrendingUp, PieChart, NotebookPen, Sword, Flame, Bell, Send, Lock, SlidersHorizontal, Smartphone, Megaphone, Tablet, UserCheck, MonitorSmartphone,
  Ticket, Utensils, FileText, PenTool
} from 'lucide-react';
import { AIRoutineSimulator } from './components/AIRoutineSimulator';
import { GamificationSimulator } from './components/GamificationSimulator';
import { AIDietSimulator } from './components/AIDietSimulator';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { staggerChildren: 0.15 }
};

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-700/60 last:border-0">
      <button
        className="w-full py-6 flex items-center justify-between text-left text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-lg pr-4 group-hover:text-blue-400 transition-colors">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="shrink-0 text-slate-400 group-hover:text-blue-400"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-400 leading-relaxed font-medium break-keep pr-4 text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B1121]/80 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl z-[70] mx-4"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const RegistrationForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    centerName: '',
    agreePrivacy: false,
    agreeMarketing: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreePrivacy) {
      setError('필수 동의 항목에 체크해주세요.');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        agreeSensitive: true // Backend compat
      };
      
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '신청 중 오류가 발생했습니다.');
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-h-[85vh] overflow-y-auto pr-2 custom-scrollbar">
      <h3 className="text-2xl font-display font-bold mb-2 text-white">도입 상담 신청</h3>
      <p className="text-slate-400 mb-8">정보를 남겨주시면 확인 후 빠르게 연락드리겠습니다.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 font-sans">이름 <span className="text-blue-500">*</span></label>
            <input
              required
              type="text"
              placeholder="성함"
              className="w-full bg-slate-800/50 border border-slate-700/80 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 font-sans">전화번호 <span className="text-blue-500">*</span></label>
            <input
              required
              type="tel"
              placeholder="010-0000-0000"
              className="w-full bg-slate-800/50 border border-slate-700/80 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5 font-sans">이메일 <span className="text-blue-500">*</span></label>
          <input
            required
            type="email"
            placeholder="example@email.com"
            className="w-full bg-slate-800/50 border border-slate-700/80 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5 font-sans">센터명</label>
          <input
            type="text"
            placeholder="센터명을 입력해주세요"
            className="w-full bg-slate-800/50 border border-slate-700/80 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
            value={formData.centerName}
            onChange={(e) => setFormData({ ...formData, centerName: e.target.value })}
          />
          <p className="mt-2 text-xs text-slate-500 font-sans">
            운영하시는 헬스장 또는 PT샵, 프리랜서일경우 공란
          </p>
        </div>
        
        <div className="space-y-3 pt-2">
          {/* 개인정보 수집 및 이용 동의 */}
          <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 transition-colors">
            <div className="flex items-start gap-3">
              <input
                required
                type="checkbox"
                id="agreePrivacy"
                className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500 cursor-pointer"
                checked={formData.agreePrivacy}
                onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
              />
              <label htmlFor="agreePrivacy" className="text-sm text-slate-300 font-sans leading-tight cursor-pointer">
                <span className="font-bold text-blue-400">[필수]</span> 개인정보 수집 및 이용 동의
              </label>
            </div>
            <div className="mt-3 ml-7 text-xs text-slate-500 space-y-1.5">
              <p>• 목적: 도입 상담 및 서비스 안내</p>
              <p>• 항목: 성명, 이메일 주소, 휴대폰 번호, 소속 센터명</p>
              <p>• 보유 기간: 상담 종료 후 6개월 또는 파기 요청 시까지</p>
            </div>
          </div>

          {/* 마케팅 정보 수신 및 광고 활용 동의 */}
          <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 transition-colors">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agreeMarketing"
                className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500 cursor-pointer"
                checked={formData.agreeMarketing}
                onChange={(e) => setFormData({ ...formData, agreeMarketing: e.target.checked })}
              />
              <label htmlFor="agreeMarketing" className="text-sm text-slate-300 font-sans leading-tight cursor-pointer">
                <span className="text-slate-400">[선택]</span> 마케팅 정보 수신 및 광고 활용 동의
              </label>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-sans flex items-center gap-2">
            <X className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 mt-6 text-lg"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : '무료 도입 상담하기'}
        </button>
      </form>
    </div>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-500/30 bg-[#0B1121] text-slate-200">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B1121]/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <Activity className="w-6 h-6 text-blue-500" />
            <span className="font-display font-bold text-xl text-white tracking-tight">Myfitmanager</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
             <a href="#hero" className="hover:text-white transition-colors">소개</a>
             <a href="#ai-routine" className="hover:text-white transition-colors">주요 기능</a>
             <a href="#contact" className="hover:text-white transition-colors">도입 문의</a>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center gap-1"
          >
            무료로 시작하기 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Section 1: Hero Section */}
        <section id="hero" className="pt-36 pb-24 lg:pt-48 lg:pb-36 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-[#0a0f1d] via-[#0B1121] to-[#0B1121]">
          {/* Ambient circles with Indigo theme */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-10 relative">
            <div className="lg:col-span-7 text-left">
              <div className="flex flex-col gap-3 mb-8">
                {/* 1. Target Audience Highlight Callout (MMA & Fighting Sports Oriented) */}
                <motion.div 
                  variants={fadeInUp} 
                  initial="initial" 
                  whileInView="whileInView" 
                  className="inline-flex self-start items-center gap-3 p-1.5 pr-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-amber-950/20 to-slate-900 border border-red-500/30 shadow-lg shadow-red-500/5 hover:border-red-500/50 transition-colors"
                >
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-[10px] sm:text-xs font-black uppercase px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-600/30 tracking-wider">
                    <Flame className="w-4 h-4 text-white animate-pulse" /> 강력추천
                  </span>
                  <span className="text-xs sm:text-sm text-white font-black tracking-tight col-span-2">
                    🔥 헬스장/크로스핏/그룹PT/MMA,격투기 체육관 관장님들 주목!!
                  </span>
                </motion.div>

                {/* 2. Sub Category Badge */}
                <motion.div 
                  variants={fadeInUp} 
                  initial="initial" 
                  whileInView="whileInView" 
                  className="inline-flex self-start items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/80 text-xs sm:text-sm text-indigo-400 font-medium shadow-inner shadow-indigo-500/10"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  피트니스 매출 방어 및 MMA·크로스핏 지점 락인 강화 B2B SaaS
                </motion.div>
              </div>
              
              <motion.h1 variants={fadeInUp} initial="initial" whileInView="whileInView" className="font-display font-black tracking-tight text-3xl sm:text-5xl lg:text-[4rem] xl:text-[4.25rem] mb-8 leading-[1.15] text-white break-keep font-sans">
                강력한 시스템안에선<br />
                코치/트레이너가 떠나도 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-purple-400">회원은 남습니다.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} initial="initial" whileInView="whileInView" className="text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed break-keep max-w-2xl">
                단순한 출석관리를 넘어선 압도적인 시스템<br />
                AI 운동루틴 생성과 게이미피케이션으로 당신의 센터를 자동화된 수익기계로 만드세요.
              </motion.p>
              
              <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4.5 rounded-full text-base sm:text-lg font-bold transition-all shadow-xl shadow-indigo-600/30 active:scale-95 flex items-center justify-center gap-2"
                >
                  초기 가맹점 혜택받기 <ChevronRight className="w-5 h-5" />
                </button>
                <a
                  href="https://app.myfitmanager.co.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent hover:bg-slate-800/40 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-4.5 rounded-full text-base sm:text-lg font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  데모 체험하기
                </a>
              </motion.div>
            </div>

            {/* Teaser mockups on the right */}
            <div className="lg:col-span-5 relative w-full aspect-[5/4] sm:aspect-square flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-full h-full"
              >
                {/* Floating Web Card */}
                <div className="absolute top-4 left-4 w-4/5 bg-slate-900/90 border border-indigo-500/20 rounded-[2rem] p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500 pointer-events-none">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-slate-500 text-[10px] ml-2 font-mono">Myfitmanager Admin Web</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-6 bg-slate-800 rounded-lg w-2/3" />
                    <div className="h-20 bg-slate-800/50 rounded-xl flex items-center justify-between p-4 border border-slate-800/50">
                      <div className="space-y-1.5">
                        <div className="h-4 bg-slate-800 rounded w-20" />
                        <div className="h-3 bg-slate-800 rounded w-32" />
                      </div>
                      <span className="h-8 w-24 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-bold text-xs flex items-center justify-center">
                        재등록 전환율 +42%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Mobile App Card */}
                <div className="absolute bottom-4 right-4 w-3/5 bg-gradient-to-tr from-[#0E152F] to-[#0A0E1A] border border-purple-500/30 rounded-[2.2rem] p-5 shadow-2xl backdrop-blur-xl transform rotate-6 hover:rotate-0 transition-transform duration-500 pointer-events-none">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-300">내 운동 명예의전당</span>
                    <Trophy className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 bg-purple-950/30 border border-purple-900/30 p-2.5 rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px] font-bold text-purple-400">1</div>
                      <div className="h-3 bg-slate-800 rounded w-16" />
                      <div className="h-3 bg-slate-800 rounded w-10 ml-auto" />
                    </div>
                    <div className="h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 mt-2">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-[88%]" />
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-slate-500">
                      <span>EXP 880/1000</span>
                      <span className="text-purple-400 font-bold">LV.18 Challenger</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: Problem & Solution Section */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-slate-900/20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 text-amber-300 text-xs sm:text-sm font-bold border border-amber-500/20 mb-6 tracking-tight shadow-md shadow-amber-500/5">
                  🎓 한국체육대학교출신 현직 피트니스 대표이자 개발자가 직접만들었습니다.
                </div>
                <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold bg-indigo-900/30 px-3 py-1.5 rounded-xl border border-indigo-800/40">
                  SYSTEM OVERVIEW
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mt-4 mb-6">
                  원장님들의 가장 큰 고민인 회원님들의 이탈,<br />시스템으로 해결합니다.
                </h2>
                <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto break-keep">
                  코치 또는 트레이너에게 의존하는 센터는 이제 그만, 자동화된 장치들로 회원님들의 이탈 확률을 최소화 하세요.
                </p>
              </motion.div>
            </div>

            <motion.div 
              variants={staggerContainer} 
              initial="initial" 
              whileInView="whileInView" 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  badge: "의존도 완벽 제거",
                  title: "코치/트레이너 의존도 ⬇️",
                  desc: "트레이너 이직 때마다 통째로 흔들리는 회원 매출 구도를 격파합니다.",
                  solution: "AI가 오늘 클래스의 핵심 테마와 목적을 기반으로 전문 그룹PT 및 크로스핏 루틴을 단 3초 만에 대신 자동 생성합니다."
                },
                {
                  badge: "자동 락인 영업",
                  title: "어려운 재등록 영업 ⬇️",
                  desc: "센터 데스크에서의 직접적인 강매 유도 영업은 회원들에게 피로감만 줄 뿐입니다.",
                  solution: "게이미피케이션 가반 랭킹, 명예 포인트 제도에 몰입한 회원들이 스스로 기한 전에 적극 재등록하게 유도합니다."
                },
                {
                  badge: "성취 임무 락온",
                  title: "회원권 환불/이탈 ⬇️",
                  desc: "등록 직후 2주 이내에 발생하기 쉬운 중도 탈락 회원의 이탈률을 가속 차단합니다.",
                  solution: "성취 포인트 부스팅 시스템을 통해 운동 출석과 레벨업을 한 편의 재미있는 RPG 모험처럼 즐기게 만듭니다."
                }
              ].map((card, i) => (
                <div 
                  key={i}
                  className="bg-[#0c1224] border border-slate-800 hover:border-indigo-500/50 p-8 rounded-3xl transition-all shadow-xl hover:-translate-y-1 duration-300 relative group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md">
                      {card.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-4 mb-3">{card.title}</h3>
                    <p className="text-slate-500 text-sm mb-6 break-keep">{card.desc}</p>
                  </div>
                  <div className="bg-[#111931] border border-slate-800/80 p-4.5 rounded-2xl relative">
                    <span className="text-xs font-bold text-indigo-300 block mb-1">Myfit Solution</span>
                    <p className="text-slate-300 text-xs leading-relaxed break-keep">{card.solution}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
 
        {/* Section 3: Core Feature 1 - AI Routine Generator */}
        <section id="ai-routine" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950/20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center animate-fadeIn">
            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-900/30 text-indigo-400 text-xs font-bold mb-6 border border-indigo-800/50 uppercase tracking-wider">
                <Brain className="w-3.5 h-3.5" /> Core Technology 01
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-black text-white mb-6 break-keep leading-[1.2]">
                강사 고민을 완벽하게 해결하는,<br />
                AI 그룹PT · 크로스핏 · MMA 루틴 생성기
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8 break-keep">
                클래스 타겟 목적, 장비 유무, 참여 레벨을 종합 고려해 단 3초 만에 검증된 점진적 과부하 시퀀스, 박스용 고강도 크로스핏 와드(WOD), 그리고 격투기(MMA)·주짓수·복싱 체육관을 위한 맞춤형 피지컬 컨디셔닝 세션까지 완벽하게 구성합니다.
              </p>
              <p className="text-slate-500 text-base leading-relaxed break-keep">
                수업 전 코치의 강의안 작성 리소스를 획기적으로 낮추어 편차 없는 고품질 강의 서비스를 제공합니다. 초짜 코치도 베테랑 수준의 짜임새 넘치는 단체 운동 프로그램을 매끄럽고 명확하게 이끌어가도록 강력 보강합니다.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="lg:col-span-6 w-full">
              <AIRoutineSimulator />
            </motion.div>
          </div>
        </section>

        {/* Section 4: Core Feature 2 - Gamification & Lock-In */}
        <section id="gamification" className="py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 relative overflow-hidden bg-slate-900/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="lg:col-span-6 order-2 lg:order-1 w-full">
              <GamificationSimulator />
            </motion.div>

            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="lg:col-span-6 order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-900/30 text-purple-400 text-xs font-bold mb-6 border border-purple-800/50 uppercase tracking-wider">
                <Gamepad2 className="w-3.5 h-3.5" /> Core Technology 02
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-black text-white mb-6 break-keep leading-[1.2]">
                자발적 몰입을 설계하는,<br />
                강력한 보상의 게이미피케이션 락인
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-6 break-keep">
                회원들이 매일 출석하고 미션을 클리어하여 획득하는 웰스포인트와 캐릭터 레벨업을 한 편의 RPG 게임처럼 느껴지도록 시뮬레이션할 수 있습니다. 
              </p>
              <div className="space-y-4 mb-8 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  <p className="text-slate-300 break-keep">
                    <strong>지점 전용 규칙 커스터마이징:</strong> 운영자가 지점명, 칭호, 오각형 능력치, 레벨업 수급 포인트를 실시간으로 조정하고 회원 가치를 극대화할 수 있습니다.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  <p className="text-slate-300 break-keep">
                    <strong>동기부여 및 칭호 부여:</strong> 실시간 점수 획득 알림과 레벨업 축하 연출을 통해 운동 소속감을 극에 달하도록 이끕니다.
                  </p>
                </div>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed break-keep">
                맞춤형 시즌 미션 및 업적 기반 보급 등급, 실시간 랭킹 시스템을 통해 회원들이 단순 운동을 넘어선 자발적 경쟁과 소속감, 강력한 락인 성취 효과로 다음 시즌 연장률 91.2%를 기록해 냅니다.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 5: Sub Feature - CRM Essential & Premium Modular Bento */}
        <section id="crm-features" className="py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 relative overflow-hidden bg-gradient-to-b from-slate-950/20 to-[#0A0F1A]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
                <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold bg-indigo-900/30 px-3 py-1.5 rounded-xl border border-indigo-800/40">
                  ESSENTIAL & PREMIUM
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mt-4 mb-6">
                  물론, 기본기도 가장 완벽합니다.
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto break-keep">
                  꼭 필요한 CRM 기본 기술부터 매끄러운 태블릿 오프라인 입출입 자동화까지 가장 완벽하고 직관적으로 수렴시켰습니다.
                </p>
              </motion.div>
            </div>

            {/* Premium Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1: Attendance Tablet Mode */}
              <div className="bg-[#0b1021] border border-slate-800/80 hover:border-purple-500/30 p-8 rounded-3xl transition-all duration-300 relative group flex flex-col justify-between overflow-hidden lg:col-span-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] pointer-events-none group-hover:bg-purple-500/10 transition-colors" />
                <div>
                  <div className="flex items-center gap-2 text-purple-400 mb-4">
                    <Tablet className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">태블릿 무인 출결 자동화</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">태블릿 연동 무인 입출입 시스템 (인기)</h3>
                  <p className="text-slate-400 text-base mb-6 break-keep">
                    데스크에 태블릿 하나만 놓아두세요. 회원이 본인의 전화번호 뒷자리만 입력하면 실시간으로 남은 세션 차감 및 출석 처리가 0.4초 만에 진행되어 혼잡한 피크 타임 응대 리소스를 획기적으로 낮춥니다.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/60 text-xs font-semibold">
                  <div className="text-slate-500 text-center bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/50">
                    <span className="text-purple-400 block mb-1">원형 키패드</span> UI 제공
                  </div>
                  <div className="text-slate-500 text-center bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/50">
                    <span className="text-purple-400 block mb-1">만료일 & 횟수</span> 팝업
                  </div>
                  <div className="text-slate-500 text-center bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/50">
                    <span className="text-purple-400 block mb-1">앱-웹 실시간</span> 무선 동기화
                  </div>
                </div>
              </div>

              {/* Card 2: Group Schedule */}
              <div className="bg-[#0b1021] border border-slate-800/80 hover:border-emerald-500/30 p-8 rounded-3xl transition-all duration-300 relative group flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 mb-4">
                    <CalendarDays className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">그룹 스케줄 생성 및 관리</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">스마트 그룹 클래스 예약 & 마스터 캘린더</h3>
                  <p className="text-slate-400 text-sm leading-relaxed break-keep">
                    그룹PT, 크로스핏 와드 및 기구 필라테스 등 대형 단체 수업용 일정을 단 몇 번의 터치로 실시간 배포 및 제어합니다. 정원 한도 제한, 예약 확정 알림, 강사별 독립 일정까지 한눈에 조망할 수 있습니다.
                  </p>
                </div>
                <span className="text-xs text-slate-500 block border-t border-slate-800/60 pt-4 font-mono">
                  실시간 단체 예약률 & 대기자 순번 오토 트래커
                </span>
              </div>

              {/* Card 3: Membership Course Pass / Ticket Issuance */}
              <div className="bg-[#0b1021] border border-slate-800/80 hover:border-yellow-500/30 p-8 rounded-3xl transition-all duration-300 relative group flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-[50px] pointer-events-none group-hover:bg-yellow-500/10 transition-colors" />
                <div>
                  <div className="flex items-center gap-2 text-yellow-500 mb-4">
                    <Ticket className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">신속 수강권 발급</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">원클릭 수강권 및 회원권 원격 발급</h3>
                  <p className="text-slate-400 text-sm leading-relaxed break-keep">
                    새롭게 등록되거나 기간이 만료되는 회원들에게 맞춤 수강권을 즉시 모바일로 전송합니다. 회수권, 기간제 프리패스, 얼리버드 분할 한도 설정까지 업소 니즈에 맞게 유연하게 템플릿화되어 가동됩니다.
                  </p>
                </div>
                <span className="text-xs text-slate-500 block border-t border-slate-800/60 pt-4 font-mono">
                  바코드 및 모바일 스탬프형 인증 발급 내장
                </span>
              </div>

              {/* Card 4: AI Diet Management */}
              <div className="bg-[#0b1021] border border-slate-800/80 hover:border-cyan-500/30 p-8 rounded-3xl transition-all duration-300 relative group flex flex-col justify-between overflow-hidden lg:col-span-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
                  <div className="lg:col-span-5 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-2 text-cyan-400 mb-4">
                        <Utensils className="w-5 h-5 text-cyan-400 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider">AI 식단 관리 가이드</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">자연어 자동 칼로리 & 탄단지 조율 조언</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6 break-keep">
                        불편하게 개별 중량을 기입할 필요 없이, 회원이 메신저 채팅하듯 편하게 작성한 식사글을 자동으로 해독하여 정확히 매칭되는 영양소(칼로리 및 탄·단·지) 수치와 퍼스널 맞춤 피드백을 전달합니다.
                      </p>
                    </div>
                    <div className="border-t border-slate-800/60 pt-4 mt-auto">
                      <span className="text-xs text-slate-500 block font-mono">
                        자연어 뉘앙스 분석 오차율 3.2% 미만 정수 실시간 추산
                      </span>
                    </div>
                  </div>
                  <div className="lg:col-span-7 w-full">
                    <AIDietSimulator />
                  </div>
                </div>
              </div>

              {/* Card 5: Playful Workout Diary & Feedback */}
              <div className="bg-[#0b1021] border border-slate-800/80 hover:border-rose-500/30 p-8 rounded-3xl transition-all duration-300 relative group flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-[50px] pointer-events-none group-hover:bg-rose-500/10 transition-colors" />
                <div>
                  <div className="flex items-center gap-2 text-rose-400 mb-4">
                    <NotebookPen className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">운동일지 피드백 작성</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">모바일 연동 실시간 코칭 일지 피드백</h3>
                  <p className="text-slate-400 text-sm leading-relaxed break-keep">
                    회원이 오늘 완수한 훈련 강도와 개인 컨디션을 기록하면, 담당 강사가 즉시 원격 정성 피드백을 단체 또는 개별로 전송합니다. 수업시간에 나누지 못한 디테일한 소통이 밀접하게 형성됩니다.
                  </p>
                </div>
              </div>

              {/* Card 6: Virtual Lockers & Ledger */}
              <div className="bg-[#0b1021] border border-slate-800/80 hover:border-indigo-500/30 p-8 rounded-3xl transition-all duration-300 relative group flex flex-col justify-between overflow-hidden lg:col-span-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />
                <div>
                  <div className="flex items-center gap-2 text-indigo-400 mb-4">
                    <Lock className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">사물함 스마트 관리 & 가계부 정산</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">가상 사물함 락커 맵 배정 & 한도 순수익 계산 정산 모드</h3>
                  <p className="text-slate-400 text-base mb-6 break-keep">
                    락커 장부 관리는 구식 엑셀 대신 지도 기반 락커맵에서 드래그앤드랍으로 관리하세요. 더불어 센터 임대료, 유지공제비, 강사 수당 비율까지 월 고정비 공제 연산 정산 판넬에서 정확하게 자동 계산해 월 손익 분기점을 정밀 분석합니다.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 pt-4 border-t border-slate-800/60 text-xs font-semibold">
                  <div className="text-slate-500 bg-slate-900/60 p-2 text-center rounded-xl border border-slate-800/50">
                    월 지출 및 공제 순수이익 지수 <span className="text-[#818cf8]">실시간 원형 차트 연동</span>
                  </div>
                </div>
              </div>

              {/* Card 7: Smart Electronic Contract */}
              <div className="bg-[#0b1021] border border-slate-800/80 hover:border-emerald-500/30 p-8 rounded-3xl transition-all duration-300 relative group flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 mb-4">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider">스마트 전자계약</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">종이 계약서 없는 초고속 모바일 전자계약</h3>
                  <p className="text-slate-400 text-sm leading-relaxed break-keep">
                    귀찮고 비효율적인 종이 계약서 대신 스마트한 모바일 전자계약으로 복잡한 결제 단계를 극도로 간소화하세요. 고객이 결제를 망설일 틈을 주지 않고 최상의 등록 타이밍을 확보하며, 계약 체결 즉시 회원전용 알림톡으로 계약서 PDF가 자동으로 즉시 발송됩니다. 
                    아마존 AWS S3 클라우드에 평생 보관가능하며, 강력한 보안으로 환불등의 법적 분쟁을 선제적으로 방어하세요.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/60 text-xs font-semibold mt-4 break-keep">
                  <div className="text-slate-500 text-center bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/50 flex flex-col justify-center">
                    <span className="text-emerald-400 block mb-1">1단계</span> 전자계약 양식 작성 및 서명
                  </div>
                  <div className="text-slate-500 text-center bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/50 flex flex-col justify-center">
                    <span className="text-emerald-400 block mb-1">2단계</span> 아마존 AWS S3 클라우드 저장
                  </div>
                  <div className="text-slate-500 text-center bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/50 flex flex-col justify-center">
                    <span className="text-emerald-400 block mb-1">3단계</span> 링크 카카오 알림톡 발송
                  </div>
                </div>
              </div>

              {/* Card 8: Electronic Signature & Class Track */}
              <div className="bg-[#0b1021] border border-slate-800/80 hover:border-blue-500/30 p-8 rounded-3xl transition-all duration-300 relative group flex flex-col justify-between overflow-hidden lg:col-span-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
                <div>
                  <div className="flex items-center gap-2 text-blue-400 mb-4">
                    <PenTool className="w-5 h-5 text-blue-400" />
                    <span className="text-xs font-bold uppercase tracking-wider">수업 전자서명 및 차감</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">1:1 수업 종료 후 즉시 터치 서명 & 디지털 횟수 자동 차감</h3>
                  <p className="text-slate-400 text-base mb-6 break-keep">
                    개인 PT 또는 주짓수, 필라테스 등 1:1 수업이 끝나면 태블릿이나 모바일 기기로 회원에게 간편 스마트 서명을 받으세요. 직관적인 전자서명을 거치는 즉시 해당 회원권의 수강 횟수가 오차 없이 실시간으로 자동 차감 및 누적 기록되어 불필요한 횟수 차감 시비를 완벽하게 방지합니다.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/60 text-xs font-semibold">
                  <div className="text-slate-500 text-center bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/50">
                    <span className="text-blue-400 block mb-1">모바일/태블릿 즉각 서명</span> 터치 시그니처 패드
                  </div>
                  <div className="text-slate-500 text-center bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/50">
                    <span className="text-blue-400 block mb-1">잔여 횟수 완벽 무선</span> 실시간 자동 차감
                  </div>
                  <div className="text-slate-500 text-center bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/50">
                    <span className="text-blue-400 block mb-1">수업 매칭 서명 서류</span> 클라우드 자동 적재
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto text-center mb-20">
            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
               <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-orange-900/30 text-orange-400 text-sm font-bold mb-6 border border-orange-800/50">
                  <Bell className="w-4 h-4" /> 능동적 이탈률 방어
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6 break-keep leading-tight">
                  클릭 한 번으로 멈춘 매출을<br />가동시키는 타겟 마케팅
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto break-keep">
                  타이밍이 끊기면 고객은 돌아오지 않습니다. AI가 만료 임박 회원을 자동 컨택 포인트로 지정하여 대표님의 클릭을 기다립니다.
                </p>
            </motion.div>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
             <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="bg-slate-800/40 border border-slate-700 p-10 rounded-[2rem] hover:border-blue-500/50 transition-colors group">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-8 border border-slate-700 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-colors">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">재등록 임박 타겟 군 자동 추출</h3>
                <p className="text-slate-400 break-keep leading-relaxed text-lg">수업 횟수와 기간이 얼마 안남은 유효 회원들을 대시보드 상단 마케팅 섹션에 자동 적재합니다. 놓치는 회원 없이 꼼꼼한 세일즈 커버리지를 제공합니다.</p>
             </motion.div>
             
             <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="bg-slate-800/40 border border-slate-700 p-10 rounded-[2rem] hover:border-blue-500/50 transition-colors group">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-8 border border-slate-700 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-colors">
                  <Send className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">원클릭 알림 및 문자 발송</h3>
                <p className="text-slate-400 break-keep leading-relaxed text-lg">선출된 타겟 유저에게 클릭 원 버튼 하나로 개별 알림이나, 최적화된 재등록 유도 문자 메시지를 한 치의 오차 없이 자동 발송합니다.</p>
             </motion.div>
          </div>

          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Card: Web Admin Mockup representing the user's uploaded image details */}
            <div 
              onClick={() => setIsAdminModalOpen(true)}
              className="w-full aspect-video bg-[#0a0f1d] border border-slate-800 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl relative group cursor-pointer hover:border-blue-500/50 hover:shadow-blue-500/5 transition-all duration-300"
            >
              {/* Zoom Hover Overlay */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20 backdrop-blur-[2px]">
                <div className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-lg shadow-blue-500/20 flex items-center gap-1.5 active:scale-95 transition-all">
                  <span>🔍 클릭해서 고화질 원본 크기로 보기</span>
                </div>
              </div>

              {/* Browser Address Bar */}
              <div className="bg-[#0b1224] border-b border-slate-800/80 px-4 py-2 flex items-center gap-3">
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 text-xs shrink-0 select-none">
                  <span className="font-bold">←</span>
                  <span className="font-bold">→</span>
                  <span className="font-bold">↺</span>
                </div>
                <div className="bg-[#141b2e] border border-slate-800/60 rounded-lg py-1 px-3 flex items-center gap-1.5 w-full max-w-xs text-[10px] text-slate-400 font-mono select-none">
                  <span className="text-emerald-500 text-[8px]">🔒</span>
                  <span className="text-slate-500 text-[9px] sm:text-[10px]">app.myfitmanager.co.kr</span>
                </div>
              </div>

              {/* Simulated Screen Body */}
              <div className="flex-1 flex overflow-hidden text-[9px] sm:text-[10px] text-slate-300">
                {/* Left Sidebar Menu */}
                <div className="w-[18%] bg-[#0d1527] border-r border-slate-800/60 p-2 flex flex-col gap-2 shrink-0 select-none">
                  <div className="flex items-center gap-1 mb-1">
                    <Activity className="w-3.5 h-3.5 text-blue-500" />
                    <div className="w-8 h-1.5 bg-slate-700/60 rounded" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="w-full h-3 bg-blue-600/25 rounded border border-blue-500/10" />
                    <div className="w-[85%] h-2 bg-slate-800/60 rounded" />
                    <div className="w-[75%] h-2 bg-slate-800/60 rounded" />
                    <div className="w-[90%] h-2 bg-slate-800/60 rounded" />
                    <div className="w-[80%] h-2 bg-slate-800/60 rounded" />
                  </div>
                </div>

                {/* Central Members Database Area (Blurred out for confidentiality like screenshot) */}
                <div className="flex-1 bg-[#101729] p-3 flex flex-col gap-2 overflow-hidden relative">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-3 bg-slate-700/50 rounded" />
                    <div className="w-10 h-3 bg-slate-800/70 rounded" />
                  </div>
                  {/* Blurred rows */}
                  <div className="flex-1 flex flex-col gap-1.5 filter blur-[2px] opacity-35 select-none pointer-events-none mt-1">
                    <div className="h-3.5 bg-slate-800/40 rounded border border-slate-800/30" />
                    <div className="h-3.5 bg-slate-800/40 rounded border border-slate-800/30" />
                    <div className="h-3.5 bg-slate-800/40 rounded border border-slate-800/30" />
                    <div className="h-3.5 bg-slate-800/40 rounded border border-slate-800/30" />
                    <div className="h-3.5 bg-slate-800/40 rounded border border-slate-800/30" />
                  </div>
                </div>

                {/* Right Side Action Panel (Exactly matching your uploaded admin snapshot) */}
                <div className="w-[38%] bg-white border-l border-slate-200 p-2 sm:p-2.5 flex flex-col justify-between shrink-0 text-slate-800 select-none">
                  <div>
                    {/* Header Action Tools */}
                    <div className="flex items-center justify-between gap-1 mb-2 border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[8px] sm:text-[9px] font-black font-sans text-red-500 bg-red-50 py-0.5 px-1 rounded-md shrink-0">28명</span>
                      </div>
                      <div className="flex gap-1">
                        <span className="text-[7px] sm:text-[8px] bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-0.5 px-1 sm:px-1.5 rounded-md cursor-pointer transition-colors shrink-0">일괄 전송</span>
                        <span className="text-[7px] sm:text-[8px] bg-[#059669] hover:bg-[#047857] text-white font-extrabold py-0.5 px-1 sm:px-1.5 rounded-md cursor-pointer transition-colors shrink-0">SMS 일괄(유료)</span>
                      </div>
                    </div>

                    {/* Member Passes Scroll Container mimicking the card detail */}
                    <div className="flex flex-col gap-1 sm:gap-1.5 max-h-[105px] overflow-hidden">
                      {/* Pass Card 1 */}
                      <div className="bg-[#f8fafc] border-l-2 border-red-500 p-1.5 rounded shadow-[0_1px_2px_rgba(0,0,0,0.03)] text-[7px] sm:text-[8px]">
                        <div className="flex justify-between items-start gap-1 mb-0.5">
                          <span className="font-bold text-slate-900 leading-tight">그룹 수강권 (대표)</span>
                          <div className="flex gap-0.5 shrink-0 select-none scale-[0.85] origin-right">
                            <span className="bg-[#e0f2fe] text-[#0369a1] px-0.5 rounded font-black">그룹 D-28</span>
                            <span className="bg-[#fce7f3] text-[#be185d] px-0.5 rounded font-black">추가 D-28</span>
                          </div>
                        </div>
                        <div className="text-slate-500 leading-tight">12개월 무제한 그룹 PT</div>
                      </div>

                      {/* Pass Card 2 */}
                      <div className="bg-[#f8fafc] border-l-2 border-indigo-500 p-1.5 rounded shadow-[0_1px_2px_rgba(0,0,0,0.03)] text-[7px] sm:text-[8px]">
                        <div className="flex justify-between items-start gap-1 mb-0.5">
                          <span className="font-bold text-slate-900 leading-tight">추가 그룹 수강권</span>
                          <div className="flex gap-0.5 shrink-0 scale-[0.85] origin-right">
                            <span className="bg-[#fce7f3] text-[#be185d] px-0.5 rounded font-black">추가 D-28</span>
                          </div>
                        </div>
                        <div className="text-slate-500 leading-tight">12개월 필라테스</div>
                      </div>

                      {/* Pass Card 3 */}
                      <div className="bg-[#f8fafc] border-l-2 border-teal-500 p-1.5 rounded shadow-[0_1px_2px_rgba(0,0,0,0.03)] text-[7px] sm:text-[8px]">
                        <div className="flex justify-between items-start gap-1 mb-0.5">
                          <span className="font-bold text-slate-900 leading-tight">추가 그룹 수강권</span>
                          <div className="flex gap-0.5 shrink-0 scale-[0.85] origin-right">
                            <span className="bg-indigo-50 text-indigo-700 px-0.5 rounded font-black">추가 잔여 1회</span>
                          </div>
                        </div>
                        <div className="text-slate-500 leading-tight">그룹PT 체험권 (총 1회)</div>
                      </div>
                    </div>
                  </div>

                  {/* Panel Footer text exactly like snapshot */}
                  <div className="border-t border-slate-100 pt-1.5 text-[6.5px] sm:text-[7px] text-slate-400 font-sans leading-tight">
                    잔여횟수 8회 이하 또는 잔여기간 30일 이하인 회원 목록입니다.
                  </div>
                </div>
              </div>

              {/* Glass Info Footer Tag */}
              <div className="absolute inset-x-0 bottom-0 bg-[#0c1224]/85 border-t border-slate-800/80 px-5 py-2.5 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs text-slate-200 font-bold">관리자 프로그램 (Web)</span>
                </div>
                <span className="text-[10px] text-slate-500">실시간 유효 타겟 목록 추출 모드</span>
              </div>
            </div>

            {/* Right Card: Mobile App / High-Fidelity Notification Receipt Mockup */}
            <div 
              onClick={() => setIsAppModalOpen(true)}
              className="w-full aspect-video bg-[#0a0f1d] border border-slate-800 rounded-[2rem] overflow-hidden flex items-center justify-center shadow-2xl relative group cursor-pointer hover:border-yellow-500/50 hover:shadow-yellow-500/5 transition-all duration-300"
            >
              {/* Zoom Hover Overlay */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20 backdrop-blur-[2px]">
                <div className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-5 py-2.5 rounded-full text-xs font-bold shadow-lg shadow-yellow-500/20 flex items-center gap-1.5 active:scale-95 transition-all">
                  <span>🔍 클릭해서 고화질 원본 크기로 보기</span>
                </div>
              </div>

              {/* Outer phone mockup structure */}
              <div className="w-[82%] sm:w-[65%] h-[92%] bg-slate-950 border border-slate-800 rounded-3xl p-2.5 flex flex-col shrink-0 relative overflow-hidden shadow-[0_24px_48px_-12px_rgba(0,0,0,0.8)] select-none">
                {/* Simulated Phone Status Bar exactly like screenshot */}
                <div className="flex justify-between items-center px-3.5 pt-1.5 pb-2 text-[8px] sm:text-[9px] font-bold text-slate-400 font-sans tracking-tight shrink-0 select-none">
                  <span>1:21</span>
                  <div className="flex items-center gap-1 text-[8px]">
                    {/* Signal indicators */}
                    <span>📶</span>
                    <span>🛜</span>
                    <span className="bg-slate-800 text-[8px] text-slate-300 px-1 rounded-sm border border-slate-700">68</span>
                  </div>
                </div>

                {/* Simulated Mobile Dialog content exactly representing the user's image */}
                <div className="flex-1 bg-white rounded-t-2xl shadow-inner p-2 sm:p-3 flex flex-col gap-2 overflow-hidden text-slate-800 select-none font-sans">
                  {/* Dialog Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      <Bell className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5]" />
                      <span className="font-extrabold text-[9.5px] sm:text-[10.5px] text-slate-900 tracking-tight">알림 내역</span>
                    </div>
                    <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </div>

                  {/* Push Status Notice Bar */}
                  <div className="bg-[#f0f4f8] border border-blue-100 rounded-lg p-1 text-center text-[7.5px] sm:text-[8px] leading-snug font-bold text-slate-500 shrink-0 select-none">
                    웹 푸시 알림이 원활하게 작동 중입니다.
                  </div>

                  {/* Pinned Marker and Pinned List Title */}
                  <div className="flex items-center gap-1.5 px-0.5 shrink-0">
                    <span className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded bg-indigo-50 border border-indigo-100 text-[#4f46e5] text-[6.5px] sm:text-[7.5px] font-black leading-none shrink-0 scale-90 origin-left">
                      📌 고정됨
                    </span>
                    <span className="text-[7.5px] sm:text-[8px] font-bold text-slate-500">최근 관리자 메시지</span>
                  </div>

                  {/* Main scrolling/stacked core yellow/amber cards representing the image */}
                  <div className="flex flex-col gap-1.5 overflow-hidden">
                    {/* Golden Ticket 1 */}
                    <div className="bg-amber-50/20 border-l-[3px] border-amber-400 border-t border-r border-b border-amber-200/80 p-1.5 sm:p-2 rounded-xl text-[7px] sm:text-[8px] flex flex-col justify-between shrink-0 leading-tight">
                      <div className="font-bold text-slate-800 leading-normal line-clamp-2">
                        [더문짐 & 그룹PT] 락카 만료 7일전입니다. 락카 연장을 희망하실경우, 인포데스크에 말씀해주세요.
                      </div>
                      <div className="flex justify-between items-center mt-1 scale-90 origin-bottom-left pt-0.5">
                        <span className="text-slate-400 font-mono">2026-06-19 13:18:39</span>
                        <span className="bg-amber-100 text-amber-700 px-1 py-0.5 rounded font-bold">공지/안내</span>
                      </div>
                    </div>

                    {/* Golden Ticket 2 */}
                    <div className="bg-amber-50/10 border-l-[3px] border-amber-400 border-t border-r border-b border-amber-200/70 p-1.5 sm:p-2 rounded-xl text-[7px] sm:text-[8px] flex flex-col justify-between shrink-0 leading-tight filter opacity-90">
                      <div className="font-bold text-slate-700 leading-normal line-clamp-2">
                        [더문짐 & 그룹PT] 6월 특가 이벤트 !! PT 10회 + 헬스권 6개월 선착순 10명 550,000원 혜택!! 문의하기 -...
                      </div>
                      <div className="flex justify-between items-center mt-1 scale-90 origin-bottom-left pt-0.5">
                        <span className="text-slate-400 font-mono">2026-06-19 13:18:01</span>
                        <span className="bg-amber-100/80 text-amber-700/90 px-1 py-0.5 rounded font-bold">공지/안내</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Smartphone bottom Home bar bar */}
                <div className="w-16 h-1 bg-slate-800/80 rounded-full mx-auto mt-auto mb-1 shrink-0" />
              </div>

              {/* Glass Info Footer Tag */}
              <div className="absolute inset-x-0 bottom-0 bg-[#0c1224]/85 border-t border-slate-800/80 px-5 py-2.5 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                  <span className="text-xs text-slate-200 font-bold">사용자 앱 / 알림 푸시 수신 (Mobile)</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">알림 이력 조회 모드</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 8: FAQ */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 border-y border-slate-800/80 relative overflow-hidden bg-[#0A0F1A]">
          <div className="max-w-4xl mx-auto">
            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">자주 묻는 질문</h2>
              <p className="text-slate-400 text-lg break-keep">도입 전 가장 많이 물어보시는 질문들을 모았습니다.</p>
            </motion.div>
            
            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="bg-slate-800/40 border border-slate-700/80 rounded-[2rem] p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
              <FaqItem 
                question="복잡한 설치가 필요한가요?" 
                answer="아닙니다. 웹브라우저 형태의 프로그램이기에 설치없이 어떤기기에서든 사용가능합니다. 회원 전용 프로그램 또한 회원님들에게 설치권유없이 로그인만 안내해드리면 바로 사용이 가능합니다." 
              />
              <FaqItem 
                question="어플처럼 사용가능한가요?" 
                answer="홈화면 버튼 추가만 누르시면 어플리케이션처럼 언제든지 쉽게 사용가능합니다." 
              />
              <FaqItem 
                question="꼭 게이미피케이션모드를 써야하나요?" 
                answer="아닙니다. 게이미피케이션플랜을 구매하실경우에도, 기본모드로 전환하시면 차분한 UI의 프로그램을 사용하실 수 있습니다." 
              />
              <FaqItem 
                question="회원님들 프로그램도 따로 구매해야하나요?" 
                answer="아닙니다. 구매시, 대시보드에 사용자프로그램 QR이 제공되며, 회원님들의 프로그램은 평생무료로 사용이 가능합니다." 
              />
            </motion.div>
          </div>
        </section>

        {/* Section 9: Bottom CTA Form */}
        <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0a101f]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent -z-10 pointer-events-none" />
          
          <div className="max-w-5xl mx-auto bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 sm:p-14 lg:p-20 rounded-[3rem] shadow-2xl relative z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] pointer-events-none -mr-48 -mt-48" />

            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6 break-keep leading-tight">센터의 다음 스텝,<br/>지금 바로 결정하세요</h2>
              <p className="text-slate-400 text-lg break-keep max-w-xl mx-auto">간단한 정보를 남겨주시면, 담당 매니저가 직접 연락드려 구체적인 비전과 도입 구조를 제안해 드립니다.</p>
            </div>
            
            <div className="w-full max-w-2xl mx-auto bg-[#0B1121] rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl">
              {isSuccess ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-blue-400" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4 text-white">상담 신청 접수 완료</h3>
                  <p className="text-slate-400 text-lg leading-relaxed break-keep">
                    빠른 시일 내에 기재해주신 연락처로 전담 매니저가 연락드리겠습니다. 믿고 선택해주셔서 감사합니다.
                  </p>
                </div>
              ) : (
                <RegistrationForm onSuccess={() => setIsSuccess(true)} />
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Modals & Footer */}
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setIsSuccess(false); }}>
        {isSuccess ? (
           <div className="text-center py-12 px-6">
             <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
               <CheckCircle2 className="w-10 h-10 text-blue-400" />
             </div>
             <h3 className="text-2xl font-display font-bold mb-3 text-white">상담 신청이 완료되었습니다!</h3>
             <p className="text-slate-400 mb-8 leading-relaxed break-keep">
               성공적으로 접수되었습니다.<br />
               담당 매니저가 내용을 검토하고 연락드리겠습니다.
             </p>
             <button 
               onClick={() => setIsModalOpen(false)}
               className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white py-4 rounded-xl font-bold transition-all text-lg"
             >
               확인
             </button>
           </div>
        ) : (
           <RegistrationForm onSuccess={() => { setIsSuccess(true); }} />
        )}
      </Modal>

      <Modal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)}>
        <div className="w-full max-h-[85vh] overflow-y-auto pr-2 custom-scrollbar">
          <h3 className="text-2xl font-display font-bold mb-4 text-white">개인정보처리방침</h3>
          <div className="text-slate-300 space-y-4 text-sm leading-relaxed mb-8 break-keep">
            <p className="font-semibold text-white">1. 개인정보 수집 목적</p>
            <p>회원 가입 및 본인 확인, 서비스 이용 권한 부여, 개인 맞춤형 피트니스 데이터 제공을 위해 개인정보를 수집합니다.</p>
            
            <p className="font-semibold text-white mt-6">2. 수집하는 개인정보 항목</p>
            <p>성명, 이메일, 휴대폰 번호, 소속 센터명, 신장, 체중, 식단 및 운동 데이터</p>
            
            <p className="font-semibold text-white mt-6">3. 개인정보 제3자 제공 (결제 서비스)</p>
            <p>회사는 정기결제(자동결제) 및 일반 결제 처리를 위해 PG사((주)포트원) 및 관련 신용카드사 등에 필수적인 결제 정보를 제공합니다.</p>
            
            <p className="font-semibold text-white mt-6">4. 개인정보 보존 및 파기 기간</p>
            <p>수집된 개인정보는 원칙적으로 탈퇴 시 즉시 파기합니다. 단, 전자상거래법에 따라 결제 및 재화 공급에 관한 기록은 5년간 보존합니다.</p>

            <p className="font-semibold text-white mt-6">5. 정보주체의 권리</p>
            <p>회원은 언제든지 개인정보의 열람, 정정, 삭제를 요구할 수 있습니다.</p>
            
            <p className="font-semibold text-white mt-6">6. 개인정보 보호책임자</p>
            <p>
              성명: 문준호<br />
              이메일: <a href="mailto:prest930204@gmail.com" className="hover:text-blue-400 focus:outline-none">prest930204@gmail.com</a>
            </p>
          </div>
          <button 
            onClick={() => setIsPrivacyModalOpen(false)}
            className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white py-4 rounded-xl font-bold transition-all text-lg"
          >
            확인
          </button>
        </div>
      </Modal>

      <Modal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)}>
        <div className="w-full max-h-[85vh] overflow-y-auto pr-2 custom-scrollbar">
          <h3 className="text-2xl font-display font-bold mb-4 text-white">이용약관</h3>
          <div className="text-slate-300 space-y-4 text-sm leading-relaxed mb-8 break-keep">
            <p className="font-semibold text-white">1. 목적 및 서비스 제공</p>
            <p>본 약관은 더문랩(이하 "회사")이 제공하는 플랫폼 서비스 이용 규정을 명시합니다. 수강권 및 멤버십은 결제 완료 즉시 회원의 계정으로 전자적 방식을 통해 부여됩니다.</p>
            
            <p className="font-semibold text-white mt-6">2. [중요] 정기결제(자동결제) 동의</p>
            <p>본 서비스는 월 단위 정기구독 서비스입니다. 회원이 등록한 결제 수단으로 매월 지정된 결제일에 구독료가 자동 청구 및 결제됩니다.</p>
            
            <p className="font-semibold text-white mt-6">3. 청약철회 및 환불 규정</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>결제일로부터 7일 이내에 서비스를 전혀 사용하지 않은 경우 전액 환불(청약철회)이 가능합니다.</li>
              <li>회원은 언제든지 위약금 없이 정기결제를 해지할 수 있습니다. 해지 시 다음 결제일부터 요금이 청구되지 않습니다.</li>
              <li>단, 이미 결제가 완료된 당월 구독료는 일할 계산하여 환불되지 않으며, 해지하더라도 다음 결제 예정일 전날까지 정상적으로 서비스를 이용할 수 있습니다.</li>
            </ul>
          </div>
          <button 
            onClick={() => setIsTermsModalOpen(false)}
            className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white py-4 rounded-xl font-bold transition-all text-lg"
          >
            확인
          </button>
        </div>
      </Modal>

      {/* High-Fidelity Custom Admin Mockup Modal */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdminModalOpen(false)}
              className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[80] flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
            >
              {/* Modal Window Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-[#0c1224] border border-slate-800 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl w-full max-w-5xl flex flex-col overflow-hidden max-h-[92vh]"
              >
                {/* Simulated Web Browser Address Header */}
                <div className="bg-[#0b1224] border-b border-slate-800/80 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 select-none">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex gap-1.5 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 text-slate-500 text-xs select-none">
                      <span className="font-bold">←</span>
                      <span className="font-bold">→</span>
                      <span className="font-bold">↺</span>
                    </div>
                    <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />
                    <div className="bg-[#141b2e] border border-slate-800/80 rounded-xl py-1 px-3 sm:px-4 flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-300 font-mono">
                      <span className="text-emerald-400">🔒</span>
                      <span className="font-semibold text-slate-300">app.myfitmanager.co.kr</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium hidden md:inline">관리자 프로그램 고화질 대시보드</span>
                    <button 
                      onClick={() => setIsAdminModalOpen(false)}
                      className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white p-2 rounded-xl transition-all"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>

                {/* Simulated Client Application Body */}
                <div className="flex-1 flex overflow-hidden min-h-[420px] sm:min-h-[500px]">
                  
                  {/* Left Sidebar Menu */}
                  <div className="w-[180px] sm:w-[200px] bg-[#0c1121] border-r border-slate-800/80 p-4 shrink-0 flex flex-col justify-between hidden md:flex select-none">
                    <div className="space-y-6">
                      {/* Avatar container */}
                      <div className="flex items-center gap-3 p-2 bg-slate-900/40 rounded-2xl border border-slate-800/50">
                        <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black text-xs">
                          My
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white leading-none mb-1">MyFitManager</span>
                          <span className="text-[9px] text-slate-500 font-mono">ADMIN MODE</span>
                        </div>
                      </div>

                      {/* Menu navigation options */}
                      <div className="space-y-1 text-slate-400 font-semibold text-xs">
                        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-white font-extrabold cursor-pointer">
                          <Activity className="w-4 h-4 text-blue-500" />
                          대시보드
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-900/40 hover:text-slate-200 transition-colors cursor-pointer">
                          <Users className="w-4 h-4 text-slate-500" />
                          회원 관리
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-900/40 hover:text-slate-200 transition-colors cursor-pointer">
                          <Ticket className="w-4 h-4 text-slate-500" />
                          이용권 관리
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-900/40 hover:text-slate-200 transition-colors cursor-pointer">
                          <FileText className="w-4 h-4 text-slate-500" />
                          수업 로그 및 통계
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-900/40 hover:text-slate-200 transition-colors cursor-pointer">
                          <Lock className="w-4 h-4 text-slate-500" />
                          권한 및 지점 설정
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#0f172a] p-3 rounded-xl border border-slate-800/80 text-[10px] text-slate-500 leading-normal">
                      <span className="block font-bold text-slate-400 mb-0.5">상태: 라이브 가동 중</span>
                      마케팅 알림 허용 여부 연동됨
                    </div>
                  </div>

                  {/* Main Database Table Space (Left Side inside dashboard) */}
                  <div className="flex-1 bg-[#0a0e1a] p-4 sm:p-6 overflow-y-auto flex flex-col gap-4 sm:gap-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        {/* Literal Breadcrumb Title */}
                        <div className="text-[10px] sm:text-xs text-blue-500 font-bold mb-1 font-mono uppercase tracking-widest">Dashboards / Marketing Targets</div>
                        <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2 tracking-tight">
                          <Users className="w-5 h-5 text-blue-400" /> 마케팅 타겟 군 추출 현황
                        </h2>
                      </div>
                      <div className="flex gap-2">
                        <div className="text-[10px] sm:text-xs px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-medium select-none">
                          필터: 만료 예정 (30일 이내)
                        </div>
                      </div>
                    </div>

                    {/* Members List Table exactly like dashboard list, with confidentiality blurs */}
                    <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg">
                      <div className="grid grid-cols-12 gap-2 bg-[#0c1224] border-b border-slate-800 py-3 px-4 text-[10px] sm:text-xs font-black text-slate-400 tracking-tight select-none">
                        <div className="col-span-1 text-center">선택</div>
                        <div className="col-span-3 text-left">회원명</div>
                        <div className="col-span-4 text-left">등록 유효 이용권 명칭</div>
                        <div className="col-span-4 text-right">자동 추출 상태</div>
                      </div>

                      <div className="divide-y divide-slate-800/40 text-[10px] sm:text-xs">
                        {/* Member Row 1 */}
                        <div className="grid grid-cols-12 gap-2 py-3.5 px-4 items-center border-b border-slate-800/30">
                          <div className="col-span-1 flex justify-center">
                            <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500" />
                          </div>
                          <div className="col-span-3 text-left font-bold text-white select-none">
                            <span className="filter blur-[3px] select-none">김*준 회원</span>
                          </div>
                          <div className="col-span-4 text-left text-slate-300 font-medium">
                            그룹수강권 (12개월 무제한)
                          </div>
                          <div className="col-span-4 text-right font-black">
                            <span className="bg-red-500/15 text-red-500 border border-red-500/20 py-0.5 px-2 rounded-md font-sans">D-28 만료예정</span>
                          </div>
                        </div>

                        {/* Member Row 2 */}
                        <div className="grid grid-cols-12 gap-2 py-3.5 px-4 items-center border-b border-slate-800/30">
                          <div className="col-span-1 flex justify-center">
                            <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500" />
                          </div>
                          <div className="col-span-3 text-left font-bold text-white select-none">
                            <span className="filter blur-[3px] select-none font-sans">박*우 회원</span>
                          </div>
                          <div className="col-span-4 text-left text-slate-300 font-medium">
                            추가 필라테스 (12개월)
                          </div>
                          <div className="col-span-4 text-right font-black">
                            <span className="bg-red-500/15 text-red-500 border border-red-500/20 py-0.5 px-2 rounded-md font-sans">D-28 만료예정</span>
                          </div>
                        </div>

                        {/* Member Row 3 */}
                        <div className="grid grid-cols-12 gap-2 py-3.5 px-4 items-center border-b border-slate-800/30">
                          <div className="col-span-1 flex justify-center">
                            <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500" />
                          </div>
                          <div className="col-span-3 text-left font-bold text-white select-none">
                            <span className="filter blur-[3px] select-none">이*지 회원</span>
                          </div>
                          <div className="col-span-4 text-left text-slate-300 font-medium">
                            추가 필라테스 / 재등록 체험단
                          </div>
                          <div className="col-span-4 text-right font-black">
                            <span className="bg-purple-500/15 text-purple-400 border border-purple-500/20 py-0.5 px-2 rounded-md">수업 임박 (잔여 1회)</span>
                          </div>
                        </div>

                        {/* Member Row 4 */}
                        <div className="grid grid-cols-12 gap-2 py-3.5 px-4 items-center">
                          <div className="col-span-1 flex justify-center">
                            <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500" />
                          </div>
                          <div className="col-span-3 text-left font-bold text-white select-none">
                            <span className="filter blur-[3px] select-none font-sans">정*민 회원</span>
                          </div>
                          <div className="col-span-4 text-left text-slate-300 font-medium">
                            그룹 수강권 (16회 PT)
                          </div>
                          <div className="col-span-4 text-right font-black">
                            <span className="bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 py-0.5 px-2 rounded-md font-sans">D-23 만료예정</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Information Banner */}
                    <div className="bg-blue-950/20 border border-blue-900/30 p-4.5 rounded-2xl flex items-start gap-3">
                      <span className="text-blue-400 text-lg leading-none">💡</span>
                      <p className="text-xs text-slate-300 leading-relaxed break-keep">
                        자동 타겟팅 필터링(잔여 8회 이하 또는 잔여기간 30일 이하) 기준에 맞춰 만료가 임박한 회원이 리스팅되었습니다. 우측의 <strong>회원권 현황 상세 모달 창</strong>을 대조하여 <strong>일괄 버튼</strong>으로 클릭 한 번에 재등록 유도 혜택 알림톡을 발송하세요!
                      </p>
                    </div>
                  </div>

                  {/* Right Slide-over Sidebar Panel (Matching the original snapshot with pristine high-fidelity detailed pixels) */}
                  <div className="w-[320px] sm:w-[350px] bg-white text-slate-800 p-4 sm:p-5 flex flex-col justify-between shrink-0 shadow-2xl relative border-l border-slate-200 z-10 select-none">
                    <div>
                      {/* Original header with 28명 indicator, Send buttons, and close button */}
                      <div className="flex items-center justify-between gap-1.5 mb-4 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                          <span className="text-xs font-sans font-black text-red-500 bg-red-50 px-2 py-1 rounded-md leading-none select-none">28명</span>
                          <button className="text-[10px] font-extrabold text-slate-500 bg-slate-100 hover:bg-slate-200 px-2 py-1.5 rounded transition-all">
                            숨긴 명단 보기
                          </button>
                        </div>
                        
                        <div className="flex gap-1 items-center shrink-0">
                          <button className="text-[10px] sm:text-[11px] bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-2.5 py-1.5 rounded-md shadow-sm shadow-blue-500/20 transition-all select-none">
                            일괄 전송
                          </button>
                          <button className="text-[10px] sm:text-[11px] bg-[#059669] hover:bg-[#047857] text-white font-extrabold px-2 py-1.5 rounded-md shadow-sm shadow-emerald-500/20 transition-all select-none">
                            SMS 일괄(유료)
                          </button>
                          <button 
                            onClick={() => setIsAdminModalOpen(false)}
                            className="text-slate-400 hover:text-slate-800 p-1 rounded-full transition-colors hidden sm:block"
                          >
                            <X className="w-4 h-4 stroke-[2.5]" />
                          </button>
                        </div>
                      </div>

                      {/* Header Title inside panel */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[11px] text-slate-400 uppercase font-black tracking-widest">
                          세부 소유 이용권 목록
                        </span>
                        <span className="text-[10.5px] cursor-pointer font-bold text-slate-400 hover:text-slate-600">숨기기</span>
                      </div>

                      {/* Stacked list of Member Pass tickets (Recreating exactly the visual aesthetic) */}
                      <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-1">
                        {/* Ticket Card 1 */}
                        <div className="bg-[#f8fafc] border border-slate-100 border-l-[3.5px] border-l-red-500 p-3 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:translate-x-1 transition-transform">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <span className="font-sans font-black text-slate-900 text-[11px] sm:text-[11.5px] tracking-tight">그룹 수강권 (대표)</span>
                            <div className="flex gap-1 shrink-0 flex-wrap justify-end">
                              <span className="bg-[#e0f2fe] text-[#0369a1] text-[9.5px] font-black px-1.5 py-0.5 rounded leading-none">그룹 D-28</span>
                              <span className="bg-[#fce7f3] text-[#be185d] text-[9.5px] font-black px-1.5 py-0.5 rounded leading-none">추가 D-28</span>
                            </div>
                          </div>
                          <div className="text-slate-500 text-[11px] leading-relaxed">12개월 무제한 그룹 PT</div>
                        </div>

                        {/* Ticket Card 1-2 Overlay block */}
                        <div className="bg-[#f8fafc] border border-slate-100 border-l-[3.5px] border-l-purple-500 p-3 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:translate-x-1 transition-transform">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <span className="font-sans font-black text-slate-900 text-[11px] sm:text-[11.5px] tracking-tight">추가 그룹 수강권</span>
                            <div className="flex gap-1 shrink-0">
                              <span className="bg-[#f3e8ff] text-[#6b21a8] text-[9.5px] font-black px-1.5 py-0.5 rounded leading-none">추가 잔여 1회</span>
                            </div>
                          </div>
                          <div className="text-slate-500 text-[11px] leading-relaxed">그룹PT 체험권 (총 1회)</div>
                        </div>

                        {/* Ticket Card 2 */}
                        <div className="bg-[#f8fafc] border border-slate-100 border-l-[3.5px] border-l-[#3b82f6] p-3 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:translate-x-1 transition-transform">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <span className="font-sans font-black text-slate-900 text-[11px] sm:text-[11.5px] tracking-tight">추가 그룹 수강권</span>
                            <div className="flex gap-1 shrink-0">
                              <span className="bg-[#fce7f3] text-[#be185d] text-[9.5px] font-black px-1.5 py-0.5 rounded leading-none">추가 D-28</span>
                            </div>
                          </div>
                          <div className="text-slate-500 text-[11px] leading-relaxed">12개월 필라테스</div>
                        </div>

                        {/* Ticket Card 3 */}
                        <div className="bg-[#f8fafc] border border-slate-100 border-l-[3.5px] border-l-emerald-500 p-3 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:translate-x-1 transition-transform">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <span className="font-sans font-black text-slate-900 text-[11px] sm:text-[11.5px] tracking-tight">그룹 수강권 (대표)</span>
                            <div className="flex gap-1 shrink-0">
                              <span className="bg-[#e0f2fe] text-[#0369a1] text-[9.5px] font-black px-1.5 py-0.5 rounded leading-none">그룹 D-23</span>
                            </div>
                          </div>
                          <div className="text-slate-500 text-[11px] leading-relaxed">16회 그룹PT권 (총 16회)</div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom notes in white sidebar exactly matching screenshot */}
                    <div className="border-t border-slate-100 pt-3 text-[10.5px] text-slate-400 font-sans leading-relaxed tracking-tight">
                      잔여횟수 8회 이하 또는 잔여기간 30일 이하인 회원 목록입니다.
                    </div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* High-Fidelity Custom User App Notification Modal */}
      <AnimatePresence>
        {isAppModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAppModalOpen(false)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[80] flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
            >
              {/* Phone Container Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-[#ebeff5] border border-slate-300 w-full max-w-md rounded-[2.5rem] p-3 sm:p-4 flex flex-col overflow-hidden max-h-[92vh] shadow-2xl"
              >
                {/* Simulated Phone Status Bar exactly like screenshot */}
                <div className="flex justify-between items-center px-4 pt-1 pb-3 text-xs font-bold text-slate-700 font-sans tracking-tight shrink-0 select-none">
                  <span>1:21</span>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    {/* Signal indicators */}
                    <span>📶</span>
                    <span>🛜</span>
                    <span className="bg-slate-800 text-[10px] text-white font-extrabold px-1.5 py-0.5 rounded border border-slate-700 leading-none">68</span>
                  </div>
                </div>

                {/* Simulated Mobile Dialog content exactly representing the user's high-fidelity image */}
                <div className="flex-1 bg-white rounded-[2rem] shadow-lg p-5 sm:p-6 flex flex-col gap-4 overflow-y-auto text-slate-800 relative">
                  {/* Dialog Header with Purple Bell Icon */}
                  <div className="flex items-center justify-between border-b border-slate-150 pb-3 shrink-0 select-none">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                        <Bell className="w-4.5 h-4.5 text-[#5c5cee] stroke-[2.5] animate-bounce" />
                      </div>
                      <span className="font-extrabold text-[#111827] text-base tracking-tight">알림 내역</span>
                    </div>
                    <button 
                      onClick={() => setIsAppModalOpen(false)}
                      className="text-slate-400 hover:text-slate-800 hover:bg-slate-100 p-1.5 rounded-full transition-all"
                    >
                      <X className="w-5 h-5 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Push Status Notice Bar */}
                  <div className="bg-[#f3f6fb] border border-slate-200/60 rounded-xl py-3 px-4 text-center text-xs font-bold text-slate-500 shrink-0 select-none leading-relaxed">
                    웹 푸시 알림이 원활하게 작동 중입니다.
                  </div>

                  {/* Pinned Marker and Pinned List Title */}
                  <div className="flex items-center gap-2 px-1 shrink-0 select-none">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#eef2ff] border border-[#e0e7ff] text-[#4f46e5] text-[10px] font-black tracking-tight leading-none shrink-0">
                      📌 고정됨
                    </span>
                    <span className="text-xs font-extrabold text-slate-400">최근 관리자 메시지</span>
                  </div>

                  {/* Main scrolling core yellow/amber cards representing the uploaded image */}
                  <div className="flex flex-col gap-4">
                    {/* card 1 */}
                    <div className="bg-[#fffbeb]/40 hover:bg-[#fffbeb]/70 border-l-[4px] border-amber-400 border-t border-r border-b border-amber-200/90 p-4 rounded-[1.25rem] shadow-[0_2px_8px_rgba(245,158,11,0.04)] tracking-tight hover:translate-x-1 transition-transform">
                      <div className="font-bold text-[#1e293b] text-[13px] sm:text-[14px] leading-relaxed break-keep font-sans">
                        [더문짐 & 그룹PT] 락카 만료 7일전입니다. 락카 연장을 희망하실경우, 인포데스크에 말씀해주세요.
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-1 border-t border-amber-100/40 select-none">
                        <span className="text-slate-400 font-mono text-xs font-medium">2026-06-19 13:18:39</span>
                        <span className="bg-amber-100/90 text-amber-800 px-2.5 py-0.5 rounded-md font-extrabold text-[10px]">공지/안내</span>
                      </div>
                    </div>

                    {/* card 2 */}
                    <div className="bg-[#fffbeb]/40 hover:bg-[#fffbeb]/70 border-l-[4px] border-amber-400 border-t border-r border-b border-amber-200/90 p-4 rounded-[1.25rem] shadow-[0_2px_8px_rgba(245,158,11,0.04)] tracking-tight hover:translate-x-1 transition-transform">
                      <div className="font-bold text-[#1e293b] text-[13px] sm:text-[14px] leading-relaxed break-keep font-sans">
                        [더문짐 & 그룹PT] 6월 특가 이벤트 !! PT 10회 + 헬스권 6개월 선착순 10명 550,000원 혜택!! 문의하기 -&gt; 0507 1370 2206
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-1 border-t border-amber-100/40 select-none">
                        <span className="text-slate-400 font-mono text-xs font-medium">2026-06-19 13:18:01</span>
                        <span className="bg-amber-100/90 text-amber-800 px-2.5 py-0.5 rounded-md font-extrabold text-[10px]">공지/안내</span>
                      </div>
                    </div>

                    {/* card 3 */}
                    <div className="bg-[#fffbeb]/40 hover:bg-[#fffbeb]/70 border-l-[4px] border-amber-400 border-t border-r border-b border-amber-200/90 p-4 rounded-[1.25rem] shadow-[0_2px_8px_rgba(245,158,11,0.04)] tracking-tight hover:translate-x-1 transition-transform">
                      <div className="font-bold text-[#1e293b] text-[13px] sm:text-[14px] leading-relaxed break-keep font-sans">
                        [더문짐 & 그룹PT] 회원권 만료 7일전 입니다. 회원권을 연장 희망시, 담당 트레이너에게 문의 부탁드립니다.
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-1 border-t border-amber-100/40 select-none">
                        <span className="text-slate-400 font-mono text-xs font-medium">2026-06-19 13:16:54</span>
                        <span className="bg-amber-100/90 text-amber-800 px-2.5 py-0.5 rounded-md font-extrabold text-[10px]">공지/안내</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Smartphone bottom Home bar bar */}
                <div className="w-24 h-1.5 bg-slate-800 rounded-full mx-auto mt-3 mb-2 shrink-0" />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <footer className="bg-[#070b15] py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900 relative mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
               <Activity className="w-6 h-6 text-blue-500" />
               <span className="font-display font-bold text-xl text-white tracking-tight">Myfitmanager</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-2 font-medium">최고의 효율과 성장을 이끄는 프리미엄 피트니스 통합 관리 파트너</p>
            
            <div className="flex flex-col gap-1.5 text-xs text-slate-500 mt-2">
              <div className="flex flex-col sm:flex-row gap-x-4 gap-y-1">
                <span><strong className="text-slate-400 font-medium">상호명:</strong> 더문랩</span>
                <span><strong className="text-slate-400 font-medium">대표자:</strong> 문준호</span>
              </div>
              <div>
                <strong className="text-slate-400 font-medium">소재지:</strong> 경기도 김포시 장기동 태장로 808 송호프라자 202호
              </div>
              <div className="flex flex-col sm:flex-row gap-x-4 gap-y-1">
                <span>
                  <strong className="text-slate-400 font-medium">사업자등록번호:</strong> 344-09-03220 
                  <a href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=3440903220" target="_blank" rel="noreferrer" className="ml-1.5 text-blue-500 hover:text-blue-400 hover:underline transition-colors">
                    [사업자정보확인]
                  </a>
                </span>
                <span><strong className="text-slate-400 font-medium">통신판매업신고번호:</strong> 제 2026-경기김포-4436 호</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-4 gap-y-1">
                <span><strong className="text-slate-400 font-medium">대표전화:</strong> 010-4814-2206</span>
                <span><strong className="text-slate-400 font-medium">이메일:</strong> prest930204@gmail.com</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-6 text-sm font-medium">
            <div className="flex flex-wrap sm:flex-nowrap gap-6 sm:gap-8 text-slate-400">
              <a href="#hero" className="hover:text-white transition-colors whitespace-nowrap">소개</a>
              <a href="#ai-routine" className="hover:text-white transition-colors whitespace-nowrap">주요 기능</a>
              <a href="#contact" className="hover:text-white transition-colors whitespace-nowrap">도입 문의</a>
            </div>
            <div className="flex flex-wrap gap-4 mt-2">
              <button 
                onClick={() => setIsTermsModalOpen(true)} 
                className="text-slate-300 hover:text-white font-bold transition-colors whitespace-nowrap cursor-pointer hover:underline underline-offset-4"
              >
                이용약관
              </button>
              <span className="text-slate-700">|</span>
              <button 
                onClick={() => setIsPrivacyModalOpen(true)} 
                className="text-slate-300 hover:text-white font-bold transition-colors whitespace-nowrap cursor-pointer hover:underline underline-offset-4"
              >
                개인정보처리방침
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto w-full h-[1px] bg-slate-800/60 my-8" />
        
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-slate-600 text-center md:text-left">
            &copy; {new Date().getFullYear()} 더문랩 (Myfitmanager). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
