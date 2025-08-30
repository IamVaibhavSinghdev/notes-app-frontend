import { ButtonHTMLAttributes } from "react";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean };

export default function Button({ className="", loading, children, ...rest }: Props) {
  return (
    <button
      className={
        "w-full rounded-xl px-4 py-2 font-medium bg-brand-600 hover:bg-brand-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition " + className
      }
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
