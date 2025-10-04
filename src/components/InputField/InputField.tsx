import React, { useId, useState } from "react";

export type Variant = "filled" | "outlined" | "ghost";
export type Size = "sm" | "md" | "lg";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: Variant;
  size?: Size;
  type?: string;
  clearable?: boolean;
  showPasswordToggle?: boolean;
  loading?: boolean;
  id?: string;
  name?: string;
}

const variantClasses: Record<Variant, string> = {
  filled: "bg-gray-100 dark:bg-slate-800 border border-transparent",
  outlined: "bg-white dark:bg-slate-900 border",
  ghost: "bg-transparent border-transparent",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-3 py-2",
  md: "text-base px-3.5 py-2.5",
  lg: "text-lg px-4 py-3",
};

export default function InputField({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable = true,
  showPasswordToggle = false,
  loading = false,
  id,
  name,
}: InputFieldProps) {
  const autoId = useId();
  const inputId = id ?? `input-${autoId}`;
  const [internalType, setInternalType] = useState(type);
  const showClear = clearable && !!value && !disabled;

  const base = `w-full rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0
    ${invalid ? "ring-rose-500 border-rose-500" : "focus:ring-blue-400"}
    ${disabled ? "opacity-60 cursor-not-allowed" : ""}`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}

      <div className={`relative ${variant === "ghost" ? "" : ""}`}>
        <input
          id={inputId}
          name={name}
          className={`${base} ${variantClasses[variant]} ${sizeClasses[size]}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={invalid}
          aria-describedby={errorMessage ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined}
          type={internalType}
        />

        {/* clear button */}
        {showClear && (
          <button
            type="button"
            aria-label="Clear input"
            onClick={() => {
              const ev = { target: { value: "" } } as unknown as React.ChangeEvent<HTMLInputElement>;
              onChange?.(ev);
            }}
            className="absolute right-10 top-1/2 -translate-y-1/2 p-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6 L18 18 M6 18 L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}

        {/* password toggle */}
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            aria-label="Toggle password visibility"
            onClick={() => setInternalType(prev => (prev === "password" ? "text" : "password"))}
            className="absolute right-10 top-1/2 -translate-y-1/2 p-1"
          >
            {internalType === "password" ? (
              <span aria-hidden>👁️</span>
            ) : (
              <span aria-hidden>🙈</span>
            )}
          </button>
        )}

        {/* loading spinner */}
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
          </div>
        )}
      </div>

      {/* helper / error */}
      {errorMessage ? (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-rose-600">
          {errorMessage}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-help`} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}