import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Shield, Award, Sparkles, Check, ArrowUpRight, Target, Gamepad2, Dumbbell, Flame, Settings2 } from 'lucide-react';

type PresetType = 'crossfit' | 'mma' | 'pilates';

interface GymPreset {
  shortName: string;
  gymName: string;
  badge: string;
  memberName: string;
  memberTitle: string; // e.g. "(열운러) 홍길동님 열혈크로스핏터 (lv2)"
  subInfo: string;
  stats: string[];
  levelUpRule: string;
  pointRule: string;
  btnLabel: string;
  rewardTitle: string;
  rewardDesc: string;
  initialLvl: number;
  unlockedLvl: number;
  initialPts: number;
  unlockedPts: number;
  payoutPoints: number;
  payoutStats: string;
}

const presets: Record<PresetType, GymPreset> = {
  crossfit: {
    shortName: "크로스핏 박스",
    gymName: "야생 크로스핏 (CF)",
    badge: "크로스핏 박스 특화",
    memberName: "홍길동 회원님",
    memberTitle: "(열운러) 홍길동님 열혈크로스핏터 (Lv.2)",
    subInfo: "⚡️ 주 4회 WOD 출석 기록 완수 완료 • 클래스 매니아",
    stats: ["근력", "지구력", "유연성", "정신력", "순발력"],
    levelUpRule: "누적 5,000 포인트 획득 시 LEVEL UP",
    pointRule: "'크로스핏 WOD 클래스' 출석 시 근력+2, 지구력+1 및 1,000 P 자동 지급",
    btnLabel: "크로스핏 WOD 클래스 출석 체크",
    rewardTitle: "🏅 레벨 3 승급 및 '진격의핏터' 칭호 획득!",
    rewardDesc: "WOD 출석이 인증되어 근력 +2, 지구력 +1이 반영되었습니다. 누적 포인트 5,000P 도달로 즉시 승급!",
    initialLvl: 2,
    unlockedLvl: 3,
    initialPts: 4000,
    unlockedPts: 5000,
    payoutPoints: 1000,
    payoutStats: "💪 근력 +2  🏃‍♂️ 지구력 +1"
  },
  mma: {
    shortName: "MMA 체육관",
    gymName: "타이탄 MMA 아카데미",
    badge: "종합 격투기/주짓수 특화",
    memberName: "이민호 회원님",
    memberTitle: "(스트라이커) 이민호님 아마추어파이터 (Lv.1)",
    subInfo: "🥊 매트 훈련 및 주짓수 스파링 전문 과정 이수 중",
    stats: ["타격", "그래플링", "체력", "폭발력", "정신력"],
    levelUpRule: "누적 2,500 포인트 획득 시 LEVEL UP",
    pointRule: "'주짓수 클래스' 출석 시 그래플링+2, 체력+1 및 800 P 자동 지급",
    btnLabel: "주짓수 클래스 출석 체크",
    rewardTitle: "🥋 파이터 레벨 2 승급 완료 및 블루벨트 자격 요건 충족!",
    rewardDesc: "주짓수 수련이 반영되어 그래플링 +2, 체력 +1이 반영되었습니다. 누적 포인트 2,500P 도달로 승격 완료!",
    initialLvl: 1,
    unlockedLvl: 2,
    initialPts: 1700,
    unlockedPts: 2500,
    payoutPoints: 800,
    payoutStats: "🥋 그래플링 +2  🩸 체력 +1"
  },
  pilates: {
    shortName: "필라테스 스튜디오",
    gymName: "루나 필라테스",
    badge: "여성 코어 / 그룹 필라테스 특화",
    memberName: "김지우 회원님",
    memberTitle: "(릴렉서) 김지우님 코어마스터 (Lv.14)",
    subInfo: "🧘 누적 출석 미션 및 기구 사용량 연동 중",
    stats: ["유연성", "코어력", "자세 균형", "균형감각", "정교성"],
    levelUpRule: "누적 12,000 포인트 획득 시 LEVEL UP",
    pointRule: "'캐딜락 기구 필라테스 클래스' 출석 시 유연성+2, 코어력+1 및 1,500 P 자동 지급",
    btnLabel: "캐딜락 필라테스 클래스 출석 체크",
    rewardTitle: "🏅 레벨 15 실버코칭 승급 및 '자세의장인' 칭호 획득!",
    rewardDesc: "기구 기하학 균형 훈련이 완료되어 유연성 +2, 코어력 +1이 반영되었습니다. 누적 포인트 12,000P 충족 완료!",
    initialLvl: 14,
    unlockedLvl: 15,
    initialPts: 10500,
    unlockedPts: 12000,
    payoutPoints: 1500,
    payoutStats: "🧘 유연성 +2  💎 코어력 +1"
  }
};

