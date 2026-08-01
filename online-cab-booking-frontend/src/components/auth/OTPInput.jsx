import { useRef } from "react";

export default function OTPInput({ length = 6, value, onChange }) {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    const otpArray = value.split("");
    otpArray[index] = digit || "";
    const newOtp = otpArray.join("").padEnd(length, "");
    onChange(newOtp.slice(0, length));

    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-11 h-12 text-center text-xl font-black border border-slate-200 rounded-xl outline-none focus:border-purple-600"
        />
      ))}
    </div>
  );
}