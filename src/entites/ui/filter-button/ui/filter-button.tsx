import { ChevronDown } from "lucide-react";

interface FilterButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export function FilterButton({ icon, label, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00a859] text-[#00a859] hover:bg-[#00a859]/5 transition-colors"
    >
      {icon}
      <span>{label}</span>
      <ChevronDown className="w-4 h-4" />
    </button>
  );
}