export function GamificationSimulator() {
  const [selectedPreset, setSelectedPreset] = useState<PresetType>('crossfit');
  const [xp, setXp] = useState(90); // progress bar width
  const [showBadge, setShowBadge] = useState(false);
  const [showFloatingText, setShowFloatingText] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  // Live editable fields for operators to prove customization works!
  const [gymName, setGymName] = useState('');
  const [memberTitle, setMemberTitle] = useState('');
  const [stats, setStats] = useState<string[]>([]);
  const [levelUpRule, setLevelUpRule] = useState('');
  const [pointRule, setPointRule] = useState('');

  const activeGym = presets[selectedPreset];

  // Sync state with standard presets on change
  useEffect(() => {
    setXp(90);
    setShowBadge(false);
    setShowFloatingText(false);
    setIsActivating(false);

    setGymName(activeGym.gymName);
    setMemberTitle(activeGym.memberTitle);
    setStats([...activeGym.stats]);
    setLevelUpRule(activeGym.levelUpRule);
    setPointRule(activeGym.pointRule);
  }, [selectedPreset]);

  // Handler to update one stat in the 5-stats list
  const handleStatChange = (index: number, val: string) => {
    const updated = [...stats];
    updated[index] = val;
    setStats(updated);
  };

  const triggerChallenge = () => {
    if (isActivating) return;
    setIsActivating(true);
    setShowFloatingText(true);

    // Dynamic EXP progress to 100%
    setXp(100);

    // Delayed Level Up
    setTimeout(() => {
      setShowBadge(true);
    }, 850);
  };

  const resetSimulator = () => {
    setXp(90);
    setShowBadge(false);
    setShowFloatingText(false);
    setIsActivating(false);
  };

  return (
    <div className="w-full bg-[#0a0f1d] border border-slate-800/80 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Visual lighting */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500/10 blur-[80px] pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/60">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Gamepad2 className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <span className="text-white font-bold text-sm block">운영자 자유 커스텀 시스템</span>
            <span className="text-slate-500 text-xs">레벨/5대 능력치/포인트 맞춤 보정</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 self-start sm:self-center bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          <span className="text-white font-bold text-xs">CRM 개별 모드 탑재</span>
        </div>
      </div>

      {/* Preset Select Tabs */}
      <div className="mb-6">
        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2.5">
          🏢 센터 업종별 기본 템플릿 선택
        </span>
        <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 border border-slate-800 rounded-xl">
          {(Object.keys(presets) as PresetType[]).map((key) => {
            const isSelected = selectedPreset === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedPreset(key)}
                className={`py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {presets[key].shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* User Status Profile Card */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 mb-5 relative">
        {/* Customized Gym & Member title preview */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/40">
          <span className="text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold px-2.5 py-0.5 rounded-md">
            {gymName}
          </span>
          <span className="text-right text-[10px] text-slate-500">
            {activeGym.badge}
          </span>
        </div>

        {/* Display Title Block */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-purple-500/30 bg-gradient-to-tr from-purple-950 to-slate-950 overflow-hidden flex items-center justify-center text-sm font-bold text-purple-300">
              {activeGym.memberName.slice(0, 1)}
            </div>
            <div>
              <h5 className="text-purple-300 font-bold text-xs tracking-wide">
                칭호: {memberTitle.split('님')[0]}님
              </h5>
              <p className="text-white font-black text-sm mt-0.5 leading-tight">
                {memberTitle.split('님')[1] || memberTitle}
              </p>
              <p className="text-slate-500 text-[10px] mt-1 flex items-center gap-1">
                <span>{activeGym.subInfo}</span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block">적립 포인트</span>
            <span className="text-yellow-500 font-bold text-sm font-mono tracking-tight transition-all">
              {showBadge ? activeGym.unlockedPts.toLocaleString() : activeGym.initialPts.toLocaleString()} P
            </span>
          </div>
        </div>

        {/* Level & EXP Gauge Block */}
        <div className="space-y-2 mt-4 relative">
          <div className="flex justify-between items-end text-xs">
            <span className="text-slate-400 font-medium">활동 경험치 등급</span>
            <div className="text-right flex items-center gap-1">
              <span className="text-indigo-400 font-bold transition-all font-mono">
                {showBadge ? `Lv. ${activeGym.unlockedLvl}` : `Lv. ${activeGym.initialLvl}`}
              </span>
              <span className="text-slate-600 text-[10px]">/ 99</span>
            </div>
          </div>

          {/* Bar container */}
          <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800/80 relative">
            <motion.div
              initial={{ width: '90%' }}
              animate={{ width: `${xp}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-full rounded-full bg-gradient-to-r ${
                showBadge ? 'from-purple-500 to-indigo-500' : 'from-indigo-600 to-indigo-400'
              }`}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span>EXP 900 / 1000</span>
            <span className="text-indigo-450 font-bold">{xp}% 완료</span>
          </div>

          {/* Floating Exp text */}
          <AnimatePresence>
            {showFloatingText && !showBadge && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -30, scale: 1.1 }}
                exit={{ opacity: 0 }}
                className="absolute right-4 top-0 font-bold text-xs bg-purple-500 text-white font-mono px-2 py-0.5 rounded-full shadow-lg"
              >
                +100 EXP
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 5-Stats Pentagon Custom Preview Tag */}
        <div className="mt-4 pt-3 border-t border-slate-800/40">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
            📊 운영진 설정 5대 능력치 오각형 요소
          </span>
          <div className="flex flex-wrap gap-1.5">
            {stats.map((stat, idx) => (
              <span key={idx} className="text-xs bg-[#11162b] text-slate-300 border border-slate-800 px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1">
                <span className="text-[11px] text-purple-400 font-bold">#{idx+1}</span>
                <span>{stat || '공란'}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Embedded Simulation Console */}
      <div className="min-h-[160px] flex items-center justify-center bg-[#0d1325] border border-slate-800/80 rounded-2xl p-4 sm:p-5 relative overflow-hidden mb-6">
        <AnimatePresence mode="wait">
          {!showBadge ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center w-full"
            >
              <div className="text-xs text-slate-400 space-y-1.5 mb-4 text-left max-w-md mx-auto break-keep">
                <div className="flex items-start gap-1">
                  <span className="text-purple-400 font-bold shrink-0">📍 레벨업 조건:</span> 
                  <span>{levelUpRule}</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-yellow-500 font-bold shrink-0">📍 포인트 지급:</span> 
                  <span>{pointRule}</span>
                </div>
              </div>
              <button
                onClick={triggerChallenge}
                disabled={isActivating}
                className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white py-2.5 px-6 rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/20 active:scale-95 transition-all flex items-center gap-2 mx-auto"
              >
                <Trophy className="w-4 h-4 text-yellow-400 animate-bounce" />
                {activeGym.btnLabel}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="badge-unlock"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-1 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ rotate: -15, scale: 0 }}
                animate={{ rotate: 0, scale: [1.2, 1] }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-14 h-14 bg-gradient-to-tr from-yellow-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/20 mb-3"
              >
                <Award className="w-8 h-8 text-white" />
              </motion.div>
              <motion.h6
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white text-sm font-bold mb-1"
              >
                {activeGym.rewardTitle}
              </motion.h6>
              <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-emerald-400 font-bold mb-2 flex items-center gap-1.5 shadow-inner">
                ✨ 실시간 능력치 획득: {activeGym.payoutStats}
              </div>
              <p className="text-slate-400 text-xs mb-3 font-medium max-w-sm break-keep">
                {activeGym.rewardDesc} 웰스포인트 <span className="text-yellow-400 font-bold font-mono">+{activeGym.payoutPoints.toLocaleString()} P</span>가 즉시 가산되었습니다.
              </p>
              <button
                onClick={resetSimulator}
                className="text-slate-500 hover:text-slate-300 transition-colors text-xs font-semibold underline decoration-dashed"
              >
                다시 가동해보기
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Operator Admin/Customizer Panel */}
      <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 sm:p-5 relative">
        <div className="flex items-center gap-2 mb-4">
          <Settings2 className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            ⚙️ 실시간 운영자 설정 튜너 (여기서 직접 고쳐보세요!)
          </span>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">체육관/지점 이름</label>
              <input
                type="text"
                value={gymName}
                onChange={(e) => setGymName(e.target.value)}
                className="w-full bg-[#0d1325] border border-slate-800 focus:border-purple-500/50 focus:outline-none rounded-lg px-3 py-2 text-xs text-white"
                placeholder="지점이름을 입력해보세요"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">회원 커스텀 레벨 & 칭호</label>
              <input
                type="text"
                value={memberTitle}
                onChange={(e) => setMemberTitle(e.target.value)}
                className="w-full bg-[#0d1325] border border-slate-800 focus:border-purple-500/50 focus:outline-none rounded-lg px-3 py-2 text-xs text-white font-medium"
                placeholder="(칭호) 이름님 레벨표기"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-1.5">
              🎯 5대 능력치 오각형 구성 개별 수정
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {stats.map((stat, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={stat}
                  onChange={(e) => handleStatChange(idx, e.target.value)}
                  className="w-full bg-[#0d1325] border border-slate-800 focus:border-purple-500/50 focus:outline-none rounded-lg px-2 py-1.5 text-center text-[11px] font-bold text-slate-200"
                  placeholder={`능력치 ${idx+1}`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">레벨업 승급 기준</label>
              <input
                type="text"
                value={levelUpRule}
                onChange={(e) => setLevelUpRule(e.target.value)}
                className="w-full bg-[#0d1325] border border-slate-800 focus:border-purple-500/50 focus:outline-none rounded-lg px-3 py-2 text-xs text-slate-300"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">포인트 지급 조건</label>
              <input
                type="text"
                value={pointRule}
                onChange={(e) => setPointRule(e.target.value)}
                className="w-full bg-[#0d1325] border border-slate-800 focus:border-purple-500/50 focus:outline-none rounded-lg px-3 py-2 text-xs text-slate-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 bg-slate-950/30 py-2.5 px-3.5 border border-slate-900 rounded-xl">
        <span className="flex items-center gap-1">
          <Check className="w-3.5 h-3.5 text-emerald-400" /> 커스텀 기획/정산룰 연계 가능
        </span>
        <span className="font-semibold text-slate-400">자연스러운 리텐션 극대화 91.2%</span>
      </div>
    </div>
  );
}
