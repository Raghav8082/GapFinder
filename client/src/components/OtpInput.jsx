import { useRef, useState, useEffect } from 'react';

/**
 * A styled 6-digit OTP input with auto-focus, paste support, and resend cooldown.
 *
 * Props:
 *  - length (default 6)
 *  - onComplete(otp: string) — called when all digits are filled
 *  - onResend() — called when the resend button is clicked
 *  - error — error message to display
 *  - disabled — disables inputs
 */
export const OtpInput = ({ length = 6, onComplete, onResend, error, disabled = false }) => {
  const [digits, setDigits] = useState(Array(length).fill(''));
  const [cooldown, setCooldown] = useState(0);
  const inputsRef = useRef([]);

  // Cooldown timer for resend button
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const focusInput = (index) => {
    inputsRef.current[index]?.focus();
  };

  const triggerComplete = (newDigits) => {
    const otp = newDigits.join('');
    if (otp.length === length && onComplete) {
      onComplete(otp);
    }
  };

  const handleChange = (e, index) => {
    const val = e.target.value;
    // Only allow single digit
    if (val && !/^\d$/.test(val)) return;

    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);

    if (val && index < length - 1) {
      focusInput(index + 1);
    }

    triggerComplete(newDigits);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        focusInput(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;

    const newDigits = [...digits];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);

    // Focus the next empty box or the last one
    const nextEmpty = newDigits.findIndex((d) => !d);
    focusInput(nextEmpty >= 0 ? nextEmpty : length - 1);

    triggerComplete(newDigits);
  };

  const handleResend = () => {
    if (cooldown > 0 || !onResend) return;
    setCooldown(60);
    setDigits(Array(length).fill(''));
    focusInput(0);
    onResend();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2.5" onPaste={handlePaste}>
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            disabled={disabled}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onFocus={(e) => e.target.select()}
            className={`
              w-12 h-14 text-center text-xl font-semibold rounded-xl border-[1.5px]
              outline-none transition-all duration-200
              ${error
                ? 'border-red-400 bg-red-50/50'
                : 'border-ink-900/15 bg-white focus:border-terra-500 focus:ring-2 focus:ring-terra-400/20'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            autoFocus={i === 0}
          />
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-500 font-medium">{error}</p>
      )}

      {onResend && (
        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0 || disabled}
          className={`text-sm font-medium transition-colors ${
            cooldown > 0 || disabled
              ? 'text-ink-300 cursor-not-allowed'
              : 'text-terra-500 hover:text-terra-600 hover:underline'
          }`}
        >
          {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Didn't receive it? Resend OTP"}
        </button>
      )}
    </div>
  );
};
