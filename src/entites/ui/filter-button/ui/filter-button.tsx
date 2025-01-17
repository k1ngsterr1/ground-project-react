import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface FilterButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isOpen: boolean;
}

export function FilterButton({
  icon,
  label,
  onClick,
  isOpen,
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00a859] text-[#00a859] hover:bg-[#00a859]/5 transition-colors"
    >
      {icon}
      <span>{label}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </button>
  );
}
