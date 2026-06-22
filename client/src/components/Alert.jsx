export const Alert = ({ type = 'error', children }) => {
  const styles = {
    error: 'bg-rose-50 text-rose-600 border-rose-100',
    success: 'bg-lime-400/15 text-lime-600 border-lime-400/30',
    info: 'bg-terra-100 text-terra-600 border-terra-400/30',
  };

  if (!children) return null;

  return (
    <div className={`mb-4 rounded-xl border px-3.5 py-2.5 text-sm ${styles[type]}`}>
      {children}
    </div>
  );
};
