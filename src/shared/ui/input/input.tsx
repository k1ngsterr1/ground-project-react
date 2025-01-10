interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[#2f2f2f] text-sm font-medium">
          {label}
        </label>
      )}
      <input
        className="w-full px-3 py-2 border border-gray-200 rounded-md text-[#2f2f2f] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00a859] focus:border-transparent"
        {...props}
      />
    </div>
  );
}
