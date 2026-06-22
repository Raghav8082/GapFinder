import { SkillPathBackdrop } from './SkillPathBackdrop';

export const AuthCard = ({ eyebrow, title, subtitle, children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-paper-50 topo-field flex items-center justify-center px-4 py-10">
      <SkillPathBackdrop />

      <div className="relative w-full max-w-md">
        <div className="flex items-center gap-2 justify-center mb-8">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <circle cx="7" cy="22" r="3.2" fill="#D4613E" />
            <circle cx="15" cy="9" r="3.2" fill="#F0B41E" />
            <circle cx="23" cy="22" r="3.2" fill="#B84C2F" />
            <path d="M9.2 20 L13 11 M16.8 11 L21 20" stroke="#0E2A2B" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="font-display font-bold text-xl text-ink-900 tracking-tight">GapFinder</span>
        </div>

        {eyebrow && (
          <p className="text-center text-xs font-semibold tracking-widest text-terra-500 uppercase mb-2">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-center text-[28px] font-semibold text-ink-900 leading-snug">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-center text-sm text-ink-400">{subtitle}</p>
        )}

        <div className="mt-7 bg-white/90 backdrop-blur-sm rounded-2xl border border-terra-100 shadow-[0_8px_30px_-12px_rgba(212,97,62,0.2)] p-7">
          {children}
        </div>
      </div>
    </div>
  );
};
