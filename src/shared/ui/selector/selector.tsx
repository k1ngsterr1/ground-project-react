"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export function Select({
  label,
  options,
  className,
  error,
  ...props
}: SelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-[#2f2f2f]">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className="w-full px-3 py-2 pr-10 border border-[#d9d9d9] rounded-md bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#00a859] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2f2f2f] pointer-events-none" />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
