import { useState } from 'react';

export const PasswordInput = ({ label, error, ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-ink-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          type={visible ? 'text' : 'password'}
          className={`w-full rounded-xl border-[1.5px] bg-paper-50/60 px-3.5 py-2.5 pr-11 text-sm text-ink-900 outline-none transition-all
            placeholder:text-ink-400/70
            focus:border-terra-500 focus:bg-white focus:ring-4 focus:ring-terra-100
            ${error ? 'border-rose-300' : 'border-ink-900/10'}`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          tabIndex={-1}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 transition-colors"
        >
          {visible ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 3l18 18M10.58 10.58a2 2 0 002.83 2.83M9.88 4.24A9.94 9.94 0 0112 4c5 0 9.27 3.11 11 7.5a13.16 13.16 0 01-1.67 2.68M6.61 6.61C4.6 8.06 3.03 10.07 2 12.5 3.73 16.89 8 20 12 20a9.93 9.93 0 005.39-1.61" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M1 12s4-7.5 11-7.5S23 12 23 12s-4 7.5-11 7.5S1 12 1 12z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-500">{error}</p>}
    </div>
  );
};