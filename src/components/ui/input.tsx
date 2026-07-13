import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  id,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-3.5 py-2 text-sm bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white placeholder:text-gray-400 ${
          error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
