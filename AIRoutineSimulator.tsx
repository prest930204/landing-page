import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Flame, Dumbbell, Sparkles, Check, ListChecks } from 'lucide-react';

type GoalType = 'diet' | 'muscle' | 'profile';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  intensity: string;
}

const routines: Record<GoalType, { title: string; exercises: Exercise[]; tip: string }> = {
  diet: {
    title: "🔥 고강도 복합 컨디셔닝 와드 (WOD) 루틴",
    exercises: [
      { name: "케틀벨 스윙", sets: 4, reps: "20회", intensity: "최대 심박수 75%" },
      { name: "덤벨 고블릿 스쿼트", sets: 3, reps: "15회", intensity: "RPE 8" },
      { name: "서킷 버피 테스트", sets: 3, reps: "12회", intensity: "휴식 30초" },
      { name: "마운틴 클라이머", sets: 3, reps: "30초", intensity: "연속 수행" }
    ],
    tip: "팀원들과 함께 심폐 능력을 극대화할 수 있도록 설계된 컨디셔닝 및 고강도 기능성 서킷 단체 트레이닝 와드입니다."
  },
  muscle: {
    title: "⚡ 파워 & 스트렝스 스트롱맨 팀 루틴",
    exercises: [
      { name: "바벨 백 스쿼트", sets: 5, reps: "5회 (스트렝스)", intensity: "1RM의 80-85%" },
      { name: "덤벨 벤치 프레스", sets: 4, reps: "8회 (볼륨)", intensity: "1RM의 75%" },
      { name: "펜들레이 로우", sets: 4, reps: "8회", intensity: "RPE 8.5" },
      { name: "오버헤드 프레스", sets: 3, reps: "6회", intensity: "1RM의 80%" }
    ],
    tip: "그룹PT 자극과 파트너쉽 시너지를 높이기 위해 대근육 동반 스트렝스 향상 및 중량 과부하 목표로 제작된 운동입니다."
  },
  profile: {
    title: "📸 팀 바디 쉐이핑 & 코어 밸런스 루틴",
    exercises: [
      { name: "인클라인 덤벨 프레스", sets: 4, reps: "12회", intensity: "최대 수축 집중" },
      { name: "페이셜 풀 & 래터럴 레이즈", sets: 4, reps: "20회", intensity: "드롭 세트 적용" },
      { name: "하이 풀다운", sets: 4, reps: "15회", intensity: "이완 2초 유지" },
      { name: "레그 컬 (수축 고정)", sets: 3, reps: "15회", intensity: "RPE 9" }
    ],
    tip: "동료들과 보조를 맞추며 개개인의 근선명도와 대칭 밸런스를 입체적으로 고안한 그룹 전용 타겟 쉐이핑 코스입니다."
  }
};

export function AIRoutineSimulator() {
  const [selectedGoal, setSelectedGoal] = useState<GoalType>('muscle');
  const [phase, setPhase] = useState<'idle' | 'analyzing' | 'complete'>('complete');
  const [gender, setGender] = useState<'M' | 'F'>('M');

  // Trigger brief typing/analyzing effect when goal or gender changes
  useEffect(() => {
    setPhase('analyzing');
    const timer = setTimeout(() => {
      setPhase('complete');
    }, 900);
    return () => clearTimeout(timer);
  }, [selectedGoal, gender]);

  const currentRoutine = routines[selectedGoal];

  return (
    <div className="w-full bg-[#0a0f1d] border border-slate-800/80 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 blur-[80px] pointer-events-none" />

      {/* Title block */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/60">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <span className="text-white font-bold text-sm block">Myfitmanager AI Engine</span>
            <span className="text-slate-500 text-xs">V2.4 Live Real-Time Agent</span>
          </div>
        </div>
        <div className="flex gap-1.5 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
          <button
            onClick={() => setGender('M')}
            className={`px-2 py-1 text-xs rounded transition-all font-semibold ${
              gender === 'M' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            A클래스 (상급)
          </button>
          <button
            onClick={() => setGender('F')}
            className={`px-2 py-1 text-xs rounded transition-all font-semibold ${
              gender === 'F' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            B클래스 (초급)
          </button>
        </div>
      </div>

      {/* Target Selector */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-3">
          클래스 테마 설정 (그룹PT / 크로스핏 와드)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['muscle', 'diet', 'profile'] as GoalType[]).map((goal) => {
            const labels: Record<GoalType, string> = {
              muscle: '파워 스트렝스',
              diet: '고강도 컨디셔닝',
              profile: '그룹 바디쉐이핑'
            };
            const isSelected = selectedGoal === goal;
            return (
              <button
                key={goal}
                onClick={() => setSelectedGoal(goal)}
                className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white border-transparent shadow-lg shadow-indigo-500/20 active:scale-95'
                    : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {labels[goal]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulator Display Body */}
      <div className="bg-[#0e1428]/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 min-h-[300px] flex flex-col justify-between relative">
        <AnimatePresence mode="wait">
          {phase === 'analyzing' ? (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="relative mb-4">
                <div className="w-12 h-12 rounded-full border-2 border-indigo-500/10 border-t-indigo-500 animate-spin" />
                <Sparkles className="w-5 h-5 text-indigo-400 absolute inset-0 m-auto animate-pulse" />
              </div>
              <p className="text-white text-sm font-bold mb-1">클래스 참여원 레벨 분석 & 수업 목적 연산 중...</p>
              <p className="text-slate-500 text-xs">Gemini AI가 오늘 그룹PT/크로스핏 수업에 완벽한 팀 강도 세팅을 조합합니다.</p>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col h-full gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                    WOD 구성 완료
                  </span>
                  <span className="text-xs text-slate-400 font-medium">최우수 클래스 만족 등급</span>
                </div>
                <h4 className="text-white font-bold text-base sm:text-lg block tracking-tight">
                  {currentRoutine.title}
                </h4>
              </div>

              {/* Routine list with staggered rows */}
              <div className="space-y-2.5 my-1">
                {currentRoutine.exercises.map((ex, idx) => (
                  <motion.div
                    key={ex.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                    className="flex items-center justify-between bg-slate-900/50 hover:bg-slate-900 border border-slate-800/40 hover:border-slate-800 p-3 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[10px] text-indigo-400 font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-slate-200 text-xs sm:text-sm font-semibold">{ex.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-right">
                      <span className="text-indigo-300 text-xs font-mono font-bold bg-indigo-500/15 px-2 py-0.5 rounded border border-indigo-500/20">
                        {ex.sets}세트 × {ex.reps}
                      </span>
                      <span className="text-[10px] text-slate-500 hidden sm:inline-block font-mono bg-slate-950 px-1.5 py-0.5 rounded">
                        {ex.intensity}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tips Section */}
              <div className="bg-indigo-950/25 border border-indigo-900/30 p-3 rounded-xl mt-2 text-xs text-indigo-300 leading-relaxed break-keep">
                <span className="font-bold text-indigo-400 mb-0.5 block flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> AI가 제공하는 코칭 노트
                </span>
                {currentRoutine.tip}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 bg-slate-950/30 py-2.5 px-3.5 border border-slate-900 rounded-xl">
        <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-400" /> 실시간 운동 와드(WOD) 자동 생성 완료</span>
        <span className="font-semibold text-slate-400">초당 루틴 최적화 99.8% 일치</span>
      </div>
    </div>
  );
}
