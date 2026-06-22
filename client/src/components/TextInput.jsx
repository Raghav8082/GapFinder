export const TextInput = ({ label, error, ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-ink-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full rounded-xl border-[1.5px] bg-paper-50/60 px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-all
          placeholder:text-ink-400/70
          focus:border-terra-500 focus:bg-white focus:ring-4 focus:ring-terra-100
          ${error ? 'border-rose-300' : 'border-ink-900/10'}`}
      />
      {error && <p className="mt-1.5 text-xs text-rose-500">{error}</p>}
    </div>
  );
};
