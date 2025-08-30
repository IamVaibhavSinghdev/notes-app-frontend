import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string };
export default function TextInput({ label, hint, className="", ...props }: Props) {
  return (
    <label className="block">
      {label && <span className="mb-1 block text-sm text-gray-700">{label}</span>}
      <input
        className={
          "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 " + className
        }
        {...props}
      />
      {hint && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}
    </label>
  );
}
