"use client";

import telegram from "@/assets/telegram.svg";
import whatsapp from "@/assets/whatsapp.svg";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { useShareModalStore } from "../model/use-share-modal-store";
import { Modal } from "./modal";

export function ShareModal() {
  const { closeModal } = useShareModalStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("https://example.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Modal>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#2f2f2f]">Поделиться</h2>
          <button
            onClick={closeModal}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors hover:text-green"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-3">
            Поделитесь этой ссылкой через:
          </p>
          <div className="flex gap-4 justify-start items-center">
            <img src={whatsapp} className="w-[60px] h-[60px] cursor-pointer" />
            <img src={telegram} className="w-[48px] h-[48px] cursor-pointer" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Или скопируйте ссылку здесь:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value="https://example.com"
              readOnly
              className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00a859] focus:border-transparent"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                copied
                  ? "bg-[#00a859] text-white"
                  : "bg-[#00a859] text-white hover:bg-[#00a859]/90"
              }`}
            >
              {copied ? "Скопировано!" : "Скопировать"}
            </motion.button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
