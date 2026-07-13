import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <label className={`flex items-center space-x-3 select-none ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={`w-10 h-6 rounded-full transition-colors duration-200 ease-in-out ${
            checked ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
          }`}
        />
        <div
          className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow transform transition-transform duration-200 ease-in-out ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </div>
      {label && <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>}
    </label>
  );
};
