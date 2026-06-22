export const Button = ({ children, loading, variant = 'primary', className = '', ...props }) => {
  const base = 'w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98]';

  const variants = {
    primary: 'bg-terra-500 text-white hover:bg-terra-600',
    secondary: 'bg-white text-ink-700 border-[1.5px] border-ink-900/10 hover:border-ink-900/20 hover:bg-paper-100',
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {children}
    </button>
  );
};
