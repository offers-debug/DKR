
import React from 'react';
import { Check } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, className, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-slate-700">{label}</label>
    <input
      className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-800 placeholder:text-slate-400 ${className}`}
      {...props}
    />
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-slate-700">{label}</label>
    <div className="relative">
      <select
        className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 appearance-none transition-all text-slate-800 cursor-pointer ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-slate-500">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  </div>
);

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => (
    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
        <div className="relative flex items-center">
            <input type="checkbox" className="peer w-5 h-5 border-2 border-slate-300 rounded focus:ring-amber-500 text-amber-600 appearance-none checked:bg-amber-600 checked:border-amber-600 transition-all" {...props} />
            <Check className="w-3.5 h-3.5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none" />
        </div>
        <span className="text-sm font-bold text-slate-700">{label}</span>
    </label>
);
